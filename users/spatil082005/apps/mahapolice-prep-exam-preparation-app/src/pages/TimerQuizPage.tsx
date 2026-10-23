import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRandomQuestions, subjects } from '../data/questions';
import { ArrowLeft, Clock, Zap } from 'lucide-react';

export default function TimerQuizPage() {
  const navigate = useNavigate();
  const [selectedTime, setSelectedTime] = useState(10);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const startTimerQuiz = () => {
    const questions = selectedSubject 
      ? getRandomQuestions(50, selectedSubject)
      : getRandomQuestions(50);
    
    if (questions.length === 0) {
      alert('पुरेसे प्रश्न उपलब्ध नाहीत!');
      return;
    }

    sessionStorage.setItem('quizData', JSON.stringify({
      questions: questions.slice(0, Math.min(20, questions.length)),
      type: 'timer',
      subject: selectedSubject,
      timeLimit: selectedTime * 60,
    }));
    navigate('/quiz');
  };

  return (
    <div className="app-container">
      <header className="page-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          <ArrowLeft size={20} />
        </button>
        <h2>टायमर क्विझ</h2>
      </header>

      <div className="timer-intro">
        <Clock size={32} color="#ec4899" />
        <p>वेळेच्या मर्यादेत सराव करा — परीक्षेच्या वेळेचे व्यवस्थापन शिका!</p>
      </div>

      {/* Time Selection */}
      <div className="config-section">
        <h3>⏱️ वेळ निवडा</h3>
        <div className="time-options">
          {[5, 10, 15, 20, 30].map(time => (
            <button
              key={time}
              className={`time-btn ${selectedTime === time ? 'active' : ''}`}
              onClick={() => setSelectedTime(time)}
            >
              {time} मिनिटे
            </button>
          ))}
        </div>
      </div>

      {/* Subject Selection */}
      <div className="config-section">
        <h3>📚 विषय निवडा (ऐच्छिक)</h3>
        <div className="subject-options">
          <button
            className={`subject-btn ${selectedSubject === null ? 'active' : ''}`}
            onClick={() => setSelectedSubject(null)}
          >
            सर्व विषय
          </button>
          {subjects.map(subject => (
            <button
              key={subject.id}
              className={`subject-btn ${selectedSubject === subject.id ? 'active' : ''}`}
              onClick={() => setSelectedSubject(subject.id)}
              style={selectedSubject === subject.id ? { borderColor: subject.color } : {}}
            >
              {subject.icon} {subject.nameMr}
            </button>
          ))}
        </div>
      </div>

      <button className="start-timer-btn" onClick={startTimerQuiz}>
        <Zap size={20} />
        टायमर क्विझ सुरू करा
      </button>
    </div>
  );
}
