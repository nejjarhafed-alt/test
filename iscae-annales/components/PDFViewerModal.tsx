import React from 'react';
import { X, ExternalLink, FileText } from 'lucide-react';

interface PDFViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

const PDFViewerModal: React.FC<PDFViewerModalProps> = ({ isOpen, onClose, url, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fade-in">
      <div 
        className="bg-white rounded-2xl w-full h-full max-w-6xl max-h-[90vh] flex flex-col relative animate-slide-up overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-iscae-dark text-white border-b border-gray-700">
           <div className="flex items-center gap-3 overflow-hidden">
             <div className="p-2 bg-white/10 rounded-lg">
                <FileText className="w-5 h-5 text-iscae-gold" />
             </div>
             <h3 className="font-bold text-lg truncate pr-4 text-gray-100">{title}</h3>
           </div>
           
           <div className="flex items-center gap-2">
              <a 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm font-medium" 
                title="Ouvrir dans un nouvel onglet"
              >
                 <span>Nouvel onglet</span>
                 <ExternalLink className="w-4 h-4" />
              </a>
              <button 
                onClick={onClose} 
                className="p-2 hover:bg-red-500/80 rounded-full transition-colors ml-2"
                aria-label="Fermer"
              >
                <X className="w-6 h-6" />
              </button>
           </div>
        </div>

        {/* Modal Content (Iframe) */}
        <div className="flex-1 bg-gray-100 relative w-full h-full">
           <iframe 
             src={url} 
             className="w-full h-full block" 
             title={title}
             allow="autoplay"
           >
           </iframe>
           
           {/* Fallback / Loading background just in case */}
           <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 -z-10">
              <p>Chargement du document...</p>
              <p className="text-sm mt-2">Si le document ne s'affiche pas, utilisez le bouton "Nouvel onglet".</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PDFViewerModal;