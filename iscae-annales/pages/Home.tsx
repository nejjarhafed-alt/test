import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookMarked, Share2, Award, ArrowRight, Quote as QuoteIcon, CheckCircle, ExternalLink, Eye } from 'lucide-react';
import { QUOTES, Document } from '../types';
import { getDocuments } from '../services/storageService';
import PDFViewerModal from '../components/PDFViewerModal';

const Home: React.FC = () => {
  const [recentDocs, setRecentDocs] = useState<Document[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [viewingDoc, setViewingDoc] = useState<Document | null>(null);

  useEffect(() => {
    const docs = getDocuments();
    if (docs.length > 0) {
      // Sort by dateAdded descending (newest first) and take the top 5
      const sorted = [...docs].sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()).slice(0, 5);
      setRecentDocs(sorted);
    }
  }, []);

  // Auto-cycle carousel
  useEffect(() => {
    if (recentDocs.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % recentDocs.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [recentDocs.length, isHovered]);

  const getTimeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `Il y a ${days} jour${days > 1 ? 's' : ''}`;
    if (hours > 0) return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`;
    if (minutes > 0) return `Il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
    return "À l'instant";
  };

  const currentDoc = recentDocs[currentIndex];

  const handleCardClick = (e: React.MouseEvent, doc: Document) => {
    e.preventDefault();
    setViewingDoc(doc);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Creative Hero Section */}
      <section className="relative bg-iscae-blue text-white min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-iscae-blue via-[#002b55] to-iscae-dark"></div>
        <div className="absolute inset-0 bg-mesh opacity-30"></div>
        
        {/* Abstract Shapes */}
        <div className="absolute top-20 right-[-100px] w-[500px] h-[500px] bg-iscae-gold rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-[-100px] left-[-50px] w-[300px] h-[300px] bg-blue-400 rounded-full mix-blend-overlay filter blur-[80px] opacity-20 animate-pulse-slow" style={{animationDelay: '1s'}}></div>
        
        {/* Geometric Overlay */}
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-5 hidden lg:block">
           <svg viewBox="0 0 100 100" className="h-full w-full fill-white">
              <path d="M0 0 L100 0 L100 100 Z" />
           </svg>
        </div>

        <div className="container mx-auto px-6 relative z-10 pt-20">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-3/5 text-center md:text-left animate-slide-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-iscae-gold text-xs font-bold tracking-widest mb-6">
                <span className="w-2 h-2 rounded-full bg-iscae-gold animate-pulse"></span>
                COMMUNAUTÉ PRÉPA
              </div>
              <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-[1.1]">
                L'Excellence se <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-iscae-gold to-yellow-200">Partage</span>
              </h1>
              <p className="text-lg md:text-xl text-blue-100/90 mb-10 leading-relaxed max-w-xl mx-auto md:mx-0 font-light">
                La première plateforme collaborative dédiée aux préparationnaires (ECT & ECS). Accédez aux annales de Maths et Gestion pour réussir.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link 
                  to="/library" 
                  className="group relative px-8 py-4 bg-iscae-gold text-iscae-dark font-bold rounded-xl overflow-hidden shadow-xl shadow-iscae-gold/20 hover:shadow-iscae-gold/40 transition-all transform hover:-translate-y-1"
                >
                  <div className="absolute inset-0 w-full h-full bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <span className="relative flex items-center justify-center">
                    Explorer les Annales <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link 
                  to="/contact" 
                  className="px-8 py-4 bg-white/5 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all backdrop-blur-sm"
                >
                  Contribuer
                </Link>
              </div>
            </div>

            {/* Hero Visual/Floating Card - Interactive & Dynamic Carousel */}
            <div 
              className="md:w-2/5 relative animate-float hidden md:block"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {currentDoc ? (
                <div className="relative group perspective-1000">
                  <div 
                    key={currentDoc.id} // Changing key triggers fade animation
                    onClick={(e) => handleCardClick(e, currentDoc)}
                    className="block relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl text-white transform rotate-3 hover:rotate-0 hover:scale-[1.02] hover:bg-white/15 transition-all duration-500 cursor-pointer animate-fade-in"
                  >
                    <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                      <div>
                        <p className="text-xs text-iscae-gold font-bold uppercase tracking-wider mb-1 flex items-center gap-2">
                           Derniers Ajouts 
                           <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                        </p>
                        <p className="font-serif text-xl font-bold line-clamp-1" title={currentDoc.title}>
                          {currentDoc.title}
                        </p>
                      </div>
                      <div className="bg-iscae-gold text-iscae-dark font-bold text-xs px-2 py-1 rounded shadow-lg">
                        {currentDoc.year}
                      </div>
                    </div>
                    
                    <div className="space-y-3 opacity-80 mb-6">
                      <div className="flex items-center gap-2 text-sm">
                         <span className="w-1 h-4 bg-iscae-gold rounded-full"></span>
                         <span>{currentDoc.category}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-blue-200">
                         <span className="w-1 h-4 bg-blue-300 rounded-full"></span>
                         <span>{currentDoc.source}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-iscae-gold to-yellow-300 flex items-center justify-center text-iscae-dark font-bold shadow-md">
                          <Share2 className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold">Partagé par {currentDoc.addedBy}</p>
                          <p className="text-xs text-blue-200">{getTimeAgo(currentDoc.dateAdded)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-iscae-gold font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                         <Eye className="w-4 h-4" /> Visualiser
                      </div>
                    </div>
                  </div>

                  {/* Carousel Indicators */}
                  {recentDocs.length > 1 && (
                    <div className="absolute -bottom-10 left-0 right-0 flex justify-center gap-2 z-20">
                      {recentDocs.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentIndex(idx)}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            idx === currentIndex 
                              ? 'w-8 bg-iscae-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]' 
                              : 'w-2 bg-white/20 hover:bg-white/40'
                          }`}
                          aria-label={`Voir le document ${idx + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                /* Fallback State if no documents exist */
                <div className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl text-white transform rotate-3">
                   <div className="animate-pulse flex space-x-4">
                      <div className="flex-1 space-y-4 py-1">
                        <div className="h-4 bg-white/20 rounded w-3/4"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-white/20 rounded"></div>
                          <div className="h-4 bg-white/20 rounded w-5/6"></div>
                        </div>
                      </div>
                   </div>
                   <p className="mt-4 text-center text-sm opacity-70">Chargement des annales...</p>
                </div>
              )}
              
              {/* Decorative elements behind card */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-iscae-gold rounded-full mix-blend-multiply opacity-50 blur-xl animate-pulse"></div>
            </div>
          </div>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
            <svg className="relative block w-[calc(100%+1.3px)] h-[60px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-slate-50"></path>
            </svg>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-slate-50 relative z-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-serif font-bold text-iscae-dark mb-4">Notre Philosophie</h2>
             <div className="w-20 h-1 bg-iscae-gold mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
             {[
               { icon: <Share2 />, title: "Solidarité", desc: "Le savoir se multiplie lorsqu'il est partagé. Une communauté soudée pour la réussite de tous.", color: "bg-blue-50 text-iscae-blue" },
               { icon: <BookMarked />, title: "Ressources", desc: "Une bibliothèque centralisée pour Mathématiques et Gestion. Optimisée pour ECT & ECS.", color: "bg-yellow-50 text-yellow-700" },
               { icon: <Award />, title: "Excellence", desc: "S'entraîner sur des sujets réels (2012-2025) pour viser les meilleurs résultats aux concours.", color: "bg-teal-50 text-teal-700" }
             ].map((item, index) => (
               <div key={index} className="group bg-white p-8 rounded-3xl border border-gray-100 shadow-lg shadow-gray-200/50 hover:shadow-2xl hover:shadow-iscae-blue/10 hover:-translate-y-2 transition-all duration-300">
                  <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-iscae-dark group-hover:text-iscae-gold transition-colors">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed">
                    {item.desc}
                  </p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 bg-iscae-dark relative overflow-hidden text-white">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <QuoteIcon className="w-16 h-16 text-iscae-gold mx-auto mb-8 opacity-30" />
          <blockquote className="max-w-4xl mx-auto">
            <p className="font-serif text-3xl md:text-4xl italic leading-relaxed mb-8 text-blue-50">
              "{QUOTES[0].text}"
            </p>
            <footer className="flex flex-col items-center">
               <div className="w-12 h-1 bg-iscae-gold mb-4 rounded-full"></div>
               <cite className="not-italic font-bold text-lg tracking-widest uppercase text-iscae-gold">{QUOTES[0].author}</cite>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
         <div className="container mx-auto px-6">
            <div className="bg-gradient-to-r from-iscae-gold/10 to-transparent rounded-3xl p-10 md:p-16 border border-iscae-gold/20 flex flex-col md:flex-row items-center justify-between gap-10">
               <div>
                  <h2 className="text-3xl font-serif font-bold text-iscae-dark mb-4">Prêt à réussir ?</h2>
                  <ul className="space-y-2 text-gray-600 mb-6">
                     <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-iscae-gold" /> Accès illimité aux Annales</li>
                     <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-iscae-gold" /> Pas d'inscription requise</li>
                     <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-iscae-gold" /> Mises à jour régulières</li>
                  </ul>
               </div>
               <Link to="/library" className="whitespace-nowrap px-10 py-5 bg-iscae-blue text-white font-bold rounded-xl shadow-xl shadow-iscae-blue/20 hover:bg-iscae-dark hover:scale-105 transition-all">
                  Accéder à la Bibliothèque
               </Link>
            </div>
         </div>
      </section>

      <PDFViewerModal 
        isOpen={!!viewingDoc}
        onClose={() => setViewingDoc(null)}
        url={viewingDoc?.url || ''}
        title={viewingDoc?.title || ''}
      />
    </div>
  );
};

export default Home;