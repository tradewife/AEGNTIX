import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Solution = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const stepsRef = useRef([]);

  const steps = [
    {
      number: "01",
      title: "Predictive revenue auditing",
      description: "Our causal inference engine predicts the exact revenue impact of every fix before deployment.",
    },
    {
      number: "02", 
      title: "Brand-aligned autonomous design", 
      description: "Generate conversion-optimized designs that maintain your brand identity and aesthetic standards.",
    },
    {
      number: "03",
      title: "Zero-touch deployment",
      description: "Generate production code and deploy changes safely with automated rollback protection.",
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(titleRef.current, { opacity: 0, y: 50 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 30 });
      gsap.set(stepsRef.current, { 
        opacity: 0, 
        y: 60,
        scale: 0.95
      });

      // Header animation
      const headerTL = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 30%",
          toggleActions: "play none none reverse"
        }
      });

      headerTL
        .to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        })
        .to(subtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.4");

      // Step animations
      stepsRef.current.forEach((step, index) => {
        if (step) {
          gsap.to(step, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
              end: "top 50%",
              toggleActions: "play none none reverse"
            },
            delay: index * 0.2
          });

          // Hover animation
          const hoverTl = gsap.timeline({ paused: true });
          hoverTl.to(step, {
            scale: 1.02,
            y: -5,
            duration: 0.3,
            ease: "power2.out"
          });

          step.addEventListener('mouseenter', () => hoverTl.play());
          step.addEventListener('mouseleave', () => hoverTl.reverse());
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-blue-800 via-blue-700 to-amber-800 overflow-hidden" ref={sectionRef}>
      <div className="relative container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <h2 ref={titleRef} className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-4 md:mb-6 leading-tight px-4 sm:px-0">
              From audit to revenue lift<br />in three steps
            </h2>
            <p ref={subtitleRef} className="text-base md:text-lg text-blue-100 max-w-2xl mx-auto font-light leading-relaxed px-4 sm:px-0">
              Enterprise-grade setup in minutes. Guaranteed results while you focus on strategy.
            </p>
          </div>
          
          <div className="space-y-8 md:space-y-12 px-4 sm:px-0">
            {steps.map((step, index) => (
              <div 
                key={index} 
                ref={el => stepsRef.current[index] = el}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8"
              >
                <div className="flex items-start space-x-4 md:space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-white text-sm md:text-base font-medium border border-white/20">
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-medium text-white mb-2 md:mb-3 leading-tight">{step.title}</h3>
                    <p className="text-sm md:text-base text-blue-100 leading-relaxed font-light">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;