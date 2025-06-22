'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

// --- Interfaces e Dados (sem alteração) ---
interface Certificado {
  img: string;
  title: string;
}

interface CertificadoPair {
  front: Certificado;
  back: Certificado;
}

const certificados: Certificado[] = [
    { img: '/certificados/1.png', title: 'Certificado de Redes' },
    { img: '/certificados/2.png', title: 'Certificado de Redes' },
    { img: '/certificados/3.png', title: 'Certificado de ITIL' },
    { img: '/certificados/4.png', title: 'Certificado de ITIL' },
    { img: '/certificados/5.png', title: 'Certificado de logica de programação' },
    { img: '/certificados/6.png', title: 'Certificado de logica de programação' },
    { img: '/certificados/7.png', title: 'Certificado de Backend PHP' },
    { img: '/certificados/8.png', title: 'Certificado de Backend PHP' },
    { img: '/certificados/9.png', title: 'Certificado de Banco SQL' },
    { img: '/certificados/10.png', title: 'Certificado de Banco SQL' },
    { img: '/certificados/11.png', title: 'Certificado de Next.js FullStack' },
    { img: '/certificados/12.png', title: 'Certificado de Next.js FullStack' },
    { img: '/certificados/13.png', title: 'Certificado de Terminal Linux' },
    { img: '/certificados/14.png', title: 'Certificado de Terminal Linux' },
    { img: '/certificados/15.png', title: 'Certificado de JavaScript foco Backend' },
    { img: '/certificados/16.png', title: 'Certificado de Redes' },
];

const certificadoPairs: CertificadoPair[] = [];
for (let i = 0; i < certificados.length; i += 2) {
  if (i + 1 < certificados.length) {
    certificadoPairs.push({
      front: certificados[i],
      back: certificados[i + 1],
    });
  }
}

// --- Componente Principal (sem alterações) ---
export const Certificados =  ({ id }: { id: string }) => {

  const [selectedPair, setSelectedPair] = useState<CertificadoPair | null>(null);
  const [isShowingFront, setIsShowingFront] = useState(true);
  
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const openModal = (pair: CertificadoPair, element: HTMLDivElement) => {
    triggerRef.current = element;
    setSelectedPair(pair);
    setIsShowingFront(true);
  };

  const closeModal = () => {
    setSelectedPair(null);
    triggerRef.current?.focus();
  };

  const flipModalImage = () => {
    setIsShowingFront(prevState => !prevState);
  };
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, pair: CertificadoPair) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openModal(pair, event.currentTarget);
    }
  };

  return (
    <>
      <section id={id} aria-labelledby="certificados-heading" className="py-20">
        <h2 id="certificados-heading" className="text-5xl md:text-7xl font-bold text-center bg-stone-950/75 text-red-600 tracking-wider mb-12">
          CERTIFICADOS
        </h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
          {certificadoPairs.map((pair) => (
            <div 
              key={pair.front.img} 
              className="group aspect-[4/3] [perspective:1000px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900 rounded-lg"
              onClick={(e) => openModal(pair, e.currentTarget)}
              onKeyDown={(e) => handleKeyDown(e, pair)}
              tabIndex={0}
              role="button"
              aria-label={`Ver certificados: ${pair.front.title} e ${pair.back.title}`}
            >
              <div className="relative h-full w-full rounded-lg shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0 [backface-visibility:hidden]">
                  <Image src={pair.front.img} alt="" width={1500} height={1300} className="h-full w-full rounded-lg object-cover border-2 border-gray-700"/>
                </div>
                <div className="absolute inset-0 h-full w-full rounded-lg [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  <Image src={pair.back.img} alt="" width={1500} height={1300} className="h-full w-full rounded-lg object-cover border-2 border-gray-700"/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedPair && (
        <ModalPortal
          pair={selectedPair}
          isShowingFront={isShowingFront}
          onClose={closeModal}
          onFlip={flipModalImage}
        />
      )}
    </>
  );
};

// --- Componente do Portal do Modal (com a correção de altura) ---
const ModalPortal = ({ pair, isShowingFront, onClose, onFlip }: { 
  pair: CertificadoPair; 
  isShowingFront: boolean; 
  onClose: () => void;
  onFlip: () => void;
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    modalRef.current?.focus();
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const modalContent = (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        ref={modalRef}
        // A MUDANÇA ESTÁ AQUI: Adicionamos aspect-[4/3] para dar uma dimensão ao container
        className="relative w-11/12 aspect-[4/3] max-w-4xl max-h-[90vh] [perspective:1000px] focus:outline-none"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        <div 
          className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] cursor-pointer"
          style={{ transform: isShowingFront ? 'rotateY(0deg)' : 'rotateY(180deg)' }}
          onClick={onFlip}
        >
          <div className="absolute w-full h-full [backface-visibility:hidden]">
            <Image src={pair.front.img} alt={pair.front.title} width={1920} height={1080} className="h-full w-full object-contain rounded-lg"/>
          </div>
          <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <Image src={pair.back.img} alt={pair.back.title} width={1920} height={1080} className="h-full w-full object-contain rounded-lg"/>
          </div>
        </div>
      </div>
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold border-2 border-white z-10" 
        aria-label="Fechar modal"
      >&times;</button>
    </div>
  );
  
  return mounted ? createPortal(modalContent, document.body) : null;
};