import React from 'react';
import Hero from '../components/Hero';
import ProjectCard from '../components/ProjectCard';
import { useSearch } from '../context/SearchContext';
import { useProjects } from '../context/ProjectsContext';

const Home: React.FC = () => {
  const { searchTerm } = useSearch();
  const { projects } = useProjects();

  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    project.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-900">
      <Hero />
      
      <section id="projects-grid" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Projects</h2>
            <p className="text-gray-400 max-w-2xl">
              Discover our award-winning properties. Click on a project to explore immersive 360° tours of interiors, exteriors, and amenities.
            </p>
          </div>
          <div className="text-gray-500 font-medium">
            Showing {filteredProjects.length} Projects
          </div>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-800/50 rounded-2xl border border-dashed border-slate-700">
            <h3 className="text-xl text-gray-300 font-medium">No projects found matching "{searchTerm}"</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search terms.</p>
          </div>
        )}
      </section>

      <footer className="bg-slate-950 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500">© 2024 Casagrand. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;