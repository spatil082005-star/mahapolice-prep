import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import PracticePage from './pages/PracticePage';
import QuizPage from './pages/QuizPage';
import QuizResultPage from './pages/QuizResultPage';
import MockTestPage from './pages/MockTestPage';
import TimerQuizPage from './pages/TimerQuizPage';
import ProgressPage from './pages/ProgressPage';
import FlashCardsPage from './pages/FlashCardsPage';
import AttendancePage from './pages/AttendancePage';
import SubjectsPage from './pages/SubjectsPage';
import './styles.css';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useApp();
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
}

function AppRoutes() {
  const { isLoggedIn } = useApp();
  
  return (
    <Routes>
      <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <LoginPage />} />
      <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path="/practice" element={<ProtectedRoute><PracticePage /></ProtectedRoute>} />
      <Route path="/quiz" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
      <Route path="/quiz-result" element={<ProtectedRoute><QuizResultPage /></ProtectedRoute>} />
      <Route path="/mock-tests" element={<ProtectedRoute><MockTestPage /></ProtectedRoute>} />
      <Route path="/timer-quiz" element={<ProtectedRoute><TimerQuizPage /></ProtectedRoute>} />
      <Route path="/progress" element={<ProtectedRoute><ProgressPage /></ProtectedRoute>} />
      <Route path="/flash-cards" element={<ProtectedRoute><FlashCardsPage /></ProtectedRoute>} />
      <Route path="/attendance" element={<ProtectedRoute><AttendancePage /></ProtectedRoute>} />
      <Route path="/subjects" element={<ProtectedRoute><SubjectsPage /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AppProvider>
  );
}
