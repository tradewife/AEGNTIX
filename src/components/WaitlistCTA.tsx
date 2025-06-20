import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { addToWaitlist } from '../lib/supabase';

gsap.registerPlugin(ScrollTrigger);

const WaitlistCTA = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const formRef = useRef(null);
  const fieldsRef = useRef([]);

  const [formData, setFormData] = useState({
    email: '',
    persona: '',
    website: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!isSubmitted) {
        // Set initial states
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

        // Main animation timeline
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
        .to(formRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.3")
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

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
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
      await addToWaitlist({
        email: formData.email,
        persona: formData.persona,
        website: formData.website || undefined
      });
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Waitlist signup error:', error);
      if (error.code === '23505') {
        setSubmitError('This email is already on our waitlist!');
      } else {
        setSubmitError('Something went wrong. Please try again.');
      }
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

  const closeModal = () => {
    setShowWaitlistModal(false);
    setFormData({ email: '', persona: '', website: '' });
    setErrors({});
    setSubmitError('');
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-slate-50 via-white to-white">
        {/* Seamless royal blue gradient with prominent gold highlights */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/90 via-white/85 to-white"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50/60 via-transparent to-amber-400/30"></div>
        <div className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-amber-400/20 to-transparent"></div>
        
        <div className="relative container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8 md:mb-12">
              <div className="w-12 h-12 bg-amber-500/40 rounded-xl flex items-center justify-center mx-auto mb-6 md:mb-8 border border-amber-400/50">
                <div className="w-6 h-6 rounded-full bg-amber-500/60 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                </div>
              </div>
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-slate-900 mb-4">
              Welcome to the future
            </h2>
            <p className="text-base md:text-lg text-slate-600 mb-6 md:mb-8 font-light leading-relaxed px-4 sm:px-0">
              You're now part of the agentic optimization revolution. 
              Expect beta access and exclusive insights within 48 hours.
            </p>
            <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-xl p-4 md:p-6 text-left mx-4 sm:mx-0">
              <p className="font-medium text-slate-900 mb-2">What happens next?</p>
              <p className="text-slate-600 font-light text-sm md:text-base">
                You'll receive priority access to AegntSite's private beta, plus exclusive case studies and optimization insights.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-slate-50 via-white to-white overflow-hidden" ref={sectionRef}>
      {/* Seamless royal blue gradient with prominent gold highlights */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/90 via-white/85 to-white"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-50/60 via-transparent to-amber-400/30"></div>
      <div className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-amber-400/20 to-transparent"></div>
      
      <div className="relative container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 ref={titleRef} className="text-2xl sm:text-3xl md:text-4xl font-light text-slate-900 mb-4 md:mb-6 leading-tight px-4 sm:px-0">
              Ready for agentic growth?
            </h2>
            <p ref={subtitleRef} className="text-base md:text-lg text-slate-600 font-light leading-relaxed px-4 sm:px-0">
              Join performance-driven leaders getting early access to the future of conversion optimization.
            </p>
          </div>

          <div ref={formRef} className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-xl shadow-sm p-6 md:p-8 mx-4 sm:mx-0">
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-600 text-sm">{submitError}</p>
                </div>
              )}
              
              <div ref={el => fieldsRef.current[0] = el}>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2 md:mb-3">
                  Work email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 placeholder-slate-400 bg-white/50 ${
                    errors.email 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-slate-300 focus:border-blue-500'
                  }`}
                  placeholder="you@company.com"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div ref={el => fieldsRef.current[1] = el}>
                <label htmlFor="persona" className="block text-sm font-medium text-slate-700 mb-2 md:mb-3">
                  What describes you best?
                </label>
                <select
                  id="persona"
                  value={formData.persona}
                  onChange={(e) => handleInputChange('persona', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 bg-white/50 ${
                    errors.persona 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-slate-300 focus:border-blue-500'
                  }`}
                >
                  <option value="" className="text-slate-500">Select your role</option>
                  <option value="agency">Agency owner/director</option>
                  <option value="ecommerce">E-commerce marketing manager</option>
                  <option value="saas">SaaS marketing lead</option>
                  <option value="consultant">Performance marketing consultant</option>
                  <option value="other">Other</option>
                </select>
                {errors.persona && (
                  <p className="mt-2 text-sm text-red-600">{errors.persona}</p>
                )}
              </div>

              <div ref={el => fieldsRef.current[2] = el}>
                <label htmlFor="website" className="block text-sm font-medium text-slate-700 mb-2 md:mb-3">
                  Website URL <span className="text-slate-500 font-normal">(optional)</span>
                </label>
                <input
                  type="url"
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-slate-900 placeholder-slate-400 bg-white/50"
                  placeholder="https://yoursite.com"
                />
              </div>

              <button
                ref={el => fieldsRef.current[3] = el}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-3"></div>
                    Securing your access...
                  </>
                ) : (
                  <>
                    Get priority beta access
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-xs md:text-sm text-slate-500 mt-4 md:mt-6 font-light">
              No spam. Unsubscribe anytime. We protect your data with enterprise-grade security.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitlistCTA;