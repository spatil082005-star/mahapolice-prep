import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp, UserRole } from '../context/AppContext';
import { Shield, Mail, Lock, Phone, User, Eye, EyeOff } from 'lucide-react';

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
    setLoading(true);
    setTimeout(() => {
      const result = signup(name, email, password, phone, selectedRole as 'teacher' | 'student');
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
      case 'teacher': return '👨‍🏫';
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
            <div className="login-logo">
              <Shield size={48} className="logo-icon" />
            </div>
            <h1 className="login-title">SAKSHI OS</h1>
            <p className="login-subtitle">संपूर्ण परीक्षा तयारी प्रणाली</p>
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
              {loading ? '⏳ लोड होत आहे...' : 'लॉगिन करा'}
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

        <form className="login-form" onSubmit={handleSignup}>
          {error && <div className="error-msg">⚠️ {error}</div>}
          
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
