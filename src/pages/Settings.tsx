import { useAppStore } from '../lib/store';
import { School, MapPin, Users, User, FileText, Moon, LogOut, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const { students, exams } = useAppStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      navigate('/');
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Settings</h1>
        <p className="text-slate-500 mt-1">School management configuration</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50">
          <h2 className="text-lg font-bold text-slate-800">School Information</h2>
        </div>
        <div className="p-5 space-y-4">
          <div className="flex items-center gap-4">
            <School className="w-5 h-5 text-slate-400 shrink-0"/>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-900">School Name</p>
            </div>
            <p className="text-sm text-slate-500">Demo School Management</p>
          </div>
          <div className="flex items-center gap-4">
            <MapPin className="w-5 h-5 text-slate-400 shrink-0"/>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-900">Address</p>
            </div>
            <p className="text-sm text-slate-500">123 Education Street</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50">
          <h2 className="text-lg font-bold text-slate-800">System Statistics</h2>
        </div>
        <div className="p-5 space-y-4">
          <div className="flex items-center gap-4">
            <Users className="w-5 h-5 text-blue-500 shrink-0"/>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-900">Total Students</p>
            </div>
            <p className="text-sm font-bold text-blue-600">{students.length}</p>
          </div>
          <div className="flex items-center gap-4">
            <User className="w-5 h-5 text-amber-500 shrink-0"/>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-900">Total Teachers</p>
            </div>
            <p className="text-sm font-bold text-amber-600">12</p>
          </div>
          <div className="flex items-center gap-4">
            <FileText className="w-5 h-5 text-purple-500 shrink-0"/>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-900">Total Exams</p>
            </div>
            <p className="text-sm font-bold text-purple-600">{exams.length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50">
          <h2 className="text-lg font-bold text-slate-800">Application Settings</h2>
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-4">
               <Moon className="w-5 h-5 text-slate-400 shrink-0"/>
               <p className="text-sm font-medium text-slate-900">Dark Mode</p>
             </div>
             <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer" disabled />
                <label htmlFor="toggle" className="toggle-label block overflow-hidden h-5 rounded-full bg-slate-300 cursor-pointer"></label>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50">
          <h2 className="text-lg font-bold text-red-600">Account</h2>
        </div>
        <div className="p-2">
          <button onClick={handleLogout} className="flex items-center w-full gap-4 p-3 hover:bg-red-50 transition rounded-lg text-left text-red-600">
            <LogOut className="w-5 h-5 shrink-0"/>
            <div className="flex-1">
              <p className="text-sm font-medium">Logout</p>
            </div>
            <ChevronRight className="w-4 h-4 text-red-300" />
          </button>
        </div>
      </div>

      <div className="text-center py-6 text-xs text-slate-400">
        <p>School Management System v1.0</p>
        <p>Software License: Active</p>
      </div>
    </div>
  );
}
