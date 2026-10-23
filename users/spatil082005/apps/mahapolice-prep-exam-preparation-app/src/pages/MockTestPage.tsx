import { useNavigate } from 'react-router-dom';
import { getRandomQuestions } from '../data/questions';
import { ArrowLeft, Clock, FileText, Award, ChevronRight } from 'lucide-react';

const mockTests = [
  { id: 1, title: 'MPSC राज्यसेवा - पूर्व परीक्षा', questions: 50, time: 60, type: 'MPSC' },
  { id: 2, title: 'पोलीस शिपाई भरती', questions: 50, time: 45, type: 'Police' },
  { id: 3, title: 'MPSC Group B', questions: 40, time: 50, type: 'MPSC' },
  { id: 4, title: 'MPSC Group C', questions: 40, time: 45, type: 'MPSC' },
  { id: 5, title: 'तलाठी भरती', questions: 50, time: 60, type: 'Revenue' },
  { id: 6, title: 'आरोग्य विभाग भरती', questions: 50, time: 60, type: 'Health' },
];

export default function MockTestPage() {
  const navigate = useNavigate();

  const startMockTest = (test: typeof mockTests[0]) => {
    if (confirm(`${test.title} सुरू करायचा आहे? वेळ मर्यादा: ${test.time} मिनिटे`)) {
      const questions = getRandomQuestions(test.questions);
      sessionStorage.setItem('quizData', JSON.stringify({
        questions,
        type: 'mock',
        subject: null,
        timeLimit: test.time * 60,
      }));
      navigate('/quiz');
    }
  };

  return (
    <div className="app-container">
      <header className="page-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          <ArrowLeft size={20} />
        </button>
        <h2>मॉक टेस्ट</h2>
      </header>

      <div className="mock-test-intro">
        <Award size={32} color="#f59e0b" />
        <p>परीक्षेच्या पॅटर्ननुसार मॉक टेस्ट द्या आणि तुमची तयारी तपासा!</p>
      </div>

      <div className="mock-test-list">
        {mockTests.map(test => (
          <div key={test.id} className="mock-test-card" onClick={() => startMockTest(test)}>
            <div className="mock-test-header">
              <span className="mock-type-badge">{test.type}</span>
              <ChevronRight size={20} />
            </div>
            <h3>{test.title}</h3>
            <div className="mock-test-meta">
              <span><FileText size={14} /> {test.questions} प्रश्न</span>
              <span><Clock size={14} /> {test.time} मिनिटे</span>
            </div>
          </div>
        ))}
      </div>

      <nav className="bottom-nav">
        <div className="nav-item" onClick={() => navigate('/')}>
          <FileText size={20} /><span>होम</span>
        </div>
        <div className="nav-item" onClick={() => navigate('/practice')}>
          <FileText size={20} /><span>सराव</span>
        </div>
        <div className="nav-item active" onClick={() => navigate('/mock-tests')}>
          <FileText size={20} /><span>मॉक</span>
        </div>
        <div className="nav-item" onClick={() => navigate('/attendance')}>
          <FileText size={20} /><span>उपस्थिती</span>
        </div>
      </nav>
    </div>
  );
}
