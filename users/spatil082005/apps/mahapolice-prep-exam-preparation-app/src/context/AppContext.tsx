import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// User types
export type UserRole = 'admin' | 'teacher' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: UserRole;
  photo?: string;
  dob?: string;
  aadhar?: string;
  rollNo?: string;
  createdAt: string;
}

export interface QuizResult {
  id: string;
  userId: string;
  date: string;
  type: 'practice' | 'mock' | 'timer' | 'daily';
  subject?: string;
  totalQuestions: number;
  correctAnswers: number;
  timeTaken?: number;
  score: number;
}

export interface AttendanceRecord {
  userId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  checkInTime?: string;
}

export interface DailyTarget {
  userId: string;
  date: string;
  target: number;
  completed: number;
}

export interface TeacherQuestion {
  id: string;
  teacherId: string;
  teacherName: string;
  subject: string;
  topic: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: 'सोपे' | 'मध्यम' | 'कठीण';
  createdAt: string;
}

interface AppState {
  currentUser: User | null;
  users: User[];
  quizHistory: QuizResult[];
  attendance: AttendanceRecord[];
  dailyTargets: DailyTarget[];
  teacherQuestions: TeacherQuestion[];
}

interface AppContextType extends AppState {
  // Auth
  login: (email: string, password: string) => { success: boolean; error?: string };
  signup: (name: string, email: string, password: string, phone: string, role: 'teacher' | 'student', photo?: string, dob?: string, aadhar?: string) => { success: boolean; error?: string };
  logout: () => void;
  // Quiz
  addQuizResult: (result: Omit<QuizResult, 'id' | 'date' | 'userId'>) => void;
  getUserQuizHistory: (userId: string) => QuizResult[];
  // Attendance
  markAttendance: (status: 'present' | 'absent' | 'late') => void;
  getTodayAttendance: () => AttendanceRecord | undefined;
  getUserAttendance: (userId: string) => AttendanceRecord[];
  // Daily Target
  getTodayTarget: () => DailyTarget;
  updateDailyTarget: (completed: number) => void;
  // Stats
  getSubjectAccuracy: (subjectId: string) => number;
  // User management (admin)
  getAllStudents: () => User[];
  getAllTeachers: () => User[];
  deleteUser: (userId: string) => void;
  // Teacher question management
  addTeacherQuestion: (q: Omit<TeacherQuestion, 'id' | 'teacherId' | 'teacherName' | 'createdAt'>) => void;
  getTeacherQuestions: () => TeacherQuestion[];
  deleteTeacherQuestion: (questionId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);
const STORAGE_KEY = 'sakshi_os_data';

const getToday = () => new Date().toISOString().split('T')[0];

// Default admin accounts
const defaultAdmins: User[] = [
  {
    id: 'admin-1',
    name: 'करण पाटल',
    email: 'pailvankaranpatil@gmail.com',
    password: 'SK@082005',
    phone: '9876543210',
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'admin-2',
    name: 'प्रशासक दोन',
    email: 'admin2@sakshios.com',
    password: 'Admin@123',
    phone: '9876543211',
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'admin-3',
    name: 'प्रशासक तीन',
    email: 'admin3@sakshios.com',
    password: 'Admin@456',
    phone: '9876543212',
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
];

const loadState = (): AppState => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure default admins exist
      const allUsers = [...defaultAdmins];
      parsed.users?.forEach((u: User) => {
        if (!allUsers.find(a => a.email === u.email)) {
          allUsers.push(u);
        }
      });
      return { ...parsed, users: allUsers, teacherQuestions: parsed.teacherQuestions || [] };
    }
  } catch (e) {
    console.error('Failed to load state:', e);
  }
  return {
    currentUser: null,
    users: [...defaultAdmins],
    quizHistory: [],
    attendance: [],
    dailyTargets: [],
    teacherQuestions: [],
  };
};

const saveState = (state: AppState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save state:', e);
  }
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const login = (email: string, password: string): { success: boolean; error?: string } => {
    const user = state.users.find(u => u.email === email && u.password === password);
    if (user) {
      setState(prev => ({ ...prev, currentUser: user }));
      return { success: true };
    }
    return { success: false, error: 'ईमेल किंवा पासवर्ड चुकीचा आहे' };
  };

  const generateRollNo = (role: 'teacher' | 'student'): string => {
    const prefix = role === 'student' ? 'SK' : 'TK';
    const existingUsers = state.users.filter(u => u.role === role && u.rollNo);
    const maxNum = existingUsers.reduce((max, u) => {
      const num = parseInt(u.rollNo!.replace(prefix, ''));
      return num > max ? num : max;
    }, 0);
    return `${prefix}${String(maxNum + 1).padStart(3, '0')}`;
  };

  const signup = (name: string, email: string, password: string, phone: string, role: 'teacher' | 'student', photo?: string, dob?: string, aadhar?: string): { success: boolean; error?: string } => {
    const exists = state.users.find(u => u.email === email);
    if (exists) {
      return { success: false, error: 'या ईमेलने आधीच खाते आहे' };
    }
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      password,
      phone,
      role,
      photo,
      dob,
      aadhar,
      rollNo: generateRollNo(role),
      createdAt: new Date().toISOString(),
    };
    setState(prev => ({
      ...prev,
      users: [...prev.users, newUser],
      currentUser: newUser,
    }));
    return { success: true };
  };

  const logout = () => {
    setState(prev => ({ ...prev, currentUser: null }));
  };

  const addQuizResult = (result: Omit<QuizResult, 'id' | 'date' | 'userId'>) => {
    if (!state.currentUser) return;
    const newResult: QuizResult = {
      ...result,
      id: Date.now().toString(),
      userId: state.currentUser.id,
      date: getToday(),
    };
    setState(prev => {
      const updated = {
        ...prev,
        quizHistory: [newResult, ...prev.quizHistory],
      };
      // Update daily target
      const today = getToday();
      const existingTarget = prev.dailyTargets.find(t => t.userId === prev.currentUser!.id && t.date === today);
      if (existingTarget) {
        updated.dailyTargets = prev.dailyTargets.map(t =>
          t.userId === prev.currentUser!.id && t.date === today
            ? { ...t, completed: t.completed + result.totalQuestions }
            : t
        );
      } else {
        updated.dailyTargets = [...prev.dailyTargets, { userId: prev.currentUser!.id, date: today, target: 25, completed: result.totalQuestions }];
      }
      return updated;
    });
  };

  const getUserQuizHistory = (userId: string) => {
    return state.quizHistory.filter(q => q.userId === userId);
  };

  const markAttendance = (status: 'present' | 'absent' | 'late') => {
    if (!state.currentUser) return;
    const today = getToday();
    const now = new Date();
    const checkInTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    setState(prev => {
      const existing = prev.attendance.find(a => a.userId === prev.currentUser!.id && a.date === today);
      if (existing) {
        return {
          ...prev,
          attendance: prev.attendance.map(a =>
            a.userId === prev.currentUser!.id && a.date === today ? { ...a, status, checkInTime } : a
          ),
        };
      }
      return {
        ...prev,
        attendance: [...prev.attendance, { userId: prev.currentUser!.id, date: today, status, checkInTime }],
      };
    });
  };

  const getTodayAttendance = () => {
    if (!state.currentUser) return undefined;
    const today = getToday();
    return state.attendance.find(a => a.userId === state.currentUser!.id && a.date === today);
  };

  const getUserAttendance = (userId: string) => {
    return state.attendance.filter(a => a.userId === userId);
  };

  const getTodayTarget = (): DailyTarget => {
    if (!state.currentUser) return { userId: '', date: getToday(), target: 25, completed: 0 };
    const today = getToday();
    const existing = state.dailyTargets.find(t => t.userId === state.currentUser!.id && t.date === today);
    return existing || { userId: state.currentUser!.id, date: today, target: 25, completed: 0 };
  };

  const updateDailyTarget = (completed: number) => {
    if (!state.currentUser) return;
    const today = getToday();
    setState(prev => {
      const existing = prev.dailyTargets.find(t => t.userId === prev.currentUser!.id && t.date === today);
      if (existing) {
        return {
          ...prev,
          dailyTargets: prev.dailyTargets.map(t =>
            t.userId === prev.currentUser!.id && t.date === today ? { ...t, completed } : t
          ),
        };
      }
      return {
        ...prev,
        dailyTargets: [...prev.dailyTargets, { userId: prev.currentUser!.id, date: today, target: 25, completed }],
      };
    });
  };

  const getSubjectAccuracy = (subjectId: string): number => {
    if (!state.currentUser) return 0;
    const userQuizzes = state.quizHistory.filter(q => q.userId === state.currentUser!.id && q.subject === subjectId);
    if (userQuizzes.length === 0) return 0;
    const totalQ = userQuizzes.reduce((sum, q) => sum + q.totalQuestions, 0);
    const totalC = userQuizzes.reduce((sum, q) => sum + q.correctAnswers, 0);
    return totalQ > 0 ? Math.round((totalC / totalQ) * 100) : 0;
  };

  const getAllStudents = () => state.users.filter(u => u.role === 'student');
  const getAllTeachers = () => state.users.filter(u => u.role === 'teacher');

  const deleteUser = (userId: string) => {
    setState(prev => ({
      ...prev,
      users: prev.users.filter(u => u.id !== userId),
      quizHistory: prev.quizHistory.filter(q => q.userId !== userId),
      attendance: prev.attendance.filter(a => a.userId !== userId),
      dailyTargets: prev.dailyTargets.filter(t => t.userId !== userId),
    }));
  };

  // Teacher question management
  const addTeacherQuestion = (q: Omit<TeacherQuestion, 'id' | 'teacherId' | 'teacherName' | 'createdAt'>) => {
    if (!state.currentUser) return;
    const newQuestion: TeacherQuestion = {
      ...q,
      id: `tq-${Date.now()}`,
      teacherId: state.currentUser.id,
      teacherName: state.currentUser.name,
      createdAt: new Date().toISOString(),
    };
    setState(prev => ({
      ...prev,
      teacherQuestions: [newQuestion, ...prev.teacherQuestions],
    }));
  };

  const getTeacherQuestions = () => {
    if (!state.currentUser) return [];
    if (state.currentUser.role === 'admin') return state.teacherQuestions;
    return state.teacherQuestions.filter(q => q.teacherId === state.currentUser!.id);
  };

  const deleteTeacherQuestion = (questionId: string) => {
    setState(prev => ({
      ...prev,
      teacherQuestions: prev.teacherQuestions.filter(q => q.id !== questionId),
    }));
  };

  return (
    <AppContext.Provider value={{
      ...state,
      login,
      signup,
      logout,
      addQuizResult,
      getUserQuizHistory,
      markAttendance,
      getTodayAttendance,
      getUserAttendance,
      getTodayTarget,
      updateDailyTarget,
      getSubjectAccuracy,
      getAllStudents,
      getAllTeachers,
      deleteUser,
      addTeacherQuestion,
      getTeacherQuestions,
      deleteTeacherQuestion,
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
