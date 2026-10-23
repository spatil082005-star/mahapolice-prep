import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Target, Flame, BookOpen, Clock, Brain, 
  TrendingUp, Calendar, ChevronRight, Award,
  FileText, Zap, GraduationCap, ClipboardList
} from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  const { currentUser, getTodayTarget, quizHistory, logout } = useApp();
  const todayTarget = getTodayTarget();
  const targetProgress = Math.min((todayTarget.completed / todayTarget.target) * 100, 100);

  const userQuizzes = quizHistory.filter(q => q.userId === currentUser?.id);
  const totalQuestionsAttempted = userQuizzes.reduce((sum, q) => sum + q.totalQuestions, 0);
  const totalCorrect = userQuizzes.reduce((sum, q) => sum + q.correctAnswers, 0);
  const overallAccuracy = totalQuestionsAttempted > 0 
    ? Math.round((totalCorrect / totalQuestionsAttempted) * 100) 
    : 0;

  // Calculate streak
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  const todayDone = todayTarget.completed >= todayTarget.target;
  const yesterdayTarget = { completed: 0, target: 25 }; // simplified
  const streak = todayDone ? 1 : 0;

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-left">
          <h1 className="header-title">नमस्कार, {currentUser?.name?.split(' ')[0] || 'विद्यार्थी'} 🙏</h1>
          <p className="header-subtitle">आजची तयारी सुरू करूया!</p>
        </div>
        <button className="logout-btn" onClick={logout} title="बाहेर पडा">
          🚪
        </button>
      </header>

      {/* Daily Target Card */}
      <div className="daily-target-card">
        <div className="target-header">
          <Target size={24} className="target-icon" />
          <div>
            <h3>आजचे लक्ष्य</h3>
            <p className="target-count">{todayTarget.completed}/{todayTarget.target} प्रश्न</p>
          </div>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${targetProgress}%` }} />
        </div>
        <div className="target-footer">
          <span className="streak-badge">
            <Flame size={16} className="flame-icon" />
            {streak} दिवस सलग
          </span>
          <button className="start-practice-btn" onClick={() => navigate('/practice')}>
            सराव सुरू करा →
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="stats-row">
        <div className="stat-card">
          <BookOpen size={20} className="stat-icon blue" />
          <span className="stat-value">{totalQuestionsAttempted}</span>
          <span className="stat-label">प्रश्न सोडवले</span>
        </div>
        <div className="stat-card">
          <TrendingUp size={20} className="stat-icon green" />
          <span className="stat-value">{overallAccuracy}%</span>
          <span className="stat-label">अचूकता</span>
        </div>
        <div className="stat-card">
          <Award size={20} className="stat-icon orange" />
          <span className="stat-value">{userQuizzes.length}</span>
          <span className="stat-label">चाचण्या दिल्या</span>
        </div>
      </div>

      {/* Main Actions */}
      <div className="section-title">
        <h2>मुख्य विभाग</h2>
      </div>
      
      <div className="action-grid">
        <div className="action-card" onClick={() => navigate('/practice')}>
          <div className="action-icon" style={{ background: '#eff6ff' }}>
            <BookOpen size={28} color="#3b82f6" />
          </div>
          <div className="action-content">
            <h3>दैनिक सराव</h3>
            <p>प्रश्नोत्तरे</p>
          </div>
          <ChevronRight size={20} className="action-arrow" />
        </div>

        <div className="action-card" onClick={() => navigate('/mock-tests')}>
          <div className="action-icon" style={{ background: '#fef3c7' }}>
            <ClipboardList size={28} color="#f59e0b" />
          </div>
          <div className="action-content">
            <h3>मॉक चाचण्या</h3>
            <p>परीक्षा पॅटर्न</p>
          </div>
          <ChevronRight size={20} className="action-arrow" />
        </div>

        <div className="action-card" onClick={() => navigate('/timer-quiz')}>
          <div className="action-icon" style={{ background: '#fce7f3' }}>
            <Clock size={28} color="#ec4899" />
          </div>
          <div className="action-content">
            <h3>टाइमर चाचणी</h3>
            <p>वेळेचा सराव</p>
          </div>
          <ChevronRight size={20} className="action-arrow" />
        </div>

        <div className="action-card" onClick={() => navigate('/subjects')}>
          <div className="action-icon" style={{ background: '#f0fdf4' }}>
            <Brain size={28} color="#22c55e" />
          </div>
          <div className="action-content">
            <h3>विषयनिहाय</h3>
            <p>सर्व विषय</p>
          </div>
          <ChevronRight size={20} className="action-arrow" />
        </div>
      </div>

      {/* More Options */}
      <div className="section-title">
        <h2>अधिक</h2>
      </div>

      <div className="more-options">
        <div className="option-item" onClick={() => navigate('/flash-cards')}>
          <Zap size={20} color="#f59e0b" />
          <span>फ्लॅश कार्ड्स</span>
          <ChevronRight size={16} className="option-arrow" />
        </div>
        <div className="option-item" onClick={() => navigate('/progress')}>
          <TrendingUp size={20} color="#3b82f6" />
          <span>प्रगती पत्रक</span>
          <ChevronRight size={16} className="option-arrow" />
        </div>
        <div className="option-item" onClick={() => navigate('/attendance')}>
          <Calendar size={20} color="#22c55e" />
          <span>उपस्थिती</span>
          <ChevronRight size={16} className="option-arrow" />
        </div>
        <div className="option-item" onClick={() => navigate('/subjects')}>
          <GraduationCap size={20} color="#8b5cf6" />
          <span>सर्व विषय</span>
          <ChevronRight size={16} className="option-arrow" />
        </div>
      </div>

      {/* Popular Exams */}
      <div className="section-title">
        <h2>लोकप्रिय परीक्षा</h2>
      </div>

      <div className="exam-cards">
        <div className="exam-card" onClick={() => navigate('/practice')}>
          <div className="exam-badge" style={{ background: '#3b82f6' }}>मपस</div>
          <h4>महाराष्ट्र लोकसेवा</h4>
          <p>पूर्व चाचणी तयारी</p>
        </div>
        <div className="exam-card" onClick={() => navigate('/practice')}>
          <div className="exam-badge" style={{ background: '#22c55e' }}>पोलीस</div>
          <h4>पोलीस भरती</h4>
          <p>शिपाई ते_constable</p>
        </div>
        <div className="exam-card" onClick={() => navigate('/practice')}>
          <div className="exam-badge" style={{ background: '#f59e0b' }}>तलाठी</div>
          <h4>तलाठी भरती</h4>
          <p>महसूल विभाग</p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <div className="nav-item active" onClick={() => navigate('/')}>
          <FileText size={20} />
          <span>मुख्यपृष्ठ</span>
        </div>
        <div className="nav-item" onClick={() => navigate('/practice')}>
          <BookOpen size={20} />
          <span>सराव</span>
        </div>
        <div className="nav-item" onClick={() => navigate('/progress')}>
          <TrendingUp size={20} />
          <span>प्रगती</span>
        </div>
        <div className="nav-item" onClick={() => navigate('/attendance')}>
          <Calendar size={20} />
          <span>उपस्थिती</span>
        </div>
      </nav>
    </div>
  );
}
