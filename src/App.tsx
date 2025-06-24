import React from 'react';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import HowItWorks from './components/HowItWorks';
import Guarantee from './components/Guarantee';
import AssessmentRequest from './components/AssessmentRequest';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <Guarantee />
      <AssessmentRequest />
      <Footer />
    </div>
  );
}

export default App;