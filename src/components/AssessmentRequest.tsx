import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Search, Eye, TrendingUp } from 'lucide-react';
import { submitAssessmentRequest } from '../lib/supabase';

gsap.registerPlugin(ScrollTrigger);

const AssessmentRequest = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const formRef = useRef(null);
  const fieldsRef = useRef([]);
  const featuresRef = useRef([]);

  const [formData, setFormData] = useState({
    email: '',
    website: '',
    persona: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  const assessmentFeatures = [
    {
      icon: Search,
      title: "Deep Analysis",
      description: "Comprehensive review of your site's structure, content, and user experience"
    },
    {
      icon: Eye,
      title: "Design Critique",
      description: "Professional assessment of visual hierarchy, branding, and aesthetic appeal"
    },
    {
      icon: TrendingUp,
      title: "Growth Opportunities",
      description: "Actionable recommendations to boost conversions and user engagement"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!isSubmitted) {
        gsap.set(titleRef.current, { opacity: 0, y: 40 });
        gsap.set(subtitleRef.current, { opacity: 0, y: 30 });
        gsap.set(formRef.current, { 
          opacity: 0, 
          y: 50, 
          scale: 0.95 
        });
        gsap.set(fieldsRef.current, { 
          opacity: 0, 
          x: -30,
          scale: 0.95
        });
        gsap.set(featuresRef.current, {
          opacity: 0,
          y: 40,
          scale: 0.9
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
          duration: 0.8,
          ease: "power2.out"
        })
        .to(subtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.4")
        .to(featuresRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1
        }, "-=0.3")
        .to(formRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.4")
        .to(fieldsRef.current, {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1
        }, "-=0.5");
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isSubmitted]);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateUrl = (url) => {
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`);
      return true;
    } catch {
      return false;
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.website) {
      newErrors.website = 'Website URL is required';
    } else if (!validateUrl(formData.website)) {
      newErrors.website = 'Please enter a valid website URL';
    }
    
    if (!formData.persona) {
      newErrors.persona = 'Please select what describes you';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Ensure URL has protocol
      const website = formData.website.startsWith('http') 
        ? formData.website 
        : `https://${formData.website}`;

      console.log('Submitting assessment request:', {
        email: formData.email,
        website: website,
        persona: formData.persona
      });

      await submitAssessmentRequest({
        email: formData.email,
        website: website,
        persona: formData.persona
      });
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Assessment request error:', error);
      setSubmitError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    if (submitError) {
      setSubmitError('');
    }
  };

  if (isSubmitted) {
    return (
      <section data-section="assessment" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* STUNNING geometric abstraction background - PURE, NO FILTERS */}
        <div className="absolute inset-0">
          <img 
            src="/trade.wife_Minimalist_geometric_abstraction_soft-edged_polygo_59fb53ac-cdd1-498e-a288-2a78fcbbe428_0 copy.png" 
            alt="Geometric abstraction background" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        {/* ULTRA-LIGHT overlay - just enough for text readability while preserving geometric beauty */}
        <div className="absolute inset-0 bg-black/15"></div>
        
        <div className="relative container mx-auto px-6 py-16 md:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8 md:mb-12">
              <div className="w-12 h-12 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-6 md:mb-8 border border-white/30">
                <div className="w-6 h-6 rounded-full bg-white/25 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white/70"></div>
                </div>
              </div>
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-white mb-4 drop-shadow-xl">
              Assessment request received
            </h2>
            <p className="text-base md:text-lg text-white/95 mb-6 md:mb-8 font-light leading-relaxed px-4 sm:px-0 drop-shadow-lg">
              Your website assessment request has been submitted successfully. 
              I'll personally review your site and provide detailed insights within 24-48 hours.
            </p>
            <div className="bg-white/15 backdrop-blur-md border border-white/30 rounded-xl p-4 md:p-6 text-left mx-4 sm:mx-0 shadow-2xl">
              <p className="font-medium text-white mb-2 drop-shadow-sm">What happens next?</p>
              <ul className="text-white/90 font-light text-sm md:text-base space-y-2">
                <li>• I'll personally audit your website's design and user experience</li>
                <li>• You'll receive a detailed assessment with specific improvement recommendations</li>
                <li>• Priority consideration for AegntSite's private beta program</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section data-section="assessment" className="relative min-h-screen flex items-center justify-center overflow-hidden" ref={sectionRef}>
      {/* BREATHTAKING geometric abstraction - showcasing the full crystalline beauty */}
      <div className="absolute inset-0">
        <img 
          src="/trade.wife_Minimalist_geometric_abstraction_soft-edged_polygo_59fb53ac-cdd1-498e-a288-2a78fcbbe428_0 copy.png" 
          alt="Geometric abstraction background" 
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      {/* MINIMAL overlay - preserves the gorgeous blue-orange gradient transitions */}
      <div className="absolute inset-0 bg-black/15"></div>
      
      <div className="relative w-full max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
          <div className="text-center mb-8 md:mb-12 w-full max-w-4xl">
            <h2 ref={titleRef} className="text-2xl md:text-3xl lg:text-4xl font-light text-white mb-4 md:mb-6 leading-tight px-4 sm:px-0 drop-shadow-xl">
              Get a <em>personalized</em> website assessment
            </h2>
            <p ref={subtitleRef} className="text-base md:text-lg text-white/95 font-light leading-relaxed px-4 sm:px-0 max-w-2xl mx-auto drop-shadow-lg">
              Submit your website for a detailed human review. I'll personally analyze your design, 
              user experience, and conversion potential with AI-powered insights.
            </p>
          </div>

          {/* Assessment Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-8 md:mb-12 px-4 sm:px-0 w-full max-w-4xl">
            {assessmentFeatures.map((feature, index) => (
              <div 
                key={index}
                ref={el => featuresRef.current[index] = el}
                className="text-center p-4 bg-white/15 backdrop-blur-md rounded-xl border border-white/30 shadow-xl"
              >
                <div className="w-10 h-10 bg-white/15 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <feature.icon className="w-5 h-5 text-white/90" />
                </div>
                <h3 className="font-medium text-white mb-2 drop-shadow-sm">{feature.title}</h3>
                <p className="text-sm text-white/80 font-light">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* PERFECTLY CENTERED FORM CONTAINER */}
          <div className="w-full flex justify-center">
            <div ref={formRef} className="bg-black/30 backdrop-blur-md border border-white/30 rounded-xl shadow-2xl p-6 md:p-8 w-full max-w-lg">
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                {submitError && (
                  <div className="bg-red-500/25 border border-red-400/40 rounded-lg p-3">
                    <p className="text-red-100 text-sm">{submitError}</p>
                  </div>
                )}
                
                <div ref={el => fieldsRef.current[0] = el}>
                  <label htmlFor="assessment-website" className="block text-sm font-medium text-white mb-2 md:mb-3">
                    Website URL
                  </label>
                  <input
                    type="text"
                    id="assessment-website"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/40 text-slate-900 placeholder-slate-500 bg-white/95 backdrop-blur-sm ${
                      errors.website 
                        ? 'border-red-400/60 focus:border-red-400' 
                        : 'border-white/40 focus:border-white/70'
                    }`}
                    placeholder="https://yourwebsite.com"
                  />
                  {errors.website && (
                    <p className="mt-2 text-sm text-red-200">{errors.website}</p>
                  )}
                </div>

                <div ref={el => fieldsRef.current[1] = el}>
                  <label htmlFor="assessment-email" className="block text-sm font-medium text-white mb-2 md:mb-3">
                    Your email
                  </label>
                  <input
                    type="email"
                    id="assessment-email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/40 text-slate-900 placeholder-slate-500 bg-white/95 backdrop-blur-sm ${
                      errors.email 
                        ? 'border-red-400/60 focus:border-red-400' 
                        : 'border-white/40 focus:border-white/70'
                    }`}
                    placeholder="you@company.com"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-200">{errors.email}</p>
                  )}
                </div>

                <div ref={el => fieldsRef.current[2] = el}>
                  <label htmlFor="assessment-persona" className="block text-sm font-medium text-white mb-2 md:mb-3">
                    What describes you best?
                  </label>
                  <select
                    id="assessment-persona"
                    value={formData.persona}
                    onChange={(e) => handleInputChange('persona', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/40 text-slate-900 bg-white/95 backdrop-blur-sm ${
                      errors.persona 
                        ? 'border-red-400/60 focus:border-red-400' 
                        : 'border-white/40 focus:border-white/70'
                    }`}
                  >
                    <option value="" className="text-slate-500">Select your role</option>
                    <option value="business_owner">Business owner</option>
                    <option value="marketing_manager">Marketing manager</option>
                    <option value="designer">Designer/Developer</option>
                    <option value="agency">Agency owner/director</option>
                    <option value="consultant">Consultant</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.persona && (
                    <p className="mt-2 text-sm text-red-200">{errors.persona}</p>
                  )}
                </div>

                <button
                  ref={el => fieldsRef.current[3] = el}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white/25 hover:bg-white/35 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-xl backdrop-blur-md border border-white/40"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-3"></div>
                      Submitting request...
                    </>
                  ) : (
                    <>
                      Request personalized assessment
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <p className="text-center text-xs md:text-sm text-white/80 mt-4 md:mt-6 font-light">
                Free assessment • 24-48 hour turnaround • No spam, ever
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssessmentRequest;