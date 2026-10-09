"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const airplaneRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(envelopeRef.current, {
        y: -15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        duration: 2,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "+=5000",
          scrub: 2,
          pin: true,
        },
      });

      tl.to(section1Ref.current, { opacity: 0, scale: 0.9, duration: 1 })
        .to(mainRef.current, { backgroundColor: "#1e293b", color: "#f8fafc", duration: 1 }, "<")
        
        .fromTo(
          airplaneRef.current, 
          { x: -250, y: 120, opacity: 0, scale: 0.6, rotate: -15 }, 
          { x: 0, y: -40, opacity: 1, scale: 1.2, rotate: 15, duration: 1.5 }, 
          "<"
        )
        .fromTo(section2Ref.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 })
      
        .to(airplaneRef.current, { x: 250, y: -140, opacity: 0, scale: 0.9, rotate: 30, duration: 1.5 })
        .to(section2Ref.current, { opacity: 0, scale: 0.9, duration: 1 }, "+=0.8")
        .to(mainRef.current, { backgroundColor: "#064e3b", color: "#f8fafc", duration: 1 }, "<")
        .fromTo(section3Ref.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={mainRef} 
      className="relative w-full h-screen overflow-hidden flex flex-col justify-between p-8 md:p-16 transition-colors duration-1000 bg-[#e0f2fe] text-slate-800"
    >
      {/* Top Navigation */}
      <header className="z-10 flex justify-end items-center">
        <span className="text-sm tracking-wide opacity-75 font-medium">From Seoul ➔ To Canada</span>
      </header>

      {/* Story Sections Container */}
      <div className="relative flex-1 flex items-center justify-center">
        
        {/* Analog Paper Airplane SVG Element */}
        <div 
          ref={airplaneRef} 
          className="absolute z-25 opacity-0 pointer-events-none drop-shadow-md"
        >
          <svg 
            className="w-16 h-16 md:w-20 md:h-20 text-current opacity-90" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M22 2L11 13" />
            <path d="M22 2L15 22L11 13L2 9L22 2Z" />
          </svg>
        </div>

        {/* Chapter 1: Seoul */}
        <div ref={section1Ref} className="absolute flex flex-col items-center text-center">
          <p className="text-xs tracking-widest uppercase opacity-60 mb-3 font-semibold">Chapter 01</p>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight max-w-xl mb-8 leading-snug">
            From a small desk in Seoul, <br />A heart traveling across the Pacific.
          </h2>
          <div 
            ref={envelopeRef}
            className="relative w-64 h-40 bg-amber-50 rounded-2xl shadow-xl border border-amber-200/60 flex items-center justify-center"
          >
            <div className="absolute top-0 left-0 w-full h-20 bg-amber-100/90 rounded-t-2xl border-b border-amber-200" style={{ clipPath: "polygon(0 0, 50% 70%, 100% 0)" }} />
            <div className="absolute top-10 w-8 h-8 bg-rose-500 rounded-full shadow-md flex items-center justify-center text-white text-xs font-bold">
              💌
            </div>
            <span className="text-slate-700 font-medium text-sm mt-6">To. Canada</span>
          </div>
          <p className="mt-8 text-xs tracking-wider opacity-60 animate-bounce">↓ Scroll down to continue</p>
        </div>

        {/* Chapter 2: Pacific Sky */}
        <div ref={section2Ref} className="absolute opacity-0 flex flex-col items-center text-center">
          <p className="text-xs tracking-widest uppercase opacity-60 mb-3 font-semibold">Chapter 02</p>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight max-w-xl mb-6 leading-snug">
            Flying through the night sky, <br />Underneath the shining stars.
          </h2>
          <p className="text-base md:text-lg opacity-80 max-w-md leading-relaxed font-light">
            Crossing thousands of miles over the ocean, carrying warm thoughts all the way. ✨
          </p>
        </div>

        {/* Chapter 3: Canada Arrival */}
        <div ref={section3Ref} className="absolute opacity-0 flex flex-col items-center text-center">
          <p className="text-xs tracking-widest uppercase opacity-60 mb-3 font-semibold">Chapter 03</p>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight max-w-xl mb-6 leading-snug">
            Arriving safely at a cozy window in Canada.
          </h2>
          <p className="text-base md:text-lg opacity-80 max-w-md leading-relaxed font-light">
            The journey ends here, where the warm message finally finds its home. 🌲❄️
          </p>
        </div>

      </div>

      {/* Bottom Footer */}
      <footer className="z-10 flex justify-between items-center text-xs opacity-60">
        <p>A letter traveling from Korea to Canada</p>
        <p>Scroll Story Project</p>
      </footer>
    </div>
  );
}