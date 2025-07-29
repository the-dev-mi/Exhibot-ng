"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const particleIcons = ["🎮", "🧠", "🕹️", "⚙️", "💬", "📡"];

const CommunitySection = () => {
  const sectionRef = useRef(null);
  const glitchTextRef = useRef(null);
  const subtitleRef = useRef(null);
  const particlesRef = useRef([]);
  const logoRef = useRef(null);

  const [textSwap, setTextSwap] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // One-time animations on mount
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: "power2.out" }
    );

    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.5 }
    );

    // Initialize particle positions only on client
    particlesRef.current.forEach((el, i) => {
      if (el) {
        gsap.set(el, {
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
        });

        // Particle loop animation
        gsap.to(el, {
          x: () => gsap.utils.random(-20, 20),
          y: () => gsap.utils.random(-20, 20),
          repeat: -1,
          yoyo: true,
          duration: gsap.utils.random(3, 6),
          ease: "sine.inOut",
          delay: i * 0.3,
        });
      }
    });

    // Logo floating and flickering
    gsap.to(logoRef.current, {
      scale: 1.18,
      opacity: 0.1,
      repeat: -1,
      yoyo: true,
      duration: 5,
      ease: "sine.inOut",
    });

    // Text swap interval
    const interval = setInterval(() => {
      setTextSwap(prev => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full h-screen bg-gray-100 overflow-hidden flex items-center justify-center text-center px-6"
    >
      {/* Floating Gamepad Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            ref={(el) => (particlesRef.current[i] = el)}
            className="absolute text-gray-400 text-xl opacity-40 select-none"
            // Position will be set by GSAP in useEffect
          >
            {particleIcons[i % particleIcons.length]}
          </div>
        ))}
      </div>

      {/* Cryptic Background Logo */}
      {isMounted && (
        <img
          ref={logoRef}
          src="/logo_icon.png"
          alt="Logo"
          className="absolute right-8 bottom-12 w-[300px] opacity-10 select-none pointer-events-none hidden md:block"
          style={{ zIndex: 1 }}
        />
      )}

      {/* Main Text Content */}
      <div className="relative z-4 max-w-3xl">
        <h2
          ref={glitchTextRef}
          className="text-4xl md:text-[3rem] tracking-wide uppercase px-4 py-8 font-bold transition-all duration-1000 ease-in-out"
          style={{ fontFamily: 'Exima Geometric' }}
        >
          {(textSwap ? "CONNECT WITH THE CORE" : "be the change").split("").map((char, idx) => (
            <span
              key={idx}
              className="glitch-char inline-block"
              style={{ display: 'inline-block', whiteSpace: 'pre' }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h2>

        <p
          ref={subtitleRef}
          className="mt-6 text-black py-8 text-3xl md:text-xl font-medium max-w-xl mx-auto leading-relaxed tracking-wide"
        >
          Enter a community of fearless builders, gamers, and visionaries. Explore ideas, ship faster, and shape what's next — together.
        </p>

        {/* CTA Button */}
        <div className="mt-10">
          <a
            href="https://discord.gg/YOUR_INVITE"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block skew-x-[-12deg] bg-blue-700 hover:bg-blue-800 px-10 py-4 text-white font-bold text-lg shadow-xl tracking-wider transition-transform transform hover:scale-105 hover:rotate-1"
          >
            <span className="skew-x-[12deg] block">JOIN THE HAVITECH CORE</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CommunitySection;