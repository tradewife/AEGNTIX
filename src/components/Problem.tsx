import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Problem = () => {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  const problems = [
    {
      title: "Development cycles kill momentum",
      description: "Critical optimization fixes take weeks to deploy. Your conversion opportunities die in development queues.",
    },
    {
      title: "Can't prove what drives revenue", 
      description: "You're spending thousands on tools and agencies, but can't isolate which changes actually increase conversions.",
    },
    {
      title: "Optimization happens in silos",
      description: "Your teams optimize in isolation. Nobody owns the complete conversion funnel or the final outcome.",
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(titleRef.current, { 
        opacity: 0, 
        y: 60, 
        scale: 0.9
      });
      
      gsap.set(subtitleRef.current, { 
        opacity: 0, 
        y: 40, 
        scale: 0.95
      });

      gsap.set(itemsRef.current, { 
        opacity: 0, 
        y: 80, 
        x: (i) => (i % 2 === 0 ? -50 : 50),
        scale: 0.8,
        rotation: (i) => (i % 2 === 0 ? -8 : 8),
        transformOrigin: "center center"
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 30%",
          toggleActions: "play none none reverse"
        }
      });

      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out"
      })
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.6");

      itemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.to(item, {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            rotation: 0,
            duration: 1.2,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              end: "top 50%",
              toggleActions: "play none none reverse"
            },
            delay: index * 0.2
          });
        }
      });

      itemsRef.current.forEach((item) => {
        if (item) {
          const hoverTl = gsap.timeline({ paused: true });
          hoverTl.to(item, {
            y: -10,
            scale: 1.02,
            duration: 0.4,
            ease: "power2.out"
          });

          item.addEventListener('mouseenter', () => hoverTl.play());
          item.addEventListener('mouseleave', () => hoverTl.reverse());
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      data-section="problem" 
      className="relative py-16 md:py-24 bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900 overflow-hidden" 
      ref={sectionRef}
    >
      {/* EXACT cobalt blue to yellow gradient matching mobile screenshots */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 via-blue-500/60 to-yellow-400/70"></div>
      
      <div className="relative container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 
              ref={titleRef}
              className="text-2xl md:text-3xl lg:text-4xl font-light text-white mb-4 md:mb-6 leading-tight px-4 sm:px-0"
            >
              Hybrid Human-AI ecosystems will crush 'set and forget' automations
            </h2>
            <p 
              ref={subtitleRef}
              className="text-base md:text-lg text-blue-50/90 max-w-2xl mx-auto font-light leading-relaxed px-4 sm:px-0"
            >
              The alternatives offer tools because they lack the expertise or incentive to provide solutions. Aegnt.site is an investment in robust systems you can rely on to do the work and handle issues quickly and independently.
            </p>
          </div>
          
          <div className="space-y-8 md:space-y-12 px-4 sm:px-0">
            {problems.map((problem, index) => (
              <div 
                key={index} 
                ref={el => itemsRef.current[index] = el}
                className="text-center"
              >
                <div className="mb-6">
                  <div className="w-1 h-16 bg-gradient-to-b from-blue-200/90 to-yellow-300/80 mx-auto rounded-full"></div>
                </div>
                <h3 className="text-lg md:text-xl font-medium text-white mb-4 leading-tight">
                  {problem.title}
                </h3>
                <p className="text-base text-blue-50/85 leading-relaxed font-light max-w-md mx-auto">
                  {problem.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;