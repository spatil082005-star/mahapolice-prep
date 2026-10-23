import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { subjects, getQuestionsBySubject, getRandomQuestions, questions as builtInQuestions } from '../data/questions';
import { useApp } from '../context/AppContext';
import { ArrowLeft, BookOpen, Clock, Zap } from 'lucide-react';

export default function PracticePage() {
  const navigate = useNavigate();
  const { teacherQuestions } = useApp();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [questionCount, setQuestionCount] = useState(25);

  // Combine built-in questions with teacher questions
  const allQuestions = useMemo(() => {
    const teacherQs = teacherQuestions.map(tq => ({
      id: tq.id,
      subject: tq.subject,
      topic: tq.topic,
      question: tq.question,
      options: tq.options,
      correct: tq.correct,
      explanation: tq.explanation,
      difficulty: tq.difficulty,
    }));
    return [...builtInQuestions, ...teacherQs];
  }, [teacherQuestions]);

  const getQuestionsBySubjectLocal = (subjectId: string) => 
    allQuestions.filter(q => q.subject === subjectId);

  const getRandomQuestionsLocal = (count: number, subjectId?: string) => {
    let pool = subjectId ? getQuestionsBySubjectLocal(subjectId) : allQuestions;
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, pool.length));
  };

  const startQuiz = () => {
    const questions = selectedSubject 
      ? getRandomQuestionsLocal(questionCount, selectedSubject)
      : getRandomQuestionsLocal(questionCount);
    
    if (questions.length === 0) {
      alert('या विषयात पुरेसे प्रश्न उपलब्ध नाहीत!');
      return;
    }

    // Store quiz data in sessionStorage
    sessionStorage.setItem('quizData', JSON.stringify({
      questions,
      type: 'practice',
      subject: selectedSubject,
    }));
    navigate('/quiz');
  };

  if (selectedSubject) {
    const subject = subjects.find(s => s.id === selectedSubject);
    return (
      <div className="app-container">
        <header className="page-header">
          <button className="back-btn" onClick={() => setSelectedSubject(null)}>
            <ArrowLeft size={20} />
          </button>
          <h2>{subject?.name}</h2>
        </header>

        <div className="practice-config">
          <h3>प्रश्न संख्या निवडा</h3>
          <div className="count-options">
            {[10, 25, 50, 100].map(count => (
              <button
                key={count}
                className={`count-btn ${questionCount === count ? 'active' : ''}`}
                onClick={() => setQuestionCount(count)}
              >
                {count}
              </button>
            ))}
          </div>

          <div className="subject-info">
            <p>📚 विषय: <strong>{subject?.name}</strong></p>
            <p>📝 उपलब्ध प्रश्न: <strong>{getQuestionsBySubjectLocal(selectedSubject).length}</strong></p>
          </div>

          <button className="start-quiz-btn" onClick={startQuiz}>
            <Zap size={20} />
            सराव सुरू करा
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="page-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          <ArrowLeft size={20} />
        </button>
        <h2>दैनिक सराव</h2>
      </header>

      {/* Quick Start */}
      <div className="quick-start-section">
        <h3>⚡ त्वरित सराव</h3>
        <div className="count-options">
          {[10, 25, 50].map(count => (
            <button
              key={count}
              className={`count-btn ${questionCount === count ? 'active' : ''}`}
              onClick={() => setQuestionCount(count)}
            >
              {count} प्रश्न
            </button>
          ))}
        </div>
        <button 
          className="start-quiz-btn full-width" 
          onClick={() => {
            const questions = getRandomQuestionsLocal(questionCount);
            sessionStorage.setItem('quizData', JSON.stringify({
              questions,
              type: 'practice',
              subject: null,
            }));
            navigate('/quiz');
          }}
        >
          <Zap size={20} />
          सर्व विषयांचा सराव सुरू करा
        </button>
      </div>

      {/* Subject Selection */}
      <div className="section-title">
        <h3>📚 विषयनिहाय सराव</h3>
      </div>

      <div className="subject-grid">
        {subjects.map(subject => (
          <div
            key={subject.id}
            className="subject-card"
            onClick={() => setSelectedSubject(subject.id)}
            style={{ borderLeft: `4px solid ${subject.color}` }}
          >
            <div className="subject-icon">{subject.icon}</div>
            <div className="subject-info">
              <h4>{subject.name}</h4>
              <span className="question-count">
                {getQuestionsBySubjectLocal(subject.id).length} प्रश्न
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Timer Quiz Option */}
      <div className="timer-quiz-option" onClick={() => navigate('/timer-quiz')}>
        <Clock size={24} color="#ec4899" />
        <div>
          <h4>टाइमर चाचणी</h4>
          <p>वेळेच्या मर्यादेत सराव करा</p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <div className="nav-item" onClick={() => navigate('/')}>
          <BookOpen size={20} />
          <span>मुख्यपृष्ठ</span>
        </div>
        <div className="nav-item active" onClick={() => navigate('/practice')}>
          <BookOpen size={20} />
          <span>सराव</span>
        </div>
        <div className="nav-item" onClick={() => navigate('/progress')}>
          <BookOpen size={20} />
          <span>प्रगती</span>
        </div>
        <div className="nav-item" onClick={() => navigate('/attendance')}>
          <BookOpen size={20} />
          <span>उपस्थिती</span>
        </div>
      </nav>
    </div>
  );
}
