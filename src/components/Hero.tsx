// src/components/Hero.tsx
'use client';
import React from 'react';

interface HeroProps {
  onNavigate: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {

  return (
    <section 
      id="hero" 
      className="h-screen flex flex-col justify-center items-center text-white bg-cover bg-center  bg-stone-950/65" >
      <div className="absolute top-0 left-0 w-full h-full bg-opacity-60 z-0" />
      <div className="relative z-10 text-center p-4 bg-stone-950/75">
        <h1 className="text-5xl md:text-7xl font-bold text-red-600 tracking-wider uppercase" style={{ fontFamily: 'var(--font-bebas-neue)' }}>
          Alvaro Jose Martins Camara
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-gray-200 font-mono">
          Desenvolvedor de Software & Caçador de Bugs
        </p>
        <button 
          onClick={onNavigate}
          className="mt-8 inline-block px-8 py-3 border-2 border-red-600 text-red-600 font-bold tracking-widest uppercase transition-all duration-300 hover:bg-red-600 hover:text-white"
        >
          Conheça a História
        </button>
      </div>
    </section>
  );
};