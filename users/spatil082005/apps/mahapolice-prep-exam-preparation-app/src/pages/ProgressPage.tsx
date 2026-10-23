import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { subjects } from '../data/questions';
import { ArrowLeft, TrendingUp, Target, Award, BookOpen } from 'lucide-react';

export default function ProgressPage() {
  const navigate = useNavigate();
  const { totalQuestionsAttempted, totalCorrect, quizHistory, streak, getSubjectAccuracy } = useApp();
  
  const overallAccuracy = totalQuestionsAttempted > 0 
    ? Math.round((totalCorrect / totalQuestionsAttempted) * 100) 
    : 0;

  const recentQuizzes = quizHistory.slice(0, 10);

  return (
    <div className="app-container">
      <header className="page-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          <ArrowLeft size={20} />
        </button>
        <h2>प्रगती पत्रक</h2>
      </header>

      {/* Overall Stats */}
      <div className="progress-overview">
        <div className="progress-stat-card">
          <Target size={24} color="#3b82f6" />
          <div>
            <span className="progress-value">{totalQuestionsAttempted}</span>
            <span className="progress-label">एकूण प्रश्न</span>
          </div>
        </div>
        <div className="progress-stat-card">
          <TrendingUp size={24} color="#22c55e" />
          <div>
            <span className="progress-value">{overallAccuracy}%</span>
            <span className="progress-label">अचूकता</span>
          </div>
        </div>
        <div className="progress-stat-card">
          <Award size={24} color="#f59e0b" />
          <div>
            <span className="progress-value">{streak}</span>
            <span className="progress-label">दिवस स्ट्रीक</span>
          </div>
        </div>
        <div className="progress-stat-card">
          <BookOpen size={24} color="#8b5cf6" />
          <div>
            <span className="progress-value">{quizHistory.length}</span>
            <span className="progress-label">क्विझ दिले</span>
          </div>
        </div>
      </div>

      {/* Subject-wise Accuracy */}
      <div className="section-title">
        <h3>📊 विषयनिहाय अचूकता</h3>
      </div>

      <div className="subject-accuracy-list">
        {subjects.map(subject => {
          const accuracy = getSubjectAccuracy(subject.id);
          return (
            <div key={subject.id} className="subject-accuracy-item">
              <div className="subject-accuracy-header">
                <span>{subject.icon} {subject.name}</span>
                <span>{accuracy}%</span>
              </div>
              <div className="subject-accuracy-bar">
                <div 
                  className="subject-accuracy-fill" 
                  style={{ width: `${accuracy}%`, background: subject.color }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Quizzes */}
      <div className="section-title">
        <h3>📝 अलीकडील क्विझ</h3>
      </div>

      {recentQuizzes.length === 0 ? (
        <div className="empty-state">
          <p>अजून कोणताही क्विझ दिलेला नाही.</p>
          <button className="start-btn" onClick={() => navigate('/practice')}>
            सराव सुरू करा
          </button>
        </div>
      ) : (
        <div className="recent-quizzes">
          {recentQuizzes.map((quiz, idx) => (
            <div key={quiz.id || idx} className="recent-quiz-item">
              <div className="recent-quiz-header">
                <span className={`quiz-type-badge ${quiz.type}`}>
                  {quiz.type === 'practice' ? 'सराव' : quiz.type === 'mock' ? 'मॉक' : quiz.type === 'timer' ? 'टायमर' : 'दैनिक'}
                </span>
                <span className="quiz-date">{new Date(quiz.date).toLocaleDateString('mr-IN')}</span>
              </div>
              <div className="recent-quiz-stats">
                <span>{quiz.correctAnswers}/{quiz.totalQuestions} बरोबर</span>
                <span className={`quiz-score ${quiz.score >= 60 ? 'good' : 'needs-work'}`}>
                  {Math.round(quiz.score)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <nav className="bottom-nav">
        <div className="nav-item" onClick={() => navigate('/')}>
          <BookOpen size={20} /><span>होम</span>
        </div>
        <div className="nav-item" onClick={() => navigate('/practice')}>
          <BookOpen size={20} /><span>सराव</span>
        </div>
        <div className="nav-item active" onClick={() => navigate('/progress')}>
          <BookOpen size={20} /><span>प्रगती</span>
        </div>
        <div className="nav-item" onClick={() => navigate('/attendance')}>
          <BookOpen size={20} /><span>उपस्थिती</span>
        </div>
      </nav>
    </div>
  );
}
