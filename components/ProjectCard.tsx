import React from 'react';
import { Project } from '../types';
import { MapPin, ArrowRight, Cuboid } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="group bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-900/20 cursor-pointer"
      onClick={() => navigate(`/project/${project.id}`)}
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={project.thumbnail} 
          alt={project.name} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-2xl font-bold text-white mb-1">{project.name}</h3>
          <div className="flex items-center text-gray-300 text-sm">
            <MapPin className="h-4 w-4 mr-1 text-amber-500" />
            {project.location}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-gray-400 mb-6 line-clamp-2">
          {project.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-amber-500 font-medium bg-amber-500/10 px-3 py-1 rounded-full">
            <Cuboid className="h-4 w-4" />
            {project.views.length} Views Available
          </div>
          
          <button className="flex items-center gap-2 text-white font-medium group-hover:text-amber-400 transition-colors">
            View Details 
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;