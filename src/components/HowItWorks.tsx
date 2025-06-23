import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HowItWorks = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const stepsRef = useRef([]);

  const steps = [
    {
      number: "01",
      title: "Connect your stack",
      description: "Secure OAuth integration with your CMS, analytics, and repositories. SOC 2 compliant setup in under 60 seconds.",
    },
    {
      number: "02", 
      title: "Review insights",
      description: "See exactly what will change, why it matters, and the predicted revenue impact. Approve with confidence.",
    },
    {
      number: "03",
      title: "Deploy and measure", 
      description: "Watch conversion rates climb in real-time. Our causal engine isolates the impact with statistical precision.",
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(titleRef.current, { opacity: 0, y: 50 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 30 });
      gsap.set(stepsRef.current, { 
        opacity: 0, 
        y: 60,
        scale: 0.9,
        rotationY: -15
      });

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

      stepsRef.current.forEach((step, index) => {
        if (step) {
          gsap.to(step, {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationY: 0,
            duration: 0.8,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
              end: "top 50%",
              toggleActions: "play none none reverse"
            },
            delay: index * 0.15
          });

          const hoverTl = gsap.timeline({ paused: true });
          hoverTl.to(step, {
            scale: 1.03,
            y: -8,
            rotationY: 5,
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
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-blue-600 via-blue-700 to-yellow-400 overflow-hidden" ref={sectionRef}>
      <div className="relative container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 ref={titleRef} className="text-2xl md:text-3xl lg:text-4xl font-light text-white mb-4 md:mb-6 leading-tight px-4 sm:px-0">
              From audit to revenue lift<br />in three steps
            </h2>
            <p ref={subtitleRef} className="text-base md:text-lg text-blue-100 font-light leading-relaxed px-4 sm:px-0">
              Enterprise-grade setup in minutes. Guaranteed results while you focus on strategy.
            </p>
          </div>

          <div className="space-y-12 md:space-y-16 px-4 sm:px-0">
            {steps.map((step, index) => (
              <div key={index} ref={el => stepsRef.current[index] = el} className="text-center">
                <div className="mb-6 md:mb-8">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-white text-sm font-medium mb-4 md:mb-6 mx-auto border border-white/20">
                    {step.number}
                  </div>
                </div>
                
                <h3 className="text-lg md:text-xl font-medium text-white mb-3 md:mb-4 leading-tight">{step.title}</h3>
                <p className="text-base text-blue-100 leading-relaxed font-light max-w-md mx-auto">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;