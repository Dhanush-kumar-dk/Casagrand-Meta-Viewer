import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Project, ViewLink } from '../types';
import { ArrowLeft, ExternalLink, MapPin, Eye } from 'lucide-react';
import EnquireModal from '../components/EnquireModal';
import { useProjects } from '../context/ProjectsContext';

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projects } = useProjects();
  
  const [project, setProject] = useState<Project | null>(null);
  const [activeView, setActiveView] = useState<ViewLink | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const foundProject = projects.find(p => p.id === id);
    if (foundProject) {
      setProject(foundProject);
      // Automatically select the first view if available
      if (foundProject.views.length > 0) {
        setActiveView(foundProject.views[0]);
      }
    } else {
      // Handle not found
      navigate('/');
    }
  }, [id, navigate, projects]);

  if (!project) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <button 
          onClick={() => navigate('/')}
          className="flex items-center text-gray-400 hover:text-white transition-colors mb-6 group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
          
          {/* Main Viewer (Takes up 2/3 on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-black rounded-2xl overflow-hidden aspect-video border border-slate-700 shadow-2xl relative">
              {activeView ? (
                <iframe
                  src={activeView.url}
                  title={`${project.name} - ${activeView.label}`}
                  width="100%"
                  height="100%"
                  className="w-full h-full"
                  allowFullScreen
                  allow="vr; xr; accelerometer; gyroscope; autoplay;"
                ></iframe>
              ) : (
                <div className="w-full h-full flex items-center justify-center relative">
                   <img 
                    src={project.thumbnail} 
                    alt="Thumbnail" 
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                  />
                  <div className="relative z-10 text-xl font-medium text-white">Select a view to explore</div>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between text-gray-400 text-sm">
               <span>
                  {activeView ? `Viewing: ${activeView.label}` : 'Select a view'}
               </span>
               {activeView && (
                 <a href={activeView.url} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-amber-500 transition-colors">
                    Open in new tab <ExternalLink className="h-3 w-3 ml-1" />
                 </a>
               )}
            </div>
          </div>

          {/* Sidebar / Info */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{project.name}</h1>
              <div className="flex items-center text-amber-500 mb-6">
                <MapPin className="h-5 w-5 mr-2" />
                <span className="font-medium">{project.location}</span>
              </div>
              <p className="text-gray-300 leading-relaxed border-l-2 border-slate-700 pl-4">
                {project.description}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Eye className="h-5 w-5 mr-2 text-amber-500" />
                Available Tours
              </h3>
              
              <div className="grid grid-cols-1 gap-3">
                {project.views.map((view, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveView(view)}
                    className={`w-full text-left px-5 py-4 rounded-xl transition-all duration-200 border flex items-center justify-between group ${
                      activeView === view 
                        ? 'bg-amber-500 text-slate-900 border-amber-500 font-semibold shadow-lg shadow-amber-900/20' 
                        : 'bg-slate-800 text-gray-300 border-slate-700 hover:border-slate-600 hover:bg-slate-750'
                    }`}
                  >
                    <span>{view.label}</span>
                    <span className={`text-xs uppercase tracking-wider px-2 py-1 rounded-md ${
                      activeView === view ? 'bg-black/10' : 'bg-black/20 text-gray-500'
                    }`}>
                      {view.type}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50">
              <h4 className="text-white font-medium mb-2">Interested in this property?</h4>
              <p className="text-sm text-gray-400 mb-4">Contact our sales team for a physical visit or pricing details.</p>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full py-3 bg-white text-slate-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Enquire Now
              </button>
            </div>

          </div>
        </div>
      </div>
      
      <EnquireModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        projectName={project.name} 
      />
    </div>
  );
};

export default ProjectDetails;