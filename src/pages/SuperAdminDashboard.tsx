import { useNavigate } from 'react-router-dom';
import { School, CheckCircle, Ban, Users, Plus, Shield, BarChart, LogOut } from 'lucide-react';

export default function SuperAdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      navigate('/');
    }
  };

  const stats = [
    { title: 'Total Schools', value: 5, icon: School, color: 'bg-blue-500', text: 'text-blue-500', bg: 'bg-blue-50' },
    { title: 'Active Schools', value: 4, icon: CheckCircle, color: 'bg-emerald-500', text: 'text-emerald-500', bg: 'bg-emerald-50' },
    { title: 'Inactive Schools', value: 1, icon: Ban, color: 'bg-red-500', text: 'text-red-500', bg: 'bg-red-50' },
    { title: 'Sub Admins', value: 8, icon: Users, color: 'bg-amber-500', text: 'text-amber-500', bg: 'bg-amber-50' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl font-bold tracking-tight">Super Admin Dashboard</h1>
          </div>
          <p className="text-slate-400">System administration & school management</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col items-center text-center">
              <div className={`p-4 rounded-full ${stat.bg} mb-4`}>
                <stat.icon className={`h-8 w-8 ${stat.text}`} />
              </div>
              <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
              <h3 className="text-sm font-medium text-slate-500 mt-1">{stat.title}</h3>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-6 tracking-tight">Management Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <button 
              className="flex flex-col items-center justify-center p-6 rounded-xl border border-slate-100 hover:border-blue-200 hover:shadow bg-slate-50 hover:bg-white transition-all group"
            >
              <div className="mb-3">
                <Plus className="h-8 w-8 text-blue-600" />
              </div>
              <span className="font-semibold text-slate-700 text-sm">Add School</span>
            </button>
            
            <button 
              className="flex flex-col items-center justify-center p-6 rounded-xl border border-slate-100 hover:border-amber-200 hover:shadow bg-slate-50 hover:bg-white transition-all group"
            >
              <div className="mb-3">
                <Shield className="h-8 w-8 text-amber-600" />
              </div>
              <span className="font-semibold text-slate-700 text-sm">Manage Admins</span>
            </button>
            
            <button 
              className="flex flex-col items-center justify-center p-6 rounded-xl border border-slate-100 hover:border-emerald-200 hover:shadow bg-slate-50 hover:bg-white transition-all group"
            >
              <div className="mb-3">
                <BarChart className="h-8 w-8 text-emerald-600" />
              </div>
              <span className="font-semibold text-slate-700 text-sm">Analytics</span>
            </button>
            
            <button 
              onClick={handleLogout}
              className="flex flex-col items-center justify-center p-6 rounded-xl border border-red-100 hover:border-red-200 hover:shadow bg-red-50 hover:bg-white transition-all group"
            >
              <div className="mb-3">
                <LogOut className="h-8 w-8 text-red-600" />
              </div>
              <span className="font-semibold text-red-700 text-sm">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
