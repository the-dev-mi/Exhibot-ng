"use client";

import React from "react";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins
gsap.registerPlugin(ScrollTrigger);

const BoldStatic = () => {
  useGSAP(() => {
    // 1. Smooth infinite marquee animation
    const marquee = document.querySelector(".marquee-track-bold");
    if (marquee) {
      const contentWidth = marquee.firstElementChild?.offsetWidth || 0;
      const duration = 25; // Increased duration for slower marquee
      
      gsap.to(marquee.children, {
        x: `-=${contentWidth}`,
        duration: duration,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % contentWidth)
        }
      });
    }

    // 2. Enhanced text animation with slower entrance
    const titleSplit = new SplitText(".message-text h1", {
      type: "lines,words,chars",
      linesClass: "line",
      wordsClass: "word",
      charsClass: "char"
    });

    // Hide initially with larger offset
    gsap.set(".char", { 
      opacity: 0, 
      y: "150%",
      rotateX: 90 
    });

    // Create timeline with scroll trigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".message-content",
        start: "top 90%", // Start later in scroll
        end: "top 20%", // Cover more scroll distance
        scrub: 2, // Slower scrub
        markers: false
      }
    });

    // Slower section fade in
    tl.to(".message-content", {
      opacity: 1,
      y: 0,
      duration: 2, // Increased duration
      ease: "sine.out"
    });

    // Character animation with slower stagger
    tl.to(".char", {
      opacity: 1,
      y: "0%",
      rotateX: 0,
      duration: 1.5, // Slower animation
      stagger: {
        amount: 1.5, // Longer overall stagger duration
        from: "random" // More organic entrance
      },
      ease: "elastic.out(1, 0.5)" // Bouncier easing
    }, "<0.5");

    // Slower color emphasis
    tl.to(".text-\\[\\#f97116\\]", {
      color: "#f97116",
      duration: 1.2,
      ease: "sine.inOut"
    }, "<0.8");
  });

  return (
    <div className="relative bg-[#0f0f0f] text-white font-ui overflow-hidden h-auto ">
      {/* Marquee Section */}
      <div className="flex flex-col gap-10">
        <div className="relative overflow-hidden whitespace-nowrap bg-[#F97216] border-t border-white/20 border-dashed py-6">
          <div className="marquee-track-bold md:text-[2.5rem] text-[1rem] font-extrabold uppercase tracking-wider flex">
            <span className="inline-block md:px-10 px-5 whitespace-nowrap">
              The Future Is Not Imported • It's Built Here • Exhibot Ng Is Nigeria's Robotics Revolution •
            </span>
            <span className="inline-block md:px-10 px-5 whitespace-nowrap" aria-hidden="true">
              The Future Is Not Imported • It's Built Here • Exhibot Ng Is Nigeria's Robotics Revolution •
            </span>
          </div>
          {/* Gradient fades */}
          <div className="absolute top-0 left-0 h-full w-[80px] z-10 bg-gradient-to-r from-[#F97216] via-[#F97216]/70 to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 h-full w-[80px] z-10 bg-gradient-to-l from-[#F97216] via-[#F97216]/70 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Text Content */}
      <div className="bg-blue-700 h-full  py-32 md:py-[15rem] md:px-12 px-5 message-content opacity-0">
        <div className="relative w-full text-wrap message-text">
          <h1 className="text-4xl md:text-[8rem] md:text-wrap md:text-center text-center md:leading-[10rem] leading-[3rem] text-[#ffffff]" style={{ fontFamily: 'Exima Geometric' }}>
            Exhibot is More Than just mere <br/>
            <span className="text-[27px] md:text-[6rem]">Entertainment</span> <br/>
            <span className="text-[#f97116]">It is a Movement</span> 
          </h1>
        </div>
      </div>

      {/* Performance optimizations */}
      <style jsx>{`
        .marquee-track-bold {
          will-change: transform;
        }
        .char {
          display: inline-block;
          will-change: transform, opacity;
          backface-visibility: hidden;
          transform-style: preserve-3d;
        }
        .word {
          display: inline-block;
          overflow: hidden;
          vertical-align: top;
        }
      `}</style>
    </div>
  );
};

export default BoldStatic;