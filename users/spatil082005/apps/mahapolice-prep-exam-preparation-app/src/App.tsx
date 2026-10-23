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
import AdminDashboard from './pages/AdminDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import './styles.css';

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) {
  const { currentUser } = useApp();
  if (!currentUser) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) return <Navigate to="/login" />;
  return <>{children}</>;
}

function AppRoutes() {
  const { currentUser } = useApp();
  
  return (
    <Routes>
      <Route path="/login" element={currentUser ? <Navigate to="/" /> : <LoginPage />} />
      
      {/* Student Routes */}
      <Route path="/" element={<ProtectedRoute allowedRoles={['student']}><HomePage /></ProtectedRoute>} />
      <Route path="/practice" element={<ProtectedRoute allowedRoles={['student']}><PracticePage /></ProtectedRoute>} />
      <Route path="/quiz" element={<ProtectedRoute allowedRoles={['student']}><QuizPage /></ProtectedRoute>} />
      <Route path="/quiz-result" element={<ProtectedRoute allowedRoles={['student']}><QuizResultPage /></ProtectedRoute>} />
      <Route path="/mock-tests" element={<ProtectedRoute allowedRoles={['student']}><MockTestPage /></ProtectedRoute>} />
      <Route path="/timer-quiz" element={<ProtectedRoute allowedRoles={['student']}><TimerQuizPage /></ProtectedRoute>} />
      <Route path="/progress" element={<ProtectedRoute allowedRoles={['student']}><ProgressPage /></ProtectedRoute>} />
      <Route path="/flash-cards" element={<ProtectedRoute allowedRoles={['student']}><FlashCardsPage /></ProtectedRoute>} />
      <Route path="/attendance" element={<ProtectedRoute allowedRoles={['student']}><AttendancePage /></ProtectedRoute>} />
      <Route path="/subjects" element={<ProtectedRoute allowedRoles={['student']}><SubjectsPage /></ProtectedRoute>} />
      
      {/* Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
      
      {/* Teacher Routes */}
      <Route path="/teacher" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherDashboard /></ProtectedRoute>} />
      
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
