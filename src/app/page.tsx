// src/app/page.tsx
'use client';
import { useState, useEffect } from 'react'; 
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Sobre } from "@/components/Sobre";
import { Projetos } from "@/components/Projetos";
import { Certificados } from "@/components/Certificados";

type Section = 'Hero' | 'Sobre' | 'Projetos' | 'Certificados';

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>('Hero');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeSection]);

  const handleNavigate = (section: Section) => {
    setActiveSection(section);
  };

  return (
        <main className="pt-20"> 

      <Navbar onNavigate={handleNavigate} activeSection={activeSection} />

      {activeSection === 'Hero' && <Hero onNavigate={() => handleNavigate('Sobre')} />}
      
      {/* CORREÇÃO APLICADA AQUI */}
      {activeSection === 'Sobre' && <Sobre id="Sobre" />} 
      
      {/* Você precisará fazer o mesmo para os outros se eles também exigirem um ID */}
      {activeSection === 'Projetos' && <Projetos id="Projetos" />}
      {activeSection === 'Certificados' && <Certificados id="Certificados" />}

      <footer className="text-center p-4bg">
        <p className='bg-gray-100'>© 2025 - Feito por Alvaro Jose Martins Camara. The road so far...</p>
      </footer>
    </main>
  );
}