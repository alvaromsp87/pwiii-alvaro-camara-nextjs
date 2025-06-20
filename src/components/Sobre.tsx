// src/components/Sobre.tsx
import Image from 'next/image';

export const Sobre = () => {
  return (
    <section id="sobre" className="min-h-screen flex items-center justify-center bg-cover bg-center" >
      <div className="container mx-auto p-4 text-center bg-stone-950/75  rounded-lg max-w-4xl">
        <h2 className="text-5xl md:text-7xl font-bold text-red-600 tracking-wider mb-6">
         <br/>Um pouco sobre mim.
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <Image
            src="/foto.jpg" 
            alt="Foto de Perfil do Alvaro"
            width={200}
            height={200}
            className="rounded-full border-4 border-red-700"/>
            <p className="text-lg md:text-xl max-w-2xl text-left font-mono text-gray-200">
                Olá, sou o Alvaro! Minha carreira é uma jornada de constante evolução, construída sobre uma base sólida de mais de uma década em gestão, contabilidade e atendimento ao cliente. Essa trajetória diversificada foi fundamental para me ensinar a disciplina dos processos, a visão analítica para resolver problemas complexos e a empatia para entender as reais necessidades das pessoas.<br/><br/>
                Hoje, aplico essa bagagem única no suporte de TI e infraestrutura na Prefeitura de São Paulo. Neste ambiente, onde os desafios são imensos, minha experiência anterior me permite ir além do técnico, compreendendo o impacto de cada solução no usuário final e nos processos da gestão pública, buscando sempre o caminho mais estratégico e eficiente.<br/><br/>
                Em paralelo, estou em um processo focado de transição para o Desenvolvimento de Software, impulsionado pela formação na ETEC e por um aprendizado contínuo na Alura. Com habilidades no ecossistema JavaScript, PHP e SQL, meu objetivo é unir toda a minha experiência para construir aplicações de alto impacto, encarando a programação como a "caçada" definitiva, onde transformo desafios em soluções.
            </p>
        
        </div>
      </div>
    </section>
  );
};