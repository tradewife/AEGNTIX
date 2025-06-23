import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { ArrowRight, X } from 'lucide-react';
import { addToWaitlist } from '../lib/supabase';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const titleWordsRef = useRef([]);
  const subtitleLinesRef = useRef([]);

  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
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
      // Ensure all refs are available before setting initial states
      const titleWords = titleWordsRef.current.filter(Boolean);
      const subtitleLines = subtitleLinesRef.current.filter(Boolean);
      
      if (!titleRef.current || !subtitleRef.current || !buttonsRef.current) {
        return;
      }

      // Set initial states - everything completely hidden
      gsap.set([titleRef.current, subtitleRef.current, buttonsRef.current], { 
        opacity: 0,
        visibility: 'hidden'
      });

      // Set initial states for individual words and lines
      if (titleWords.length > 0) {
        gsap.set(titleWords, {
          opacity: 0,
          y: 120,
          rotationX: -90,
          transformOrigin: "50% 50% -50px"
        });
      }

      if (subtitleLines.length > 0) {
        gsap.set(subtitleLines, {
          opacity: 0,
          x: -80,
          rotationY: -25,
          transformOrigin: "left center"
        });
      }

      // Main entrance animation with longer delay to ensure everything is ready
      const tl = gsap.timeline({ delay: 0.8 });
      
      // Animate the title container and individual words
      tl.to(titleRef.current, {
        opacity: 1,
        visibility: 'visible',
        duration: 0.1
      })
      .to(titleWords, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1.4,
        ease: "back.out(1.4)",
        stagger: {
          amount: 1.2,
          from: "start"
        }
      }, "-=0.8")
      
      // Animate subtitle
      .to(subtitleRef.current, {
        opacity: 1,
        visibility: 'visible',
        duration: 0.1
      }, "-=0.6")
      .to(subtitleLines, {
        opacity: 1,
        x: 0,
        rotationY: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.3
      }, "-=0.5")
      
      // Finally show buttons
      .to(buttonsRef.current, {
        opacity: 1,
        visibility: 'visible',
        duration: 0.8,
        ease: "back.out(1.1)"
      }, "-=0.3");

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = () => {
    const problemSection = document.querySelector('section[data-section="problem"]');
    if (problemSection) {
      problemSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAssessment = () => {
    const assessmentSection = document.querySelector('[data-section="assessment"]');
    if (assessmentSection) {
      assessmentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

  return (
    <>
      <section className="relative bg-slate-900 min-h-screen flex items-center overflow-hidden" ref={heroRef}>
        {/* Clean background image - no overlays or effects */}
        <div className="absolute inset-0">
          <img 
            src="/image0.png" 
            alt="Business professionals collaborating" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Minimal text shadow overlay for readability only */}
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative container mx-auto px-6 py-12 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main headline - mobile kept at text-3xl, desktop restored to original smaller sizes */}
            <h1 ref={titleRef} className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light text-white mb-6 md:mb-8 leading-[1.1] tracking-tight drop-shadow-2xl opacity-0 invisible">
              <span ref={el => titleWordsRef.current[0] = el} className="inline-block">What</span>{' '}
              <span ref={el => titleWordsRef.current[1] = el} className="inline-block">if</span>{' '}
              <span ref={el => titleWordsRef.current[2] = el} className="inline-block">your</span>{' '}
              <span ref={el => titleWordsRef.current[3] = el} className="inline-block">website</span>{' '}
              <span ref={el => titleWordsRef.current[4] = el} className="inline-block">was</span>
              <span className="block font-medium text-blue-100">
                <span ref={el => titleWordsRef.current[5] = el} className="inline-block">your</span>{' '}
                <span ref={el => titleWordsRef.current[6] = el} className="inline-block">star</span>{' '}
                <span ref={el => titleWordsRef.current[7] = el} className="inline-block">employee?</span>
              </span>
            </h1>

            {/* Refined sub-headline with better mobile responsive text - INITIALLY HIDDEN */}
            <div ref={subtitleRef} className="text-base sm:text-lg md:text-xl text-white mb-8 md:mb-12 max-w-xl mx-auto leading-relaxed font-normal drop-shadow-lg px-4 sm:px-0 opacity-0 invisible">
              <p ref={el => subtitleLinesRef.current[0] = el} className="inline">
                AegntSite is the world's first agency for <em>self-evolving</em>
              </p>
              <span className="hidden sm:inline"><br /></span>
              <span className="sm:hidden"> </span>
              <p ref={el => subtitleLinesRef.current[1] = el} className="inline">
                websites that audit, redesign and deploy guaranteed
              </p>
              <span className="hidden sm:inline"><br /></span>
              <span className="sm:hidden"> </span>
              <p ref={el => subtitleLinesRef.current[2] = el} className="inline">
                conversion lifts while you focus on the <em>human</em> things.
              </p>
            </div>

            {/* Elegant CTA buttons with glass styling - correct order and text - INITIALLY HIDDEN */}
            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-16 md:mb-20 px-4 sm:px-0 opacity-0 invisible">
              <button 
                onClick={scrollToAssessment}
                className="group bg-white/10 backdrop-blur-sm text-white px-6 sm:px-8 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center hover:bg-white/20 border border-white/20 w-full sm:w-auto justify-center"
              >
                Get free assessment
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => setShowWaitlistModal(true)}
                className="group bg-white/10 backdrop-blur-sm text-white px-6 sm:px-8 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center hover:bg-white/20 border border-white/20 w-full sm:w-auto justify-center"
              >
                Join the waitlist
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Modal */}
      {showWaitlistModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
              <h3 className="text-lg font-medium text-slate-900">Join the waitlist</h3>
              <button 
                onClick={closeModal}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              {isSubmitted ? (
                <div className="text-center">
                  <div className="w-12 h-12 bg-amber-500/40 rounded-xl flex items-center justify-center mx-auto mb-6 border border-amber-400/50">
                    <div className="w-6 h-6 rounded-full bg-amber-500/60 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                    </div>
                  </div>
                  <h4 className="text-xl font-light text-slate-900 mb-3">
                    Welcome to the future
                  </h4>
                  <p className="text-slate-600 mb-6 font-light leading-relaxed">
                    You're now part of the agentic optimization revolution. 
                    Expect beta access and exclusive insights within 48 hours.
                  </p>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-left">
                    <p className="font-medium text-slate-900 mb-2">What happens next?</p>
                    <p className="text-slate-600 font-light text-sm">
                      You'll receive priority access to AegntSite's private beta, plus exclusive case studies and optimization insights.
                    </p>
                  </div>
                  <button 
                    onClick={closeModal}
                    className="mt-6 w-full bg-slate-900 hover:bg-slate-800 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300"
                  >
                    Got it
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {submitError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-red-600 text-sm">{submitError}</p>
                    </div>
                  )}
                  
                  <div>
                    <label htmlFor="modal-email" className="block text-sm font-medium text-slate-700 mb-2">
                      Work email
                    </label>
                    <input
                      type="email"
                      id="modal-email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 placeholder-slate-400 ${
                        errors.email 
                          ? 'border-red-300 focus:border-red-500' 
                          : 'border-slate-300 focus:border-blue-500'
                      }`}
                      placeholder="you@company.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="modal-persona" className="block text-sm font-medium text-slate-700 mb-2">
                      What describes you best?
                    </label>
                    <select
                      id="modal-persona"
                      value={formData.persona}
                      onChange={(e) => handleInputChange('persona', e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 ${
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
                      <p className="mt-1 text-sm text-red-600">{errors.persona}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="modal-website" className="block text-sm font-medium text-slate-700 mb-2">
                      Website URL <span className="text-slate-500 font-normal">(optional)</span>
                    </label>
                    <input
                      type="url"
                      id="modal-website"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-slate-900 placeholder-slate-400"
                      placeholder="https://yoursite.com"
                    />
                  </div>

                  <button
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
              )}
              
              {!isSubmitted && (
                <p className="text-center text-xs text-slate-500 mt-4 font-light">
                  No spam. Unsubscribe anytime. We protect your data with enterprise-grade security.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;