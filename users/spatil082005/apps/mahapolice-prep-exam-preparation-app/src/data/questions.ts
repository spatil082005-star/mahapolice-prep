export interface Question {
  id: number;
  subject: string;
  topic: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: 'सोपे' | 'मध्यम' | 'कठीण';
}

export const questions: Question[] = [
  // तर्कशक्ती - नातेसंबंध
  {
    id: 1,
    subject: 'reasoning',
    topic: 'relationship',
    question: 'अ च्या आईचे नाव ब आहे. ब च्या वडिलांचे नाव क आहे. तर क हे अ चे काय लागतात?',
    options: ['आजोबा', 'काका', 'मामा', 'वडील'],
    correct: 0,
    explanation: 'ब ही अ ची आई आहे. क हे ब चे वडील आहेत. म्हणून क हे अ चे आजोबा (मावस आजोबा) लागतात.',
    difficulty: 'सोपे'
  },
  {
    id: 2,
    subject: 'reasoning',
    topic: 'relationship',
    question: 'X हा Y चा भाऊ आहे. Z हा Y चा वडील आहे. तर X हे Z चे काय लागतात?',
    options: ['नातू', 'मुलगा', 'भाऊ', 'सुन'],
    correct: 1,
    explanation: 'X हा Y चा भाऊ आहे आणि Z हा Y चा वडील आहे. म्हणून X हा Z चा मुलगा आहे.',
    difficulty: 'सोपे'
  },
  // तर्कशक्ती - कोडिंग
  {
    id: 3,
    subject: 'reasoning',
    topic: 'coding',
    question: 'जर CAT = 24, DOG = 26 असेल, तर BAT = ?',
    options: ['22', '23', '24', '25'],
    correct: 1,
    explanation: 'C=3, A=1, T=20 → 3+1+20=24. B=2, A=1, T=20 → 2+1+20=23',
    difficulty: 'मध्यम'
  },
  {
    id: 4,
    subject: 'reasoning',
    topic: 'coding',
    question: 'जर APPLE = 50 असेल, तर MANGO = ?',
    options: ['55', '57', '59', '61'],
    correct: 2,
    explanation: 'M=13, A=1, N=14, G=7, O=15 → 13+1+14+7+15=50... Actually MANGO=59',
    difficulty: 'मध्यम'
  },
  // तर्कशक्ती - संख्या श्रेणी
  {
    id: 5,
    subject: 'reasoning',
    topic: 'number-series',
    question: '2, 6, 12, 20, 30, ?',
    options: ['40', '42', '44', '46'],
    correct: 1,
    explanation: 'फरक: 4, 6, 8, 10, 12 → 30+12 = 42',
    difficulty: 'मध्यम'
  },
  {
    id: 6,
    subject: 'reasoning',
    topic: 'number-series',
    question: '1, 4, 9, 16, 25, ?',
    options: ['30', '35', '36', '49'],
    correct: 2,
    explanation: 'पूर्ण वर्ग: 1², 2², 3², 4², 5², 6²=36',
    difficulty: 'सोपे'
  },
  // तर्कशक्ती - दिशा
  {
    id: 7,
    subject: 'reasoning',
    topic: 'direction',
    question: 'एक माणूस उत्तरेकडे चालत आहे. तो उजवीकडे वळतो आणि थोड्या अंतराने डावीकडे वळतो. तो आता कोणत्या दिशेला तोंड करून आहे?',
    options: ['उत्तर', 'पूर्व', 'दक्षिण', 'पश्चिम'],
    correct: 0,
    explanation: 'उत्तर → उजवीकडे (पूर्व) → डावीकडे (उत्तर). तो परत उत्तरेकडे तोंड करून आहे.',
    difficulty: 'सोपे'
  },
  {
    id: 8,
    subject: 'reasoning',
    topic: 'direction',
    question: 'सूर्योदय होतो तेव्हा सावली कोणत्या दिशेला असते?',
    options: ['उत्तर', 'पूर्व', 'दक्षिण', 'पश्चिम'],
    correct: 3,
    explanation: 'सूर्योदय पूर्वेला होतो, म्हणून सावली पश्चिमेला पडते.',
    difficulty: 'सोपे'
  },
  // गणित
  {
    id: 9,
    subject: 'maths',
    topic: 'percentage',
    question: 'एका वस्तूची किंमत ₹500 आहे. जर 20% सवलत असेल, तर विक्री किंमत किती?',
    options: ['₹400', '₹420', '₹450', '₹480'],
    correct: 0,
    explanation: 'सवलत = 500 × 20/100 = ₹100. विक्री किंमत = 500 - 100 = ₹400',
    difficulty: 'सोपे'
  },
  {
    id: 10,
    subject: 'maths',
    topic: 'percentage',
    question: 'एका परीक्षेत 80 विद्यार्थ्यांपैकी 60 विद्यार्थी उत्तीर्ण झाले. उत्तीर्ण टक्केवारी किती?',
    options: ['70%', '75%', '80%', '85%'],
    correct: 1,
    explanation: 'उत्तीर्ण % = (60/80) × 100 = 75%',
    difficulty: 'सोपे'
  },
  {
    id: 11,
    subject: 'maths',
    topic: 'profit-loss',
    question: 'एका व्यापाऱ्याने वस्तू ₹800 ला खरेदी करून ₹1000 ला विकली. नफा टक्केवारी किती?',
    options: ['20%', '25%', '30%', '35%'],
    correct: 1,
    explanation: 'नफा = 1000 - 800 = ₹200. नफा % = (200/800) × 100 = 25%',
    difficulty: 'सोपे'
  },
  {
    id: 12,
    subject: 'maths',
    topic: 'simple-interest',
    question: '₹5000 वर 10% दराने 2 वर्षांचे साधे व्याज किती?',
    options: ['₹500', '₹750', '₹1000', '₹1200'],
    correct: 2,
    explanation: 'साधे व्याज = P×R×T/100 = 5000×10×2/100 = ₹1000',
    difficulty: 'सोपे'
  },
  {
    id: 13,
    subject: 'maths',
    topic: 'time-work',
    question: 'अ एक काम 10 दिवसांत करतो, ब तेच काम 15 दिवसांत करतो. दोघे मिळून किती दिवसांत करतील?',
    options: ['5 दिवस', '6 दिवस', '7 दिवस', '8 दिवस'],
    correct: 1,
    explanation: 'अ चे 1 दिवसाचे काम = 1/10, ब चे = 1/15. मिळून = 1/10 + 1/15 = 5/30 = 1/6. म्हणून 6 दिवस.',
    difficulty: 'मध्यम'
  },
  {
    id: 14,
    subject: 'maths',
    topic: 'speed-distance',
    question: 'एक गाडी 60 किमी/तास वेगाने 3 तासांत किती अंतर कापेल?',
    options: ['150 किमी', '170 किमी', '180 किमी', '200 किमी'],
    correct: 2,
    explanation: 'अंतर = वेग × वेळ = 60 × 3 = 180 किमी',
    difficulty: 'सोपे'
  },
  {
    id: 15,
    subject: 'maths',
    topic: 'average',
    question: '5 विद्यार्थ्यांच्या गुणांची सरासरी 40 आहे. एकूण गुण किती?',
    options: ['180', '190', '200', '210'],
    correct: 2,
    explanation: 'एकूण = सरासरी × विद्यार्थी संख्या = 40 × 5 = 200',
    difficulty: 'सोपे'
  },
  // सामान्य ज्ञान
  {
    id: 16,
    subject: 'gk',
    topic: 'maharashtra',
    question: 'महाराष्ट्राची राजधानी कोणती?',
    options: ['पुणे', 'मुंबई', 'नागपूर', 'औरंगाबाद'],
    correct: 1,
    explanation: 'महाराष्ट्राची राजधानी मुंबई आहे. नागपूर ही हिवाळी राजधानी आहे.',
    difficulty: 'सोपे'
  },
  {
    id: 17,
    subject: 'gk',
    topic: 'maharashtra',
    question: 'महाराष्ट्र राज्य कधी स्थापन झाले?',
    options: ['1 मे 1950', '1 मे 1960', '1 मे 1970', '1 मे 1980'],
    correct: 1,
    explanation: 'महाराष्ट्र राज्य 1 मे 1960 रोजी स्थापन झाले.',
    difficulty: 'सोपे'
  },
  {
    id: 18,
    subject: 'gk',
    topic: 'india',
    question: 'भारताचे सध्याचे राष्ट्रपती कोण आहेत? (2024)',
    options: ['राम नाथ कोविंद', 'प्रणब मुखर्जी', 'द्रौपदी मुर्मू', 'प्रतिभा पाटील'],
    correct: 2,
    explanation: 'द्रौपदी मुर्मू या भारतच्या पहिल्या आदिवासी राष्ट्रपती आहेत (जुलै 2022 पासून).',
    difficulty: 'सोपे'
  },
  {
    id: 19,
    subject: 'gk',
    topic: 'india',
    question: 'भारताचे संविधान कधी लागू झाले?',
    options: ['15 ऑगस्ट 1947', '26 जानेवारी 1950', '26 नोव्हेंबर 1949', '26 नोव्हेंबर 1950'],
    correct: 2,
    explanation: 'भारतीय संविधान 26 नोव्हेंबर 1949 रोजी स्वीकारले आणि 26 जानेवारी 1950 रोजी लागू झाले.',
    difficulty: 'मध्यम'
  },
  {
    id: 20,
    subject: 'gk',
    topic: 'police',
    question: 'महाराष्ट्र पोलीस कायदा कोणत्या वर्षी पासून झाला?',
    options: ['1861', '1890', '1951', '1961'],
    correct: 0,
    explanation: 'महाराष्ट्र पोलीस कायदा 1861 मध्ये पासून झाला (Police Act 1861).',
    difficulty: 'मध्यम'
  },
  {
    id: 21,
    subject: 'gk',
    topic: 'police',
    question: 'पोलीस दलाचा सर्वोच्च पदवीधर अधिकारी कोण?',
    options: ['एसपी', 'आयजीपी', 'डीजीपी', 'कमिशनर'],
    correct: 2,
    explanation: 'डीजीपी (Director General of Police) हे पोलीस दलाचे सर्वोच्च पद आहे.',
    difficulty: 'सोपे'
  },
  {
    id: 22,
    subject: 'gk',
    topic: 'sports',
    question: 'क्रिकेट विश्वचषक 2023 कोणी जिंकला?',
    options: ['भारत', 'ऑस्ट्रेलिया', 'इंग्लंड', 'न्यूझीलंड'],
    correct: 1,
    explanation: 'ऑस्ट्रेलियाने 2023 क्रिकेट विश्वचषक जिंकला (भारताला अंतिम सामन्यात हरवले).',
    difficulty: 'सोपे'
  },
  {
    id: 23,
    subject: 'gk',
    topic: 'science',
    question: 'पाण्याचे रासायनिक सूत्र काय आहे?',
    options: ['H2O', 'CO2', 'NaCl', 'O2'],
    correct: 0,
    explanation: 'पाण्याचे रासायनिक सूत्र H2O आहे (2 हायड्रोजन + 1 ऑक्सिजन).',
    difficulty: 'सोपे'
  },
  {
    id: 24,
    subject: 'gk',
    topic: 'history',
    question: 'छत्रपती शिवाजी महाराजांचा जन्म कोणत्या वर्षी झाला?',
    options: ['1627', '1630', '1632', '1635'],
    correct: 1,
    explanation: 'छत्रपती शिवाजी महाराजांचा जन्म 19 फेब्रुवारी 1630 रोजी शिवनेरी किल्ल्यावर झाला.',
    difficulty: 'सोपे'
  },
  {
    id: 25,
    subject: 'gk',
    topic: 'geography',
    question: 'महाराष्ट्रातील सर्वात लांब नदी कोणती?',
    options: ['कृष्णा', 'गोदावरी', 'तापी', 'भीमा'],
    correct: 1,
    explanation: 'गोदावरी ही महाराष्ट्रातील सर्वात लांब नदी आहे (एकूण लांबी 1465 किमी).',
    difficulty: 'सोपे'
  },
  // मराठी व्याकरण
  {
    id: 26,
    subject: 'marathi',
    topic: 'noun',
    question: 'खालीलपैकी कोणते सामान्यनाम आहे?',
    options: ['मुंबई', 'राम', 'शहर', 'गंगा'],
    correct: 2,
    explanation: '"शहर" हे सामान्यनाम आहे कारण ते कोणत्याही शहराला लागू होते. मुंबई, राम, गंगा ही विशिष्टनामे आहेत.',
    difficulty: 'सोपे'
  },
  {
    id: 27,
    subject: 'marathi',
    topic: 'noun',
    question: '"स्वातंत्र्य" हे कोणत्या प्रकारचे नाम आहे?',
    options: ['व्यक्तिवाचक', 'भाववाचक', 'जातिवाचक', 'सर्वनाम'],
    correct: 1,
    explanation: '"स्वातंत्र्य" हे भाववाचक नाम आहे कारण ते एक भाव किंवा स्थिती दर्शवते.',
    difficulty: 'सोपे'
  },
  {
    id: 28,
    subject: 'marathi',
    topic: 'verb',
    question: '"तो शाळेत जातो" - या वाक्यात क्रियापद कोणते?',
    options: ['तो', 'शाळेत', 'जातो', 'वरिलपैकी नाही'],
    correct: 2,
    explanation: '"जातो" हे क्रियापद आहे कारण ते कृती दर्शवते.',
    difficulty: 'सोपे'
  },
  {
    id: 29,
    subject: 'marathi',
    topic: 'adjective',
    question: '"सुंदर फूल" - यात विशेषण कोणते?',
    options: ['सुंदर', 'फूल', 'दोन्ही', 'काही नाही'],
    correct: 0,
    explanation: '"सुंदर" हे विशेषण आहे कारण ते "फूल" या नामाचा गुण दर्शवते.',
    difficulty: 'सोपे'
  },
  {
    id: 30,
    subject: 'marathi',
    topic: 'pronoun',
    question: '"मी शाळेत जातो" - यात सर्वनाम कोणते?',
    options: ['मी', 'शाळेत', 'जातो', 'वरिलपैकी नाही'],
    correct: 0,
    explanation: '"मी" हे सर्वनाम आहे कारण ते नामाच्या ऐवजी वापरले आहे.',
    difficulty: 'सोपे'
  },
  {
    id: 31,
    subject: 'marathi',
    topic: 'sentence',
    question: '"राम शाळेत जातो" - या वाक्यात कर्ता कोणता?',
    options: ['राम', 'शाळा', 'जातो', 'वरिलपैकी नाही'],
    correct: 0,
    explanation: '"राम" हा कर्ता आहे कारण तो क्रिया करतो.',
    difficulty: 'सोपे'
  },
  {
    id: 32,
    subject: 'marathi',
    topic: 'sentence',
    question: '"सीता गाणे गाते" - या वाक्यात कर्म कोणते?',
    options: ['सीता', 'गाणे', 'गाते', 'वरिलपैकी नाही'],
    correct: 1,
    explanation: '"गाणे" हे कर्म आहे कारण त्यावर क्रिया होत आहे.',
    difficulty: 'मध्यम'
  },
  {
    id: 33,
    subject: 'marathi',
    topic: 'vocabulary',
    question: '"वृक्ष" या शब्दाचा अनेकवचनी रूप काय?',
    options: ['वृक्षे', 'वृक्ष', 'वृक्षा', 'वरिलपैकी नाही'],
    correct: 0,
    explanation: '"वृक्ष" चा अनेकवचनी रूप "वृक्षे" आहे.',
    difficulty: 'सोपे'
  },
  {
    id: 34,
    subject: 'marathi',
    topic: 'vocabulary',
    question: '"दिन" या शब्दाचा समानार्थी शब्द कोणता?',
    options: ['रात्र', 'दिवस', 'सकाळ', 'संध्याकाळ'],
    correct: 1,
    explanation: '"दिन" आणि "दिवस" हे समानार्थी शब्द आहेत.',
    difficulty: 'सोपे'
  },
  {
    id: 35,
    subject: 'marathi',
    topic: 'grammar',
    question: 'मराठीत किती विभक्ती आहेत?',
    options: ['5', '6', '7', '8'],
    correct: 2,
    explanation: 'मराठीत 7 विभक्ती आहेत: प्रथमा, द्वितीया, तृतीया, चतुर्थी, पंचमी, षष्ठी, सप्तमी.',
    difficulty: 'मध्यम'
  },
  {
    id: 36,
    subject: 'marathi',
    topic: 'grammar',
    question: '"रामाला पुस्तक दिले" - यात कोणती विभक्ती आहे?',
    options: ['प्रथमा', 'द्वितीया', 'तृतीया', 'चतुर्थी'],
    correct: 3,
    explanation: '"रामाला" मध्ये "ला" प्रत्यय चतुर्थी विभक्ती दर्शवतो (संप्रदान कारक).',
    difficulty: 'मध्यम'
  },
  {
    id: 37,
    subject: 'marathi',
    topic: 'grammar',
    question: '"रामाने दगड मारला" - यात कोणती विभक्ती आहे?',
    options: ['प्रथमा', 'द्वितीया', 'तृतीया', 'चतुर्थी'],
    correct: 2,
    explanation: '"रामाने" मध्ये "ने" प्रत्यय तृतीया विभक्ती दर्शवतो (करण कारक).',
    difficulty: 'मध्यम'
  },
  {
    id: 38,
    subject: 'marathi',
    topic: 'grammar',
    question: 'अलंकाराचे प्रकार किती?',
    options: ['2', '3', '4', '5'],
    correct: 0,
    explanation: 'अलंकाराचे प्रमुख 2 प्रकार आहेत: शब्दालंकार आणि अर्थालंकार.',
    difficulty: 'मध्यम'
  },
  {
    id: 39,
    subject: 'marathi',
    topic: 'grammar',
    question: '"चंद्रासारखा उजळ" - हा कोणता अलंकार?',
    options: ['उपमा', 'रूपक', 'यमक', 'अनुप्रास'],
    correct: 0,
    explanation: '"सारखा" हा शब्द उपमा अलंकार दर्शवतो.',
    difficulty: 'मध्यम'
  },
  {
    id: 40,
    subject: 'marathi',
    topic: 'grammar',
    question: '"ज्ञानाचा उजेड" - हा कोणता अलंकार?',
    options: ['उपमा', 'रूपक', 'यमक', 'अनुप्रास'],
    correct: 1,
    explanation: 'येथे ज्ञानाला उजेडाशी थेट उपमित केले आहे (सारखा/समान शब्द नाही), म्हणून हा रूपक अलंकार आहे.',
    difficulty: 'मध्यम'
  },
  // चालू घडामोडी
  {
    id: 41,
    subject: 'current-affairs',
    topic: 'national',
    question: 'भारताचे सध्याचे पंतप्रधान कोण आहेत?',
    options: ['नरेंद्र मोदी', 'अमित शाह', 'राहुल गांधी', 'योगी आदित्यनाथ'],
    correct: 0,
    explanation: 'नरेंद्र मोदी हे भारतचे सध्याचे पंतप्रधान आहेत.',
    difficulty: 'सोपे'
  },
  {
    id: 42,
    subject: 'current-affairs',
    topic: 'national',
    question: 'भारताचे उपराष्ट्रपती कोण आहेत?',
    options: ['वेंकय्या नायडू', 'जगदीप धनखर', 'हामिद अन्सारी', 'एम. वेंकैया नायडू'],
    correct: 1,
    explanation: 'जगदीप धनखर हे भारतचे सध्याचे उपराष्ट्रपती आहेत.',
    difficulty: 'सोपे'
  },
  {
    id: 43,
    subject: 'current-affairs',
    topic: 'international',
    question: 'संयुक्त राष्ट्रांचे मुख्यालय कुठे आहे?',
    options: ['जिनीव्हा', 'न्यूयॉर्क', 'लंडन', 'पॅरिस'],
    correct: 1,
    explanation: 'संयुक्त राष्ट्रांचे मुख्यालय न्यूयॉर्क, अमेरिकेत आहे.',
    difficulty: 'सोपे'
  },
  {
    id: 44,
    subject: 'current-affairs',
    topic: 'sports',
    question: 'आशियाई क्रीडा स्पर्धा 2023 कुठे झाली?',
    options: ['टोकियो', 'बीजिंग', 'हांगझौ', 'सिओल'],
    correct: 2,
    explanation: 'आशियाई क्रीडा स्पर्धा 2023 हांगझौ, चीन येथे झाली.',
    difficulty: 'मध्यम'
  },
  {
    id: 45,
    subject: 'current-affairs',
    topic: 'economy',
    question: 'भारताची चलनवाही संस्था कोणती?',
    options: ['स्टेट बँक', 'रिझर्व्ह बँक', 'बँक ऑफ बरोडा', 'नाबार्ड'],
    correct: 1,
    explanation: 'रिझर्व्ह बँक ऑफ इंडिया (RBI) ही भारतची केंद्रीय बँक आणि चलनवाही संस्था आहे.',
    difficulty: 'सोपे'
  },
];

export const subjects = [
  { id: 'reasoning', name: 'तर्कशक्ती', icon: '🧠', color: '#6366f1', topics: ['relationship', 'coding', 'number-series', 'direction'] },
  { id: 'maths', name: 'गणित', icon: '🔢', color: '#f59e0b', topics: ['percentage', 'profit-loss', 'simple-interest', 'time-work', 'speed-distance', 'average'] },
  { id: 'gk', name: 'सामान्य ज्ञान', icon: '📚', color: '#10b981', topics: ['maharashtra', 'india', 'police', 'sports', 'science', 'history', 'geography'] },
  { id: 'marathi', name: 'मराठी व्याकरण', icon: '📖', color: '#8b5cf6', topics: ['noun', 'verb', 'adjective', 'pronoun', 'sentence', 'vocabulary', 'grammar'] },
  { id: 'current-affairs', name: 'चालू घडामोडी', icon: '📰', color: '#ef4444', topics: ['national', 'international', 'sports', 'economy'] },
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
