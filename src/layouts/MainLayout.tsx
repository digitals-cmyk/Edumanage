import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, FileText, CheckCircle, 
  GraduationCap, Settings, LogOut, Menu, X
} from 'lucide-react';
import { useState } from 'react';

const NAV_ITEMS = [
  { path: '/app', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/app/students', icon: Users, label: 'Students' },
  { path: '/app/exams', icon: FileText, label: 'Exams' },
  { path: '/app/attendance', icon: CheckCircle, label: 'Attendance' },
  { path: '/app/elearning', icon: GraduationCap, label: 'eLearning' },
  { path: '/app/settings', icon: Settings, label: 'Settings' },
];

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      navigate('/');
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-white border-b border-slate-200 z-20 flex items-center justify-between p-4 shadow-sm">
        <h1 className="font-bold text-blue-700 text-lg flex items-center gap-2">
          <GraduationCap className="w-5 h-5"/> EduManage
        </h1>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 bg-white border-r border-slate-200 w-64 flex flex-col transition-transform duration-300 z-30
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static
      `}>
        <div className="p-6 hidden md:flex items-center gap-3">
          <div className="bg-blue-600 rounded p-2">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <span className="font-bold text-xl text-slate-800">EduManage</span>
        </div>
        
        <nav className="flex-1 px-4 py-6 md:py-4 space-y-1 overflow-y-auto mt-16 md:mt-0">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/app'}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-3 rounded-xl transition-colors font-medium text-sm
                ${isActive 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
              `}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-3 w-full text-left rounded-xl text-red-600 hover:bg-red-50 transition-colors font-medium text-sm"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-slate-900/50 z-20"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden mt-16 md:mt-0 bg-slate-50">
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-5xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
