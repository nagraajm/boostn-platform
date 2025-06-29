'use client';

import { useEffect, useState } from 'react';
import '../globals.css';

export default function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const [particles, setParticles] = useState<Array<{
    left: string;
    width: string;
    height: string;
    animationDelay: string;
    animationDuration: string;
  }>>([]);

  useEffect(() => {
    // Generate particles on client side only
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 4 + 2}px`,
      height: `${Math.random() * 4 + 2}px`,
      animationDelay: `${Math.random() * 20}s`,
      animationDuration: `${Math.random() * 10 + 15}s`,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="min-h-screen text-gray-800">
      <div className="particles-bg">
        {/* Floating particles for background effect */}
        {particles.map((particle, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: particle.left,
              width: particle.width,
              height: particle.height,
              animationDelay: particle.animationDelay,
              animationDuration: particle.animationDuration,
            }}
          />
        ))}
      </div>
      {children}
    </div>
  );
}
