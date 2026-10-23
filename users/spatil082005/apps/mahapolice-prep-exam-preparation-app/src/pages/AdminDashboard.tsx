import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Users, UserCheck, GraduationCap, Trash2, ArrowLeft, Shield, Calendar, BookOpen } from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { currentUser, users, getAllStudents, getAllTeachers, quizHistory, attendance, deleteUser, logout } = useApp();
  
  const students = getAllStudents();
  const teachers = getAllTeachers();

  const handleDelete = (userId: string, name: string) => {
    if (confirm(`${name} यांचे खाते हटवायचे आहे का?`)) {
      deleteUser(userId);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header admin-header">
        <div className="header-left">
          <img src="/logo.svg" alt="SAKSHI OS" className="header-logo" />
          <div>
            <h1 className="header-title">👑 प्रशासक पॅनल</h1>
            <p className="header-subtitle">SAKSHI OS व्यवस्थापन</p>
          </div>
        </div>
        <button className="logout-btn" onClick={logout} title="बाहेर पडा">🚪</button>
      </header>

      {/* Admin Info */}
      <div className="admin-info-card">
        <div className="admin-info-header">
          <Shield size={20} color="#f59e0b" />
          <div>
            <h3>{currentUser?.name}</h3>
            <p>{currentUser?.email}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-row">
        <div className="stat-card">
          <Users size={20} className="stat-icon blue" />
          <span className="stat-value">{users.length}</span>
          <span className="stat-label">एकूण वापरकर्ते</span>
        </div>
        <div className="stat-card">
          <GraduationCap size={20} className="stat-icon green" />
          <span className="stat-value">{students.length}</span>
          <span className="stat-label">विद्यार्थी</span>
        </div>
        <div className="stat-card">
          <UserCheck size={20} className="stat-icon orange" />
          <span className="stat-value">{teachers.length}</span>
          <span className="stat-label">शिक्षक</span>
        </div>
      </div>

      {/* Teachers List */}
      <div className="section-title">
        <h2>👨‍🏫 शिक्षक ({teachers.length})</h2>
      </div>

      {teachers.length === 0 ? (
        <div className="empty-list">
          <p>अजून कोणतेही शिक्षक नाहीत</p>
        </div>
      ) : (
        <div className="user-list">
          {teachers.map(teacher => {
            const teacherQuizzes = quizHistory.filter(q => q.userId === teacher.id);
            const totalQ = teacherQuizzes.reduce((sum, q) => sum + q.totalQuestions, 0);
            return (
              <div key={teacher.id} className="user-card teacher-card">
                <div className="user-card-header">
                  <div className="user-avatar teacher-avatar">👨‍🏫</div>
                  <div className="user-info">
                    <h4>{teacher.name}</h4>
                    <p>{teacher.email}</p>
                    <span className="user-meta">📱 {teacher.phone}</span>
                  </div>
                  <button className="delete-btn" onClick={() => handleDelete(teacher.id, teacher.name)}>
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="user-stats">
                  <span>📝 {teacherQuizzes.length} चाचण्या</span>
                  <span>❓ {totalQ} प्रश्न</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Students List */}
      <div className="section-title">
        <h2>🎓 विद्यार्थी ({students.length})</h2>
      </div>

      {students.length === 0 ? (
        <div className="empty-list">
          <p>अजून कोणतेही विद्यार्थी नाहीत</p>
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
            
            return (
              <div key={student.id} className="user-card student-card">
                <div className="user-card-header">
                  <div className="user-avatar student-avatar">🎓</div>
                  <div className="user-info">
                    <h4>{student.name}</h4>
                    <p>{student.email}</p>
                    <span className="user-meta">📱 {student.phone}</span>
                  </div>
                  <button className="delete-btn" onClick={() => handleDelete(student.id, student.name)}>
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="user-stats">
                  <span>📝 {studentQuizzes.length} चाचण्या</span>
                  <span>🎯 {accuracy}% अचूकता</span>
                  <span>📅 {presentDays} दिवस उपस्थित</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom Nav */}
      <nav className="bottom-nav">
        <div className="nav-item active" onClick={() => navigate('/admin')}>
          <Shield size={20} /><span>प्रशासक</span>
        </div>
        <div className="nav-item" onClick={() => navigate('/admin/attendance')}>
          <Calendar size={20} /><span>उपस्थिती</span>
        </div>
        <div className="nav-item" onClick={logout}>
          <BookOpen size={20} /><span>बाहेर पडा</span>
        </div>
      </nav>
    </div>
  );
}
