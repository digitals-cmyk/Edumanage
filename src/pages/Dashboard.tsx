import { useAppStore } from '../lib/store';
import { Users, BookOpen, FileText, CheckCircle, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { students, exams, attendance } = useAppStore();
  const navigate = useNavigate();

  const today = new Date().toISOString().split('T')[0];
  const todayAttendance = attendance.filter(a => a.date === today && a.status === 'present').length;

  const stats = [
    { title: 'Total Students', value: students.length, icon: Users, color: 'bg-blue-500', text: 'text-blue-500', bg: 'bg-blue-50' },
    { title: 'Active Exams', value: exams.length, icon: FileText, color: 'bg-amber-500', text: 'text-amber-500', bg: 'bg-amber-50' },
    { title: 'Today Present', value: todayAttendance, icon: CheckCircle, color: 'bg-emerald-500', text: 'text-emerald-500', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
        <p className="text-slate-500 mt-1">School Management Overview</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-4">
            <div className={`p-4 rounded-xl ${stat.bg}`}>
              <stat.icon className={`h-8 w-8 ${stat.text}`} />
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
              <h3 className="text-sm font-medium text-slate-500 mt-1">{stat.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-4 tracking-tight">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => navigate('/app/students')}
            className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:border-blue-200 hover:shadow transition-all group"
          >
            <div className="bg-blue-50 p-3 rounded-full group-hover:scale-110 transition-transform mb-3">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <span className="font-semibold text-slate-700 text-sm">Add Student</span>
          </button>
          
          <button 
            onClick={() => navigate('/app/exams')}
            className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:border-amber-200 hover:shadow transition-all group"
          >
            <div className="bg-amber-50 p-3 rounded-full group-hover:scale-110 transition-transform mb-3">
              <FileText className="h-6 w-6 text-amber-600" />
            </div>
            <span className="font-semibold text-slate-700 text-sm">Create Exam</span>
          </button>
          
          <button 
            onClick={() => navigate('/app/attendance')}
            className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:border-emerald-200 hover:shadow transition-all group"
          >
            <div className="bg-emerald-50 p-3 rounded-full group-hover:scale-110 transition-transform mb-3">
              <CheckCircle className="h-6 w-6 text-emerald-600" />
            </div>
            <span className="font-semibold text-slate-700 text-sm">Mark Attendance</span>
          </button>
          
          <button 
            onClick={() => navigate('/app/elearning')}
            className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:border-purple-200 hover:shadow transition-all group"
          >
            <div className="bg-purple-50 p-3 rounded-full group-hover:scale-110 transition-transform mb-3">
              <BookOpen className="h-6 w-6 text-purple-600" />
            </div>
            <span className="font-semibold text-slate-700 text-sm">Upload Materials</span>
          </button>
        </div>
      </div>
    </div>
  );
}
