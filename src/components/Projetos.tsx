// src/components/Projetos.tsx
'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { FaPlay, FaPause, FaVolumeUp } from 'react-icons/fa';

const projectsData = [
  {
    src: '/projetos/der.png', 
    title: 'Monitoria Digital Educacional', 
    description: 'O "Monitoria Digital Educacional" é uma plataforma web completa, desenvolvida como Trabalho de Conclusão de Curso na ETEC Professor Camargo Aranha, para otimizar a comunicação e o suporte acadêmico entre alunos e monitores. O sistema foi projetado para facilitar o agendamento de monitorias, o acompanhamento de desempenho e a interação didática em tempo real..' 
  },    
  { 
    src: '/projetos/home-login.jpg', //<- Atualize o nome do arquivo da imagem
    title: 'Página Inicial e Login', 
    description: 'A porta de entrada do sistema, com uma apresentação da plataforma e o formulário de autenticação seguro para alunos, monitores e administradores.' 
  },
  { 
    src: '/projetos/home-login1.jpg', //<- Atualize o nome do arquivo da imagem
    title: 'Página Inicial e Login', 
    description: 'A porta de entrada do sistema, com uma apresentação da plataforma e o formulário de autenticação seguro para alunos, monitores e administradores.' 
  },
  { 
    src: '/projetos/admin-dashboard.jpg', //<- Atualize o nome do arquivo da imagem
    title: 'Dashboard do Administrador', 
    description: 'Uma visão geral e completa da plataforma. Apresenta gráficos sobre o desempenho geral dos alunos e o status de todas as monitorias (pendentes, confirmadas, realizadas, etc.).' 
  },
  { 
    src: '/projetos/admin-cadastro.jpg', //<- Atualize o nome do arquivo da imagem
    title: 'Gerenciamento de Usuários', 
    description: 'Tela administrativa para cadastrar novos usuários (alunos, monitores, admins) e gerenciar os já existentes. Inclui a funcionalidade de importar e exportar dados via CSV.' 
  },
  { 
    src: '/projetos/admin-monitoria.jpg', //<- Atualize o nome do arquivo da imagem
    title: 'Criação de Sessões de Monitoria', 
    description: 'O administrador pode criar novas sessões, associando disciplinas a monitores e definindo os detalhes de cada turma de monitoria.' 
  },
  { 
    src: '/projetos/monitor-dashboard.jpg', //<- Atualize o nome do arquivo da imagem
    title: 'Dashboard do Monitor', 
    description: 'Painel personalizado para o monitor, exibindo seu desempenho médio, o status de suas monitorias agendadas e um acesso rápido às próximas sessões.' 
  },
  { 
    src: '/projetos/monitor-agenda.jpg', //<- Atualize o nome do arquivo da imagem
    title: 'Agenda do Monitor', 
    description: 'Ferramenta para o monitor gerenciar sua disponibilidade, agendar novas monitorias e visualizar suas reuniões, com opções para alterar o status de cada uma.' 
  },
  { 
    src: '/projetos/monitor-reuniao1.jpg', //<- Atualize o nome do arquivo da imagem
    title: 'Sala de Monitoria (Visão do Monitor)', 
    description: 'Ambiente da monitoria ao vivo, onde o monitor conduz a sessão por meio da videochamada integrada com o Jitsi Meet e interage com os alunos via chat em tempo real.' 
  },
  { 
    src: '/projetos/aluno-dashboard.jpg', //<- Atualize o nome do arquivo da imagem
    title: 'Dashboard do Aluno', 
    description: 'Visão focada no progresso do aluno, com gráficos de desempenho acadêmico, status de suas inscrições em monitorias e acesso rápido às próximas aulas.' 
  },
  { 
    src: '/projetos/aluno-reuniao.jpg', //<- Atualize o nome do arquivo da imagem
    title: 'Sala de Monitoria (Visão do Aluno)', 
    description: 'Tela onde o aluno acessa as reuniões disponíveis e entra na sala de conferência para participar da monitoria ao vivo, garantindo um aprendizado interativo e direto.' 
  },
  /*{
    src: '/projetos/der.png', //<- Exemplo: Imagem do Diagrama DER
    title: 'Estrutura do Banco de Dados',
    description: 'Modelagem de dados relacional em MySQL, projetada para ser escalável e garantir a integridade das informações de usuários, agendamentos, avaliações e interações na plataforma.'
  }*/
];

export const Projetos = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const audioRef = useRef<HTMLAudioElement | null>(null);
    
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const hasPlayedOnce = useRef(false);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (!emblaApi) return;
        const onSelect = () => setActiveIndex(emblaApi.selectedScrollSnap());
        onSelect();
        emblaApi.on('select', onSelect);
        return () => { emblaApi.off('select', onSelect); };
    }, [emblaApi]);

    useEffect(() => {
        const audio = new Audio('/carry-On.mp3');
        audio.preload = 'auto';
        audioRef.current = audio;

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        
        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('ended', handlePause);

        return () => {
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
            audio.removeEventListener('ended', handlePause);
            audio.pause();
        };
    }, []); 

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const playSoundOnlyOnce = useCallback(() => {
        if (audioRef.current && !hasPlayedOnce.current) {
            audioRef.current.play().catch(e => console.error("Erro ao tocar áudio:", e));
            hasPlayedOnce.current = true;
        }
    }, []);

    const scrollPrev = useCallback(() => {
        if (emblaApi) {
            emblaApi.scrollPrev();
            playSoundOnlyOnce();
        }
    }, [emblaApi, playSoundOnlyOnce]);

    const scrollNext = useCallback(() => {
        if (emblaApi) {
            emblaApi.scrollNext();
            playSoundOnlyOnce();
        }
    }, [emblaApi, playSoundOnlyOnce]);

    const togglePlayPause = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.error("Erro ao tocar áudio:", e));
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(parseFloat(e.target.value));
    };

    return (
        <section id="projetos" className="py-20 bg-stone-950/25">
             <h2 className="text-5xl md:text-7xl font-bold text-center text-red-600 tracking-wider mb-10 bg-stone-950/75 ">
                PROJETOS
            </h2>
            <div className="relative container mx-auto max-w-4xl">
                <div className="container mx-auto max-w-4xl mt-6 text-center text-gray-300 bg-stone-950/75 ">
                <h3 className="text-3xl font-bold text-red-500 tracking-wide">
                    {projectsData[activeIndex]?.title}
                </h3>
                <p className="mt-2 text-lg font-mono max-w-3xl mx-auto">
                    {projectsData[activeIndex]?.description}
                </p>
            </div>
                <div className="overflow-hidden rounded-lg " ref={emblaRef}>
                    <div className="flex">
                        {projectsData.map((project, index) => (
                            <div className="flex-[0_0_100%]" key={index}>
                                <Image
                                alt={project.title}
                                src={project.src}
                                width={1200}
                                height={675}
                                className="object-cover object-top" 
                                />
                            </div>
                        ))}
                    </div>
                </div>
                </div>
                <button className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-4xl hover:text-red-500" onClick={scrollPrev}>
                    &#x276E;
                </button>
                <button className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-4xl hover:text-red-500" onClick={scrollNext}>
                    &#x276F;
                </button>
                <div className="container mx-auto max-w-2xl mt-1 flex items-start justify-center gap-1 p-4 rounded-lg">                <button onClick={togglePlayPause} className="text-white text-2xl hover:text-red-500 transition-colors">
                    {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <div className="flex items-center gap-2 w-40">
                    <FaVolumeUp className="text-white"/>
                    <input 
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-600"
                    />
                </div>
            </div>
            
            
        </section>
    );
};