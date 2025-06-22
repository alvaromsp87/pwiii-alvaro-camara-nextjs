// src/components/Sobre.tsx
'use client';
import Image from 'next/image';
import { FaUser, FaCode, FaBriefcase } from 'react-icons/fa';

// Dados das suas habilidades para facilitar a manutenção
const skills = [
  'JavaScript', 'TypeScript', 'React', 'Next.js', 
  'PHP', 'SQL', 'HTML5', 'CSS3', 'Tailwind CSS', 
  'ITIL', 'Gestão de Projetos', 'Infraestrutura de TI'
];

export const Sobre = ({ id }: { id: string }) => {
  return (
    <section id={id} className="py-20 md:py-32 bg-stone-900/50">
      <div className="container mx-auto px-4">
        
        {/* Título Principal */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-7xl font-bold text-red-600 tracking-wider bg-stone-950/75 inline-block px-4 py-2 rounded-lg">
            SOBRE MIM
          </h2>
        </div>

        {/* Container principal com duas colunas */}
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 bg-black/50 p-8 rounded-xl shadow-2xl shadow-black/30">
          
          {/* Coluna da Esquerda: Foto */}
          <div className="w-full md:w-1/3 flex-shrink-0">
            <div className="relative aspect-square rounded-full overflow-hidden shadow-lg border-4 border-red-600/50 mx-auto w-48 h-48 md:w-full md:h-auto md:rounded-xl">
              <Image 
                src="/foto.jpg" 
                alt="Foto de Alvaro Jose Martins Camara"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Coluna da Direita: Conteúdo */}
          <div className="w-full md:w-2/3 text-gray-300">
            <div className="flex items-center gap-3">
              <FaUser className="text-red-500 text-3xl" />
              <h3 className="text-3xl font-bold text-white">Um pouco sobre mim.</h3>
            </div>
            <p className="mt-4 text-lg leading-relaxed">
              Olá, sou o Alvaro! Minha carreira é uma jornada de constante evolução, construída sobre uma base sólida de mais de uma década em gestão, contabilidade e atendimento ao cliente. Essa trajetória diversificada foi fundamental para me ensinar a disciplina dos processos, a visão analítica para resolver problemas complexos e a empatia para entender as reais necessidades das pessoas.
            </p>
            <p className="mt-4 text-lg leading-relaxed">
              Hoje, aplico essa bagagem única no suporte de TI e infraestrutura na Prefeitura de São Paulo. Neste ambiente, onde os desafios são imensos, minha experiência anterior me permite ir além do técnico, buscando sempre o caminho mais estratégico e eficiente.
            </p>
            <p className="mt-4 text-lg leading-relaxed">
              Em paralelo, estou em um processo focado de transição para o Desenvolvimento de Software, impulsionado pela formação na ETEC e por um aprendizado contínuo na Alura. Meu objetivo é unir toda a minha experiência para construir aplicações de alto impacto, encarando a programação como a 'capacete' definitiva, onde transformo desafios em soluções.
            </p>

            <div className="mt-8 pt-6 border-t border-gray-700/50">
              <div className="flex items-center gap-3 mb-4">
                <FaCode className="text-red-500 text-3xl" />
                <h4 className="text-2xl font-bold text-white">Habilidades Técnicas</h4>
              </div>
              <div className="flex flex-wrap gap-3">
                {skills.map(skill => (
                  <span key={skill} className="bg-stone-800 text-red-400 font-mono py-1 px-3 rounded-md text-sm shadow-md">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};