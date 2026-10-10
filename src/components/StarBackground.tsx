'use client';

import { useEffect, useRef } from 'react';

export default function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // Window pyahu pehecha kompletoita
    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // 1. Star particles / Mbyjakuéra
    const particles: Particle[] = [];
    const particleCount = 120;

    class Particle {
      x: number = 0;
      y: number = 0;
      size: number = 0;
      speedY: number = 0;
      speedX: number = 0;
      opacity: number = 0;
      color: string = '#fff';
      char: string = '';

      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        const width = canvas?.width || window.innerWidth;
        const height = canvas?.height || window.innerHeight;

        const bookX = width * 0.5;
        const bookY = height * 0.88;

        this.x = bookX + (Math.random() - 0.5) * 120;
        this.y = initial ? Math.random() * height : bookY;
        this.size = Math.random() * 2.5 + 0.8;
        this.speedY = -(Math.random() * 1.2 + 0.4);
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.opacity = Math.random() * 0.8 + 0.2;

        const colors = ['#fde047', '#f472b6', '#a855f7', '#60a5fa', '#ffffff', '#e0e7ff'];
        this.color = colors[Math.floor(Math.random() * colors.length)];

        const chars = ['✦', '✧', '★', '◇', '˚', '⋅', '🌙', '📜', '✨'];
        this.char = Math.random() < 0.2 ? chars[Math.floor(Math.random() * chars.length)] : '';
      }

      update() {
        const height = canvas?.height || window.innerHeight;
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.y * 0.005) * 0.3;
        this.opacity -= 0.0015;

        if (this.y < 0 || this.opacity <= 0) {
          this.reset();
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.opacity);
        ctx.fillStyle = this.color;

        if (this.char) {
          ctx.font = `${this.size * 5}px sans-serif`;
          ctx.fillText(this.char, this.x, this.y);
        } else {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.shadowBlur = 8;
          ctx.shadowColor = this.color;
          ctx.fill();
        }
        ctx.restore();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // 2. Whale animation
    let whaleTime = 0;

    const drawWhale = () => {
      const width = canvas.width;
      const height = canvas.height;

      whaleTime += 0.005;
      const whaleX = width * 0.65 + Math.cos(whaleTime) * 60;
      const whaleY = height * 0.22 + Math.sin(whaleTime * 1.5) * 20;

      ctx.save();
      ctx.translate(whaleX, whaleY);
      ctx.rotate(-0.08 + Math.sin(whaleTime) * 0.05);

      ctx.strokeStyle = 'rgba(253, 224, 71, 0.4)';
      ctx.fillStyle = 'rgba(168, 85, 247, 0.08)';
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 15;
      ctx.shadowColor = 'rgba(244, 114, 182, 0.6)';

      ctx.beginPath();
      ctx.moveTo(-70, 0);
      ctx.bezierCurveTo(-30, -35, 40, -30, 80, 0);
      ctx.bezierCurveTo(40, 30, -30, 25, -70, 0);
      ctx.moveTo(-70, 0);
      ctx.quadraticCurveTo(-90, -25, -110, -20);
      ctx.quadraticCurveTo(-85, 0, -110, 20);
      ctx.quadraticCurveTo(-90, 25, -70, 0);
      ctx.stroke();
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      for (let i = -50; i < 60; i += 20) {
        ctx.beginPath();
        ctx.arc(i, Math.sin(i + whaleTime * 5) * 5, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    // 3. Open Book
    const drawOpenBook = () => {
      const width = canvas.width;
      const height = canvas.height;

      const bookX = width * 0.5;
      const bookY = height * 0.90;

      ctx.save();
      ctx.translate(bookX, bookY);

      const glowGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, 180);
      glowGrad.addColorStop(0, 'rgba(253, 224, 71, 0.35)');
      glowGrad.addColorStop(0.5, 'rgba(244, 114, 182, 0.15)');
      glowGrad.addColorStop(1, 'rgba(15, 23, 42, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(0, 0, 180, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#1e1b4b';
      ctx.strokeStyle = '#fde047';
      ctx.lineWidth = 2;
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#fde047';

      ctx.beginPath();
      ctx.moveTo(0, 5);
      ctx.bezierCurveTo(-40, -15, -120, -10, -150, 15);
      ctx.lineTo(-140, 25);
      ctx.bezierCurveTo(-110, 0, -40, -5, 0, 15);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, 5);
      ctx.bezierCurveTo(40, -15, 120, -10, 150, 15);
      ctx.lineTo(140, 25);
      ctx.bezierCurveTo(110, 0, 40, -5, 0, 15);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGrad.addColorStop(0, '#020617');
      bgGrad.addColorStop(0.4, '#0f172a');
      bgGrad.addColorStop(0.8, '#1e1b4b');
      bgGrad.addColorStop(1, '#020617');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawWhale();
      drawOpenBook();

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen pointer-events-none overflow-hidden z-0">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
      <div className="absolute top-10 -left-20 w-[35rem] h-[35rem] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 right-10 w-[30rem] h-[30rem] bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-12 right-16 w-20 h-20 rounded-full shadow-[-6px_6px_0_0_#fde047] opacity-80 blur-[0.5px] pointer-events-none" />
    </div>
  );
}