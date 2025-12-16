import React from 'react';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToProjects = () => {
    const element = document.getElementById('projects-grid');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="object-cover w-full h-full"
          poster="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop"
        >
          {/* High quality modern architecture video */}
          <source src="https://videos.pexels.com/video-files/3205917/3205917-hd_1920_1080_25fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Cinematic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/20 to-slate-900"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 animate-fade-in-up">
        <div className="space-y-6 max-w-4xl mx-auto">
          <h2 className="text-amber-400 font-medium tracking-[0.2em] uppercase text-sm md:text-base animate-slide-down">
            Premium Living Spaces
          </h2>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight drop-shadow-2xl">
            Building Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
              Legacy
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed opacity-90">
            Experience the pinnacle of luxury with Casagrand's award-winning residential projects.
          </p>
        </div>

        <div className="absolute bottom-12 left-0 right-0 flex justify-center">
          <button 
            onClick={scrollToProjects}
            className="group flex flex-col items-center gap-3 text-white/80 hover:text-white transition-colors"
            aria-label="Scroll to projects"
          >
            <span className="text-sm font-medium tracking-widest uppercase">Explore</span>
            <div className="p-2 border border-white/20 rounded-full group-hover:border-amber-500/50 group-hover:bg-amber-500/10 transition-all">
              <ChevronDown className="h-6 w-6 animate-bounce text-amber-500" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;