'use client';

import dynamic from 'next/dynamic';

const Presentation3D = dynamic(() => import('@/components/Presentation3D'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white text-lg">Cargando presentación 3D...</p>
        <p className="text-gray-400 text-sm mt-2">Diseño Paramétrico Estructural</p>
      </div>
    </div>
  ),
});

export default function Home() {
  return <Presentation3D />;
}
