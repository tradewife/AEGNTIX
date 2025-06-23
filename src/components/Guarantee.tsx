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

  const trustIndicators = [
    "Enterprise Security",
    "30% Conversion Warranty", 
    "Statistically Proven Results"
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(iconRef.current, { 
        opacity: 0, 
        scale: 0.5, 
        rotation: -180 
      });
      gsap.set(titleRef.current, { opacity: 0, y: 40 });
      gsap.set(cardRef.current, { 
        opacity: 0, 
        y: 50, 
        scale: 0.95 
      });
      gsap.set(indicatorsRef.current, { 
        opacity: 0, 
        y: 30,
        scale: 0.8
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 30%",
          toggleActions: "play none none reverse"
        }
      });

      tl.to(iconRef.current, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        ease: "back.out(1.3)"
      })
      .to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.3")
      .to(cardRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.2")
      .to(indicatorsRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1
      }, "-=0.4");

      const cardHover = gsap.timeline({ paused: true });
      cardHover.to(cardRef.current, {
        scale: 1.02,
        y: -5,
        duration: 0.3,
        ease: "power2.out"
      });

      cardRef.current.addEventListener('mouseenter', () => cardHover.play());
      cardRef.current.addEventListener('mouseleave', () => cardHover.reverse());

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-yellow-400 via-yellow-300 to-orange-300 overflow-hidden" ref={sectionRef}>
      <div className="relative container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-8 md:mb-12">
            <div ref={iconRef} className="w-12 h-12 bg-orange-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-6 md:mb-8 border border-orange-400/30">
              <div className="w-6 h-6 rounded-full bg-orange-500/40 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-orange-600"></div>
              </div>
            </div>
          </div>

          <h2 ref={titleRef} className="text-2xl md:text-3xl lg:text-4xl font-light text-slate-900 mb-6 md:mb-8 leading-tight px-4 sm:px-0">
            We guarantee your results
          </h2>

          <div ref={cardRef} className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-xl p-6 md:p-8 mb-8 md:mb-12 mx-4 sm:mx-0">
            <p className="text-base md:text-lg text-slate-800 mb-4 md:mb-6 font-light leading-relaxed">
              Our causal inference engine predicts conversion lifts with 94% accuracy. Every deployment comes with our 
              <span className="text-orange-700 font-medium"> Conversion Warranty</span>: 
              if we don't deliver the predicted revenue lift, you get a full service credit.
            </p>
            
            <p className="text-orange-700 font-medium">
              Backed by statistical science. Guaranteed by us.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 px-4 sm:px-0">
            {trustIndicators.map((indicator, index) => (
              <div key={index} ref={el => indicatorsRef.current[index] = el} className="text-center">
                <div className="w-2 h-2 rounded-full bg-orange-600/80 mx-auto mb-3"></div>
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