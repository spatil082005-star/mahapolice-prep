export interface VoiceCommandResult {
  action: string;
  route?: string;
  response: string;
  responseHi?: string;
  responseEn?: string;
}

interface CommandPattern {
  patterns: RegExp[];
  action: string;
  route?: string;
  response: string;
  responseHi?: string;
  responseEn?: string;
}

const commandPatterns: CommandPattern[] = [
  // Navigation commands
  {
    patterns: [/मुख्यपृष्ठ/, /होम/, /home/, /main.*page/, /डॅशबोर्ड/],
    action: 'navigate',
    route: '/',
    response: 'हो, मुख्यपृष्ठावर जातो!',
    responseHi: 'हो, होम पेज पर जा रहा हूँ!',
    responseEn: 'Sure, going to the home page!',
  },
  {
    patterns: [/सराव/, /प्रॅक्टिस/, /practice/, /question.*solve/, /प्रश्न/],
    action: 'navigate',
    route: '/practice',
    response: 'चला, सराव सुरू करूया!',
    responseHi: 'चलो, अभ्यास शुरू करते हैं!',
    responseEn: 'Let\'s start practicing!',
  },
  {
    patterns: [/मॉक/, /mock/, /चाचणी/, /test/],
    action: 'navigate',
    route: '/mock-tests',
    response: 'मॉक चाचण्या उघडतो. परीक्षेसारखं सराव करा!',
    responseHi: 'मॉक टेस्ट खोल रहा हूँ। परीक्षा जैसा अभ्यास करो!',
    responseEn: 'Opening mock tests. Practice like the real exam!',
  },
  {
    patterns: [/टाइमर/, /timer/, /वेळ/, /time.*quiz/],
    action: 'navigate',
    route: '/timer-quiz',
    response: 'टाइमर चाचणी सुरू करूया. वेळेचा सराव महत्त्वाचा!',
    responseHi: 'टाइमर क्विज़ शुरू करते हैं। समय का अभ्यास ज़रूरी है!',
    responseEn: 'Starting timer quiz. Time practice is important!',
  },
  {
    patterns: [/विषय/, /subject/, /topic/],
    action: 'navigate',
    route: '/subjects',
    response: 'विषयनिहाय तयारी उघडतो!',
    responseHi: 'विषयवार तैयारी खोल रहा हूँ!',
    responseEn: 'Opening subject-wise preparation!',
  },
  {
    patterns: [/फ्लॅश/, /flash/, /card/],
    action: 'navigate',
    route: '/flash-cards',
    response: 'फ्लॅश कार्ड्स उघडतो. लवकर आठवण होईल!',
    responseHi: 'फ्लैश कार्ड्स खोल रहा हूँ!',
    responseEn: 'Opening flash cards for quick revision!',
  },
  {
    patterns: [/प्रगती/, /progress/, /रिपोर्ट/, /report/],
    action: 'navigate',
    route: '/progress',
    response: 'तुमची प्रगती बघूया!',
    responseHi: 'तुम्हारी प्रगति देखते हैं!',
    responseEn: 'Let\'s check your progress!',
  },
  {
    patterns: [/उपस्थिती/, /attendance/, /हजेरी/],
    action: 'navigate',
    route: '/attendance',
    response: 'उपस्थिती पत्रक उघडतो!',
    responseHi: 'उपस्थिति पत्रक खोल रहा हूँ!',
    responseEn: 'Opening attendance sheet!',
  },
  {
    patterns: [/प्रोफाइल/, /profile/, /माहिती/],
    action: 'navigate',
    route: '/profile',
    response: 'तुमचं प्रोफाइल उघडतो!',
    responseHi: 'तुम्हारी प्रोफ़ाइल खोल रहा हूँ!',
    responseEn: 'Opening your profile!',
  },
  // Greeting
  {
    patterns: [/नमस्कार/, /hello/, /hi/, /hey/, /हॅलो/, /शुभ/],
    action: 'greet',
    response: 'नमस्कार! 🙏 मी तुमचा सहाय्यक आहे. सराव करायचा आहे की मॉक टेस्ट द्यायची आहे?',
    responseHi: 'नमस्ते! 🙏 मैं तुम्हारा सहायक हूँ। अभ्यास करना है या मॉक टेस्ट देना है?',
    responseEn: 'Hello! 🙏 I\'m your assistant. Want to practice or take a mock test?',
  },
  // Score/stats
  {
    patterns: [/स्कोअर/, /score/, /गुण/, /marks/, /किती/, /कसा/],
    action: 'stats',
    response: 'प्रगती पृष्ठावर तुमचे गुण आणि अचूकता बघा. तिथे सगळी माहिती आहे!',
    responseHi: 'प्रगति पेज पर अपने अंक और सटीकता देखो!',
    responseEn: 'Check your scores and accuracy on the progress page!',
  },
  // Help
  {
    patterns: [/मदत/, /help/, /काय करू/, /how/, /कसं/],
    action: 'help',
    response: 'मी तुम्हाला मदत करू शकतो! तुम्ही असे म्हणू शकता: "सराव उघड", "मॉक टेस्ट", "टाइमर चाचणी", "प्रगती बघा", किंवा "विषय दाखवा".',
    responseHi: 'मैं तुम्हारी मदद कर सकता हूँ! कहो: "अभ्यास खोलो", "मॉक टेस्ट", "टाइमर क्विज़", "प्रगति देखो"।',
    responseEn: 'I can help you! Say: "open practice", "mock test", "timer quiz", "check progress", or "show subjects".',
  },
  // Motivation
  {
    patterns: [/motivat/, /प्रेरणा/, /encourage/, /स्फूर्ती/, /thaklo/, /थकलो/],
    action: 'motivate',
    response: 'तुम्ही छान करत आहात! 🌟 रोज थोडं थोडं सराव केल्यास यश नक्की मिळेल. सुरू ठेवा!',
    responseHi: 'बहुत अच्छा कर रहे हो! 🌟 रोज़ थोड़ा अभ्यास करो, सफलता ज़रूर मिलेगी!',
    responseEn: 'You\'re doing great! 🌟 Consistent daily practice leads to success. Keep going!',
  },
  // Thank you
  {
    patterns: [/धन्यवाद/, /thank/, /thanks/, /शुक्रिया/],
    action: 'thanks',
    response: 'तुमचं स्वागत आहे! 😊 आणखी काही मदत हवी का?',
    responseHi: 'आपका स्वागत है! 😊 और कोई मदद चाहिए?',
    responseEn: 'You\'re welcome! 😊 Need anything else?',
  },
];

export function processVoiceCommand(text: string, lang: 'mr' | 'hi' | 'en' = 'mr'): VoiceCommandResult {
  const lowerText = text.toLowerCase().trim();

  for (const cmd of commandPatterns) {
    for (const pattern of cmd.patterns) {
      if (pattern.test(lowerText)) {
        let response = cmd.response;
        if (lang === 'hi' && cmd.responseHi) response = cmd.responseHi;
        if (lang === 'en' && cmd.responseEn) response = cmd.responseEn;

        return {
          action: cmd.action,
          route: cmd.route,
          response,
        };
      }
    }
  }

  // Default response for unrecognized commands
  const defaultResponses = {
    mr: `मला समजलं नाही. "सराव", "मॉक टेस्ट", "टाइमर", "प्रगती", "मदत" असे म्हणा.`,
    hi: `मुझे समझ नहीं आया। "अभ्यास", "मॉक टेस्ट", "टाइमर", "प्रगति", "मदद" कहो।`,
    en: `I didn't understand. Try saying "practice", "mock test", "timer", "progress", or "help".`,
  };

  return {
    action: 'unknown',
    response: defaultResponses[lang],
  };
}

export function detectLanguage(text: string): 'mr' | 'hi' | 'en' {
  const devanagari = /[\u0900-\u097F]/;
  if (devanagari.test(text)) {
    // Simple heuristic: Marathi and Hindi share Devanagari
    // Check for Marathi-specific characters
    if (/[ळ]/.test(text) || /नमस्कार/.test(text) || /आहे/.test(text) || /करू/.test(text)) {
      return 'mr';
    }
    return 'hi';
  }
  return 'en';
}
