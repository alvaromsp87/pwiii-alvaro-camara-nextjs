// src/app/page.tsx
'use client';
import { useState } from 'react'; 
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Sobre } from "@/components/Sobre";
import { Projetos } from "@/components/Projetos";
import { Certificados } from "@/components/Certificados";

type Section = 'Hero' | 'Sobre' | 'Projetos' | 'Certificados';

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>('Hero');

  const handleNavigate = (section: Section) => {
    setActiveSection(section);
  };

  return (
    <main>
      <Navbar onNavigate={handleNavigate} activeSection={activeSection} />

     
      {activeSection === 'Hero' && <Hero onNavigate={() => handleNavigate('Sobre')} />}
      {activeSection === 'Sobre' && <Sobre />}
      {activeSection === 'Projetos' && <Projetos />}
      {activeSection === 'Certificados' && <Certificados />}

      <footer className="text-center p-4bg">
        <p className='bg-gray-100'>© 2025 - Feito por Alvaro Jose Martins Camara. The road so far...</p>
      </footer>
    </main>
  );
}