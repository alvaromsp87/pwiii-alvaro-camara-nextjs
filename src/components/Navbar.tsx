// src/components/Navbar.tsx
'use client';
import { useState } from 'react';
import { FaGithub, FaLinkedin, FaBars, FaTimes } from 'react-icons/fa';

// Definimos os tipos das props que a Navbar vai receber
interface NavbarProps {
  onNavigate: (section: 'Hero' | 'Sobre' | 'Projetos' | 'Certificados') => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const getLinkClass = (section: string) => 
    `cursor-pointer text-gray-200 text-lg hover:text-red-500 transition-colors duration-300 ${activeSection === section ? 'text-red-600 font-bold' : ''}`;

  // Função para lidar com o clique no menu mobile
  const handleMobileLinkClick = (section: 'Hero' | 'Sobre' | 'Projetos' | 'Certificados') => {
    onNavigate(section); // Navega para a seção
    toggleMenu();      // Fecha o menu
  };

  return (
    <nav className="fixed top-0 w-full bg-black bg-opacity-50 backdrop-blur-sm p-4 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 
          className="text-3xl font-bold text-red-600 tracking-widest cursor-pointer"
          onClick={() => onNavigate('Hero')}
        >
         Alvaro Jose Martins Camara
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <span onClick={() => onNavigate('Sobre')} className={getLinkClass('Sobre')}>SOBRE</span>
          <span onClick={() => onNavigate('Projetos')} className={getLinkClass('Projetos')}>PROJETOS</span>
          <span onClick={() => onNavigate('Certificados')} className={getLinkClass('Certificados')}>CERTIFICADOS</span>
          
          <a href="https://github.com/alvaromsp87" target="_blank" rel="noopener noreferrer" aria-label="Link para o meu Github" className="text-2xl text-gray-200 hover:text-red-500 transition-colors duration-300"><FaGithub /></a>
          <a href="https://www.linkedin.com/in/alvaro-jose-martins-camara-ab265033/" target="_blank" rel="noopener noreferrer" aria-label="Link para o meu Linkedin" className="text-2xl text-gray-200 hover:text-red-500 transition-colors duration-300"><FaLinkedin /></a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-2xl text-gray-200">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu CORRIGIDO */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col items-center space-y-4 bg-black bg-opacity-80 p-4 rounded-lg">
          <span onClick={() => handleMobileLinkClick('Sobre')} className={getLinkClass('Sobre')}>SOBRE</span>
          <span onClick={() => handleMobileLinkClick('Projetos')} className={getLinkClass('Projetos')}>PROJETOS</span>
          <span onClick={() => handleMobileLinkClick('Certificados')} className={getLinkClass('Certificados')}>CERTIFICADOS</span>
          
          <div className="flex space-x-6 mt-4 pt-4 border-t border-gray-700">
            <a href="https://github.com/seu-usuario" target="_blank" rel="noopener noreferrer" aria-label="Link para o meu Github" className="text-3xl text-gray-200 hover:text-red-500"><FaGithub /></a>
            <a href="https://linkedin.com/in/seu-usuario" target="_blank" rel="noopener noreferrer" aria-label="Link para o meu Linkedin" className="text-3xl text-gray-200 hover:text-red-500"><FaLinkedin /></a>
          </div>
        </div>
      )}
    </nav>
  );
};