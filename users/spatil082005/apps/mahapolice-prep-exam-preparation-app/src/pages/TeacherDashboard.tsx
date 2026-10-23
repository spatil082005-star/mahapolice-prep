import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { subjects } from '../data/questions';
import { Plus, Trash2, BookOpen, Users, FileText, CheckCircle } from 'lucide-react';

type Tab = 'create' | 'my-tests' | 'students';

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const { currentUser, users, quizHistory, attendance, logout, addTeacherQuestion, getTeacherQuestions, deleteTeacherQuestion } = useApp();
  const [activeTab, setActiveTab] = useState<Tab>('create');
  
  // Form state
  const [question, setQuestion] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [optionD, setOptionD] = useState('');
  const [correctOption, setCorrectOption] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState('reasoning');
  const [topic, setTopic] = useState('');
  const [explanation, setExplanation] = useState('');
  const [difficulty, setDifficulty] = useState<'सोपे' | 'मध्यम' | 'कठीण'>('सोपे');
  const [successMsg, setSuccessMsg] = useState('');
  const [error, setError] = useState('');

  const students = users.filter(u => u.role === 'student');
  const myQuestions = getTeacherQuestions();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!question.trim()) { setError('प्रश्न टाका'); return; }
    if (!optionA.trim() || !optionB.trim() || !optionC.trim() || !optionD.trim()) {
      setError('सर्व पर्याय टाका'); return;
    }

    addTeacherQuestion({
      subject: selectedSubject,
      topic: topic || 'general',
      question: question.trim(),
      options: [optionA.trim(), optionB.trim(), optionC.trim(), optionD.trim()],
      correct: correctOption,
      explanation: explanation.trim(),
      difficulty,
    });

    // Reset form
    setQuestion('');
    setOptionA('');
    setOptionB('');
    setOptionC('');
    setOptionD('');
    setCorrectOption(0);
    setTopic('');
    setExplanation('');
    setSuccessMsg('✅ प्रश्न यशस्वीरित्या जोडला!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleDelete = (id: string) => {
    if (confirm('हा प्रश्न हटवायचा आहे का?')) {
      deleteTeacherQuestion(id);
    }
  };

  const getSubjectName = (id: string) => subjects.find(s => s.id === id)?.name || id;
  const getSubjectIcon = (id: string) => subjects.find(s => s.id === id)?.icon || '📝';

  return (
    <div className="app-container">
      <header className="app-header teacher-header">
        <div className="header-left">
          <img src="/logo.svg" alt="SAKSHI OS" className="header-logo" />
          <div>
            <h1 className="header-title">👨‍🏫 शिक्षक पॅनल</h1>
            <p className="header-subtitle">नमस्कार, {currentUser?.name}</p>
          </div>
        </div>
        <button className="logout-btn" onClick={logout} title="बाहेर पडा">🚪</button>
      </header>

      {/* Tab Navigation */}
      <div className="teacher-tabs">
        <button className={`teacher-tab ${activeTab === 'create' ? 'active' : ''}`} onClick={() => setActiveTab('create')}>
          <Plus size={18} />
          <span>चाचणी बनवा</span>
        </button>
        <button className={`teacher-tab ${activeTab === 'my-tests' ? 'active' : ''}`} onClick={() => setActiveTab('my-tests')}>
          <FileText size={18} />
          <span>माझे प्रश्न ({myQuestions.length})</span>
        </button>
        <button className={`teacher-tab ${activeTab === 'students' ? 'active' : ''}`} onClick={() => setActiveTab('students')}>
          <Users size={18} />
          <span>विद्यार्थी ({students.length})</span>
        </button>
      </div>

      {/* Create Question Tab */}
      {activeTab === 'create' && (
        <div className="teacher-content">
          <div className="create-form-card">
            <h3 className="form-title">📝 नवीन प्रश्न जोडा</h3>
            
            {successMsg && <div className="success-msg">{successMsg}</div>}
            {error && <div className="error-msg">⚠️ {error}</div>}

            <form onSubmit={handleSubmit} className="question-form">
              {/* Subject */}
              <div className="form-group">
                <label>विषय</label>
                <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} className="form-select">
                  {subjects.map(s => (
                    <option key={s.id} value={s.id}>{s.icon} {s.name}</option>
                  ))}
                </select>
              </div>

              {/* Topic */}
              <div className="form-group">
                <label>विषय (टॉपिक)</label>
                <input
                  type="text"
                  placeholder="उदा. नातेसंबंध, टक्केवारी..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="form-input"
                />
              </div>

              {/* Difficulty */}
              <div className="form-group">
                <label>कठीणताई</label>
                <div className="difficulty-options">
                  {(['सोपे', 'मध्यम', 'कठीण'] as const).map(d => (
                    <button
                      key={d}
                      type="button"
                      className={`diff-btn ${difficulty === d ? 'active' : ''} ${d}`}
                      onClick={() => setDifficulty(d)}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question */}
              <div className="form-group">
                <label>प्रश्न</label>
                <textarea
                  placeholder="तुमचा प्रश्न येथे टाका..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="form-textarea"
                  rows={3}
                  required
                />
              </div>

              {/* Options */}
              <div className="form-group">
                <label>पर्याय (बरोबर उत्तर निवडा)</label>
                <div className="options-form">
                  {[
                    { val: optionA, set: setOptionA, label: 'अ', idx: 0 },
                    { val: optionB, set: setOptionB, label: 'ब', idx: 1 },
                    { val: optionC, set: setOptionC, label: 'क', idx: 2 },
                    { val: optionD, set: setOptionD, label: 'ड', idx: 3 },
                  ].map(opt => (
                    <div key={opt.idx} className={`option-input-row ${correctOption === opt.idx ? 'correct' : ''}`}>
                      <button
                        type="button"
                        className={`correct-radio ${correctOption === opt.idx ? 'selected' : ''}`}
                        onClick={() => setCorrectOption(opt.idx)}
                        title="बरोबर उत्तर म्हणून निवडा"
                      >
                        {correctOption === opt.idx ? <CheckCircle size={18} /> : <span>{opt.label}</span>}
                      </button>
                      <input
                        type="text"
                        placeholder={`पर्याय ${opt.label}`}
                        value={opt.val}
                        onChange={(e) => opt.set(e.target.value)}
                        className="form-input option-input"
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Explanation */}
              <div className="form-group">
                <label>स्पष्टीकरण (ऐच्छिक)</label>
                <textarea
                  placeholder="उत्तराचे स्पष्टीकरण..."
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  className="form-textarea"
                  rows={2}
                />
              </div>

              <button type="submit" className="submit-btn">
                <Plus size={18} />
                प्रश्न जोडा
              </button>
            </form>
          </div>
        </div>
      )}

      {/* My Tests Tab */}
      {activeTab === 'my-tests' && (
        <div className="teacher-content">
          {myQuestions.length === 0 ? (
            <div className="empty-state-card">
              <FileText size={48} color="#ccc" />
              <h3>अजून कोणतेही प्रश्न जोडलेले नाहीत</h3>
              <p>"चाचणी बनवा" टॅब मध्ये जाऊन प्रश्न जोडा</p>
              <button className="go-create-btn" onClick={() => setActiveTab('create')}>
                <Plus size={16} /> प्रश्न जोडा
              </button>
            </div>
          ) : (
            <div className="questions-list">
              {myQuestions.map((q, idx) => (
                <div key={q.id} className="question-card">
                  <div className="question-card-header">
                    <span className="q-number">#{idx + 1}</span>
                    <span className="q-subject">{getSubjectIcon(q.subject)} {getSubjectName(q.subject)}</span>
                    <span className={`q-difficulty ${q.difficulty}`}>{q.difficulty}</span>
                    <button className="delete-q-btn" onClick={() => handleDelete(q.id)}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <p className="q-text">{q.question}</p>
                  <div className="q-options">
                    {q.options.map((opt, i) => (
                      <span key={i} className={`q-option ${i === q.correct ? 'correct' : ''}`}>
                        {String.fromCharCode(65 + i)}. {opt}
                        {i === q.correct && ' ✓'}
                      </span>
                    ))}
                  </div>
                  {q.explanation && (
                    <p className="q-explanation">💡 {q.explanation}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Students Tab */}
      {activeTab === 'students' && (
        <div className="teacher-content">
          {/* Stats */}
          <div className="stats-row">
            <div className="stat-card">
              <Users size={20} className="stat-icon blue" />
              <span className="stat-value">{students.length}</span>
              <span className="stat-label">विद्यार्थी</span>
            </div>
            <div className="stat-card">
              <BookOpen size={20} className="stat-icon green" />
              <span className="stat-value">{myQuestions.length}</span>
              <span className="stat-label">माझे प्रश्न</span>
            </div>
            <div className="stat-card">
              <FileText size={20} className="stat-icon orange" />
              <span className="stat-value">{quizHistory.length}</span>
              <span className="stat-label">एकूण चाचण्या</span>
            </div>
          </div>

          {students.length === 0 ? (
            <div className="empty-state-card">
              <Users size={48} color="#ccc" />
              <h3>अजून कोणतेही विद्यार्थी नाहीत</h3>
              <p>विद्यार्थी नोंदणी केल्यावर ते येथे दिसतील</p>
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
        </div>
      )}
    </div>
  );
}
