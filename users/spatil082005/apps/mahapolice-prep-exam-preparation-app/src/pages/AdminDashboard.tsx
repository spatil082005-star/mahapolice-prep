import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { subjects } from '../data/questions';
import { Users, UserCheck, GraduationCap, Trash2, Shield, Calendar, BookOpen, FileText, TrendingUp, Award } from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { currentUser, users, getAllStudents, getAllTeachers, quizHistory, attendance, teacherQuestions, deleteUser, logout } = useApp();
  
  const students = getAllStudents();
  const teachers = getAllTeachers();

  // Statistics
  const stats = useMemo(() => {
    const totalQuizzes = quizHistory.length;
    const totalQuestionsAttempted = quizHistory.reduce((sum, q) => sum + q.totalQuestions, 0);
    const totalCorrect = quizHistory.reduce((sum, q) => sum + q.correctAnswers, 0);
    const avgAccuracy = totalQuestionsAttempted > 0 ? Math.round((totalCorrect / totalQuestionsAttempted) * 100) : 0;
    const totalAttendance = attendance.filter(a => a.status === 'present' || a.status === 'late').length;
    const totalDays = attendance.length;
    const avgAttendance = totalDays > 0 ? Math.round((totalAttendance / totalDays) * 100) : 0;
    
    // Subject-wise quiz distribution
    const subjectDistribution = subjects.map(s => {
      const count = quizHistory.filter(q => q.subject === s.id).length;
      return { ...s, count };
    });

    // Recent activity (last 7 days)
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(Date.now() - i * 86400000).toISOString().split('T')[0];
      const dayQuizzes = quizHistory.filter(q => q.date === date).length;
      const dayAttendance = attendance.filter(a => a.date === date).length;
      return { date: date.slice(5), quizzes: dayQuizzes, attendance: dayAttendance };
    }).reverse();

    return { totalQuizzes, totalQuestionsAttempted, avgAccuracy, totalAttendance, totalDays, avgAttendance, subjectDistribution, last7Days };
  }, [quizHistory, attendance]);

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

      {/* Stats Overview */}
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

      {/* Performance Stats */}
      <div className="section-title">
        <h2>📊 कामगिरी आकडेवारी</h2>
      </div>

      <div className="performance-grid">
        <div className="perf-card">
          <FileText size={24} color="#3b82f6" />
          <span className="perf-value">{stats.totalQuizzes}</span>
          <span className="perf-label">एकूण चाचण्या</span>
        </div>
        <div className="perf-card">
          <TrendingUp size={24} color="#22c55e" />
          <span className="perf-value">{stats.avgAccuracy}%</span>
          <span className="perf-label">सरासरी अचूकता</span>
        </div>
        <div className="perf-card">
          <Award size={24} color="#f59e0b" />
          <span className="perf-value">{stats.totalQuestionsAttempted}</span>
          <span className="perf-label">प्रश्न सोडवले</span>
        </div>
        <div className="perf-card">
          <Calendar size={24} color="#8b5cf6" />
          <span className="perf-value">{stats.avgAttendance}%</span>
          <span className="perf-label">सरासरी उपस्थिती</span>
        </div>
      </div>

      {/* Subject Distribution Chart */}
      <div className="section-title">
        <h2>📚 विषयनिहाय चाचण्या</h2>
      </div>

      <div className="chart-card">
        {stats.subjectDistribution.map(s => {
          const maxCount = Math.max(...stats.subjectDistribution.map(x => x.count), 1);
          const percentage = (s.count / maxCount) * 100;
          return (
            <div key={s.id} className="chart-bar-row">
              <span className="chart-label">{s.icon} {s.name}</span>
              <div className="chart-bar-container">
                <div className="chart-bar" style={{ width: `${percentage}%`, background: s.color }} />
              </div>
              <span className="chart-value">{s.count}</span>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="section-title">
        <h2>📅 अलीकडील_activity (7 दिवस)</h2>
      </div>

      <div className="activity-chart">
        <div className="activity-bars">
          {stats.last7Days.map((day, i) => {
            const maxQ = Math.max(...stats.last7Days.map(d => d.quizzes), 1);
            const height = (day.quizzes / maxQ) * 100;
            return (
              <div key={i} className="activity-bar-col">
                <div className="activity-bar" style={{ height: `${Math.max(height, 5)}%` }} />
                <span className="activity-count">{day.quizzes}</span>
                <span className="activity-date">{day.date}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Teachers List */}
      <div className="section-title">
        <h2>👨‍ शिक्षक ({teachers.length})</h2>
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
                  <div className="user-avatar teacher-avatar">‍🏫</div>
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
                  <span>📄 {teacherQuestions.filter(q => q.teacherId === teacher.id).length} प्रश्न जोडले</span>
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
                    <span className="user-meta"> {student.phone}</span>
                  </div>
                  <button className="delete-btn" onClick={() => handleDelete(student.id, student.name)}>
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="user-stats">
                  <span>📝 {studentQuizzes.length} चाचण्या</span>
                  <span>🎯 {accuracy}% अचूकता</span>
                  <span> {presentDays} दिवस उपस्थित</span>
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
