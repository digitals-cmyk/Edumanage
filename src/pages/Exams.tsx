import React, { useState } from 'react';
import { useAppStore, Exam } from '../lib/store';
import { FileText, Plus, Trash2, Send, CheckCircle, Clock } from 'lucide-react';

export default function Exams() {
  const { exams, setExams } = useAppStore();
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    exam_name: '',
    exam_date: '',
    grade_level: '',
    subjects: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newExam: Exam = {
      id: Date.now().toString(),
      exam_name: formData.exam_name,
      exam_date: formData.exam_date,
      grade_level: formData.grade_level,
      subjects: formData.subjects.split(',').map(s => s.trim()).filter(Boolean),
      published: false,
      created_at: Date.now()
    };
    
    setExams(prev => [...prev, newExam]);
    setFormData({ exam_name: '', exam_date: '', grade_level: '', subjects: '' });
    setShowModal(false);
  };

  const togglePublish = (id: string) => {
    setExams(prev => prev.map(e => e.id === id ? { ...e, published: !e.published } : e));
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this exam?')) {
      setExams(prev => prev.filter(e => e.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Exams Management</h1>
          <p className="text-slate-500 mt-1">{exams.length} exams created</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Create Exam
        </button>
      </div>

      {exams.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center flex flex-col items-center">
          <div className="bg-slate-50 p-4 rounded-full mb-4">
            <FileText className="w-12 h-12 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-1">No exams created yet</h3>
          <p className="text-slate-500">Create your first exam to start assessment</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {exams.map(exam => (
            <div key={exam.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow transition">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">{exam.exam_name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-slate-500 text-sm font-medium">Date: {exam.exam_date}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500 text-sm font-medium">Grade {exam.grade_level}</span>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${exam.published ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                  {exam.published ? <CheckCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                  {exam.published ? 'Published' : 'Draft'}
                </span>
              </div>
              
              <div className="mb-6">
                <p className="text-sm text-slate-500 mb-1">Subjects:</p>
                <div className="flex flex-wrap gap-2">
                  {exam.subjects.length > 0 ? exam.subjects.map(sub => (
                    <span key={sub} className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded text-xs font-medium">{sub}</span>
                  )) : (
                    <span className="text-slate-400 text-sm italic">None specified</span>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => togglePublish(exam.id)} 
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2 ${exam.published ? 'text-amber-700 bg-amber-50 hover:bg-amber-100' : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'}`}
                >
                  {exam.published ? 'Unpublish' : 'Publish'}
                </button>
                <button 
                  onClick={() => { alert('Shared!'); }} 
                  className="px-4 py-2 text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm font-medium transition flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(exam.id)} 
                  className="px-4 py-2 text-red-700 bg-red-50 hover:bg-red-100 rounded-lg text-sm font-medium transition flex items-center justify-center"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
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
              <h2 className="text-lg font-bold text-slate-900">Create New Exam</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Exam Name *</label>
                 <input required type="text" value={formData.exam_name} onChange={e => setFormData({...formData, exam_name: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Midterm Exams"/>
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Exam Date *</label>
                   <input required type="date" value={formData.exam_date} onChange={e => setFormData({...formData, exam_date: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"/>
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Grade Level *</label>
                   <input required type="text" value={formData.grade_level} onChange={e => setFormData({...formData, grade_level: e.target.value})} placeholder="e.g. 7" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"/>
                 </div>
               </div>
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Subjects (comma separated)</label>
                 <textarea rows={3} value={formData.subjects} onChange={e => setFormData({...formData, subjects: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Math, Science, English..."></textarea>
               </div>
               
               <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 mt-6">
                 <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition">Cancel</button>
                 <button type="submit" className="px-5 py-2 font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition">
                   Create Exam
                 </button>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
