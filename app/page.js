"use client"

import Lenis from '@studio-freight/lenis';
import { useRef, useEffect } from 'react'
import Image from "next/image";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BoldStatic from "./components/BoldStatic";
import Footer from "./components/Footer";
import FaqSection from "./components/FaqSection";
import CommunitySection from "./components/CommunitySection";
import StoreSection from "./components/StoreSection";
import SecondStatic from './components/secondStatic';
import BoldStaticCopy from './components/BoldStaticCopy';

export default function Home() {
    const lenis = useRef(null);

  useEffect(() => {
    // Initialize Lenis
    lenis.current = new Lenis({
      duration: 0.6, // Control the duration of the scroll
      easing: (t) => 1 - Math.pow(1 - t, 3), // Cubic easing for smooth stop
      smooth: true,
      smoothTouch: true, // Enable smooth scrolling on touch devices
    });

    const animate = (time) => {
      lenis.current.raf(time);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    // Cleanup on unmount
    return () => {
      lenis.current.destroy();
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    lenis.current.scrollTo(element);
  };
  return (
    <>
        <Hero/>
        <BoldStatic/>
        <CommunitySection />
        {/* <SecondStatic/> */}
        <BoldStaticCopy/>
        <StoreSection />
        <FaqSection />
        <Footer/>
        
    </>
  );
}
