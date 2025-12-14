import React from 'react';
import { Mail, Linkedin, User, MessageSquare } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Visual Hero Header */}
      <div className="bg-gradient-to-br from-iscae-dark via-[#003366] to-iscae-blue text-white pt-32 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        {/* Animated Shapes */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-iscae-gold rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-overlay filter blur-[100px] opacity-10"></div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-iscae-gold text-xs font-bold tracking-widest mb-6 animate-fade-in">
            <MessageSquare className="w-3 h-3" />
            COMMUNAUTÉ
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 animate-slide-up">Restons en Contact</h1>
          <p className="text-lg md:text-xl text-blue-100/80 max-w-2xl mx-auto font-light leading-relaxed animate-slide-up" style={{animationDelay: '0.1s'}}>
            Une question ? Une contribution ? Rejoignez le réseau ou envoyez vos documents pour aider la communauté.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-24 -mt-20 relative z-20">
        <div className="grid md:grid-cols-2 gap-8 items-stretch animate-slide-up" style={{animationDelay: '0.2s'}}>
          
          {/* Developer Card - Modern & Visual */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl shadow-iscae-blue/10 border border-gray-100 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-iscae-gold/20 to-transparent rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
            
            <div className="relative z-10">
               <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-iscae-blue to-iscae-dark text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/20 transform -rotate-3 group-hover:rotate-0 transition-transform">
                      <User className="w-10 h-10" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Nejjar Abdelhafid</h2>
                    <p className="text-iscae-gold font-bold uppercase tracking-wider text-xs mt-1">Fondateur & Développeur</p>
                  </div>
               </div>

               <div className="space-y-4">
                  <a 
                     href="https://www.linkedin.com/in/abdelhafid-nejjar-417013309/" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="flex items-center p-4 bg-gray-50 border border-gray-100 rounded-xl hover:bg-[#0077b5] hover:text-white hover:border-transparent transition-all group/link"
                  >
                     <div className="w-10 h-10 bg-white text-[#0077b5] rounded-lg flex items-center justify-center mr-4 shadow-sm group-hover/link:bg-white/20 group-hover/link:text-white transition-colors">
                        <Linkedin className="w-5 h-5" />
                     </div>
                     <div>
                        <p className="font-bold text-gray-800 group-hover/link:text-white transition-colors">LinkedIn</p>
                        <p className="text-xs text-gray-500 group-hover/link:text-blue-100">Profil Professionnel</p>
                     </div>
                  </a>

                  <a 
                     href="mailto:NejjarHafed@gmail.com" 
                     className="flex items-center p-4 bg-gray-50 border border-gray-100 rounded-xl hover:bg-gradient-to-r hover:from-red-500 hover:to-orange-500 hover:text-white hover:border-transparent transition-all group/link"
                  >
                     <div className="w-10 h-10 bg-white text-red-500 rounded-lg flex items-center justify-center mr-4 shadow-sm group-hover/link:bg-white/20 group-hover/link:text-white transition-colors">
                        <Mail className="w-5 h-5" />
                     </div>
                     <div>
                        <p className="font-bold text-gray-800 group-hover/link:text-white transition-colors">Email</p>
                        <p className="text-xs text-gray-500 group-hover/link:text-red-100">NejjarHafed@gmail.com</p>
                     </div>
                  </a>
               </div>
            </div>
          </div>

          {/* Contribution Info Card */}
          <div className="bg-gradient-to-br from-iscae-dark to-[#00152e] rounded-3xl p-10 text-white flex flex-col justify-center relative overflow-hidden shadow-2xl shadow-black/20 group">
             {/* Decorative grid */}
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
             <div className="absolute bottom-0 right-0 w-64 h-64 bg-iscae-blue rounded-full filter blur-[80px] opacity-20 group-hover:opacity-30 transition-opacity"></div>

             <div className="relative z-10">
                <h3 className="text-3xl font-serif font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Contribuez au projet</h3>
                <p className="text-blue-100/80 leading-relaxed mb-8 font-light">
                   Ce site repose sur la force du collectif. Si vous disposez d'anciennes épreuves, de corrections ou de conseils pour les concours, votre aide est précieuse.
                </p>
                
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors">
                   <div className="flex items-center gap-3 mb-3">
                      <div className="w-2 h-2 rounded-full bg-iscae-gold animate-pulse"></div>
                      <p className="text-iscae-gold font-bold text-sm tracking-wide uppercase">L'Esprit ISCAE</p>
                   </div>
                   <p className="text-sm text-gray-300 italic">
                      "En partageant vos ressources aujourd'hui, vous aidez vos futurs camarades de promotion."
                   </p>
                </div>

                <div className="mt-8 flex justify-end">
                   <a href="mailto:NejjarHafed@gmail.com" className="text-sm font-bold text-white/50 hover:text-white flex items-center gap-2 transition-colors">
                      Envoyer un document <span className="text-lg">→</span>
                   </a>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;