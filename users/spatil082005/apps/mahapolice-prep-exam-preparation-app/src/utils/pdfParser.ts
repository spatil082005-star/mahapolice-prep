import * as pdfjsLib from 'pdfjs-dist';

// Set worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

export interface ParsedQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export async function extractTextFromPDF(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  
  let fullText = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item: any) => item.str)
      .join(' ');
    fullText += pageText + '\n';
  }
  return fullText;
}

export function parseQuestionsFromText(text: string): ParsedQuestion[] {
  const questions: ParsedQuestion[] = [];
  
  // Pattern 1: Q1. Question text / A) option B) option C) option D) option / Answer: X / Explanation: ...
  const qPattern = /(?:Q\.?\s*(\d+)[.:]?\s*|(\d+)[.:]\s*)(.+?)(?=(?:Q\.?\s*\d+|[A-D][\).\)]\s))/gs;
  
  // Simpler approach: split by common question markers
  const lines = text.split(/\n+/).map(l => l.trim()).filter(l => l.length > 0);
  
  let currentQ: Partial<ParsedQuestion> | null = null;
  let optionIndex = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Detect question start: "Q1.", "1.", "प्रश्न 1", etc.
    const qMatch = line.match(/^(?:Q\.?\s*\d+[\.:]?\s*|\d+[\.:]\s*|प्रश्न\s*\d+[\.:]?\s*)(.+)$/i);
    
    if (qMatch && !line.match(/^[A-D][\).\)]\s/i)) {
      // Save previous question
      if (currentQ && currentQ.question && currentQ.options && currentQ.options.length === 4) {
        questions.push({
          question: currentQ.question.trim(),
          options: currentQ.options,
          correct: currentQ.correct ?? 0,
          explanation: currentQ.explanation || '',
        });
      }
      currentQ = { question: qMatch[1], options: [], correct: 0, explanation: '' };
      optionIndex = 0;
      continue;
    }
    
    // Detect options: A), B), C), D) or अ), ब), क), ड)
    const optMatch = line.match(/^([A-Dअ-ड][\).\)]\s*)(.+)$/);
    if (optMatch && currentQ) {
      currentQ.options!.push(optMatch[2].trim());
      optionIndex++;
      continue;
    }
    
    // Detect answer: "Answer:", "उत्तर:", "Correct:"
    const ansMatch = line.match(/^(?:Answer|उत्तर|Correct|योग्य)[\s:]*([A-Dअ-ड1-4])/i);
    if (ansMatch && currentQ) {
      const ans = ansMatch[1].toUpperCase();
      if (ans >= 'A' && ans <= 'D') currentQ.correct = ans.charCodeAt(0) - 65;
      else if (ans === 'अ') currentQ.correct = 0;
      else if (ans === 'ब') currentQ.correct = 1;
      else if (ans === 'क') currentQ.correct = 2;
      else if (ans === 'ड') currentQ.correct = 3;
      else {
        const num = parseInt(ans);
        if (num >= 1 && num <= 4) currentQ.correct = num - 1;
      }
      continue;
    }
    
    // Detect explanation
    const expMatch = line.match(/^(?:Explanation|स्पष्टीकरण|Note|टीप)[\s:]*(.+)$/i);
    if (expMatch && currentQ) {
      currentQ.explanation = expMatch[1].trim();
      continue;
    }
    
    // If no pattern matched and we have a current question, append to question or explanation
    if (currentQ) {
      if (currentQ.options!.length < 4 && !currentQ.explanation) {
        // Might be continuation of question
        if (currentQ.question && line.length > 5) {
          currentQ.question += ' ' + line;
        }
      } else if (currentQ.explanation) {
        currentQ.explanation += ' ' + line;
      }
    }
  }
  
  // Save last question
  if (currentQ && currentQ.question && currentQ.options && currentQ.options.length === 4) {
    questions.push({
      question: currentQ.question.trim(),
      options: currentQ.options,
      correct: currentQ.correct ?? 0,
      explanation: currentQ.explanation || '',
    });
  }
  
  return questions;
}
