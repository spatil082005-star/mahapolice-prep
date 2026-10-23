import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, User, Mail, Phone, Calendar, CreditCard, 
  Ruler, Scale, Droplet, MapPin, BookOpen, Shield,
  Edit3, Award, Target, TrendingUp
} from 'lucide-react';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { currentUser, quizHistory, logout } = useApp();

  if (!currentUser) return null;

  const userQuizzes = quizHistory.filter(q => q.userId === currentUser.id);
  const totalQuizzes = userQuizzes.length;
  const totalQuestions = userQuizzes.reduce((sum, q) => sum + q.totalQuestions, 0);
  const totalCorrect = userQuizzes.reduce((sum, q) => sum + q.correctAnswers, 0);
  const accuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return '👑 प्रशासक';
      case 'teacher': return '👨‍🏫 शिक्षक';
      case 'student': return '🎓 विद्यार्थी';
      default: return role;
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('mr-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const Field = ({ icon: Icon, label, value }: { icon: any; label: string; value?: string }) => (
    <div className="profile-field">
      <span className="profile-field-label">
        <Icon size={14} />
        {label}
      </span>
      <span className={`profile-field-value ${!value ? 'empty' : ''}`}>
        {value || 'भरलेले नाही'}
      </span>
    </div>
  );

  return (
    <div className="app-container profile-page">
      {/* Back Button */}
      <div style={{ padding: '12px 16px 0' }}>
        <button className="profile-back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
          मागे जा
        </button>
      </div>

      {/* Profile Header Card */}
      <div className="profile-header-card">
        {currentUser.photo ? (
          <img src={currentUser.photo} alt={currentUser.name} className="profile-photo-large" />
        ) : (
          <div className="profile-photo-large-placeholder">
            <User size={40} color="white" />
          </div>
        )}
        <h2 className="profile-name">{currentUser.name}</h2>
        <span className="profile-role-badge">{getRoleLabel(currentUser.role)}</span>
        {currentUser.rollNo && (
          <span className="profile-roll-no">🆔 {currentUser.rollNo}</span>
        )}
      </div>

      {/* Performance Stats (for students/teachers) */}
      {currentUser.role !== 'admin' && (
        <div className="profile-section">
          <h3 className="profile-section-title">
            <TrendingUp size={18} />
            कामगिरी
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '22px', fontWeight: 700, color: '#3b82f6' }}>{totalQuizzes}</div>
              <div style={{ fontSize: '11px', color: '#888' }}>चाचण्या</div>
            </div>
            <div>
              <div style={{ fontSize: '22px', fontWeight: 700, color: '#22c55e' }}>{accuracy}%</div>
              <div style={{ fontSize: '11px', color: '#888' }}>अचूकता</div>
            </div>
            <div>
              <div style={{ fontSize: '22px', fontWeight: 700, color: '#f59e0b' }}>{totalQuestions}</div>
              <div style={{ fontSize: '11px', color: '#888' }}>प्रश्न</div>
            </div>
          </div>
        </div>
      )}

      {/* Personal Information */}
      <div className="profile-section">
        <h3 className="profile-section-title">
          <User size={18} />
          वैयक्तिक माहिती
        </h3>
        <Field icon={User} label="पूर्ण नाव" value={currentUser.name} />
        <Field icon={Phone} label="मोबाईल" value={currentUser.phone} />
        <Field icon={Mail} label="ईमेल" value={currentUser.email} />
        <Field icon={Calendar} label="जन्म तारीख" value={currentUser.dob ? formatDate(currentUser.dob) : ''} />
        <Field icon={CreditCard} label="आधार क्रमांक" value={currentUser.aadhar ? `${currentUser.aadhar.slice(0, 4)} XXXX XXXX` : ''} />
        <Field icon={Ruler} label="उंची" value={currentUser.height ? `${currentUser.height} cm` : ''} />
        <Field icon={Scale} label="वजन" value={currentUser.weight ? `${currentUser.weight} kg` : ''} />
        <Field icon={Droplet} label="रक्तगट" value={currentUser.bloodGroup} />
      </div>

      {/* Family Information */}
      <div className="profile-section">
        <h3 className="profile-section-title">
          <User size={18} />
          कौटुंबिक माहिती
        </h3>
        <Field icon={User} label="वडिलांचे नाव" value={currentUser.fatherName} />
        <Field icon={User} label="आईचे नाव" value={currentUser.motherName} />
      </div>

      {/* Education & Address */}
      <div className="profile-section">
        <h3 className="profile-section-title">
          <BookOpen size={18} />
          शिक्षण आणि पत्ता
        </h3>
        <Field icon={BookOpen} label="शैक्षणिक पात्रता" value={currentUser.qualification} />
        <Field icon={MapPin} label="पूर्ण पत्ता" value={currentUser.address} />
      </div>

      {/* Account Info */}
      <div className="profile-section">
        <h3 className="profile-section-title">
          <Shield size={18} />
          खाते माहिती
        </h3>
        <Field icon={Shield} label="भूमिका" value={getRoleLabel(currentUser.role)} />
        {currentUser.rollNo && <Field icon={Award} label="Roll Number" value={currentUser.rollNo} />}
        <Field icon={Calendar} label="खाते तारीख" value={formatDate(currentUser.createdAt)} />
      </div>

      {/* Logout Button */}
      <button className="profile-edit-btn" style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }} onClick={logout}>
        🚪 बाहेर पडा
      </button>
    </div>
  );
}
