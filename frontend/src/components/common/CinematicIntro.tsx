import React, { useEffect, useState, useRef } from 'react';
import { CinematicSideGarment } from './CinematicSideGarment';

interface CinematicIntroProps {
  onComplete: () => void;
  forcePlay?: boolean;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete, forcePlay = false }) => {
  // Timeline phases:
  // 0 - 1.0s: 'ambient' (atmospheric lighting & subtle light sweep)
  // 1.0 - 2.0s: 'particles' (camera zoom, subtle filament particles & depth)
  // 2.0 - 3.5s: 'title' (premium "SAKTHI GARMENTS" text reveal + animated 3D side T-shirts slide-in)
  // 3.5 - 4.5s: 'tagline' (tagline "Your Design, Our Stitch." with crimson accent light)
  // 4.5 - 5.0s: 'transition' (smooth fade to reveal homepage at 5.0s sharp)
  const [timelinePhase, setTimelinePhase] = useState<'ambient' | 'particles' | 'title' | 'tagline' | 'transition'>('ambient');
  const [isFadingOut, setIsFadingOut] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Accessibility: Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion && !forcePlay) {
      sessionStorage.setItem('sg_cinematic_intro_shown', 'true');
      onComplete();
      return;
    }

    // Exact 5-second sequence
    const t1 = setTimeout(() => setTimelinePhase('particles'), 1000);   // 1s: zoom & particles
    const t2 = setTimeout(() => setTimelinePhase('title'), 2000);       // 2s: SAKTHI GARMENTS reveal
    const t3 = setTimeout(() => setTimelinePhase('tagline'), 3500);     // 3.5s: Tagline reveal
    const t4 = setTimeout(() => {
      setTimelinePhase('transition');
      setIsFadingOut(true);
    }, 4500);                                                           // 4.5s: Smooth exit transition
    const t5 = setTimeout(() => {
      sessionStorage.setItem('sg_cinematic_intro_shown', 'true');
      onComplete();
    }, 5000);                                                           // Exactly 5.0s: Done

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [onComplete, forcePlay]);

  // Canvas-driven atmospheric lighting & cotton filament particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Enhanced textile dust, golden filaments, and glowing embers
    const particleCount = 55;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 0.5,
      alpha: Math.random() * 0.45 + 0.1,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.5 - 0.15,
      tint:
        Math.random() > 0.65
          ? 'rgba(163, 28, 27, ' // Crimson
          : Math.random() > 0.4
          ? 'rgba(234, 179, 8, ' // Gold shimmer
          : 'rgba(247, 247, 245, ', // Pure off-white
    }));

    // Floating silk thread filaments
    const threadCount = 7;
    const threads = Array.from({ length: threadCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: Math.random() * 120 + 80,
      angle: Math.random() * Math.PI,
      speedY: -Math.random() * 0.3 - 0.1,
      sway: Math.random() * 0.02 + 0.01,
      phase: Math.random() * Math.PI * 2,
      color: Math.random() > 0.5 ? 'rgba(234, 179, 8, 0.22)' : 'rgba(163, 28, 27, 0.25)',
    }));

    let time = 0;
    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      // 0–2.5s: Dynamic sweeping anamorphic spotlight
      const sweepProgress = Math.min(1, time / 2.2);
      const sweepX = width * (-0.2 + sweepProgress * 1.4);
      const sweepGrad = ctx.createRadialGradient(
        sweepX,
        height * 0.5,
        15,
        sweepX,
        height * 0.5,
        Math.max(width, height) * 0.55
      );
      sweepGrad.addColorStop(0, 'rgba(11, 23, 18, 0.7)');
      sweepGrad.addColorStop(0.25, 'rgba(6, 17, 12, 0.45)');
      sweepGrad.addColorStop(0.6, 'rgba(23, 23, 23, 0.25)');
      sweepGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = sweepGrad;
      ctx.fillRect(0, 0, width, height);

      // Anamorphic horizontal lens flare beam across center
      if (time > 1.5 && time < 4.0) {
        const flareAlpha = Math.sin(((time - 1.5) / 2.5) * Math.PI) * 0.28;
        const flareGrad = ctx.createLinearGradient(0, height * 0.48, width, height * 0.48);
        flareGrad.addColorStop(0, 'rgba(163, 28, 27, 0)');
        flareGrad.addColorStop(0.3, `rgba(234, 179, 8, ${flareAlpha * 0.4})`);
        flareGrad.addColorStop(0.5, `rgba(255, 255, 255, ${flareAlpha})`);
        flareGrad.addColorStop(0.7, `rgba(163, 28, 27, ${flareAlpha * 0.5})`);
        flareGrad.addColorStop(1, 'rgba(163, 28, 27, 0)');
        ctx.fillStyle = flareGrad;
        ctx.fillRect(0, height * 0.478, width, 2);
      }

      // Draw subtle waving silk filaments
      threads.forEach((th) => {
        th.y += th.speedY;
        th.phase += th.sway;
        if (th.y < -150) {
          th.y = height + 150;
          th.x = Math.random() * width;
        }
        ctx.beginPath();
        const startX = th.x + Math.sin(th.phase) * 30;
        const startY = th.y;
        const ctrlX = th.x + Math.cos(th.phase) * 40;
        const ctrlY = th.y + th.length * 0.5;
        const endX = th.x + Math.sin(th.phase + 1) * 30;
        const endY = th.y + th.length;

        ctx.moveTo(startX, startY);
        ctx.quadraticCurveTo(ctrlX, ctrlY, endX, endY);
        ctx.strokeStyle = th.color;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      // Draw glowing textile dust particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.tint}${p.alpha})`;
        ctx.fill();
      });

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, []);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      sessionStorage.setItem('sg_cinematic_intro_shown', 'true');
      onComplete();
    }, 250);
  };

  const isTitleVisible = timelinePhase === 'title' || timelinePhase === 'tagline' || timelinePhase === 'transition';
  const isTaglineVisible = timelinePhase === 'tagline' || timelinePhase === 'transition';

  return (
    <div
      role="dialog"
      aria-label="Brand Introduction"
      className={`fixed inset-0 z-[999999] flex flex-col items-center justify-center select-none overflow-hidden bg-[#06110C] transition-opacity duration-700 ease-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        backgroundColor: '#06110C',
        backgroundImage: 'radial-gradient(circle at 50% 50%, #0B1712 0%, #06110C 50%, #171717 100%)',
      }}
    >
      {/* Background Interactive Lighting Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-85" />

      {/* Subtle luxury textile woven micro-mesh overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(#FFFFFF 1px, transparent 1px)`,
          backgroundSize: '18px 18px',
        }}
      />

      {/* Deep atmospheric vignette */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_160px_rgba(0,0,0,0.92)]" />

      {/* Top right subtle skip button */}
      <button
        onClick={handleSkip}
        className="absolute top-4 sm:top-6 right-4 sm:right-6 z-30 text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#A3A3A3] hover:text-white transition-colors py-1.5 px-3 rounded-full border border-white/10 hover:border-white/30 backdrop-blur-sm"
      >
        Skip Intro
      </button>

      {/* 3D ANIMATED T-SHIRTS ON BOTH SIDES */}
      <CinematicSideGarment
        side="left"
        garmentType="round-neck"
        color="#171717"
        isVisible={isTitleVisible}
      />
      <CinematicSideGarment
        side="right"
        garmentType="polo"
        color="#FFFFFF"
        isVisible={isTitleVisible}
      />

      {/* Center Cinematic Presentation Area */}
      <div
        className={`relative z-20 flex flex-col items-center text-center px-4 sm:px-6 max-w-4xl mx-auto transition-all duration-500 ease-out ${
          isFadingOut ? 'opacity-0 scale-[1.02] filter blur-sm' : 'opacity-100 scale-100'
        }`}
      >
        {/* Soft crimson-red atmospheric accent light (activated at 3.5s with tagline) */}
        <div
          className={`w-72 sm:w-96 h-32 sm:h-40 rounded-full absolute -top-10 filter blur-3xl pointer-events-none transition-opacity duration-1000 ${
            isTaglineVisible ? 'opacity-30 bg-[#A31C1B]' : 'opacity-0 bg-transparent'
          }`}
        />

        {/* Company Name: SAKTHI GARMENTS (Appears at 2.0s with metallic depth reveal) */}
        <div
          className={`transition-all duration-1000 ease-out transform ${
            isTitleVisible
              ? 'opacity-100 translate-y-0 scale-100 filter blur-0'
              : 'opacity-0 translate-y-8 scale-95 filter blur-sm'
          }`}
        >
          <h1
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-[0.18em] sm:tracking-[0.24em] md:tracking-[0.28em] text-[#FFFFFF] leading-none drop-shadow-[0_12px_30px_rgba(0,0,0,0.9)]"
            style={{
              fontFamily: '"Cinzel", "Outfit", "Playfair Display", serif',
            }}
          >
            <span className="inline-block bg-gradient-to-b from-[#FFFFFF] via-[#F7F7F5] to-[#A3A3A3] bg-clip-text text-transparent">
              SAKTHI
            </span>
            <span className="block mt-2 sm:mt-3 font-light tracking-[0.26em] sm:tracking-[0.34em] md:tracking-[0.40em] bg-gradient-to-b from-[#FFFFFF] via-[#E5E5E5] to-[#737373] bg-clip-text text-transparent">
              GARMENTS
            </span>
          </h1>

          {/* Crimson textile thread divider */}
          <div className="flex items-center justify-center gap-3 my-4 sm:my-6">
            <span
              className={`h-[1px] bg-gradient-to-r from-transparent via-[#A31C1B] to-transparent transition-all duration-1000 ease-out ${
                isTitleVisible ? 'w-16 sm:w-28 md:w-44 opacity-90' : 'w-0 opacity-0'
              }`}
            />
            <span
              className={`w-1.5 h-1.5 rounded-full bg-[#A31C1B] transition-all duration-700 delay-200 ${
                isTitleVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`}
            />
            <span
              className={`h-[1px] bg-gradient-to-r from-transparent via-[#A31C1B] to-transparent transition-all duration-1000 ease-out ${
                isTitleVisible ? 'w-16 sm:w-28 md:w-44 opacity-90' : 'w-0 opacity-0'
              }`}
            />
          </div>
        </div>

        {/* Tagline: Your Design, Our Stitch. (Appears at 3.5s with slight upward motion) */}
        <div
          className={`transition-all duration-900 ease-out transform ${
            isTaglineVisible
              ? 'opacity-100 translate-y-0 filter blur-0'
              : 'opacity-0 translate-y-4 filter blur-xs'
          }`}
        >
          <p
            className="text-xs sm:text-base md:text-lg font-semibold uppercase tracking-[0.24em] sm:tracking-[0.32em] md:tracking-[0.42em] text-[#F7F7F5] drop-shadow-md"
            style={{ fontFamily: '"Poppins", sans-serif' }}
          >
            Your Design, <span className="text-[#A31C1B] font-bold">Our Stitch.</span>
          </p>
          <p className="text-[9px] sm:text-[10px] md:text-xs font-medium tracking-[0.18em] sm:tracking-[0.22em] text-[#A3A3A3] uppercase mt-2 opacity-85">
            Tiruppur • Knitwear Manufacturing Excellence
          </p>
        </div>
      </div>

      {/* Exact 5.0s Progress Timeline Indicator */}
      <div className="absolute bottom-8 inset-x-0 max-w-xs mx-auto px-6 pointer-events-none">
        <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#06110C] via-[#A31C1B] to-[#FFFFFF] transition-all duration-5000 ease-linear"
            style={{
              width: timelinePhase === 'ambient' ? '20%' : timelinePhase === 'particles' ? '40%' : timelinePhase === 'title' ? '70%' : timelinePhase === 'tagline' ? '90%' : '100%',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CinematicIntro;
