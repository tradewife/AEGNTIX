import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Guarantee = () => {
  const sectionRef = useRef(null);
  const iconRef = useRef(null);
  const titleRef = useRef(null);
  const cardRef = useRef(null);
  const indicatorsRef = useRef([]);
  const gradientRef = useRef(null);
  const innerIconRef = useRef(null);
  const pulseRef = useRef(null);

  const trustIndicators = [
    "Enterprise Security",
    "30% Conversion Warranty", 
    "Statistically Proven Results"
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states - everything hidden and transformed
      gsap.set(iconRef.current, { 
        opacity: 0, 
        scale: 0.3, 
        rotation: -360,
        y: 100
      });
      gsap.set(innerIconRef.current, {
        scale: 0,
        rotation: -360 // Start rotated for the spin effect
      });
      gsap.set(pulseRef.current, {
        scale: 0,
        opacity: 0
      });
      gsap.set(titleRef.current, { 
        opacity: 0, 
        y: 60,
        scale: 0.8
      });
      gsap.set(cardRef.current, { 
        opacity: 0, 
        y: 80, 
        scale: 0.85,
        rotationX: -15
      });
      gsap.set(indicatorsRef.current, { 
        opacity: 0, 
        y: 40,
        scale: 0.6,
        rotation: (i) => (i % 2 === 0 ? -20 : 20)
      });

      // Main entrance timeline
      const masterTL = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "top 25%",
          toggleActions: "play none none reverse"
        }
      });

      // Epic icon entrance with PERFECT single elegant spin
      masterTL
        .to(iconRef.current, {
          opacity: 1,
          scale: 1.2,
          rotation: 0,
          y: 0,
          duration: 1.2,
          ease: "back.out(2)",
        })
        .to(iconRef.current, {
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        }, "-=0.3")
        // PERFECT single spin - exactly 360 degrees once and settle
        .to(innerIconRef.current, {
          scale: 1,
          rotation: 0, // Elegant single 360° spin (from -360 to 0)
          duration: 1.5,
          ease: "power2.out"
        }, "-=1.2")
        .to(pulseRef.current, {
          scale: 1,
          opacity: 0.6,
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.8")
        
        // Title with dramatic entrance
        .to(titleRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out"
        }, "-=0.6")
        
        // Card with 3D flip effect
        .to(cardRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 1.2,
          ease: "power2.out"
        }, "-=0.4")
        
        // Indicators with staggered spring animation
        .to(indicatorsRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          ease: "back.out(1.4)",
          stagger: {
            amount: 0.6,
            from: "center"
          }
        }, "-=0.6");

      // ONLY gentle floating - NO rotation after initial spin
      gsap.to(iconRef.current, {
        y: -8,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });

      // Subtle pulse animation
      gsap.to(pulseRef.current, {
        scale: 1.3,
        opacity: 0.2,
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });

      // Interactive hover effects
      const iconHover = gsap.timeline({ paused: true });
      iconHover
        .to(iconRef.current, {
          scale: 1.15,
          duration: 0.3,
          ease: "power2.out"
        })
        .to(innerIconRef.current, {
          scale: 1.2,
          duration: 0.3,
          ease: "back.out(1.2)"
        }, 0)
        .to(pulseRef.current, {
          scale: 1.5,
          opacity: 0.8,
          duration: 0.3,
          ease: "power2.out"
        }, 0);

      iconRef.current?.addEventListener('mouseenter', () => iconHover.play());
      iconRef.current?.addEventListener('mouseleave', () => iconHover.reverse());

      const cardHover = gsap.timeline({ paused: true });
      cardHover
        .to(cardRef.current, {
          scale: 1.03,
          y: -10,
          rotationY: 5,
          duration: 0.4,
          ease: "power2.out"
        });

      cardRef.current?.addEventListener('mouseenter', () => cardHover.play());
      cardRef.current?.addEventListener('mouseleave', () => cardHover.reverse());

      // Indicator hover effects
      indicatorsRef.current.forEach((indicator, index) => {
        if (indicator) {
          const hoverTL = gsap.timeline({ paused: true });
          hoverTL.to(indicator, {
            scale: 1.1,
            y: -5,
            duration: 0.3,
            ease: "back.out(1.2)"
          });

          indicator.addEventListener('mouseenter', () => hoverTL.play());
          indicator.addEventListener('mouseleave', () => hoverTL.reverse());
        }
      });

      // Parallax effect for the entire section
      gsap.to(sectionRef.current, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative py-16 md:py-24 pb-0 bg-gradient-to-br from-blue-400 via-blue-300 to-yellow-300 overflow-hidden" ref={sectionRef}>
      {/* EXACT gradient overlay matching mobile screenshot - soft blue to yellow transition */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-300/60 via-blue-200/40 to-yellow-200/70" ref={gradientRef}></div>
      
      <div className="relative container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-8 md:mb-12">
            <div ref={iconRef} className="relative w-12 h-12 bg-orange-400/25 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-6 md:mb-8 border border-orange-300/40 cursor-pointer">
              {/* Pulsing background effect */}
              <div ref={pulseRef} className="absolute inset-0 w-full h-full rounded-xl bg-orange-400/20 opacity-0"></div>
              
              {/* Main icon container - this will spin once elegantly */}
              <div ref={innerIconRef} className="relative w-6 h-6 rounded-full bg-orange-400/50 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
              </div>
            </div>
          </div>

          <h2 ref={titleRef} className="text-2xl md:text-3xl lg:text-4xl font-light text-slate-900 mb-6 md:mb-8 leading-tight px-4 sm:px-0">
            We guarantee your results
          </h2>

          <div ref={cardRef} className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-xl p-6 md:p-8 mb-8 md:mb-12 mx-4 sm:mx-0 shadow-sm cursor-pointer">
            <p className="text-base md:text-lg text-slate-800 mb-4 md:mb-6 font-light leading-relaxed">
              Our causal inference engine predicts conversion lifts with 94% accuracy. Every deployment comes with our 
              <span className="text-orange-600 font-medium"> Conversion Warranty</span>: 
              if we don't deliver the predicted revenue lift, you get a full service credit.
            </p>
            
            <p className="text-orange-600 font-medium">
              Backed by statistical science. Guaranteed by us.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 px-4 sm:px-0">
            {trustIndicators.map((indicator, index) => (
              <div key={index} ref={el => indicatorsRef.current[index] = el} className="text-center cursor-pointer">
                <div className="w-2 h-2 rounded-full bg-orange-500/70 mx-auto mb-3"></div>
                <span className="text-slate-700 text-sm font-light">{indicator}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Guarantee;