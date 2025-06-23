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
      // Set initial states - toned down from before
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
        x: (i) => (i % 2 === 0 ? -50 : 50), // Reduced from 100 to 50
        scale: 0.8, // Increased from 0.6 to 0.8
        rotation: (i) => (i % 2 === 0 ? -8 : 8), // Reduced from 15 to 8
        transformOrigin: "center center"
      });

      // Animate title and subtitle first
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

      // Animate problem items with smoother stagger
      itemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.to(item, {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            rotation: 0,
            duration: 1.2,
            ease: "back.out(1.2)", // Reduced from elastic for smoother feel
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              end: "top 50%",
              toggleActions: "play none none reverse"
            },
            delay: index * 0.2 // Reduced stagger delay
          });
        }
      });

      // Add subtle floating animation on hover
      itemsRef.current.forEach((item) => {
        if (item) {
          const hoverTl = gsap.timeline({ paused: true });
          hoverTl.to(item, {
            y: -10, // Reduced from -20
            scale: 1.02, // Reduced from 1.05
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
      className="relative py-16 md:py-24 bg-slate-900 overflow-hidden" 
      ref={sectionRef}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img 
          src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop" 
          alt="Business team analyzing data" 
          className="w-full h-full object-cover opacity-40"
        />
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/70 to-slate-900/80"></div>
      
      <div className="relative container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <h2 
              ref={titleRef}
              className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-4 md:mb-6 leading-tight px-4 sm:px-0"
            >
              Self-improving websites are the future
            </h2>
            <p 
              ref={subtitleRef}
              className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed px-4 sm:px-0"
            >
              Every day of delayed optimization is lost revenue. The current process is fundamentally broken.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 px-4 sm:px-0">
            {problems.map((problem, index) => (
              <div 
                key={index} 
                ref={el => itemsRef.current[index] = el}
                className="text-center group cursor-pointer"
              >
                <div className="mb-6">
                  <div className="w-1 h-12 md:h-16 bg-gradient-to-b from-blue-400 to-purple-500 mx-auto rounded-full group-hover:from-blue-300 group-hover:to-purple-400 transition-all duration-300"></div>
                </div>
                <h3 className="text-base md:text-lg font-medium text-white mb-3 md:mb-4 leading-tight">
                  {problem.title}
                </h3>
                <p className="text-sm md:text-base text-slate-300 leading-relaxed font-light">
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