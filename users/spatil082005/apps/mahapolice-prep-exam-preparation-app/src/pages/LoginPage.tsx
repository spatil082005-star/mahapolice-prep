import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Shield, Phone, User } from 'lucide-react';

export default function LoginPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useApp();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setLoading(true);
    setTimeout(() => {
      login(name.trim(), phone.trim());
      navigate('/');
    }, 800);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Logo Section */}
        <div className="login-header">
          <div className="login-logo">
            <Shield size={48} className="logo-icon" />
          </div>
          <h1 className="login-title">MahaPolice Prep</h1>
          <p className="login-subtitle">महाराष्ट्र पोलीस भरती & MPSC परीक्षा तयारी</p>
        </div>

        {/* Form */}
        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <User size={20} className="input-icon" />
            <input
              type="text"
              placeholder="तुमचे नाव"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="login-input"
              required
            />
          </div>
          
          <div className="input-group">
            <Phone size={20} className="input-icon" />
            <input
              type="tel"
              placeholder="मोबाईल नंबर"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="login-input"
              pattern="[0-9]{10}"
              maxLength={10}
              required
            />
          </div>

          <button 
            type="submit" 
            className="login-btn"
            disabled={loading}
          >
            {loading ? (
              <span className="loading-spinner">⏳</span>
            ) : (
              'लॉगिन करा'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="login-footer">
          <p>🔒 तुमची माहिती सुरक्षित आहे</p>
          <p className="login-version">v1.0.0</p>
        </div>
      </div>
    </div>
  );
}
