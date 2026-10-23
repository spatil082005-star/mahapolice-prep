import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: number;
  name: string;
  phone: string;
  avatar?: string;
}

interface QuizResult {
  id: string;
  date: string;
  type: 'practice' | 'mock' | 'timer' | 'daily';
  subject?: string;
  totalQuestions: number;
  correctAnswers: number;
  timeTaken?: number;
  score: number;
}

interface AttendanceRecord {
  date: string;
  status: 'present' | 'absent' | 'late';
  checkInTime?: string;
}

interface DailyTarget {
  date: string;
  target: number;
  completed: number;
}

interface AppState {
  user: User | null;
  isLoggedIn: boolean;
  quizHistory: QuizResult[];
  attendance: AttendanceRecord[];
  dailyTargets: DailyTarget[];
  streak: number;
  totalQuestionsAttempted: number;
  totalCorrect: number;
}

interface AppContextType extends AppState {
  login: (name: string, phone: string) => void;
  logout: () => void;
  addQuizResult: (result: Omit<QuizResult, 'id' | 'date'>) => void;
  markAttendance: (status: 'present' | 'absent' | 'late') => void;
  updateDailyTarget: (completed: number) => void;
  getTodayTarget: () => DailyTarget;
  getSubjectAccuracy: (subjectId: string) => number;
  getTodayAttendance: () => AttendanceRecord | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'mahapolice_prep_data';

const loadState = (): AppState => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Failed to load state:', e);
  }
  return {
    user: null,
    isLoggedIn: false,
    quizHistory: [],
    attendance: [],
    dailyTargets: [],
    streak: 0,
    totalQuestionsAttempted: 0,
    totalCorrect: 0,
  };
};

const saveState = (state: AppState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save state:', e);
  }
};

const getToday = () => new Date().toISOString().split('T')[0];

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const login = (name: string, phone: string) => {
    setState(prev => ({
      ...prev,
      user: { id: Date.now(), name, phone },
      isLoggedIn: true,
    }));
  };

  const logout = () => {
    setState(prev => ({
      ...prev,
      user: null,
      isLoggedIn: false,
    }));
  };

  const addQuizResult = (result: Omit<QuizResult, 'id' | 'date'>) => {
    const newResult: QuizResult = {
      ...result,
      id: Date.now().toString(),
      date: getToday(),
    };
    setState(prev => {
      const updated = {
        ...prev,
        quizHistory: [newResult, ...prev.quizHistory],
        totalQuestionsAttempted: prev.totalQuestionsAttempted + result.totalQuestions,
        totalCorrect: prev.totalCorrect + result.correctAnswers,
      };
      // Update daily target
      const today = getToday();
      const existingTarget = prev.dailyTargets.find(t => t.date === today);
      if (existingTarget) {
        updated.dailyTargets = prev.dailyTargets.map(t =>
          t.date === today ? { ...t, completed: t.completed + result.totalQuestions } : t
        );
      } else {
        updated.dailyTargets = [...prev.dailyTargets, { date: today, target: 25, completed: result.totalQuestions }];
      }
      // Update streak
      const todayRecord = updated.dailyTargets.find(t => t.date === today);
      if (todayRecord && todayRecord.completed >= todayRecord.target) {
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        const yesterdayRecord = updated.dailyTargets.find(t => t.date === yesterday);
        if (yesterdayRecord && yesterdayRecord.completed >= yesterdayRecord.target) {
          updated.streak = prev.streak + 1;
        } else if (prev.streak === 0) {
          updated.streak = 1;
        }
      }
      return updated;
    });
  };

  const markAttendance = (status: 'present' | 'absent' | 'late') => {
    const today = getToday();
    const now = new Date();
    const checkInTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    setState(prev => {
      const existing = prev.attendance.find(a => a.date === today);
      if (existing) {
        return {
          ...prev,
          attendance: prev.attendance.map(a =>
            a.date === today ? { ...a, status, checkInTime } : a
          ),
        };
      }
      return {
        ...prev,
        attendance: [...prev.attendance, { date: today, status, checkInTime }],
      };
    });
  };

  const updateDailyTarget = (completed: number) => {
    const today = getToday();
    setState(prev => {
      const existing = prev.dailyTargets.find(t => t.date === today);
      if (existing) {
        return {
          ...prev,
          dailyTargets: prev.dailyTargets.map(t =>
            t.date === today ? { ...t, completed } : t
          ),
        };
      }
      return {
        ...prev,
        dailyTargets: [...prev.dailyTargets, { date: today, target: 25, completed }],
      };
    });
  };

  const getTodayTarget = (): DailyTarget => {
    const today = getToday();
    const existing = state.dailyTargets.find(t => t.date === today);
    return existing || { date: today, target: 25, completed: 0 };
  };

  const getSubjectAccuracy = (subjectId: string): number => {
    const subjectQuizzes = state.quizHistory.filter(q => q.subject === subjectId);
    if (subjectQuizzes.length === 0) return 0;
    const totalQ = subjectQuizzes.reduce((sum, q) => sum + q.totalQuestions, 0);
    const totalC = subjectQuizzes.reduce((sum, q) => sum + q.correctAnswers, 0);
    return totalQ > 0 ? Math.round((totalC / totalQ) * 100) : 0;
  };

  const getTodayAttendance = () => {
    const today = getToday();
    return state.attendance.find(a => a.date === today);
  };

  return (
    <AppContext.Provider value={{
      ...state,
      login,
      logout,
      addQuizResult,
      markAttendance,
      updateDailyTarget,
      getTodayTarget,
      getSubjectAccuracy,
      getTodayAttendance,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
