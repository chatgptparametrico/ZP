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
  // Smaller cubes when inside box (like in reference image), larger when outside
  const cubeSize = isInsideBox ? 48 : 64;
  const halfSize = cubeSize / 2;

  const colors = useMemo(() => ({
    active: accentColor || '#00ffff',
    inactive: '#1a1a2e',
    inactiveDark: '#0f0f1a',
    inactiveTop: '#2a2a4e',
    inactiveBottom: '#0a0a14',
    text: '#ffffff',
    textActive: '#000000',
    bg: 'rgba(0,0,0,0.85)',
    border: 'rgba(0,255,255,0.8)',
  }), [accentColor]);

  // When inside box: position at top of the internal view panel
  // When outside: position at top center of screen as taskbar
  const containerStyle: React.CSSProperties = isInsideBox ? {
    position: 'absolute',
    top: '80px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 100,
  } : {
    position: 'fixed',
    top: '180px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 2147483647,
  };

  // Container styling - more minimal when inside box
  const innerContainerStyle: React.CSSProperties = isInsideBox ? {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 20px',
    borderRadius: '16px',
    backgroundColor: 'rgba(0,0,0,0.75)',
    border: `2px solid ${colors.border}`,
    boxShadow: `0 0 20px rgba(0,255,255,0.3), 0 4px 20px rgba(0,0,0,0.5)`,
    backdropFilter: 'blur(10px)',
  } : {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: '16px 28px',
    borderRadius: '24px',
    backgroundColor: colors.bg,
    border: `4px solid ${colors.border}`,
    boxShadow: '0 0 60px rgba(0,255,255,0.6), 0 12px 40px rgba(0,0,0,0.8), inset 0 0 30px rgba(0,255,255,0.1)',
    backdropFilter: 'blur(20px)',
  };

  return (
    <>
      {/* Inject animation keyframes */}
      <style>{cubeAnimationStyle}</style>

      {/* Container */}
      <div style={containerStyle}>
        <div style={innerContainerStyle}>
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
                  border: isActive
                    ? `3px solid ${accentColor || '#00ffff'}`
                    : `2px solid rgba(0,255,255,0.4)`,
                  borderRadius: '10px',
                  background: isActive ? 'rgba(0,255,255,0.15)' : 'rgba(20,20,40,0.8)',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, border-color 0.2s, background 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.15)';
                  e.currentTarget.style.borderColor = 'rgba(0,255,255,1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'rgba(0,255,255,0.4)';
                  }
                }}
              >
                {/* 3D Cube container */}
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    perspective: isInsideBox ? '80px' : '120px',
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
                    {/* Front face - box index number */}
                    <div
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        borderRadius: isInsideBox ? '6px' : '8px',
                        transform: `translateZ(${halfSize}px)`,
                        backgroundColor: isActive ? colors.active : colors.inactive,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: isInsideBox ? '16px' : '20px',
                        fontWeight: 'bold',
                        color: isActive ? colors.textActive : colors.text,
                        boxShadow: 'inset 0 0 8px rgba(0,0,0,0.5)',
                      }}
                    >
                      {index + 1}
                    </div>

                    {/* Back face */}
                    <div
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        borderRadius: isInsideBox ? '6px' : '8px',
                        transform: `rotateY(180deg) translateZ(${halfSize}px)`,
                        backgroundColor: isActive ? colors.active : colors.inactiveDark,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: isInsideBox ? '16px' : '20px',
                        fontWeight: 'bold',
                        color: isActive ? colors.textActive : colors.text,
                      }}
                    >
                      {index + 1}
                    </div>

                    {/* Right face */}
                    <div
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        borderRadius: isInsideBox ? '6px' : '8px',
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
                        borderRadius: isInsideBox ? '6px' : '8px',
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
                        borderRadius: isInsideBox ? '6px' : '8px',
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
                        borderRadius: isInsideBox ? '6px' : '8px',
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
