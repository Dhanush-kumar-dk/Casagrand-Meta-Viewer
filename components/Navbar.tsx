import React, { useState, useEffect } from 'react';
import { Search, Menu, Plus } from 'lucide-react';
import { useSearch } from '../context/SearchContext';
import { Link, useLocation } from 'react-router-dom';
import CreateProjectModal from './CreateProjectModal';

const Navbar: React.FC = () => {
  const { searchTerm, setSearchTerm } = useSearch();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Navbar is transparent on home page until scrolled
  const isHome = location.pathname === '/';
  const isTransparent = isHome && !scrolled;

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isTransparent 
            ? 'bg-transparent py-4' 
            : 'bg-slate-900/95 backdrop-blur-md border-b border-slate-800 py-2 shadow-lg'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo - Left */}
            <Link to="/" className="flex items-center gap-2 group cursor-pointer">
              <img 
                src="https://www.casagrand.co.in/wp-content/uploads/2021/07/Casagrand-Logo1.png?ver=1.211" 
                alt="Casagrand" 
                className={`transition-all duration-300 ${scrolled ? 'h-10' : 'h-12'} w-auto object-contain brightness-0 invert`} 
              />
            </Link>

            {/* Search - Middle */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className={`h-5 w-5 transition-colors ${isTransparent ? 'text-white/70' : 'text-gray-400'}`} />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className={`block w-full pl-10 pr-3 py-2 border rounded-full leading-5 focus:outline-none focus:ring-2 focus:ring-amber-500/50 sm:text-sm transition-all duration-300 ${
                    isTransparent 
                      ? 'bg-white/10 border-white/20 text-white placeholder-white/70 focus:bg-white/20' 
                      : 'bg-slate-800 border-slate-700 text-gray-100 placeholder-gray-500 focus:bg-slate-950 focus:border-amber-500'
                  }`}
                  placeholder="Find your dream home..."
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsCreateModalOpen(true)}
                className={`hidden md:flex items-center gap-2 font-medium px-4 py-2 rounded-lg transition-colors border ${
                  isTransparent 
                    ? 'text-amber-400 border-amber-400/50 hover:bg-amber-400/10' 
                    : 'text-amber-500 border-amber-500/20 hover:bg-amber-500/10'
                }`}
              >
                <Plus className="h-4 w-4" />
                Create
              </button>

              <button className={`hidden md:block font-medium px-4 py-2 rounded-lg transition-colors ${
                isTransparent ? 'text-white hover:bg-white/10' : 'text-gray-300 hover:text-white hover:bg-slate-800'
              }`}>
                Projects
              </button>
              
              <button 
                onClick={() => setIsCreateModalOpen(true)} 
                className="md:hidden p-2 text-amber-400 hover:bg-white/10 rounded-lg"
              >
                <Plus className="h-6 w-6" />
              </button>
              
              <button className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg">
                 <Search className="h-6 w-6" />
              </button>
              <button className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg">
                 <Menu className="h-6 w-6" />
              </button>
            </div>

          </div>
        </div>
      </nav>
      
      <CreateProjectModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </>
  );
};

export default Navbar;