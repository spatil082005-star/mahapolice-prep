import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, X, Send, MessageCircle, Volume2, VolumeX, Bot, User, ChevronDown } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { processVoiceCommand, detectLanguage } from '../utils/voiceCommands';
import { useApp } from '../context/AppContext';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

export default function VoiceAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [textInput, setTextInput] = useState('');
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [lang, setLang] = useState<'mr' | 'hi' | 'en'>('mr');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { currentUser } = useApp();

  const langCode = lang === 'mr' ? 'mr-IN' : lang === 'hi' ? 'hi-IN' : 'en-US';
  
  const {
    transcript,
    isListening,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
    interimTranscript,
  } = useSpeechRecognition(langCode);

  const { speak, stop: stopSpeaking, isSpeaking } = useSpeechSynthesis();

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Process transcript when recognition completes
  useEffect(() => {
    if (transcript && !isListening) {
      handleUserInput(transcript);
      resetTranscript();
    }
  }, [transcript, isListening]);

  // Welcome message on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const name = currentUser?.name?.split(' ')[0] || 'मित्रा';
      const welcomeMsg: ChatMessage = {
        id: 'welcome',
        role: 'assistant',
        text: `नमस्कार ${name}! 🙏 मी तुमचा वैयक्तिक सहाय्यक. मला काहीही विचारा — सराव, मॉक टेस्ट, प्रगती, किंवा मदत. माइक दाबून बोला किंवा टाइप करा!`,
        timestamp: new Date(),
      };
      setMessages([welcomeMsg]);
      if (voiceEnabled) {
        speak(welcomeMsg.text, langCode);
      }
    }
  }, [isOpen]);

  const handleUserInput = (text: string) => {
    if (!text.trim()) return;

    const detectedLang = detectLanguage(text);
    const currentLang = detectedLang || lang;

    // Add user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: text.trim(),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);

    // Process command
    const result = processVoiceCommand(text, currentLang);

    // Navigate if needed
    if (result.action === 'navigate' && result.route) {
      setTimeout(() => navigate(result.route!), 500);
    }

    // Add assistant response
    const assistantMsg: ChatMessage = {
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      text: result.response,
      timestamp: new Date(),
    };

    setTimeout(() => {
      setMessages(prev => [...prev, assistantMsg]);
      if (voiceEnabled) {
        speak(result.response, langCode);
      }
    }, 300);
  };

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      stopSpeaking();
      startListening();
    }
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textInput.trim()) {
      handleUserInput(textInput);
      setTextInput('');
    }
  };

  const toggleVoice = () => {
    if (voiceEnabled) {
      stopSpeaking();
    }
    setVoiceEnabled(!voiceEnabled);
  };

  const changeLang = (newLang: 'mr' | 'hi' | 'en') => {
    setLang(newLang);
    setShowLangMenu(false);
  };

  if (!isSupported) return null;

  return (
    <>
      {/* Floating Mic Button */}
      {!isOpen && (
        <div className="voice-fab" onClick={() => setIsOpen(true)}>
          <div className={`voice-fab-pulse ${isListening ? 'listening' : ''}`}>
            <MessageCircle size={28} color="white" />
          </div>
          {isListening && <div className="voice-fab-wave" />}
        </div>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div className="voice-chat-panel">
          {/* Header */}
          <div className="voice-chat-header">
            <div className="voice-chat-header-left">
              <div className="voice-chat-avatar">
                <Bot size={20} color="white" />
              </div>
              <div>
                <h3>सहाय्यक</h3>
                <span className={`voice-chat-status ${isListening ? 'listening' : ''} ${isSpeaking ? 'speaking' : ''}`}>
                  {isListening ? '🎤 ऐकत आहे...' : isSpeaking ? '🔊 बोलत आहे...' : '● तयार'}
                </span>
              </div>
            </div>
            <div className="voice-chat-header-actions">
              <button 
                className={`voice-lang-btn ${showLangMenu ? 'active' : ''}`}
                onClick={() => setShowLangMenu(!showLangMenu)}
              >
                {lang === 'mr' ? 'मराठी' : lang === 'hi' ? 'हिंदी' : 'English'}
              </button>
              {showLangMenu && (
                <div className="voice-lang-dropdown">
                  <button onClick={() => changeLang('mr')} className={lang === 'mr' ? 'active' : ''}>मराठी</button>
                  <button onClick={() => changeLang('hi')} className={lang === 'hi' ? 'active' : ''}>हिंदी</button>
                  <button onClick={() => changeLang('en')} className={lang === 'en' ? 'active' : ''}>English</button>
                </div>
              )}
              <button className="voice-toggle-sound" onClick={toggleVoice}>
                {voiceEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
              </button>
              <button className="voice-close-btn" onClick={() => { setIsOpen(false); stopSpeaking(); stopListening(); }}>
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="voice-chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`voice-chat-msg ${msg.role}`}>
                <div className="voice-msg-icon">
                  {msg.role === 'assistant' ? <Bot size={16} /> : <User size={16} />}
                </div>
                <div className="voice-msg-bubble">
                  <p>{msg.text}</p>
                  <span className="voice-msg-time">
                    {msg.timestamp.toLocaleTimeString('mr-IN', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {/* Interim transcript */}
            {interimTranscript && (
              <div className="voice-chat-msg user interim">
                <div className="voice-msg-icon"><User size={16} /></div>
                <div className="voice-msg-bubble">
                  <p className="interim-text">{interimTranscript}</p>
                </div>
              </div>
            )}

            {/* Listening indicator */}
            {isListening && !interimTranscript && (
              <div className="voice-listening-indicator">
                <div className="voice-wave-bars">
                  <span /><span /><span /><span /><span />
                </div>
                <span>ऐकत आहे...</span>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="voice-quick-actions">
            <button onClick={() => handleUserInput('सराव उघड')}>📝 सराव</button>
            <button onClick={() => handleUserInput('मॉक टेस्ट')}>📋 मॉक टेस्ट</button>
            <button onClick={() => handleUserInput('प्रगती बघा')}>📊 प्रगती</button>
            <button onClick={() => handleUserInput('मदत')}>❓ मदत</button>
          </div>

          {/* Input Area */}
          <div className="voice-chat-input">
            <form onSubmit={handleTextSubmit}>
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="टाइप करा किंवा माइक दाबा..."
                disabled={isListening}
              />
              <button 
                type="button"
                className={`voice-mic-btn ${isListening ? 'listening' : ''}`}
                onClick={handleMicClick}
              >
                {isListening ? <MicOff size={20} /> : <Mic size={20} />}
              </button>
              {textInput.trim() && (
                <button type="submit" className="voice-send-btn">
                  <Send size={18} />
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
