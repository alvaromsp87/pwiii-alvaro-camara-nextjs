'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// --- Seus dados de projetos (sem alteração) ---
const projectsData = [
    { src: '/projetos/der.png', title: 'Monitoria Digital Educacional', description: 'O "Monitoria Digital Educacional" é uma plataforma web completa, desenvolvida como Trabalho de Conclusão de Curso na ETEC Professor Camargo Aranha, para otimizar a comunicação e o suporte acadêmico entre alunos e monitores. O sistema foi projetado para facilitar o agendamento de monitorias, o acompanhamento de desempenho e a interação didática em tempo real..' },
    { src: '/projetos/home-login.jpg', title: 'Página Inicial e Login', description: 'A porta de entrada do sistema, com uma apresentação da plataforma e o formulário de autenticação seguro para alunos, monitores e administradores.' },
    { src: '/projetos/home-login1.jpg', title: 'Página Inicial e Login', description: 'A porta de entrada do sistema, com uma apresentação da plataforma e o formulário de autenticação seguro para alunos, monitores e administradores.' },
    { src: '/projetos/admin-dashboard.jpg', title: 'Dashboard do Administrador', description: 'Uma visão geral e completa da plataforma. Apresenta gráficos sobre o desempenho geral dos alunos e o status de todas as monitorias (pendentes, confirmadas, realizadas, etc.).' },
    { src: '/projetos/admin-cadastro.jpg', title: 'Gerenciamento de Usuários', description: 'Tela administrativa para cadastrar novos usuários (alunos, monitores, admins) e gerenciar os já existentes. Inclui a funcionalidade de importar e exportar dados via CSV.' },
    { src: '/projetos/admin-monitoria.jpg', title: 'Criação de Sessões de Monitoria', description: 'O administrador pode criar novas sessões, associando disciplinas a monitores e definindo os detalhes de cada turma de monitoria.' },
    { src: '/projetos/monitor-dashboard.jpg', title: 'Dashboard do Monitor', description: 'Painel personalizado para o monitor, exibindo seu desempenho médio, o status de suas monitorias agendadas e um acesso rápido às próximas sessões.' },
    { src: '/projetos/monitor-agenda.jpg', title: 'Agenda do Monitor', description: 'Ferramenta para o monitor gerenciar sua disponibilidade, agendar novas monitorias e visualizar suas reuniões, com opções para alterar o status de cada uma.' },
    { src: '/projetos/monitor-reuniao1.jpg', title: 'Sala de Monitoria (Visão do Monitor)', description: 'Ambiente da monitoria ao vivo, onde o monitor conduz a sessão por meio da videochamada integrada com o Jitsi Meet e interage com os alunos via chat em tempo real.' },
    { src: '/projetos/aluno-dashboard.jpg', title: 'Dashboard do Aluno', description: 'Visão focada no progresso do aluno, com gráficos de desempenho acadêmico, status de suas inscrições em monitorias e acesso rápido às próximas aulas.' },
    { src: '/projetos/aluno-reuniao.jpg', title: 'Sala de Monitoria (Visão do Aluno)', description: 'Tela onde o aluno acessa as reuniões disponíveis e entra na sala de conferência para participar da monitoria ao vivo, garantindo um aprendizado interativo e direto.' },
];


// MUDANÇA 1: Adicionamos a prop 'id' aqui
export const Projetos = ({ id }: { id: string }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [volume, setVolume] = useState(0.1);
    const [isMuted, setIsMuted] = useState(false);
    
    const [hasStarted, setHasStarted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false); 
    
    const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false, playOnInit: false }));
    
    const [mainRef, mainApi] = useEmblaCarousel({ loop: true }, [autoplay.current]);
    const [thumbRef, thumbApi] = useEmblaCarousel({
        containScroll: 'keepSnaps',
        axis: 'y',
    });

    const onThumbClick = useCallback((index: number) => {
        if (!mainApi || !thumbApi) return;
        mainApi.scrollTo(index);
    }, [mainApi, thumbApi]);

    const onSelect = useCallback(() => {
        if (!mainApi || !thumbApi) return;
        const newIndex = mainApi.selectedScrollSnap();
        setActiveIndex(newIndex);
        thumbApi.scrollTo(newIndex);
    }, [mainApi, thumbApi]);

    useEffect(() => {
        if (!mainApi) return;
        onSelect();
        mainApi.on('select', onSelect);
        mainApi.on('reInit', onSelect);

        const audio = new Audio('/carry-On.mp3');
        audio.loop = true;
        audioRef.current = audio;

        const onAutoplayStop = () => setIsPlaying(false);
        mainApi.on('autoplay:stop', onAutoplayStop);

        return () => {
          mainApi.off('select', onSelect);
          mainApi.off('reInit', onSelect);
          mainApi.off('autoplay:stop', onAutoplayStop);
          audio.pause();
        };
    }, [mainApi, onSelect]);

    const handlePlayPause = useCallback(() => {
        const player = autoplay.current;
        const audio = audioRef.current;
        if (!player || !audio) return;
        
        if (isPlaying) {
            player.stop();
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.muted = false;
            setIsMuted(false);
            audio.play().then(() => {
                player.play();
                setIsPlaying(true);
                if (!hasStarted) {
                    setHasStarted(true);
                }
            }).catch(e => {
                console.error("Erro ao tocar áudio:", e);
                setIsPlaying(false);
            });
        }
    }, [isPlaying, hasStarted]);


    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.muted = isMuted;
            audioRef.current.volume = volume;
        }
    }, [volume, isMuted]);

    return (
        // MUDANÇA 2: Usamos a prop 'id' aqui
        <section id={id} className="py-20 bg-stone-950/25">
            <h2 className="text-5xl md:text-7xl font-bold text-center text-red-600 tracking-wider mb-12 bg-stone-950/75">
                PROJETOS
            </h2>

            <div className="container mx-auto max-w-7xl px-4">
                <div className="flex flex-col md:flex-row gap-6">

                    <div className="md:w-4/5 w-full">
                        <div className="overflow-hidden rounded-lg shadow-2xl shadow-black/50 relative" ref={mainRef}>
                            <div className="flex">
                                {projectsData.map((project, index) => (
                                    <div className="flex-[0_0_100%] aspect-[16/9] relative" key={index}>
                                        <Image
                                            alt={project.title} src={project.src} fill
                                            className="object-cover object-top" priority={index === 0}
                                        />
                                    </div>
                                ))}
                            </div>
                            
                            {!hasStarted && (
                                <div 
                                    className="absolute inset-0 flex items-center justify-center bg-black/60 cursor-pointer group"
                                    onClick={handlePlayPause}
                                >
                                    <div className="flex flex-col items-center text-white">
                                        <FaPlay className="text-6xl text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                                        <span className="mt-2 text-lg font-semibold tracking-wider">INICIAR APRESENTAÇÃO</span>
                                    </div>
                                </div>
                            )}

                            {hasStarted && (
                                <>
                                    <button className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white text-3xl hover:text-red-500 transition-opacity opacity-50 hover:opacity-100 p-2 rounded-full bg-black/30" onClick={() => mainApi?.scrollPrev()} aria-label="Anterior">
                                        <FaChevronLeft />
                                    </button>
                                    <button className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white text-3xl hover:text-red-500 transition-opacity opacity-50 hover:opacity-100 p-2 rounded-full bg-black/30" onClick={() => mainApi?.scrollNext()} aria-label="Próximo">
                                        <FaChevronRight />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                    
                    <div className="hidden md:block md:w-1/5">
                        <div className="h-full max-h-[450px] overflow-hidden rounded-lg" ref={thumbRef}>
                            <div className="flex flex-col h-full gap-2">
                                {projectsData.map((project, index) => (
                                    <div key={index} className="w-full aspect-[16/9] flex-shrink-0 cursor-pointer group" onClick={() => onThumbClick(index)}>
                                        <div className={`relative w-full h-full rounded-md overflow-hidden transition-opacity duration-300 ${index === activeIndex ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`}>
                                            <Image src={project.src} alt={`Thumbnail de ${project.title}`} fill className="object-cover"/>
                                            <div className={`absolute inset-0 transition-all duration-300 border-2 rounded-md ${index === activeIndex ? 'border-red-500' : 'border-transparent'}`}/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 bg-stone-950/75 p-6 rounded-lg">
                     <div key={activeIndex} className="animate-fade-in">
                        <h3 className="text-2xl font-bold text-red-500 tracking-wide">
                            {projectsData[activeIndex]?.title}
                        </h3>
                        <p className="mt-3 text-base text-gray-300 leading-relaxed max-w-4xl">
                            {projectsData[activeIndex]?.description}
                        </p>
                    </div>
                    
                     {hasStarted && (
                        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-700/50">
                           <button onClick={handlePlayPause} className="text-white text-3xl hover:text-red-500 transition-colors" aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}>
                                {isPlaying ? <FaPause /> : <FaPlay />}
                           </button>
                           <div className="flex items-center gap-2">
                                <button onClick={() => setIsMuted(!isMuted)} className="text-white text-xl hover:text-red-500 transition-colors">
                                    {isMuted || volume === 0 ? <FaVolumeMute/> : <FaVolumeUp/>}
                                </button>
                                <input type="range" min="0" max="1" step="0.01" value={isMuted ? 0 : volume}
                                    onChange={(e) => { 
                                        setVolume(parseFloat(e.target.value)); 
                                        setIsMuted(false); 
                                    }}
                                    className="w-24 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-600"
                               />
                           </div>
                       </div>
                     )}
                </div>
            </div>
        </section>
    );
};