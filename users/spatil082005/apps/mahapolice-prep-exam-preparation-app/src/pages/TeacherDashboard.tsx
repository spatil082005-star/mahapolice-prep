import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { GraduationCap, ArrowLeft, BookOpen, Calendar, TrendingUp, Users } from 'lucide-react';

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const { currentUser, users, quizHistory, attendance, logout } = useApp();
  
  const students = users.filter(u => u.role === 'student');

  return (
    <div className="app-container">
      <header className="app-header teacher-header">
        <div className="header-left">
          <h1 className="header-title">👨‍🏫 शिक्षक पॅनल</h1>
          <p className="header-subtitle">नमस्कार, {currentUser?.name}</p>
        </div>
        <button className="logout-btn" onClick={logout} title="बाहेर पडा">🚪</button>
      </header>

      {/* Stats */}
      <div className="stats-row">
        <div className="stat-card">
          <Users size={20} className="stat-icon blue" />
          <span className="stat-value">{students.length}</span>
          <span className="stat-label">विद्यार्थी</span>
        </div>
        <div className="stat-card">
          <BookOpen size={20} className="stat-icon green" />
          <span className="stat-value">{quizHistory.length}</span>
          <span className="stat-label">एकूण चाचण्या</span>
        </div>
        <div className="stat-card">
          <TrendingUp size={20} className="stat-icon orange" />
          <span className="stat-value">
            {quizHistory.length > 0 
              ? Math.round(quizHistory.reduce((sum, q) => sum + (q.correctAnswers / q.totalQuestions) * 100, 0) / quizHistory.length)
              : 0}%
          </span>
          <span className="stat-label">सरासरी अचूकता</span>
        </div>
      </div>

      {/* Students List */}
      <div className="section-title">
        <h2>🎓 माझे विद्यार्थी ({students.length})</h2>
      </div>

      {students.length === 0 ? (
        <div className="empty-list">
          <p>अजून कोणतेही विद्यार्थी नाहीत</p>
          <p className="empty-subtitle">विद्यार्थी नोंदणी केल्यावर ते येथे दिसतील</p>
        </div>
      ) : (
        <div className="user-list">
          {students.map(student => {
            const studentQuizzes = quizHistory.filter(q => q.userId === student.id);
            const totalQ = studentQuizzes.reduce((sum, q) => sum + q.totalQuestions, 0);
            const totalC = studentQuizzes.reduce((sum, q) => sum + q.correctAnswers, 0);
            const accuracy = totalQ > 0 ? Math.round((totalC / totalQ) * 100) : 0;
            const studentAttendance = attendance.filter(a => a.userId === student.id);
            const presentDays = studentAttendance.filter(a => a.status === 'present' || a.status === 'late').length;
            const totalDays = studentAttendance.length;
            const attendancePercent = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;
            
            return (
              <div key={student.id} className="user-card student-card">
                <div className="user-card-header">
                  <div className="user-avatar student-avatar">🎓</div>
                  <div className="user-info">
                    <h4>{student.name}</h4>
                    <p>{student.email}</p>
                  </div>
                </div>
                <div className="user-stats">
                  <span>📝 {studentQuizzes.length} चाचण्या</span>
                  <span>🎯 {accuracy}% अचूकता</span>
                  <span>📅 {attendancePercent}% उपस्थिती</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom Nav */}
      <nav className="bottom-nav">
        <div className="nav-item active" onClick={() => navigate('/teacher')}>
          <Users size={20} /><span>विद्यार्थी</span>
        </div>
        <div className="nav-item" onClick={() => navigate('/teacher/attendance')}>
          <Calendar size={20} /><span>उपस्थिती</span>
        </div>
        <div className="nav-item" onClick={logout}>
          <BookOpen size={20} /><span>बाहेर पडा</span>
        </div>
      </nav>
    </div>
  );
}
