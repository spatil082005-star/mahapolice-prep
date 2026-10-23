import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Question } from '../data/questions';
import { ArrowLeft, Clock, CheckCircle, XCircle, SkipForward } from 'lucide-react';

interface QuizData {
  questions: Question[];
  type: 'practice' | 'mock' | 'timer' | 'daily';
  subject: string | null;
  timeLimit?: number; // in seconds
}

export default function QuizPage() {
  const navigate = useNavigate();
  const { addQuizResult } = useApp();
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const data = sessionStorage.getItem('quizData');
    if (data) {
      const parsed = JSON.parse(data);
      setQuizData(parsed);
      setAnswers(new Array(parsed.questions.length).fill(null));
    } else {
      navigate('/practice');
    }
  }, [navigate]);

  // Timer
  useEffect(() => {
    if (!quizData || isFinished) return;
    const timer = setInterval(() => {
      setTimeElapsed(prev => {
        if (quizData.timeLimit && prev + 1 >= quizData.timeLimit) {
          finishQuiz();
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [quizData, isFinished]);

  if (!quizData) return null;

  const question = quizData.questions[currentQ];
  const totalQ = quizData.questions.length;
  const progress = ((currentQ + 1) / totalQ) * 100;

  const handleOptionSelect = (optionIndex: number) => {
    if (showExplanation) return;
    setSelectedOption(optionIndex);
  };

  const handleConfirm = () => {
    if (selectedOption === null) return;
    
    const newAnswers = [...answers];
    newAnswers[currentQ] = selectedOption;
    setAnswers(newAnswers);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQ < totalQ - 1) {
      setCurrentQ(prev => prev + 1);
      setSelectedOption(answers[currentQ + 1]);
      setShowExplanation(false);
    } else {
      finishQuiz();
    }
  };

  const handleSkip = () => {
    if (currentQ < totalQ - 1) {
      setCurrentQ(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    }
  };

  const finishQuiz = () => {
    setIsFinished(true);
    const correctCount = answers.reduce((count, ans, idx) => {
      return count + (ans === quizData.questions[idx].correct ? 1 : 0);
    }, 0);

    // Also count current question if answered
    const finalAnswers = [...answers];
    if (selectedOption !== null) {
      finalAnswers[currentQ] = selectedOption;
    }
    const finalCorrect = finalAnswers.reduce((count, ans, idx) => {
      return count + (ans === quizData.questions[idx].correct ? 1 : 0);
    }, 0);

    addQuizResult({
      type: quizData.type,
      subject: quizData.subject || undefined,
      totalQuestions: totalQ,
      correctAnswers: finalCorrect,
      timeTaken: timeElapsed,
      score: (finalCorrect / totalQ) * 100,
    });

    sessionStorage.setItem('quizResult', JSON.stringify({
      totalQuestions: totalQ,
      correctAnswers: finalCorrect,
      timeTaken: timeElapsed,
      score: (finalCorrect / totalQ) * 100,
      answers: finalAnswers,
      questions: quizData.questions,
      type: quizData.type,
    }));

    navigate('/quiz-result');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="app-container quiz-page">
      {/* Quiz Header */}
      <header className="quiz-header">
        <button className="back-btn" onClick={() => {
          if (confirm('क्विझ सोडायची आहे का? तुमची प्रगती सेव्ह होणार नाही.')) {
            navigate('/practice');
          }
        }}>
          <ArrowLeft size={20} />
        </button>
        <div className="quiz-progress-info">
          <span>प्रश्न {currentQ + 1}/{totalQ}</span>
          <div className="quiz-progress-bar">
            <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <div className="quiz-timer">
          <Clock size={16} />
          <span>{formatTime(timeElapsed)}</span>
        </div>
      </header>

      {/* Question */}
      <div className="question-container">
        <div className="question-number">
          प्रश्न {currentQ + 1}
          <span className={`difficulty-badge ${question.difficulty === 'सोपे' ? 'easy' : question.difficulty === 'मध्यम' ? 'medium' : 'hard'}`}>
            {question.difficulty}
          </span>
        </div>
        <h3 className="question-text">{question.question}</h3>
      </div>

      {/* Options */}
      <div className="options-container">
        {question.options.map((option, idx) => {
          let optionClass = 'option-btn';
          if (showExplanation) {
            if (idx === question.correct) optionClass += ' correct';
            else if (idx === selectedOption && idx !== question.correct) optionClass += ' wrong';
          } else if (selectedOption === idx) {
            optionClass += ' selected';
          }

          return (
            <button
              key={idx}
              className={optionClass}
              onClick={() => handleOptionSelect(idx)}
              disabled={showExplanation}
            >
              <span className="option-label">{String.fromCharCode(65 + idx)}</span>
              <span className="option-text">{option}</span>
              {showExplanation && idx === question.correct && <CheckCircle size={20} className="option-icon correct" />}
              {showExplanation && idx === selectedOption && idx !== question.correct && <XCircle size={20} className="option-icon wrong" />}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className="explanation-box">
          <h4>📖 स्पष्टीकरण:</h4>
          <p>{question.explanation}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="quiz-actions">
        {!showExplanation ? (
          <>
            <button className="skip-btn" onClick={handleSkip}>
              <SkipForward size={16} />
              वगळा
            </button>
            <button 
              className="confirm-btn" 
              onClick={handleConfirm}
              disabled={selectedOption === null}
            >
              पडताळा
            </button>
          </>
        ) : (
          <button className="next-btn" onClick={handleNext}>
            {currentQ < totalQ - 1 ? 'पुढचा प्रश्न →' : 'क्विझ संपवा 🏁'}
          </button>
        )}
      </div>
    </div>
  );
}
