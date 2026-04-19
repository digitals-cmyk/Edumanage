import React, { useState, useRef } from 'react';
import { useAppStore, Material } from '../lib/store';
import { GraduationCap, UploadCloud, Trash2, Send, File, Image as ImageIcon, FileText } from 'lucide-react';

export default function ELearning() {
  const { materials, setMaterials } = useAppStore();
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please enter a title');
      return;
    }

    const newMaterial: Material = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      file_name: file ? file.name : 'Untitled Document',
      file_type: file ? file.type : 'application/pdf',
      uploaded_at: Date.now()
    };
    
    setMaterials(prev => [...prev, newMaterial]);
    setFormData({ title: '', description: '' });
    setFile(null);
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this material?')) {
      setMaterials(prev => prev.filter(m => m.id !== id));
    }
  };

  const getFileIcon = (type?: string) => {
    if (type?.includes('image')) return <ImageIcon className="w-8 h-8 text-blue-500" />;
    if (type?.includes('pdf')) return <FileText className="w-8 h-8 text-red-500" />;
    return <File className="w-8 h-8 text-slate-500" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">eLearning Materials</h1>
          <p className="text-slate-500 mt-1">{materials.length} materials uploaded</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition shadow-sm"
        >
          <UploadCloud className="w-5 h-5" />
          Upload Material
        </button>
      </div>

      {materials.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center flex flex-col items-center">
          <div className="bg-slate-50 p-4 rounded-full mb-4">
            <GraduationCap className="w-12 h-12 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-1">No learning materials yet</h3>
          <p className="text-slate-500">Upload PDFs, documents, and other materials for students</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {materials.map(material => (
            <div key={material.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow transition">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-slate-50 p-3 rounded-lg shrink-0">
                  {getFileIcon(material.file_type)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-900 truncate">{material.title}</h3>
                  <p className="text-xs text-slate-500 truncate mt-0.5">{material.file_name}</p>
                </div>
              </div>
              
              {material.description && (
                <p className="text-sm text-slate-600 mb-4 line-clamp-2">{material.description}</p>
              )}
              
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xs font-medium text-slate-400">
                  Uploaded: {new Date(material.uploaded_at).toLocaleDateString()}
                </span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => { alert('Shared!'); }} 
                    className="px-3 py-1.5 text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm font-medium transition flex items-center justify-center gap-1"
                  >
                    <Send className="w-4 h-4" /> Share
                  </button>
                  <button 
                    onClick={() => handleDelete(material.id)} 
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
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
              <h2 className="text-lg font-bold text-slate-900">Upload Learning Material</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
                 <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Enter material title"/>
               </div>
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                 <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Enter description (optional)"></textarea>
               </div>
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">File</label>
                 <input 
                   type="file" 
                   ref={fileInputRef} 
                   className="hidden" 
                   onChange={(e) => {
                     const selected = e.target.files?.[0];
                     if (selected) {
                       setFile(selected);
                       if (!formData.title) setFormData(f => ({ ...f, title: selected.name.replace(/\.[^/.]+$/, '') }));
                     }
                   }}
                 />
                 <button 
                   type="button"
                   onClick={() => fileInputRef.current?.click()}
                   className="flex items-center gap-2 px-4 py-3 border border-slate-300 rounded-lg w-full text-sm font-medium text-slate-700 hover:bg-slate-50 outline-none"
                 >
                   <UploadCloud className="w-5 h-5 text-blue-600" />
                   {file ? file.name : 'Select File'}
                 </button>
               </div>
               
               <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 mt-6">
                 <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition">Cancel</button>
                 <button type="submit" className="px-5 py-2 font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition">
                   Upload Material
                 </button>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
