import { useNavigate } from 'react-router-dom';
import { Question } from '../data/questions';
import { Trophy, Target, Clock, CheckCircle, XCircle, Home, RotateCcw } from 'lucide-react';

interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  timeTaken: number;
  score: number;
  answers: (number | null)[];
  questions: Question[];
  type: string;
}

export default function QuizResultPage() {
  const navigate = useNavigate();
  const resultData = sessionStorage.getItem('quizResult');
  
  if (!resultData) {
    navigate('/');
    return null;
  }

  const result: QuizResult = JSON.parse(resultData);
  const wrongAnswers = result.totalQuestions - result.correctAnswers;
  const unanswered = result.answers.filter(a => a === null).length;
  const accuracy = Math.round((result.correctAnswers / result.totalQuestions) * 100);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} मिनिटे ${secs} सेकंद`;
  };

  const getGrade = () => {
    if (result.score >= 90) return { grade: 'A+', color: '#22c55e', message: 'अत्यंत उत्तम! 🌟' };
    if (result.score >= 75) return { grade: 'A', color: '#3b82f6', message: 'खूप छान! 👏' };
    if (result.score >= 60) return { grade: 'B', color: '#f59e0b', message: 'चांगला प्रयत्न! 👍' };
    if (result.score >= 40) return { grade: 'C', color: '#f97316', message: 'अजून सराव करा 💪' };
    return { grade: 'D', color: '#ef4444', message: 'नियमित अभ्यास करा 📚' };
  };

  const gradeInfo = getGrade();

  return (
    <div className="app-container result-page">
      {/* Result Header */}
      <div className="result-header">
        <Trophy size={48} className="trophy-icon" />
        <h2>क्विझ पूर्ण!</h2>
        <p className="result-message">{gradeInfo.message}</p>
      </div>

      {/* Score Circle */}
      <div className="score-circle" style={{ borderColor: gradeInfo.color }}>
        <span className="score-value">{Math.round(result.score)}%</span>
        <span className="score-label">स्कोअर</span>
      </div>

      {/* Stats Grid */}
      <div className="result-stats">
        <div className="result-stat">
          <Target size={20} color="#3b82f6" />
          <span className="stat-value">{result.totalQuestions}</span>
          <span className="stat-label">एकूण प्रश्न</span>
        </div>
        <div className="result-stat correct">
          <CheckCircle size={20} color="#22c55e" />
          <span className="stat-value">{result.correctAnswers}</span>
          <span className="stat-label">बरोबर</span>
        </div>
        <div className="result-stat wrong">
          <XCircle size={20} color="#ef4444" />
          <span className="stat-value">{wrongAnswers - unanswered}</span>
          <span className="stat-label">चूक</span>
        </div>
        <div className="result-stat">
          <Clock size={20} color="#f59e0b" />
          <span className="stat-value">{formatTime(result.timeTaken)}</span>
          <span className="stat-label">वेळ</span>
        </div>
      </div>

      {/* Accuracy Bar */}
      <div className="accuracy-section">
        <div className="accuracy-header">
          <span>अचूकता</span>
          <span>{accuracy}%</span>
        </div>
        <div className="accuracy-bar">
          <div className="accuracy-fill" style={{ width: `${accuracy}%`, background: gradeInfo.color }} />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="result-actions">
        <button className="result-btn primary" onClick={() => navigate('/practice')}>
          <RotateCcw size={18} />
          पुन्हा सराव करा
        </button>
        <button className="result-btn secondary" onClick={() => navigate('/')}>
          <Home size={18} />
          होम पेज
        </button>
      </div>

      {/* Review Answers */}
      <div className="review-section">
        <h3>📝 उत्तर पुनरावलोकन</h3>
        <div className="review-list">
          {result.questions.map((q, idx) => {
            const userAnswer = result.answers[idx];
            const isCorrect = userAnswer === q.correct;
            const isUnanswered = userAnswer === null;

            return (
              <div key={idx} className={`review-item ${isUnanswered ? 'unanswered' : isCorrect ? 'correct' : 'wrong'}`}>
                <div className="review-q-header">
                  <span className="review-q-num">Q{idx + 1}</span>
                  {isUnanswered ? (
                    <span className="review-badge unanswered">वगळले</span>
                  ) : isCorrect ? (
                    <span className="review-badge correct">✓ बरोबर</span>
                  ) : (
                    <span className="review-badge wrong">✗ चूक</span>
                  )}
                </div>
                <p className="review-question">{q.question}</p>
                {!isUnanswered && !isCorrect && (
                  <p className="review-answer">
                    तुमचे उत्तर: <span className="wrong-text">{q.options[userAnswer!]}</span>
                  </p>
                )}
                <p className="review-correct">
                  योग्य उत्तर: <span className="correct-text">{q.options[q.correct]}</span>
                </p>
                <p className="review-explanation">{q.explanation}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
