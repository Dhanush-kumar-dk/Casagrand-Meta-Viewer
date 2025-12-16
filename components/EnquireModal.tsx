import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';

interface EnquireModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
}

const EnquireModal: React.FC<EnquireModalProps> = ({ isOpen, onClose, projectName }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Replace this URL with your deployed Google Apps Script Web App URL
    // Format: https://script.google.com/macros/s/DEPLOYMENT_ID/exec
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz_REPLACE_WITH_YOUR_SCRIPT_ID/exec';

    try {
      const data = new FormData();
      data.append('Project', projectName);
      data.append('Name', formData.name);
      data.append('Phone', formData.phone);
      data.append('Email', formData.email);
      data.append('SubmittedAt', new Date().toISOString());

      // Note: 'no-cors' mode is required for Google Apps Script web apps usually,
      // which means we won't get a readable response status, but the request will go through.
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: data,
        mode: 'no-cors'
      });

      alert(`Thank you for your interest in ${projectName}. We have stored your details and will contact you soon!`);
      setFormData({ name: '', phone: '', email: '' });
      onClose();
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was a problem submitting your enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-800/50">
          <h3 className="text-xl font-bold text-white">Enquire Now</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-slate-700 rounded-full"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          <p className="text-sm text-gray-400 mb-6 leading-relaxed">
            Fill out the form below to get more details.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label htmlFor="project" className="block text-sm font-medium text-gray-300 mb-1.5">Project Name</label>
              <input
                type="text"
                id="project"
                value={projectName}
                readOnly
                className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-3 text-gray-400 focus:outline-none cursor-not-allowed select-none"
              />
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1.5">Full Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1.5">Phone Number</label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">Email Address</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                placeholder="john@example.com"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-amber-500/50 disabled:cursor-not-allowed text-slate-900 font-bold py-3.5 rounded-lg transition-colors mt-2 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Enquiry'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnquireModal;