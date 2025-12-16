import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { Project } from '../types';
import { PROJECTS as INITIAL_PROJECTS } from '../constants';

interface ProjectsContextType {
  projects: Project[];
  addProject: (project: Project) => void;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export const ProjectsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // We only store the *newly created* projects in local storage, not the hardcoded ones.
  const [customProjects, setCustomProjects] = useState<Project[]>(() => {
    try {
      // 1. Try to load from the dedicated custom projects key
      const savedCustom = localStorage.getItem('casagrand_custom_projects');
      if (savedCustom) {
        return JSON.parse(savedCustom);
      }
      
      // 2. Migration: If not found, check if we have data in the old key (combined list)
      // and extract only the custom ones to migrate them to the new structure.
      const oldAllProjects = localStorage.getItem('casagrand_projects');
      if (oldAllProjects) {
        const all: Project[] = JSON.parse(oldAllProjects);
        const initialIds = new Set(INITIAL_PROJECTS.map(p => p.id));
        // Keep projects that are NOT in the constants file
        return all.filter(p => !initialIds.has(p.id));
      }
    } catch (error) {
      console.error('Failed to load projects from localStorage:', error);
    }
    return [];
  });

  // Save only the custom projects to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('casagrand_custom_projects', JSON.stringify(customProjects));
    } catch (error) {
      console.error('Failed to save projects to localStorage:', error);
    }
  }, [customProjects]);

  const addProject = (project: Project) => {
    setCustomProjects(prev => [project, ...prev]);
  };

  // Merge Custom + Initial projects
  // We filter custom projects to ensure no duplicates if the user manually updated constants.ts with a project that is also in LS
  const projects = useMemo(() => {
    const initialIds = new Set(INITIAL_PROJECTS.map(p => p.id));
    const uniqueCustom = customProjects.filter(p => !initialIds.has(p.id));
    
    // Custom projects appear first, then the standard ones
    return [...uniqueCustom, ...INITIAL_PROJECTS];
  }, [customProjects]);

  return (
    <ProjectsContext.Provider value={{ projects, addProject }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }
  return context;
};