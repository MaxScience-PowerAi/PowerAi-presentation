import React, { useState, useEffect, useRef } from 'react';
import { PortfolioNav } from './components/portfolio/PortfolioNav';
import { HeroSection } from './components/portfolio/HeroSection';
import { AboutSection } from './components/portfolio/AboutSection';
import { SkillsSection } from './components/portfolio/SkillsSection';
import { ProjectsSection } from './components/portfolio/ProjectsSection';
import { ContactSection } from './components/portfolio/ContactSection';
import { PortfolioFooter } from './components/portfolio/PortfolioFooter';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  // Scroll progress & active section tracking
  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) setScrollProgress((window.scrollY / total) * 100);

      // find active section
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ background: '#030014', minHeight: '100vh', color: '#e2e8f0', overflowX: 'hidden' }}>
      {/* Scroll progress bar */}
      <div
        id="scroll-bar"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navbar */}
      <PortfolioNav activeSection={activeSection} />

      {/* Sections */}
      <main>
        <section id="home">   <HeroSection /></section>
        <section id="about">  <AboutSection /></section>
        <section id="skills"> <SkillsSection /></section>
        <section id="projects"><ProjectsSection /></section>
        <section id="contact"><ContactSection /></section>
      </main>

      <PortfolioFooter />
    </div>
  );
}
