"use client";

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';

const Navbar = () => {
  const bgRef = useRef(null);
  const navRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current && bgRef.current) {
      const shouldShowWhiteBg = isScrolled || isHovered;

      gsap.to(bgRef.current, {
        scaleX: shouldShowWhiteBg ? 1 : 0,
        opacity: shouldShowWhiteBg ? 1 : 0,
        duration: 0.5,
        ease: "power2.inOut",
        transformOrigin: "left center"
      });

      const textElements = navRef.current.querySelectorAll(".nav-text");
      gsap.to(textElements, {
        color: shouldShowWhiteBg ? '#000000' : '#ffffff',
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }
  }, [isScrolled, isHovered]);

  return (
    <>
      <nav className="fixed top-4 left-0 right-0 z-50 font-sans-ibm flex justify-center font-[300] text-white">
        {/* Outer pill container */}
        <div 
          className="relative w-full md:max-w-[700px] mx-5 md:mx-auto shadow-xl rounded-full backdrop-blur-md border border-gray-200"
          ref={navRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Animated white background */}
          <div 
            className="absolute left-0 top-0 h-full rounded-full bg-white origin-left"
            ref={bgRef}
            style={{
              width: '100%',
              transform: 'scaleX(10)',
              opacity: 0
            }}
          />
          
          {/* Navbar content */}
          <div className="relative flex items-center justify-between py-2 md:px-10 px-4 nav-text">
            <Link href="#home" className="text-2xl font-bold z-10 hover:grayscale-100 transition">
              <img src='/logo_icon.png' alt="Logo" className="h-10 w-auto" />
            </Link>
            
            {/* Desktop links */}
            <div className="hidden md:flex items-center justify-center space-x-8 z-10 font-ui">
              <Link href="#about" className="text-lg md:text-xl font-bold font-sans-dm hover:opacity-80 transition">About</Link>
              <Link href="#community" className="text-lg md:text-xl font-bold font-sans-dm hover:opacity-80 transition">Community</Link>
              <Link href="#faq" className="text-lg md:text-xl font-bold font-sans-dm hover:opacity-80 transition">FAQ</Link>
              <Link href="#store" className="text-lg md:text-xl font-bold font-sans-dm hover:opacity-80 transition">Store</Link>
            </div>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden z-10 flex items-center justify-center gap-2 border px-4 py-2 rounded-full cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className='font-heading text-[10px]'>Menu</span>
              <div className="flex flex-col items-center justify-center gap-[.2rem]">
                <span className="block w-[12px] h-[1px] bg-current"></span>
                <span className="block w-[12px] h-[1px] bg-current"></span>
                <span className="block w-[12px] h-[1px] bg-current"></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black font-ui bg-opacity-80 backdrop-blur-sm flex flex-col items-center justify-center space-y-6 text-white text-2xl transition-opacity duration-300 ease-in-out">
          <Link href="#about" onClick={() => setMobileMenuOpen(false)}>About</Link>
          <Link href="#community" onClick={() => setMobileMenuOpen(false)}>Community</Link>
          <Link href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</Link>
          <Link href="#store" onClick={() => setMobileMenuOpen(false)}>Store</Link>

          <a
            href="https://discord.gg/uCYwT6keJK"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block skew-x-[-12deg] bg-blue-700 hover:bg-blue-800 px-10 py-4 text-white font-bold text-lg shadow-xl tracking-wider transition-transform transform hover:scale-105 hover:rotate-1"
          >
            <span className="skew-x-[12deg] block">JOIN THE TRIBE</span>
          </a>
        </div>
      )}
    </>
  );
};

export default Navbar;
