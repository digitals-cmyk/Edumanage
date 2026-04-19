import React, { useState } from 'react';
import { useAppStore, Student } from '../lib/store';
import { Users, Plus, Edit2, Trash2 } from 'lucide-react';

export default function Students() {
  const { students, setStudents } = useAppStore();
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const [formData, setFormData] = useState({
    admission_number: '',
    full_name: '',
    date_of_birth: '',
    date_of_admission: '',
    grade: '',
    stream: ''
  });

  const handleOpenModal = (student?: Student) => {
    if (student) {
      setEditingStudent(student);
      setFormData(student);
    } else {
      setEditingStudent(null);
      setFormData({
        admission_number: '', full_name: '', date_of_birth: '', date_of_admission: '', grade: '', stream: ''
      });
    }
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStudent) {
      setStudents(prev => prev.map(s => s.id === editingStudent.id ? { ...formData, id: s.id, created_at: s.created_at } : s));
    } else {
      setStudents(prev => [...prev, { ...formData, id: Date.now().toString(), created_at: Date.now() }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(prev => prev.filter(s => s.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Students Registry</h1>
          <p className="text-slate-500 mt-1">{students.length} students enrolled</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Add Student
        </button>
      </div>

      {students.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center flex flex-col items-center">
          <div className="bg-slate-50 p-4 rounded-full mb-4">
            <Users className="w-12 h-12 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-1">No students registered yet</h3>
          <p className="text-slate-500">Tap the add button to register your first student</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {students.map(student => (
            <div key={student.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow transition">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">{student.full_name}</h3>
                  <p className="text-slate-500 text-sm mt-0.5">ID: {student.admission_number}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleOpenModal(student)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(student.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="text-sm text-slate-700 space-y-1">
                <p>Grade: <span className="font-medium text-slate-900">{student.grade}</span> {student.stream && ` - ${student.stream}`}</p>
                <p>DOB: <span className="font-medium text-slate-900">{student.date_of_birth}</span></p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-lg font-bold text-slate-900">
                {editingStudent ? 'Edit Student' : 'Add New Student'}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Admission Number *</label>
                 <input required type="text" value={formData.admission_number} onChange={e => setFormData({...formData, admission_number: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"/>
               </div>
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
                 <input required type="text" value={formData.full_name} onChange={e => setFormData({...formData, full_name: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"/>
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth *</label>
                   <input required type="date" value={formData.date_of_birth} onChange={e => setFormData({...formData, date_of_birth: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"/>
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Admission Date *</label>
                   <input required type="date" value={formData.date_of_admission} onChange={e => setFormData({...formData, date_of_admission: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"/>
                 </div>
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Grade *</label>
                   <input required type="text" value={formData.grade} onChange={e => setFormData({...formData, grade: e.target.value})} placeholder="e.g. Grade 7" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"/>
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Stream</label>
                   <input type="text" value={formData.stream} onChange={e => setFormData({...formData, stream: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"/>
                 </div>
               </div>
               
               <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 mt-6">
                 <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition">Cancel</button>
                 <button type="submit" className="px-5 py-2 font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition">
                   {editingStudent ? 'Update' : 'Add Student'}
                 </button>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
