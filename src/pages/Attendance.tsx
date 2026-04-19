import { useState } from 'react';
import { useAppStore } from '../lib/store';
import { CheckCircle, Users } from 'lucide-react';

export default function Attendance() {
  const { students, attendance, setAttendance } = useAppStore();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Local state for UI toggles before saving
  const [currentStatus, setCurrentStatus] = useState<Record<string, 'present'|'absent'>>({});

  // Initialize currentStatus from store when date changes
  useState(() => {
    const initial: Record<string, 'present'|'absent'> = {};
    const records = attendance.filter(a => a.date === selectedDate);
    students.forEach(s => {
      const record = records.find(r => r.student_id === s.id);
      initial[s.id] = record ? record.status : 'present';
    });
    setCurrentStatus(initial);
  });

  const markAttendance = (studentId: string, status: 'present'|'absent') => {
    setCurrentStatus(prev => ({ ...prev, [studentId]: status }));
  };

  const submitAttendance = () => {
    const newRecords = students.map(student => ({
      id: `${selectedDate}-${student.id}`,
      student_id: student.id,
      student_name: student.full_name,
      date: selectedDate,
      status: currentStatus[student.id] || 'present',
      recorded_at: Date.now()
    }));

    // Remove old for this date and add new
    setAttendance(prev => [
      ...prev.filter(a => a.date !== selectedDate),
      ...newRecords
    ]);
    alert('Attendance saved successfully');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Attendance Tracking</h1>
        <p className="text-slate-500 mt-1">Mark daily attendance for students</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm">
        <label className="block text-sm font-semibold text-slate-700 mb-2">Select Date</label>
        <input 
          type="date" 
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
          className="border border-slate-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none max-w-xs w-full"
        />
      </div>

      {students.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center flex flex-col items-center">
          <div className="bg-slate-50 p-4 rounded-full mb-4">
            <Users className="w-12 h-12 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-1">No students found</h3>
          <p className="text-slate-500">Add students to start marking attendance</p>
        </div>
      ) : (
        <div className="space-y-4">
          {students.map(student => {
            const status = currentStatus[student.id] || 'present';
            return (
              <div key={student.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition hover:border-slate-300">
                <div>
                  <h3 className="font-bold text-slate-900">{student.full_name}</h3>
                  <p className="text-sm text-slate-500">{student.admission_number} • Grade {student.grade}</p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button 
                    onClick={() => markAttendance(student.id, 'present')}
                    className={`flex-1 sm:flex-none px-6 py-2 rounded-lg text-sm font-medium transition ${status === 'present' ? 'bg-emerald-500 text-white shadow-sm' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}
                  >
                    Present
                  </button>
                  <button 
                    onClick={() => markAttendance(student.id, 'absent')}
                    className={`flex-1 sm:flex-none px-6 py-2 rounded-lg text-sm font-medium transition ${status === 'absent' ? 'bg-red-500 text-white shadow-sm' : 'bg-red-50 text-red-700 hover:bg-red-100'}`}
                  >
                    Absent
                  </button>
                </div>
              </div>
            );
          })}

          <div className="pt-4 flex justify-end">
            <button 
              onClick={submitAttendance}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 shadow-sm transition flex items-center gap-2"
            >
              <CheckCircle className="w-5 h-5"/>
              Save Attendance
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
