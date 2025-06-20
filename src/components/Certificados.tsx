// src/components/Certificados.tsx
import Image from 'next/image';

const certificados = [
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

export const Certificados = () => {
  return (
<section id="certificados" className="py-20">
       <h2 className="text-5xl md:text-7xl font-bold text-center  bg-stone-950/75 text-red-600 tracking-wider mb-12">
         CERTIFICADOS
       </h2>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
        {certificados.map((cert, index) => (
          <div key={index} className="group relative overflow-hidden rounded-lg border-2 border-gray-700">
            <Image
              src={cert.img}
              alt={cert.title}
              width={1500}
              height={1300}
              className="w-full h-auto transform group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <h3 className="text-white text-xl text-center p-4">{cert.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};