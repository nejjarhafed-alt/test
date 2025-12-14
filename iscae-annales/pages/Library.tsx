import React, { useState, useEffect } from 'react';
import { getDocuments, incrementDownloads } from '../services/storageService';
import { Document, Category, Source } from '../types';
import { FileText, Download, Search, Filter, BookOpen, Eye } from 'lucide-react';
import PDFViewerModal from '../components/PDFViewerModal';

const Library: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterSource, setFilterSource] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for PDF Viewer
  const [viewingDoc, setViewingDoc] = useState<Document | null>(null);

  useEffect(() => {
    setDocuments(getDocuments());
  }, []);

  const filteredDocs = documents.filter(doc => {
    const matchesCategory = filterCategory === 'All' || doc.category === filterCategory;
    const matchesSource = filterSource === 'All' || doc.source === filterSource;
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSource && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* Visual Header with Gradient */}
      <div className="bg-gradient-to-r from-iscae-blue via-[#004e92] to-iscae-dark text-white pt-32 pb-20 relative overflow-hidden">
         {/* Background Decoration */}
         <div className="absolute inset-0 bg-mesh opacity-20"></div>
         <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
         
         <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
               <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-iscae-gold text-xs font-bold tracking-widest mb-4">RESSOURCES PRÉPA</span>
               <h1 className="text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight">Bibliothèque Numérique</h1>
               
               {/* Search Bar */}
               <div className="relative group max-w-2xl mx-auto transform hover:scale-[1.02] transition-transform duration-300">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                     <Search className="h-5 w-5 text-gray-300 group-focus-within:text-iscae-gold transition-colors" />
                  </div>
                  <input
                     type="text"
                     className="block w-full pl-14 pr-6 py-5 rounded-2xl border-none bg-white/10 backdrop-blur-xl text-white placeholder-gray-300 focus:ring-2 focus:ring-iscae-gold focus:bg-white/20 transition-all shadow-2xl"
                     placeholder="Rechercher une épreuve de Maths ou Gestion..."
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                  />
               </div>
            </div>
         </div>
      </div>

      <div className="container mx-auto px-6 py-12 -mt-10 relative z-20">
        {/* Filters Bar */}
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-6 mb-10 flex flex-col md:flex-row gap-6 items-center justify-between border border-gray-100 animate-slide-up">
           <div className="flex items-center gap-2 text-iscae-dark font-bold text-lg">
              <Filter className="w-5 h-5 text-iscae-gold" />
              <span>Filtres</span>
           </div>
           <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="relative">
                <select
                  className="appearance-none w-full md:w-48 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:border-iscae-blue focus:ring-2 focus:ring-iscae-blue/20 outline-none cursor-pointer hover:bg-white transition-colors"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <option value="All">Toutes Matières</option>
                  {Object.values(Category).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>

              <div className="relative">
                <select
                  className="appearance-none w-full md:w-48 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:border-iscae-blue focus:ring-2 focus:ring-iscae-blue/20 outline-none cursor-pointer hover:bg-white transition-colors"
                  value={filterSource}
                  onChange={(e) => setFilterSource(e.target.value)}
                >
                  <option value="All">Toutes Filières</option>
                  {Object.values(Source).map(src => (
                    <option key={src} value={src}>{src}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
           </div>
        </div>

        {/* Results Grid */}
        {filteredDocs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400 bg-white rounded-3xl border border-dashed border-gray-200">
            <BookOpen className="w-16 h-16 mb-4 opacity-20" />
            <p className="text-lg font-medium">Aucun document ne correspond à votre recherche.</p>
            <button onClick={() => {setFilterCategory('All'); setFilterSource('All'); setSearchTerm('')}} className="mt-4 text-iscae-blue hover:underline">Réinitialiser les filtres</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDocs.map((doc, index) => (
              <div 
                key={doc.id} 
                className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl hover:shadow-iscae-blue/10 border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 transform hover:-translate-y-2"
                style={{animationDelay: `${index * 50}ms`}}
              >
                {/* Visual Strip */}
                <div className={`h-2 w-full bg-gradient-to-r ${
                    doc.category === Category.MATHS ? 'from-blue-500 to-cyan-400' :
                    'from-orange-400 to-red-500'
                }`}></div>
                
                <div className="p-6 flex-grow flex flex-col relative">
                   <div className="absolute top-4 right-4 text-gray-100 group-hover:text-gray-50 transition-colors">
                      <FileText className="w-24 h-24 opacity-10 transform rotate-12" />
                   </div>

                  <div className="flex justify-between items-center mb-4 relative z-10">
                    <span className="px-3 py-1 bg-gray-50 text-gray-600 text-[10px] font-bold rounded-lg uppercase tracking-wider border border-gray-100">
                      {doc.category}
                    </span>
                    <span className="font-serif font-bold text-xl text-gray-400 group-hover:text-iscae-gold transition-colors">
                      {doc.year}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-iscae-blue transition-colors leading-snug relative z-10 line-clamp-2">
                    {doc.title}
                  </h3>
                  
                  <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400 relative z-10">
                    <span className="flex items-center gap-1.5 font-medium">
                      <span className={`w-2 h-2 rounded-full ${doc.source === Source.ECT ? 'bg-indigo-400' : 'bg-pink-400'}`}></span>
                      {doc.source}
                    </span>
                    <span>Par {doc.addedBy}</span>
                  </div>
                </div>

                {/* Actions Footer - Updated to include Preview */}
                <div className="px-5 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-2">
                   <button 
                      onClick={() => setViewingDoc(doc)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-bold text-iscae-blue hover:bg-iscae-blue hover:text-white transition-all"
                   >
                      <Eye className="w-4 h-4" /> Visualiser
                   </button>
                   
                   <div className="w-px h-6 bg-gray-200"></div>

                   <a 
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => incrementDownloads()}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-bold text-gray-600 hover:text-iscae-gold transition-all"
                  >
                    <Download className="w-4 h-4" /> Télécharger
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PDF Viewer Modal */}
      <PDFViewerModal 
        isOpen={!!viewingDoc}
        onClose={() => setViewingDoc(null)}
        url={viewingDoc?.url || ''}
        title={viewingDoc?.title || ''}
      />
    </div>
  );
};

export default Library;