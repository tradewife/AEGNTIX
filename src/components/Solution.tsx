import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BarChart3, Palette, Rocket, TrendingUp, Eye, Code, Zap, Target, Activity } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Solution = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const featuresRef = useRef([]);

  const features = [
    {
      title: "Predictive revenue auditing",
      description: "Our causal inference engine predicts the exact revenue impact of every fix before deployment.",
      accent: "bg-blue-400/20 text-blue-100",
      icon: BarChart3,
      preview: "analytics"
    },
    {
      title: "Brand-aligned autonomous design", 
      description: "Generate conversion-optimized designs that maintain your brand identity and aesthetic standards.",
      accent: "bg-amber-400/30 text-amber-100",
      icon: Palette,
      preview: "design"
    },
    {
      title: "Zero-touch deployment",
      description: "Generate production code and deploy changes safely with automated rollback protection.",
      accent: "bg-blue-300/20 text-blue-100",
      icon: Rocket,
      preview: "deployment"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(titleRef.current, { opacity: 0, y: 50 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 30 });
      gsap.set(featuresRef.current, { 
        opacity: 0, 
        y: 60,
        scale: 0.95
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

      featuresRef.current.forEach((feature, index) => {
        if (feature) {
          gsap.to(feature, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: feature,
              start: "top 85%",
              end: "top 50%",
              toggleActions: "play none none reverse"
            },
            delay: index * 0.2
          });

          const hoverTl = gsap.timeline({ paused: true });
          hoverTl.to(feature, {
            scale: 1.02,
            y: -5,
            duration: 0.3,
            ease: "power2.out"
          });

          feature.addEventListener('mouseenter', () => hoverTl.play());
          feature.addEventListener('mouseleave', () => hoverTl.reverse());
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderPreview = (type) => {
    switch(type) {
      case 'analytics':
        return (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white text-sm font-medium">Revenue Impact Analysis</h4>
                <div className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs">
                  94% Confidence
                </div>
              </div>
              <div className="relative h-24 bg-blue-900/30 rounded-lg overflow-hidden border border-blue-500/20">
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-2 pb-2">
                  <div className="w-4 bg-gradient-to-t from-blue-500/80 to-blue-400/60" style={{height: '40%'}}></div>
                  <div className="w-4 bg-gradient-to-t from-blue-500/80 to-blue-400/60" style={{height: '60%'}}></div>
                  <div className="w-4 bg-gradient-to-t from-green-500/80 to-green-400/60" style={{height: '85%'}}></div>
                  <div className="w-4 bg-gradient-to-t from-green-500/80 to-green-400/60" style={{height: '95%'}}></div>
                  <div className="w-4 bg-gradient-to-t from-amber-500/60 to-amber-400/40" style={{height: '75%'}}></div>
                </div>
                <div className="absolute top-2 right-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-blue-900/20 rounded border border-blue-500/20">
                <span className="text-blue-200 text-xs">Current CVR</span>
                <span className="text-white text-xs font-medium">3.2%</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-green-900/20 rounded border border-green-500/20">
                <span className="text-green-200 text-xs">Predicted CVR</span>
                <span className="text-white text-xs font-medium">4.8%</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-amber-900/20 rounded border border-amber-500/20">
                <span className="text-amber-200 text-xs">Revenue Lift</span>
                <span className="text-white text-xs font-medium">+$24K/mo</span>
              </div>
            </div>
          </div>
        );
      
      case 'design':
        return (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white text-sm font-medium">Autonomous Design Engine</h4>
                <div className="bg-amber-500/20 text-amber-300 px-2 py-1 rounded text-xs">
                  Brand Aligned
                </div>
              </div>
              <div className="bg-amber-900/20 rounded-lg p-4 border border-amber-500/20">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded"></div>
                  <div className="flex-1">
                    <div className="w-20 h-2 bg-white/30 rounded mb-1"></div>
                    <div className="w-16 h-1.5 bg-white/20 rounded"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-2 bg-white/20 rounded"></div>
                  <div className="w-3/4 h-2 bg-white/20 rounded"></div>
                  <div className="w-1/2 h-6 bg-gradient-to-r from-amber-500 to-orange-500 rounded mt-3"></div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2 p-2 bg-purple-900/20 rounded border border-purple-500/20">
                <Eye className="w-3 h-3 text-purple-400" />
                <span className="text-purple-200 text-xs">Visual AI</span>
              </div>
              <div className="flex items-center space-x-2 p-2 bg-blue-900/20 rounded border border-blue-500/20">
                <Palette className="w-3 h-3 text-blue-400" />
                <span className="text-blue-200 text-xs">Brand Kit</span>
              </div>
              <div className="flex items-center space-x-2 p-2 bg-green-900/20 rounded border border-green-500/20">
                <Target className="w-3 h-3 text-green-400" />
                <span className="text-green-200 text-xs">UX Patterns</span>
              </div>
              <div className="flex items-center space-x-2 p-2 bg-amber-900/20 rounded border border-amber-500/20">
                <Activity className="w-3 h-3 text-amber-400" />
                <span className="text-amber-200 text-xs">A/B Testing</span>
              </div>
            </div>
          </div>
        );

      case 'deployment':
        return (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white text-sm font-medium">Deployment Pipeline</h4>
                <div className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs">
                  Auto-Deploy
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-green-900/20 rounded border border-green-500/20">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-200 text-xs flex-1">Code Generation</span>
                  <span className="text-green-400 text-xs">✓ Complete</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-900/20 rounded border border-blue-500/20">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-blue-200 text-xs flex-1">Testing & Validation</span>
                  <span className="text-blue-400 text-xs">✓ Passed</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-amber-900/20 rounded border border-amber-500/20">
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                  <span className="text-amber-200 text-xs flex-1">Staged Deployment</span>
                  <span className="text-amber-400 text-xs">⟳ Active</span>
                </div>
              </div>
            </div>
            <div className="bg-slate-800/40 rounded p-3 border border-slate-600/50">
              <div className="flex items-center space-x-2 mb-2">
                <Code className="w-3 h-3 text-slate-400" />
                <span className="text-slate-300 text-xs font-mono">git commit -m "Auto: Hero CTA optimization"</span>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="w-3 h-3 text-blue-400" />
                <span className="text-slate-300 text-xs font-mono">npm run build && deploy --stage=prod</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <span className="text-green-400 text-xs font-mono">✓ Deployed successfully to production</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-blue-700 via-blue-600 to-yellow-400 overflow-hidden" ref={sectionRef}>
      <div className="relative container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 ref={titleRef} className="text-2xl md:text-3xl lg:text-4xl font-light text-white mb-4 md:mb-6 leading-tight px-4 sm:px-0">
              From audit to revenue lift<br />in three steps
            </h2>
            <p ref={subtitleRef} className="text-base md:text-lg text-blue-100 max-w-2xl mx-auto font-light leading-relaxed px-4 sm:px-0">
              Enterprise-grade setup in minutes. Guaranteed results while you focus on strategy.
            </p>
          </div>
          
          <div className="space-y-12 md:space-y-16">
            {features.map((feature, index) => (
              <div 
                key={index} 
                ref={el => featuresRef.current[index] = el}
                className="text-center px-4 sm:px-0"
              >
                <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium mb-4 md:mb-6 ${feature.accent}`}>
                  <feature.icon className="w-3 h-3" />
                  <span>0{index + 1}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-light text-white mb-3 md:mb-4 leading-tight">{feature.title}</h3>
                <p className="text-blue-100 leading-relaxed font-light text-base md:text-lg max-w-2xl mx-auto mb-6 md:mb-8">{feature.description}</p>
                <div className="max-w-md mx-auto">
                  {renderPreview(feature.preview)}
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