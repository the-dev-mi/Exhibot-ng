"use client";

import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { gsap } from 'gsap';
import Navbar from './Navbar';

const slideData = [
  {
    id: 1,
    image: "https://thumbs2.imgbox.com/3a/b6/VSxqemJy_t.jpg",
    title: "Ocean Adventure",
    subtitle: "Discover the Deep Blue",
    description: "Embark on an unforgettable journey across pristine waters and hidden coves"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=1920&h=1080&fit=crop&crop=center",
    title: "Mountain Expedition",
    subtitle: "Conquer New Heights",
    description: "Scale majestic peaks and witness breathtaking vistas from above the clouds"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1920&h=1080&fit=crop&crop=center",
    title: "Forest Discovery",
    subtitle: "Into the Wild",
    description: "Explore ancient forests and discover the secrets hidden within nature's sanctuary"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=1920&h=1080&fit=crop&crop=center",
    title: "Northern Lights",
    subtitle: "Chase the Aurora",
    description: "Witness the magical dance of colors painting the night sky in remote wilderness"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&h=1080&fit=crop&crop=center",
    title: "Lake Serenity",
    subtitle: "Find Your Peace",
    description: "Discover tranquil waters surrounded by pristine nature and perfect silence"
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sliderRef = useRef(null);
  const textRef = useRef(null);
  const subtitleRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const progressRefs = useRef([]);
  const intervalRef = useRef(null);
  const tlRef = useRef(null);

  const autoPlayDuration = 5000; // 5 seconds per slide

  useEffect(() => {
    // Initialize GSAP timeline
    tlRef.current = gsap.timeline();
    
    // Initial stagger animation for text elements
    gsap.fromTo([subtitleRef.current, titleRef.current, descriptionRef.current], 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "power2.out",
        stagger: 0.2
      }
    );

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, autoPlayDuration);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentSlide, isAutoPlaying]);

  const animateSlideChange = () => {
    if (tlRef.current && textRef.current) {
      tlRef.current.clear();
      
      // Animate text elements out with stagger
      tlRef.current
        .to([subtitleRef.current, titleRef.current, descriptionRef.current], {
          opacity: 0,
          y: -30,
          duration: 0.3,
          ease: "power2.in",
          stagger: 0.1
        })
        // Animate text elements in with stagger
        .to([subtitleRef.current, titleRef.current, descriptionRef.current], {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.15
        });
    }

    // Animate progress bars with proper CSS transform
    progressRefs.current.forEach((ref, index) => {
      if (ref) {
        gsap.to(ref, {
          transform: index === currentSlide ? 'scaleX(1)' : 'scaleX(0)',
          duration: index === currentSlide ? autoPlayDuration / 1000 : 0.3,
          ease: index === currentSlide ? "none" : "power2.out",
          transformOrigin: "left center"
        });
      }
    });
  };

  useEffect(() => {
    animateSlideChange();
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideData.length) % slideData.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 1000);
  };

  const getSlidePosition = (index) => {
    const diff = index - currentSlide;
    const totalSlides = slideData.length;
    
    if (diff === 0) return 'center';
    if (diff === 1 || diff === -(totalSlides - 1)) return 'right';
    if (diff === -1 || diff === totalSlides - 1) return 'left';
    return 'hidden';
  };

  const getSlideStyle = (index) => {
    const position = getSlidePosition(index);
    
    switch (position) {
      case 'center':
        return {
          transform: 'translateX(0%) scale(1)',
          zIndex: 20,
          opacity: 1
        };
      case 'left':
        return {
          transform: 'translateX(-80%) scale(0.8)',
          zIndex: 10,
          opacity: 0.7
        };
      case 'right':
        return {
          transform: 'translateX(80%) scale(0.8)',
          zIndex: 10,
          opacity: 0.7
        };
      default:
        return {
          transform: 'translateX(0%) scale(0.6)',
          zIndex: 5,
          opacity: 0
        };
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <Navbar />
      {/* Background Image */}
      <div 
        className="absolute inset-0 transition-all duration-1000 ease-out"
        style={{
          backgroundImage: `url(${slideData[currentSlide].image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.4)'
        }}
      />

       {/* style={{ clipPath: "polygon(19% 29%, 76% 7%, 76% 86%, 19% 66%)"}} */}

      {/* Slider Container - Behind text */}
      <div ref={sliderRef} className="relative w-full h-full flex items-center justify-center z-10">
        {slideData.map((slide, index) => (
          <div
            key={slide.id}
            className="absolute w-80 h-96 md:w-96 md:h-[500px] transition-all duration-700 ease-out cursor-pointer"
            style={getSlideStyle(index)}
            onClick={() => index !== currentSlide && goToSlide(index)}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl"  >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </div>
        ))}
      </div>

      {/* Text Content - In front of images */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
        <div 
          ref={textRef}
          className="text-center text-white px-8 max-w-4xl"
          style={{ height: '70%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          <h3 
            ref={subtitleRef}
            className="text-lg md:text-xl  font-bold font-sans-dm mb-2 opacity-90"
          >
            {slideData[currentSlide].subtitle}
          </h3>
          <h1 
            ref={titleRef}
            className="text-4xl md:text-6xl font-heading lg:text-7xl font-bold mb-6 leading-tight"
          >
            {slideData[currentSlide].title}
          </h1>
          {/* <p 
            ref={descriptionRef}
            className="text-lg md:text-xl font-bold font-sans-dm max-w-2xl mx-auto leading-relaxed opacity-90 "
          >
            {slideData[currentSlide].description}
          </p> */}
        </div>
      </div>

      {/* Navigation Arrows */}
      {/* <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 z-40"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 z-40"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <ChevronRight size={24} />
      </button> */}

      {/* Progress Pagination */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-40">
        {slideData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="relative w-8 h-1 bg-white/30 rounded-full overflow-hidden hover:bg-white/50 transition-colors duration-300"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div
              ref={(el) => (progressRefs.current[index] = el)}
              className="absolute left-0 top-0 h-full bg-white rounded-full origin-left"
              style={{ transform: index === currentSlide ? 'scaleX(1)' : 'scaleX(0)' }}
            />
          </button>
        ))}
      </div>

{/* Animated Play/Pause Indicator */}
<div className="absolute top-8 right-8 z-40">
  {isAutoPlaying ? (
    <Play 
      className="w-5 h-5 text-white/80 animate-pulse"
      key="play"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    />
  ) : (
    <Pause 
      className="w-5 h-5 text-white/80"
      key="pause"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    />
  )}
</div>

{/* Bottom Gradient Overlay */}
<div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent to-[#0f0f0f] z-20 pointer-events-none" />

    </div>
  );
};

export default Hero;