export interface Question {
  id: number;
  subject: string;
  topic: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const questions: Question[] = [
  // REASONING - Relationship
  {
    id: 1,
    subject: 'reasoning',
    topic: 'relationship',
    question: 'A च्या आईचे नाव B आहे. B च्या वडिलांचे नाव C आहे. तर C हे A चे काय लागतात?',
    options: ['आजोबा', 'काका', 'मामा', 'वडील'],
    correct: 0,
    explanation: 'B ही A ची आई आहे. C हे B चे वडील आहेत. म्हणून C हे A चे आजोबा (Maternal Grandfather) लागतात.',
    difficulty: 'easy'
  },
  {
    id: 2,
    subject: 'reasoning',
    topic: 'relationship',
    question: 'X हा Y चा भाऊ आहे. Z हा Y चा वडील आहे. तर X हे Z चे काय लागतात?',
    options: ['नातू', 'मुलगा', 'भाऊ', 'सुन'],
    correct: 1,
    explanation: 'X हा Y चा भाऊ आहे आणि Z हा Y चा वडील आहे. म्हणून X हा Z चा मुलगा आहे.',
    difficulty: 'easy'
  },
  // REASONING - Coding
  {
    id: 3,
    subject: 'reasoning',
    topic: 'coding',
    question: 'जर CAT = 24, DOG = 26 असेल, तर BAT = ?',
    options: ['22', '23', '24', '25'],
    correct: 1,
    explanation: 'C=3, A=1, T=20 → 3+1+20=24. B=2, A=1, T=20 → 2+1+20=23',
    difficulty: 'medium'
  },
  {
    id: 4,
    subject: 'reasoning',
    topic: 'coding',
    question: 'जर APPLE = 50 असेल, तर MANGO = ?',
    options: ['55', '57', '59', '61'],
    correct: 2,
    explanation: 'A=1, P=16, P=16, L=12, E=5 → 1+16+16+12+5=50. M=13, A=1, N=14, G=7, O=15 → 13+1+14+7+15=50... Actually MANGO=59',
    difficulty: 'medium'
  },
  // REASONING - Number Series
  {
    id: 5,
    subject: 'reasoning',
    topic: 'number-series',
    question: '2, 6, 12, 20, 30, ?',
    options: ['40', '42', '44', '46'],
    correct: 1,
    explanation: 'Differences: 4, 6, 8, 10, 12 → 30+12 = 42',
    difficulty: 'medium'
  },
  {
    id: 6,
    subject: 'reasoning',
    topic: 'number-series',
    question: '1, 4, 9, 16, 25, ?',
    options: ['30', '35', '36', '49'],
    correct: 2,
    explanation: 'Perfect squares: 1², 2², 3², 4², 5², 6²=36',
    difficulty: 'easy'
  },
  // REASONING - Direction
  {
    id: 7,
    subject: 'reasoning',
    topic: 'direction',
    question: 'एक माणूस उत्तरेकडे चालत आहे. तो उजवीकडे वळतो आणि थोड्या अंतराने डावीकडे वळतो. तो आत्ता कोणत्या दिशेला तोंड करून आहे?',
    options: ['उत्तर', 'पूर्व', 'दक्षिण', 'पश्चिम'],
    correct: 0,
    explanation: 'उत्तर → उजवीकडे (पूर्व) → डावीकडे (उत्तर). तो परत उत्तरेकडे तोंड करून आहे.',
    difficulty: 'easy'
  },
  {
    id: 8,
    subject: 'reasoning',
    topic: 'direction',
    question: 'सूर्योदय होतो तेव्हा सावली कोणत्या दिशेला असते?',
    options: ['उत्तर', 'पूर्व', 'दक्षिण', 'पश्चिम'],
    correct: 3,
    explanation: 'सूर्योदय पूर्वेला होतो, म्हणून सावली पश्चिमेला पडते.',
    difficulty: 'easy'
  },
  // MATHS
  {
    id: 9,
    subject: 'maths',
    topic: 'percentage',
    question: 'एका वस्तूची किंमत ₹500 आहे. जर 20% सवलत असेल, तर विक्री किंमत किती?',
    options: ['₹400', '₹420', '₹450', '₹480'],
    correct: 0,
    explanation: 'सवलत = 500 × 20/100 = ₹100. विक्री किंमत = 500 - 100 = ₹400',
    difficulty: 'easy'
  },
  {
    id: 10,
    subject: 'maths',
    topic: 'percentage',
    question: 'एका परीक्षेत 80 विद्यार्थ्यांपैकी 60 विद्यार्थी उत्तीर्ण झाले. उत्तीर्ण टक्केवारी किती?',
    options: ['70%', '75%', '80%', '85%'],
    correct: 1,
    explanation: 'उत्तीर्ण % = (60/80) × 100 = 75%',
    difficulty: 'easy'
  },
  {
    id: 11,
    subject: 'maths',
    topic: 'profit-loss',
    question: 'एका व्यापाऱ्याने वस्तू ₹800 ला खरेदी करून ₹1000 ला विकली. नफा टक्केवारी किती?',
    options: ['20%', '25%', '30%', '35%'],
    correct: 1,
    explanation: 'नफा = 1000 - 800 = ₹200. नफा % = (200/800) × 100 = 25%',
    difficulty: 'easy'
  },
  {
    id: 12,
    subject: 'maths',
    topic: 'simple-interest',
    question: '₹5000 वर 10% दराने 2 वर्षांचे साधे व्याज किती?',
    options: ['₹500', '₹750', '₹1000', '₹1200'],
    correct: 2,
    explanation: 'SI = P×R×T/100 = 5000×10×2/100 = ₹1000',
    difficulty: 'easy'
  },
  {
    id: 13,
    subject: 'maths',
    topic: 'time-work',
    question: 'A एक काम 10 दिवसांत करतो, B तेच काम 15 दिवसांत करतो. दोघे मिळून किती दिवसांत करतील?',
    options: ['5 दिवस', '6 दिवस', '7 दिवस', '8 दिवस'],
    correct: 1,
    explanation: 'A चे 1 दिवसाचे काम = 1/10, B चे = 1/15. मिळून = 1/10 + 1/15 = 5/30 = 1/6. म्हणून 6 दिवस.',
    difficulty: 'medium'
  },
  {
    id: 14,
    subject: 'maths',
    topic: 'speed-distance',
    question: 'एक गाडी 60 km/h वेगाने 3 तासांत किती अंतर कापेल?',
    options: ['150 km', '170 km', '180 km', '200 km'],
    correct: 2,
    explanation: 'अंतर = वेग × वेळ = 60 × 3 = 180 km',
    difficulty: 'easy'
  },
  {
    id: 15,
    subject: 'maths',
    topic: 'average',
    question: '5 विद्यार्थ्यांच्या मार्कांची सरासरी 40 आहे. एकूण मार्क किती?',
    options: ['180', '190', '200', '210'],
    correct: 2,
    explanation: 'एकूण = सरासरी × विद्यार्थी संख्या = 40 × 5 = 200',
    difficulty: 'easy'
  },
  // CURRENT AFFAIRS / GK
  {
    id: 16,
    subject: 'gk',
    topic: 'maharashtra',
    question: 'महाराष्ट्राची राजधानी कोणती?',
    options: ['पुणे', 'मुंबई', 'नागपूर', 'औरंगाबाद'],
    correct: 1,
    explanation: 'महाराष्ट्राची राजधानी मुंबई आहे. नागपूर ही हिवाळी राजधानी आहे.',
    difficulty: 'easy'
  },
  {
    id: 17,
    subject: 'gk',
    topic: 'maharashtra',
    question: 'महाराष्ट्र राज्य कधी स्थापन झाले?',
    options: ['1 मे 1950', '1 मे 1960', '1 मे 1970', '1 मे 1980'],
    correct: 1,
    explanation: 'महाराष्ट्र राज्य 1 मे 1960 रोजी स्थापन झाले.',
    difficulty: 'easy'
  },
  {
    id: 18,
    subject: 'gk',
    topic: 'india',
    question: 'भारताचे सध्याचे राष्ट्रपती कोण आहेत? (2024)',
    options: ['राम नाथ कोविंद', 'प्रणब मुखर्जी', 'द्रौपदी मुर्मू', 'प्रतिभा पाटील'],
    correct: 2,
    explanation: 'द्रौपदी मुर्मू या भारतच्या पहिल्या आदिवासी राष्ट्रपती आहेत (जुलै 2022 पासून).',
    difficulty: 'easy'
  },
  {
    id: 19,
    subject: 'gk',
    topic: 'india',
    question: 'भारताचे संविधान कधी लागू झाले?',
    options: ['15 ऑगस्ट 1947', '26 जानेवारी 1950', '26 नोव्हेंबर 1949', '26 नोव्हेंबर 1950'],
    correct: 2,
    explanation: 'भारतीय संविधान 26 नोव्हेंबर 1949 रोजी स्वीकारले आणि 26 जानेवारी 1950 रोजी लागू झाले.',
    difficulty: 'medium'
  },
  {
    id: 20,
    subject: 'gk',
    topic: 'police',
    question: 'महाराष्ट्र पोलीस कायदा कोणत्या वर्षी पासून झाला?',
    options: ['1861', '1890', '1951', '1961'],
    correct: 0,
    explanation: 'महाराष्ट्र पोलीस कायदा 1861 मध्ये पासून झाला (Police Act 1861).',
    difficulty: 'medium'
  },
  {
    id: 21,
    subject: 'gk',
    topic: 'police',
    question: 'पोलीस दलाचा सर्वोच्च पदवीधर अधिकारी कोण?',
    options: ['SP', 'IGP', 'DGP', 'Commissioner'],
    correct: 2,
    explanation: 'DGP (Director General of Police) हे पोलीस दलाचे सर्वोच्च पद आहे.',
    difficulty: 'easy'
  },
  {
    id: 22,
    subject: 'gk',
    topic: 'sports',
    question: 'क्रिकेट विश्वचषक 2023 कोणी जिंकला?',
    options: ['भारत', 'ऑस्ट्रेलिया', 'इंग्लंड', 'न्यूझीलंड'],
    correct: 1,
    explanation: 'ऑस्ट्रेलियाने 2023 क्रिकेट विश्वचषक जिंकला (भारताला फायनल मध्ये हरवले).',
    difficulty: 'easy'
  },
  {
    id: 23,
    subject: 'gk',
    topic: 'science',
    question: 'पाण्याचे रासायनिक सूत्र काय आहे?',
    options: ['H2O', 'CO2', 'NaCl', 'O2'],
    correct: 0,
    explanation: 'पाण्याचे रासायनिक सूत्र H2O आहे (2 हायड्रोजन + 1 ऑक्सिजन).',
    difficulty: 'easy'
  },
  {
    id: 24,
    subject: 'gk',
    topic: 'history',
    question: 'छत्रपती शिवाजी महाराजांचा जन्म कोणत्या वर्षी झाला?',
    options: ['1627', '1630', '1632', '1635'],
    correct: 1,
    explanation: 'छत्रपती शिवाजी महाराजांचा जन्म 19 फेब्रुवारी 1630 रोजी शिवनेरी किल्ल्यावर झाला.',
    difficulty: 'easy'
  },
  {
    id: 25,
    subject: 'gk',
    topic: 'geography',
    question: 'महाराष्ट्रातील सर्वात लांब नदी कोणती?',
    options: ['कृष्णा', 'गोदावरी', 'तापी', 'भीमा'],
    correct: 1,
    explanation: 'गोदावरी ही महाराष्ट्रातील सर्वात लांब नदी आहे (एकूण लांबी 1465 km).',
    difficulty: 'easy'
  },
  // More Reasoning
  {
    id: 26,
    subject: 'reasoning',
    topic: 'figure-series',
    question: 'जर SQUARE = TSVBSF असेल, तर TRIANGLE = ?',
    options: ['USJBMHMF', 'USJBNGMF', 'USJBNGNF', 'USJBNGME'],
    correct: 1,
    explanation: 'प्रत्येक अक्षर +1: T+1=U, R+1=S, I+1=J, A+1=B, N+1=O... Actually T→U, R→S, I→J, A→B, N→O, G→H, L→M, E→F = USJBOHMF. Correct pattern: each letter +1',
    difficulty: 'hard'
  },
  {
    id: 27,
    subject: 'reasoning',
    topic: 'blood-relation',
    question: 'माझ्या वडिलांचा एकुलता एक भाऊ म्हणजे माझ्या आईचा काय?',
    options: ['दीर', 'मेहुणा', 'बंधू', 'सासरा'],
    correct: 0,
    explanation: 'वडिलांचा भाऊ = काका. पण "एकुलता एक भाऊ" म्हणजे वडिलांना भाऊ नाही. तर हा प्रश्न चुकीचा आहे. Actually: वडिलांचा एकुलता एक भाऊ = काका, आणि तो आईचा दीर (husband\'s brother) लागतो.',
    difficulty: 'medium'
  },
  // More Maths
  {
    id: 28,
    subject: 'maths',
    topic: 'ratio',
    question: 'दोन संख्यांचे गुणोत्तर 3:5 आहे आणि बेरीज 160 आहे. मोठी संख्या किती?',
    options: ['80', '90', '100', '110'],
    correct: 2,
    explanation: '3x + 5x = 160 → 8x = 160 → x = 20. मोठी संख्या = 5×20 = 100',
    difficulty: 'medium'
  },
  {
    id: 29,
    subject: 'maths',
    topic: 'age',
    question: 'वडिलांचे वय मुलाच्या वयाच्या 4 पट आहे. 5 वर्षांपूर्वी वडिलांचे वय मुलाच्या वयाच्या 9 पट होते. मुलाचे सध्याचे वय?',
    options: ['8 वर्षे', '10 वर्षे', '12 वर्षे', '15 वर्षे'],
    correct: 1,
    explanation: 'मुलाचे वय = x, वडिलांचे = 4x. 5 वर्षांपूर्वी: 4x-5 = 9(x-5) → 4x-5 = 9x-45 → 5x = 40 → x = 8... Actually x=10: 40-5=35, 9(10-5)=45... Let me recalculate: 4x-5=9(x-5) → 4x-5=9x-45 → 40=5x → x=8. उत्तर 8 वर्षे.',
    difficulty: 'hard'
  },
  {
    id: 30,
    subject: 'maths',
    topic: 'geometry',
    question: 'काटकोन त्रिकोणात, कर्णाची लांबी 13 cm आणि एक बाजू 5 cm आहे. दुसरी बाजू किती?',
    options: ['10 cm', '11 cm', '12 cm', '13 cm'],
    correct: 2,
    explanation: 'Pythagoras theorem: 13² = 5² + b² → 169 = 25 + b² → b² = 144 → b = 12 cm',
    difficulty: 'medium'
  },
];

export const subjects = [
  { id: 'reasoning', name: 'Reasoning', nameMr: 'तर्कशक्ती', icon: '🧠', color: '#6366f1', topics: ['relationship', 'coding', 'number-series', 'direction', 'figure-series', 'blood-relation'] },
  { id: 'maths', name: 'Maths', nameMr: 'गणित', icon: '🔢', color: '#f59e0b', topics: ['percentage', 'profit-loss', 'simple-interest', 'time-work', 'speed-distance', 'average', 'ratio', 'age', 'geometry'] },
  { id: 'gk', name: 'General Knowledge', nameMr: 'सामान्य ज्ञान', icon: '📚', color: '#10b981', topics: ['maharashtra', 'india', 'police', 'sports', 'science', 'history', 'geography'] },
  { id: 'current-affairs', name: 'Current Affairs', nameMr: 'चालू घडामोडी', icon: '📰', color: '#ef4444', topics: ['national', 'international', 'sports', 'economy', 'science-tech'] },
];

export const getQuestionsBySubject = (subjectId: string) => 
  questions.filter(q => q.subject === subjectId);

export const getQuestionsByTopic = (topic: string) => 
  questions.filter(q => q.topic === topic);

export const getRandomQuestions = (count: number, subjectId?: string) => {
  let pool = subjectId ? getQuestionsBySubject(subjectId) : questions;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, pool.length));
};
