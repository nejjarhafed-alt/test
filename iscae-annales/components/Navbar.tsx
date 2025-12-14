import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Home, ShieldCheck, Phone, Menu, X } from 'lucide-react';

interface NavbarProps {
  onAdminClick: () => void;
  isAdmin: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onAdminClick, isAdmin, onLogout }) => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path 
    ? "text-iscae-gold font-medium relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-iscae-gold" 
    : "text-white/80 hover:text-white transition-colors";

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-iscae-blue/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Logo Area */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg group-hover:rotate-3 transition-transform duration-300">
               <span className="font-serif font-bold text-iscae-blue text-2xl">I</span>
            </div>
            <div className="flex flex-col">
              <span className={`font-serif text-lg font-bold tracking-wide leading-none transition-colors ${scrolled ? 'text-white' : 'text-white'}`}>
                ISCAE
              </span>
              <span className="text-[10px] text-iscae-gold uppercase tracking-[0.2em] font-medium">ANNALES</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 text-sm tracking-wide">
            <Link to="/" className={`flex items-center gap-2 ${isActive('/')}`}>
              <span>ACCUEIL</span>
            </Link>
            <Link to="/library" className={`flex items-center gap-2 ${isActive('/library')}`}>
              <span>BIBLIOTHÈQUE</span>
            </Link>
            <Link to="/contact" className={`flex items-center gap-2 ${isActive('/contact')}`}>
              <span>CONTACT</span>
            </Link>
            
            {isAdmin ? (
              <div className="flex items-center gap-4 ml-6 pl-6 border-l border-white/20">
                <Link to="/admin" className={`flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all ${location.pathname === '/admin' ? 'text-green-300' : 'text-white'}`}>
                  <ShieldCheck className="w-4 h-4" />
                  <span>ADMIN</span>
                </Link>
                <button 
                  onClick={onLogout}
                  className="text-xs text-white/70 hover:text-white underline underline-offset-4"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <button 
                onClick={onAdminClick}
                className="group flex items-center justify-center w-8 h-8 rounded-full bg-white/5 hover:bg-iscae-gold/20 transition-all ml-2"
                title="Accès Administrateur"
              >
                <ShieldCheck className="w-4 h-4 text-white/50 group-hover:text-iscae-gold transition-colors" />
              </button>
            )}
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-iscae-blue/95 backdrop-blur-md border-t border-white/10 p-4 shadow-xl">
           <div className="flex flex-col space-y-4">
             <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-iscae-gold block py-2">Accueil</Link>
             <Link to="/library" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-iscae-gold block py-2">Bibliothèque</Link>
             <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-iscae-gold block py-2">Contact</Link>
             <div className="h-px bg-white/10 my-2"></div>
             {isAdmin ? (
               <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="text-green-300 block py-2">Tableau de Bord</Link>
             ) : (
               <button onClick={() => {onAdminClick(); setMobileMenuOpen(false);}} className="text-white/70 block py-2">Accès Admin</button>
             )}
           </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;