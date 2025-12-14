import React, { useState } from 'react';
import { Linkedin, Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-iscae-dark text-white pt-10 pb-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 border-b border-iscae-blue pb-8">
          
          {/* About */}
          <div>
            <h3 className="font-serif text-xl font-bold mb-4 text-iscae-gold">ISCAE ANNALES</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Une initiative bénévole pour aider les étudiants des classes préparatoires et passerelles à réussir leur concours. Basé sur le principe du partage et de l'entraide.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact & Support</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-300 hover:text-white transition-colors">
                <Mail className="w-5 h-5 mr-3 text-iscae-gold" />
                <a href="mailto:NejjarHafed@gmail.com">NejjarHafed@gmail.com</a>
              </li>
              <li className="flex items-center text-gray-300 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5 mr-3 text-iscae-gold" />
                <a 
                  href="https://www.linkedin.com/in/abdelhafid-nejjar-417013309/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Nejjar Abdelhafid
                </a>
              </li>
            </ul>
          </div>

          {/* Developer Credit */}
          <div className="flex flex-col justify-start md:justify-center items-start md:items-end">
             <span className="text-xs text-gray-400 uppercase tracking-widest mb-2">Développé par</span>
             <a 
                href="https://www.linkedin.com/in/abdelhafid-nejjar-417013309/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-300 border border-transparent hover:border-iscae-gold"
             >
               <div className="mr-3 text-right">
                 <p className="font-bold text-sm text-white group-hover:text-iscae-gold transition-colors">Nejjar Abdelhafid</p>
                 <p className="text-[10px] text-gray-400">Ingénierie & Développement</p>
               </div>
               <Linkedin className="w-6 h-6 text-[#0A66C2] bg-white rounded-sm" />
             </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} ISCAE ANNALES. Site à but non lucratif.</p>
          <p className="flex items-center mt-2 md:mt-0">
            Fait avec <Heart className="w-3 h-3 mx-1 text-red-500 fill-current" /> pour la communauté étudiante
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;