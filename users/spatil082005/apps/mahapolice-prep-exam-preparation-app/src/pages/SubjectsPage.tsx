import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { subjects, getQuestionsByTopic, questions as builtInQuestions } from '../data/questions';
import { useApp } from '../context/AppContext';
import { ArrowLeft, BookOpen } from 'lucide-react';

export default function SubjectsPage() {
  const navigate = useNavigate();
  const { teacherQuestions } = useApp();

  const allQuestions = useMemo(() => {
    const teacherQs = teacherQuestions.map(tq => ({
      id: tq.id, subject: tq.subject, topic: tq.topic, question: tq.question,
      options: tq.options, correct: tq.correct, explanation: tq.explanation, difficulty: tq.difficulty,
    }));
    return [...builtInQuestions, ...teacherQs];
  }, [teacherQuestions]);

  const getQuestionsBySubjectLocal = (subjectId: string) => allQuestions.filter(q => q.subject === subjectId);
  const getQuestionsByTopicLocal = (topic: string) => allQuestions.filter(q => q.topic === topic);

  const startTopicPractice = (subjectId: string, topic: string) => {
    const questions = getQuestionsByTopicLocal(topic);
    if (questions.length === 0) {
      alert('या टॉपिकवर पुरेसे प्रश्न उपलब्ध नाहीत!');
      return;
    }
    sessionStorage.setItem('quizData', JSON.stringify({
      questions,
      type: 'practice',
      subject: subjectId,
    }));
    navigate('/quiz');
  };

  return (
    <div className="app-container">
      <header className="page-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          <ArrowLeft size={20} />
        </button>
        <h2>विषयनिहाय सराव</h2>
      </header>

      <div className="subjects-list">
        {subjects.map(subject => (
          <div key={subject.id} className="subject-detail-card" style={{ borderLeft: `4px solid ${subject.color}` }}>
            <div className="subject-detail-header">
              <span className="subject-icon-large">{subject.icon}</span>
              <div>
                <h3>{subject.name}</h3>
                <p>{subject.name} • {getQuestionsBySubjectLocal(subject.id).length} प्रश्न</p>
              </div>
            </div>
            
            <div className="topics-grid">
              {subject.topics.map(topic => {
                const topicQuestions = getQuestionsByTopicLocal(topic);
                return (
                  <button
                    key={topic}
                    className="topic-btn"
                    onClick={() => startTopicPractice(subject.id, topic)}
                    disabled={topicQuestions.length === 0}
                  >
                    <span className="topic-name">{topic.replace('-', ' ')}</span>
                    <span className="topic-count">{topicQuestions.length} Q</span>
                  </button>
                );
              })}
            </div>

            <button
              className="subject-practice-btn"
              style={{ background: subject.color }}
              onClick={() => {
                const questions = getQuestionsBySubjectLocal(subject.id);
                if (questions.length === 0) {
                  alert('पुरेसे प्रश्न उपलब्ध नाहीत!');
                  return;
                }
                sessionStorage.setItem('quizData', JSON.stringify({
                  questions: questions.sort(() => Math.random() - 0.5).slice(0, 25),
                  type: 'practice',
                  subject: subject.id,
                }));
                navigate('/quiz');
              }}
            >
              {subject.name} सराव सुरू करा →
            </button>
          </div>
        ))}
      </div>

      <nav className="bottom-nav">
        <div className="nav-item" onClick={() => navigate('/')}>
          <BookOpen size={20} /><span>होम</span>
        </div>
        <div className="nav-item" onClick={() => navigate('/practice')}>
          <BookOpen size={20} /><span>सराव</span>
        </div>
        <div className="nav-item" onClick={() => navigate('/progress')}>
          <BookOpen size={20} /><span>प्रगती</span>
        </div>
        <div className="nav-item" onClick={() => navigate('/attendance')}>
          <BookOpen size={20} /><span>उपस्थिती</span>
        </div>
      </nav>
    </div>
  );
}
