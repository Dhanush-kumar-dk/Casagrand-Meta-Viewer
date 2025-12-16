import React, { useState } from 'react';
import { X, Loader2, Plus } from 'lucide-react';
import { useProjects } from '../context/ProjectsContext';
import { ViewType, ViewLink, Project } from '../types';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ isOpen, onClose }) => {
  const { addProject } = useProjects();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    thumbnail: 'https://picsum.photos/800/600', // Default placeholder
    url2bhk: '',
    url3bhk: '',
    url4bhk: '',
    url5bhk: '',
    urlInterior: '',
    urlExterior: '',
    urlAerial: ''
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const newViews: ViewLink[] = [];
    
    // Helper to add view if url exists
    const addView = (url: string, type: ViewType, label: string) => {
      if (url.trim()) {
        newViews.push({ type, url, label });
      }
    };

    addView(formData.url2bhk, '2bhk', '2 BHK Virtual Tour');
    addView(formData.url3bhk, '3bhk', '3 BHK Virtual Tour');
    addView(formData.url4bhk, '4bhk', '4 BHK Virtual Tour');
    addView(formData.url5bhk, '5bhk', '5 BHK Virtual Tour');
    addView(formData.urlInterior, 'interior', 'Interior Walkthrough');
    addView(formData.urlExterior, 'exterior', 'Exterior View');
    addView(formData.urlAerial, 'aerial', 'Aerial View');

    const newProject: Project = {
      id: `custom-${Date.now()}`,
      name: formData.name,
      location: formData.location,
      description: formData.description,
      thumbnail: formData.thumbnail,
      views: newViews
    };

    addProject(newProject);
    setIsSubmitting(false);
    
    // Reset form
    setFormData({
      name: '',
      location: '',
      description: '',
      thumbnail: 'https://picsum.photos/800/600',
      url2bhk: '',
      url3bhk: '',
      url4bhk: '',
      url5bhk: '',
      urlInterior: '',
      urlExterior: '',
      urlAerial: ''
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <div className="relative bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-8 animate-fade-in-up flex flex-col max-h-[90vh]">
        
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-800/50 flex-shrink-0">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Plus className="h-5 w-5 text-amber-500" />
            Create New Project
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-2 hover:bg-slate-700 rounded-full">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Project Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                  placeholder="e.g. Casagrand Zenith"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                  placeholder="e.g. Chennai, India"
                />
              </div>

               <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Thumbnail URL</label>
                <input
                  type="text"
                  name="thumbnail"
                  value={formData.thumbnail}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                  placeholder="https://..."
                />
              </div>

              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Short Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                  placeholder="Describe the project highlights..."
                />
              </div>
            </div>

            <div className="border-t border-slate-800 pt-4">
              <h4 className="text-amber-500 font-medium mb-4 text-sm uppercase tracking-wider">Available Tours (URLs)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">2 BHK Tour URL</label>
                  <input type="text" name="url2bhk" value={formData.url2bhk} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-amber-500 focus:outline-none" placeholder="https://..." />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">3 BHK Tour URL</label>
                  <input type="text" name="url3bhk" value={formData.url3bhk} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-amber-500 focus:outline-none" placeholder="https://..." />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">4 BHK Tour URL</label>
                  <input type="text" name="url4bhk" value={formData.url4bhk} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-amber-500 focus:outline-none" placeholder="https://..." />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">5 BHK Tour URL</label>
                  <input type="text" name="url5bhk" value={formData.url5bhk} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-amber-500 focus:outline-none" placeholder="https://..." />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Interior View URL</label>
                  <input type="text" name="urlInterior" value={formData.urlInterior} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-amber-500 focus:outline-none" placeholder="https://..." />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Exterior / Aerial View URL</label>
                  <input type="text" name="urlExterior" value={formData.urlExterior} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-amber-500 focus:outline-none" placeholder="https://..." />
                </div>
                
                 <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Aerial URL (Optional)</label>
                  <input type="text" name="urlAerial" value={formData.urlAerial} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-amber-500 focus:outline-none" placeholder="https://..." />
                </div>

              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-900 font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Save Project'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;