import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp, UserRole } from '../context/AppContext';
import { Shield, Mail, Lock, Phone, User, Eye, EyeOff, Camera, Calendar, CreditCard } from 'lucide-react';

export default function LoginPage() {
  const [mode, setMode] = useState<'role-select' | 'login' | 'signup'>('role-select');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // New fields
  const [photo, setPhoto] = useState<string>('');
  const [dob, setDob] = useState('');
  const [aadhar, setAadhar] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const navigate = useNavigate();
  const { login, signup } = useApp();

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setMode('login');
    setError('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const result = login(email, password);
      if (result.success) {
        if (selectedRole === 'admin') navigate('/admin');
        else if (selectedRole === 'teacher') navigate('/teacher');
        else navigate('/');
      } else {
        setError(result.error || 'लॉगिन अयशस्वी');
      }
      setLoading(false);
    }, 500);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 2 * 1024 * 1024) {
      setError('फोटो 2MB पेक्षा लहान असावा');
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('पासवर्ड जुळत नाहीत');
      return;
    }
    if (password.length < 6) {
      setError('पासवर्ड किमान 6 अक्षरे असावेत');
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      setError('मोबाईल नंबर 10 अंकांचा असावा');
      return;
    }
    if (aadhar && !/^\d{12}$/.test(aadhar)) {
      setError('आधार क्रमांक 12 अंकांचा असावा');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const result = signup(name, email, password, phone, selectedRole as 'teacher' | 'student', photo, dob, aadhar);
      if (result.success) {
        if (selectedRole === 'teacher') navigate('/teacher');
        else navigate('/');
      } else {
        setError(result.error || 'खाते बनवणे अयशस्वी');
      }
      setLoading(false);
    }, 500);
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'admin': return 'प्रशासक';
      case 'teacher': return 'शिक्षक';
      case 'student': return 'विद्यार्थी';
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'admin': return '👑';
      case 'teacher': return '👨🏫';
      case 'student': return '🎓';
    }
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'admin': return '#f59e0b';
      case 'teacher': return '#3b82f6';
      case 'student': return '#22c55e';
    }
  };

  // Role Selection Screen
  if (mode === 'role-select') {
    return (
      <div className="login-page">
        <div className="login-container">
          <div className="login-header">
            <div className="login-logo-container">
              <img src="/logo.svg" alt="SAKSHI OS Logo" className="login-logo-img" />
            </div>
            <h1 className="login-title">SAKSHI OS</h1>
            <p className="login-subtitle">Police & Protection</p>
            <p className="login-subtitle-small">संपूर्ण परीक्षा तयारी प्रणाली</p>
          </div>

          <div className="role-selection">
            <h3 className="role-title">तुम्ही कोण आहात?</h3>
            <div className="role-cards">
              {(['admin', 'teacher', 'student'] as UserRole[]).map(role => (
                <button
                  key={role}
                  className="role-card"
                  onClick={() => handleRoleSelect(role)}
                  style={{ borderColor: getRoleColor(role) }}
                >
                  <span className="role-icon">{getRoleIcon(role)}</span>
                  <span className="role-name">{getRoleLabel(role)}</span>
                  <span className="role-arrow">→</span>
                </button>
              ))}
            </div>
          </div>

          <div className="login-footer">
            <p>🔒 तुमची माहिती सुरक्षित आहे</p>
            <p className="login-version">SAKSHI OS v2.0</p>
          </div>
        </div>
      </div>
    );
  }

  // Login Screen
  if (mode === 'login') {
    return (
      <div className="login-page">
        <div className="login-container">
          <div className="login-header">
            <div className="login-logo" style={{ background: `linear-gradient(135deg, ${getRoleColor(selectedRole!)}, ${getRoleColor(selectedRole!)}dd)` }}>
              <span style={{ fontSize: '32px' }}>{getRoleIcon(selectedRole!)}</span>
            </div>
            <h1 className="login-title">{getRoleLabel(selectedRole!)} लॉगिन</h1>
            <p className="login-subtitle">SAKSHI OS मध्ये स्वागत आहे</p>
          </div>

          <form className="login-form" onSubmit={handleLogin}>
            {error && <div className="error-msg">⚠️ {error}</div>}
            
            <div className="input-group">
              <Mail size={20} className="input-icon" />
              <input
                type="email"
                placeholder="ईमेल"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input"
                required
              />
            </div>
            
            <div className="input-group">
              <Lock size={20} className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="पासवर्ड"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
                required
              />
              <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button type="submit" className="login-btn" disabled={loading} style={{ background: `linear-gradient(135deg, ${getRoleColor(selectedRole!)}, ${getRoleColor(selectedRole!)}cc)` }}>
              {loading ? ' लोड होत आहे...' : 'लॉगिन करा'}
            </button>
          </form>

          <div className="login-switch">
            <p>खाते नाही? <button className="link-btn" onClick={() => { setMode('signup'); setError(''); }}>नवीन खाते बनवा</button></p>
            <button className="back-link" onClick={() => { setMode('role-select'); setError(''); }}>← मागे जा</button>
          </div>
        </div>
      </div>
    );
  }

  // Signup Screen
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="login-logo" style={{ background: `linear-gradient(135deg, ${getRoleColor(selectedRole!)}, ${getRoleColor(selectedRole!)}dd)` }}>
            <span style={{ fontSize: '32px' }}>{getRoleIcon(selectedRole!)}</span>
          </div>
          <h1 className="login-title">{getRoleLabel(selectedRole!)} खाते बनवा</h1>
          <p className="login-subtitle">SAKSHI OS मध्ये नोंदणी करा</p>
        </div>

        <form className="login-form signup-form" onSubmit={handleSignup}>
          {error && <div className="error-msg">⚠️ {error}</div>}
          
          {/* Photo Upload */}
          <div className="photo-upload-section">
            <div className="photo-preview" onClick={() => fileInputRef.current?.click()}>
              {photo ? (
                <img src={photo} alt="Profile" className="photo-img" />
              ) : (
                <div className="photo-placeholder">
                  <Camera size={32} color="#888" />
                  <span>फोटो टाका</span>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="photo-input"
            />
            <p className="photo-hint">फोटो वर क्लिक करा (max 2MB)</p>
          </div>

          <div className="input-group">
            <User size={20} className="input-icon" />
            <input
              type="text"
              placeholder="पूर्ण नाव"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="login-input"
              required
            />
          </div>

          <div className="input-group">
            <Mail size={20} className="input-icon" />
            <input
              type="email"
              placeholder="ईमेल"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              required
            />
          </div>

          <div className="input-group">
            <Phone size={20} className="input-icon" />
            <input
              type="tel"
              placeholder="मोबाईल नंबर (10 अंक)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="login-input"
              maxLength={10}
              required
            />
          </div>

          {/* DOB */}
          <div className="input-group">
            <Calendar size={20} className="input-icon" />
            <input
              type="date"
              placeholder="जन्म तारीख"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="login-input"
              required
            />
          </div>

          {/* Aadhar */}
          <div className="input-group">
            <CreditCard size={20} className="input-icon" />
            <input
              type="text"
              placeholder="आधार क्रमांक (12 अंक)"
              value={aadhar}
              onChange={(e) => setAadhar(e.target.value.replace(/\D/g, '').slice(0, 12))}
              className="login-input"
              maxLength={12}
            />
          </div>
          
          <div className="input-group">
            <Lock size={20} className="input-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="पासवर्ड (किमान 6 अक्षरे)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              minLength={6}
              required
            />
            <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="input-group">
            <Lock size={20} className="input-icon" />
            <input
              type="password"
              placeholder="पासवर्ड पुन्हा टाका"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="login-input"
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading} style={{ background: `linear-gradient(135deg, ${getRoleColor(selectedRole!)}, ${getRoleColor(selectedRole!)}cc)` }}>
            {loading ? '⏳ खाते बनवत आहे...' : 'खाते बनवा'}
          </button>
        </form>

        <div className="login-switch">
          <p>आधीच खाते आहे? <button className="link-btn" onClick={() => { setMode('login'); setError(''); }}>लॉगिन करा</button></p>
          <button className="back-link" onClick={() => { setMode('role-select'); setError(''); }}>← मागे जा</button>
        </div>
      </div>
    </div>
  );
}
