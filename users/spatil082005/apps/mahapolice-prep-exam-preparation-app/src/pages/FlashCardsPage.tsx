import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions, subjects } from '../data/questions';
import { ArrowLeft, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

export default function FlashCardsPage() {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const filteredQuestions = selectedSubject 
    ? questions.filter(q => q.subject === selectedSubject)
    : questions;

  const currentQuestion = filteredQuestions[currentCard];

  const nextCard = () => {
    setIsFlipped(false);
    setCurrentCard(prev => (prev + 1) % filteredQuestions.length);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setCurrentCard(prev => (prev - 1 + filteredQuestions.length) % filteredQuestions.length);
  };

  const shuffle = () => {
    setIsFlipped(false);
    setCurrentCard(Math.floor(Math.random() * filteredQuestions.length));
  };

  if (!selectedSubject) {
    return (
      <div className="app-container">
        <header className="page-header">
          <button className="back-btn" onClick={() => navigate('/')}>
            <ArrowLeft size={20} />
          </button>
          <h2>फ्लॅश कार्ड्स</h2>
        </header>

        <div className="flash-intro">
          <p>⚡ विषय निवडा आणि जलद पुनरावलोकन करा!</p>
        </div>

        <div className="flash-subject-grid">
          {subjects.map(subject => (
            <button
              key={subject.id}
              className="flash-subject-card"
              onClick={() => setSelectedSubject(subject.id)}
              style={{ borderColor: subject.color }}
            >
              <span className="flash-subject-icon">{subject.icon}</span>
              <span className="flash-subject-name">{subject.name}</span>
              <span className="flash-subject-count">
                {questions.filter(q => q.subject === subject.id).length} कार्ड्स
              </span>
            </button>
          ))}
          <button
            className="flash-subject-card all"
            onClick={() => setSelectedSubject('all')}
          >
            <span className="flash-subject-icon">📚</span>
            <span className="flash-subject-name">सर्व विषय</span>
            <span className="flash-subject-count">{questions.length} कार्ड्स</span>
          </button>
        </div>
      </div>
    );
  }

  if (selectedSubject === 'all' || selectedSubject) {
    const actualSubject = selectedSubject === 'all' ? null : selectedSubject;
    const allCards = actualSubject 
      ? questions.filter(q => q.subject === actualSubject)
      : questions;

    return (
      <div className="app-container">
        <header className="page-header">
          <button className="back-btn" onClick={() => { setSelectedSubject(null); setCurrentCard(0); }}>
            <ArrowLeft size={20} />
          </button>
          <h2>फ्लॅश कार्ड्स</h2>
        </header>

        <div className="flash-card-container">
          <div className="flash-card-counter">
            {currentCard + 1} / {allCards.length}
          </div>

          <div 
            className={`flash-card ${isFlipped ? 'flipped' : ''}`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div className="flash-card-inner">
              <div className="flash-card-front">
                <span className="flash-card-label">प्रश्न</span>
                <p className="flash-card-question">{allCards[currentCard]?.question}</p>
                <span className="flash-card-hint">उत्तर बघण्यासाठी टॅप करा</span>
              </div>
              <div className="flash-card-back">
                <span className="flash-card-label">उत्तर</span>
                <p className="flash-card-answer">
                  {allCards[currentCard]?.options[allCards[currentCard]?.correct]}
                </p>
                <p className="flash-card-explanation">{allCards[currentCard]?.explanation}</p>
              </div>
            </div>
          </div>

          <div className="flash-card-controls">
            <button className="flash-nav-btn" onClick={prevCard}>
              <ChevronLeft size={20} />
            </button>
            <button className="flash-shuffle-btn" onClick={shuffle}>
              <RotateCcw size={18} />
              Shuffle
            </button>
            <button className="flash-nav-btn" onClick={nextCard}>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
