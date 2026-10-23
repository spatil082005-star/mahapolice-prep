import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Calendar, CheckCircle, XCircle, Clock, BookOpen } from 'lucide-react';

export default function AttendancePage() {
  const navigate = useNavigate();
  const { attendance, markAttendance, getTodayAttendance } = useApp();
  const todayAttendance = getTodayAttendance();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleMarkAttendance = (status: 'present' | 'absent' | 'late') => {
    markAttendance(status);
  };

  // Generate calendar for selected month
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
  const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);
  const monthNames = ['जानेवारी', 'फेब्रुवारी', 'मार्च', 'एप्रिल', 'मे', 'जून', 'जुलै', 'ऑगस्ट', 'सप्टेंबर', 'ऑक्टोबर', 'नोव्हेंबर', 'डिसेंबर'];
  const dayNames = ['रवि', 'सोम', 'मंगळ', 'बुध', 'गुरु', 'शुक्र', 'शनि'];

  // Calculate attendance stats
  const presentDays = attendance.filter(a => a.status === 'present').length;
  const lateDays = attendance.filter(a => a.status === 'late').length;
  const absentDays = attendance.filter(a => a.status === 'absent').length;
  const totalMarked = presentDays + lateDays + absentDays;
  const attendancePercentage = totalMarked > 0 ? Math.round(((presentDays + lateDays) / totalMarked) * 100) : 0;

  const getAttendanceForDate = (day: number) => {
    const dateStr = `${selectedYear}-${(selectedMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return attendance.find(a => a.date === dateStr);
  };

  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() && selectedMonth === today.getMonth() && selectedYear === today.getFullYear();
  };

  return (
    <div className="app-container">
      <header className="page-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          <ArrowLeft size={20} />
        </button>
        <h2>उपस्थिती</h2>
      </header>

      {/* Today's Attendance */}
      <div className="today-attendance-card">
        <h3>आजची उपस्थिती</h3>
        {todayAttendance ? (
          <div className="today-attendance-status">
            <span className={`attendance-badge ${todayAttendance.status}`}>
              {todayAttendance.status === 'present' ? '✅ उपस्थित' : 
               todayAttendance.status === 'late' ? '⏰ उशिरा' : '❌ गैरहजर'}
            </span>
            {todayAttendance.checkInTime && (
              <span className="check-in-time">
                <Clock size={14} /> {todayAttendance.checkInTime}
              </span>
            )}
          </div>
        ) : (
          <div className="mark-attendance-btns">
            <button className="attendance-btn present" onClick={() => handleMarkAttendance('present')}>
              <CheckCircle size={18} />
              उपस्थित
            </button>
            <button className="attendance-btn late" onClick={() => handleMarkAttendance('late')}>
              <Clock size={18} />
              उशिरा
            </button>
            <button className="attendance-btn absent" onClick={() => handleMarkAttendance('absent')}>
              <XCircle size={18} />
              गैरहजर
            </button>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="attendance-stats">
        <div className="att-stat">
          <span className="att-value">{attendancePercentage}%</span>
          <span className="att-label">एकूण उपस्थिती</span>
        </div>
        <div className="att-stat">
          <span className="att-value present">{presentDays}</span>
          <span className="att-label">उपस्थित</span>
        </div>
        <div className="att-stat">
          <span className="att-value late">{lateDays}</span>
          <span className="att-label">उशिरा</span>
        </div>
        <div className="att-stat">
          <span className="att-value absent">{absentDays}</span>
          <span className="att-label">गैरहजर</span>
        </div>
      </div>

      {/* Calendar */}
      <div className="attendance-calendar">
        <div className="calendar-header">
          <button onClick={() => {
            if (selectedMonth === 0) { setSelectedMonth(11); setSelectedYear(selectedYear - 1); }
            else setSelectedMonth(selectedMonth - 1);
          }}>←</button>
          <h4>{monthNames[selectedMonth]} {selectedYear}</h4>
          <button onClick={() => {
            if (selectedMonth === 11) { setSelectedMonth(0); setSelectedYear(selectedYear + 1); }
            else setSelectedMonth(selectedMonth + 1);
          }}>→</button>
        </div>

        <div className="calendar-grid">
          {dayNames.map(day => (
            <div key={day} className="calendar-day-name">{day}</div>
          ))}
          
          {Array(firstDay).fill(null).map((_, idx) => (
            <div key={`empty-${idx}`} className="calendar-cell empty" />
          ))}
          
          {Array(daysInMonth).fill(null).map((_, idx) => {
            const day = idx + 1;
            const record = getAttendanceForDate(day);
            const today = isToday(day);
            
            return (
              <div 
                key={day} 
                className={`calendar-cell ${record?.status || ''} ${today ? 'today' : ''}`}
              >
                <span className="calendar-day-num">{day}</span>
                {record && (
                  <span className="calendar-status-dot">
                    {record.status === 'present' ? '✅' : record.status === 'late' ? '⏰' : '❌'}
                  </span>
                )}
              </div>
            );
          })}
        </div>
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
        <div className="nav-item active" onClick={() => navigate('/attendance')}>
          <BookOpen size={20} /><span>उपस्थिती</span>
        </div>
      </nav>
    </div>
  );
}
