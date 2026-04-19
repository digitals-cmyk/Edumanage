import { useState, useEffect } from 'react';

// A simple local storage hook to manage data
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}

export type Student = {
  id: string;
  admission_number: string;
  full_name: string;
  date_of_birth: string;
  date_of_admission: string;
  grade: string;
  stream: string;
  created_at: number;
};

export type Exam = {
  id: string;
  exam_name: string;
  exam_date: string;
  subjects: string[];
  grade_level: string;
  published: boolean;
  created_at: number;
};

export type Attendance = {
  id: string;
  student_id: string;
  student_name: string;
  date: string;
  status: 'present' | 'absent';
  recorded_at: number;
};

export type Material = {
  id: string;
  title: string;
  description: string;
  file_name: string;
  file_uri?: string;
  file_type?: string;
  uploaded_at: number;
};

export function useAppStore() {
  const [students, setStudents] = useLocalStorage<Student[]>('app_students', []);
  const [exams, setExams] = useLocalStorage<Exam[]>('app_exams', []);
  const [attendance, setAttendance] = useLocalStorage<Attendance[]>('app_attendance', []);
  const [materials, setMaterials] = useLocalStorage<Material[]>('app_materials', []);

  return {
    students, setStudents,
    exams, setExams,
    attendance, setAttendance,
    materials, setMaterials
  };
}
