'use client';

import { useMemo } from 'react';

interface MiniCubeNavProps {
  boxes: Array<{ id: string; name: string }>;
  currentBoxIndex: number;
  isDarkMode: boolean;
  accentColor: string;
  onNavigate: (index: number) => void;
  isInsideBox?: boolean;
}

// Animal images for each cube
const animalImages = [
  'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=100',
  'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=100',
  'https://images.pexels.com/photos/1687427/pexels-photo-1687427.jpeg?auto=compress&cs=tinysrgb&w=100',
  'https://images.pexels.com/photos/1918290/pexels-photo-1918290.jpeg?auto=compress&cs=tinysrgb&w=100',
  'https://images.pexels.com/photos/1390361/pexels-photo-1390361.jpeg?auto=compress&cs=tinysrgb&w=100',
];

// Inline styles for the cube animation
const cubeAnimationStyle = `
  @keyframes spin3d {
    0% { transform: rotateX(-20deg) rotateY(0deg); }
    100% { transform: rotateX(-20deg) rotateY(360deg); }
  }
  .mini-cube-3d {
    animation: spin3d 3s linear infinite;
    transform-style: preserve-3d;
  }
`;

export default function MiniCubeNav({ boxes, currentBoxIndex, isDarkMode, accentColor, onNavigate, isInsideBox = false }: MiniCubeNavProps) {
  // Much larger cubes for better visibility - 64px
  const cubeSize = 64;
  const halfSize = cubeSize / 2;

  const colors = useMemo(() => ({
    active: accentColor || '#00ffff',
    inactive: '#718096',
    inactiveDark: '#4a5568',
    inactiveTop: '#a0aec0',
    inactiveBottom: '#2d3748',
    text: '#ffffff',
    textActive: '#000000',
    // Very opaque dark background for maximum contrast
    bg: 'rgba(0,0,0,0.98)',
    border: 'rgba(0,255,255,1)',
  }), [accentColor]);

  return (
    <>
      {/* Inject animation keyframes */}
      <style>{cubeAnimationStyle}</style>

      {/* Container - ALWAYS visible at top center, ABOVE everything */}
      <div
        style={{
          position: 'fixed',
          top: isInsideBox ? '20px' : '180px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2147483647, // Maximum z-index
          display: 'block',
          pointerEvents: 'auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            padding: '16px 28px',
            borderRadius: '24px',
            backgroundColor: colors.bg,
            border: `4px solid ${colors.border}`,
            boxShadow: isInsideBox
              ? '0 0 60px rgba(0,255,255,0.6), 0 12px 40px rgba(0,0,0,0.8), inset 0 0 30px rgba(0,255,255,0.1)'
              : '0 8px 40px rgba(0,0,0,0.6)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {boxes.map((box, index) => {
            const isActive = index === currentBoxIndex;

            return (
              <button
                key={box.id}
                onClick={() => onNavigate(index)}
                title={box.name}
                style={{
                  position: 'relative',
                  width: `${cubeSize}px`,
                  height: `${cubeSize}px`,
                  padding: '0',
                  border: isActive ? `4px solid ${accentColor || '#00ffff'}` : '4px solid rgba(0,255,255,0.3)',
                  borderRadius: '12px',
                  background: isActive ? 'rgba(0,255,255,0.2)' : 'transparent',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, border-color 0.2s, background 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.borderColor = 'rgba(0,255,255,1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'rgba(0,255,255,0.3)';
                  }
                }}
              >
                {/* 3D Cube container */}
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    perspective: '120px',
                    perspectiveOrigin: '50% 50%',
                  }}
                >
                  {/* Rotating cube */}
                  <div
                    className="mini-cube-3d"
                    style={{
                      width: '100%',
                      height: '100%',
                      position: 'relative',
                      transformStyle: 'preserve-3d',
                      animationDelay: `${index * 0.15}s`,
                    }}
                  >
                    {/* Front face - Animal Image */}
                    <div
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        borderRadius: '8px',
                        transform: `translateZ(${halfSize}px)`,
                        backgroundColor: isActive ? colors.active : colors.inactive,
                        backgroundImage: `url(${animalImages[index % animalImages.length]})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)',
                      }}
                    />

                    {/* Back face - Animal Image */}
                    <div
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        borderRadius: '8px',
                        transform: `rotateY(180deg) translateZ(${halfSize}px)`,
                        backgroundColor: isActive ? colors.active : colors.inactiveDark,
                        backgroundImage: `url(${animalImages[index % animalImages.length]})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />

                    {/* Right face */}
                    <div
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        borderRadius: '8px',
                        transform: `rotateY(90deg) translateZ(${halfSize}px)`,
                        backgroundColor: isActive ? colors.active : colors.inactiveDark,
                      }}
                    />

                    {/* Left face */}
                    <div
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        borderRadius: '8px',
                        transform: `rotateY(-90deg) translateZ(${halfSize}px)`,
                        backgroundColor: isActive ? colors.active : colors.inactive,
                      }}
                    />

                    {/* Top face */}
                    <div
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        borderRadius: '8px',
                        transform: `rotateX(90deg) translateZ(${halfSize}px)`,
                        backgroundColor: isActive ? colors.active : colors.inactiveTop,
                      }}
                    />

                    {/* Bottom face */}
                    <div
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        borderRadius: '8px',
                        transform: `rotateX(-90deg) translateZ(${halfSize}px)`,
                        backgroundColor: isActive ? colors.active : colors.inactiveBottom,
                      }}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
