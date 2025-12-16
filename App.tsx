import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails';
import { SearchProvider } from './context/SearchContext';
import { ProjectsProvider } from './context/ProjectsContext';

const App: React.FC = () => {
  return (
    <ProjectsProvider>
      <SearchProvider>
        <HashRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
          </Routes>
        </HashRouter>
      </SearchProvider>
    </ProjectsProvider>
  );
};

export default App;