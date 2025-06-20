import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail } from 'lucide-react';
import ContactModal from './ContactModal';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const contentRef = useRef(null);
  const [showContactModal, setShowContactModal] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(contentRef.current, { 
        opacity: 0, 
        y: 30 
      });

      gsap.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          end: "top 60%",
          toggleActions: "play none none reverse"
        }
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <footer className="bg-white border-t border-slate-200 py-8 md:py-12" ref={footerRef}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center" ref={contentRef}>
            <div className="mb-6 md:mb-8">
              <h3 className="text-base md:text-lg font-medium text-slate-900 mb-2">AegntSite</h3>
              <p className="text-sm md:text-base text-slate-600 font-light">The world's first agentic website optimization platform</p>
            </div>
            
            {/* Contact Section */}
            <div className="mb-6 md:mb-8">
              <button
                onClick={() => setShowContactModal(true)}
                className="group inline-flex items-center space-x-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 rounded-lg px-4 py-2 transition-all duration-300"
              >
                <Mail className="w-4 h-4 text-slate-600 group-hover:text-slate-900 transition-colors" />
                <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
                  Contact us
                </span>
              </button>
              <p className="text-xs text-slate-500 mt-2 font-light">
                Have questions? We'd love to hear from you.
              </p>
            </div>
            
            <div className="border-t border-slate-200 pt-6 md:pt-8">
              <p className="text-slate-500 text-xs md:text-sm font-light">
                © 2025 AegntSite. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      <ContactModal 
        isOpen={showContactModal} 
        onClose={() => setShowContactModal(false)} 
      />
    </>
  );
};

export default Footer;