import { useState, useEffect } from "react";
import { GAURAV_BIO } from "./data";
import Navbar from "./components/Navbar";
import WorksSection from "./components/WorksSection";
import AboutSection from "./components/AboutSection";
import OffDutySection from "./components/OffDutySection";
import SmoothScroll from "./components/SmoothScroll";
import TechStackSection from "./components/TechStackSection";

import ContactDrawer from "./components/ContactDrawer";
import { ArrowUpRight, Copy, Check, Clock, Code } from "lucide-react";
import { motion } from "motion/react";

export default function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [eindhovenTime, setEindhovenTime] = useState("");

  // Bhopal timezone clock
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      };
      setEindhovenTime(new Date().toLocaleTimeString("en-GB", options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(GAURAV_BIO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full min-h-screen bg-pine text-[#1a1a1a] flex flex-col items-center">
      <SmoothScroll />
      
      {/* Outer framing wrapper to feel like an elegant editorial poster */}
      <div className="w-full max-w-7xl px-4 py-6 md:py-10 flex flex-col gap-6 relative">
        
        {/* Frame Outer Taglines */}
        <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-[#dfefe4] px-4">
          <span className="font-bold flex items-center gap-1">
            <Code className="w-3.5 h-3.5 text-[#10be7e]" /> GAURAV KUMAR // EST. 2023
          </span>
          <span className="hidden sm:inline">CYBERSECURITY × AI × FULL STACK</span>
        </div>

        {/* Major Inner Container Card */}
        <div className="bg-[#efebe4] rounded-3xl shadow-2xl border border-sand flex flex-col">
          
          {/* Header Navigation Section */}
          <Navbar onContactClick={() => setContactOpen(true)} />

          {/* Hero Section Container */}
          <section id="hero" className="py-16 md:py-24 px-6 md:px-12 flex flex-col justify-between items-center relative min-h-[550px] border-b border-sand bg-cream-light pointer-events-auto">
            
            {/* Intro Greeting label */}
            <div className="text-center mb-8 relative z-25">
              <span className="text-xs font-mono font-semibold tracking-widest text-neutral-400 block uppercase mb-1">
                // CREATIVE DECK
              </span>
              <h1 className="text-xl md:text-2xl font-script text-pine tracking-wide">
                Hi there, I&apos;m {GAURAV_BIO.name}
              </h1>
            </div>

            {/* Massive Hero Text Grid overlay with Curly-Haired Portrait */}
            <div className="w-full flex justify-center items-center relative my-12 h-[340px] md:h-[450px]">
              
              {/* Giant Forest Green text layered in back */}
              <div className="absolute inset-0 flex flex-col justify-center items-center select-none pointer-events-none z-0">
                <span className="text-[12vw] xs:text-[11vw] font-oswald font-extrabold uppercase text-pine text-center tracking-tight leading-none scale-y-115">
                  CYBERSECURITY
                </span>
                <span className="text-[12vw] xs:text-[11vw] font-oswald font-extrabold uppercase text-pine text-center tracking-tight leading-none scale-y-115">
                  DEVELOPER &lt;/&gt;
                </span>
              </div>

              {/* Centered curly haired creative master portrait */}
              <div className="relative w-52 h-52 md:w-80 md:h-80 rounded-full p-2 border border-pine-light/30 z-10 flex items-center justify-center">
                
                {/* Visual decorative rings underneath profile */}
                <div className="absolute inset-2 border border-pine-light/20 rounded-full animate-spin" style={{ animationDuration: "30s" }} />
                <div className="absolute inset-4 border border-dashed border-pine-light/10 rounded-full animate-spin" style={{ animationDuration: "12s" }} />
                
                <div className="w-full h-full rounded-full overflow-hidden border border-pine relative">
                  {/* Professional portrait image */}
                  <img
                    src="/profile.jpg"
                    alt="Gaurav Kumar profile portrait"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover scale-102 hover:scale-108 transition-all duration-700 select-none grayscale hover:grayscale-0"
                  />
                  {/* Subtle pine gradient vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-pine/30 to-transparent mix-blend-multiply pointer-events-none" />
                </div>
              </div>

              {/* Floating creative quote side widgets (hidden on small layouts) */}
              <div className="absolute left-4 top-1/4 max-w-[12rem] bg-white border border-sand p-3.5 rounded-xl shadow-xs font-mono text-[10px] text-neutral-600 space-y-2 hidden xl:block z-20">
                <p className="font-bold text-pine flex items-center gap-1 uppercase">// PARADIGM</p>
                <p className="leading-normal">Combining secure code practices with modern AI-driven threat detection systems.</p>
              </div>

              <div className="absolute right-4 bottom-1/4 max-w-[12rem] bg-pine text-cream p-3.5 rounded-xl shadow-xs font-mono text-[10px] space-y-2 hidden xl:block z-20 border border-pine-dark">
                <p className="font-bold text-[#10be7e] flex items-center gap-1 uppercase">// FOCUS MATRIX</p>
                <p className="leading-normal">React full-stack development, ML threat models, and security API integrations.</p>
              </div>

            </div>

            {/* Bottom brief manifesto block */}
            <div className="max-w-xl text-center relative z-25 mt-6 px-4">
              <p className="font-mono text-xs md:text-sm text-neutral-600 leading-relaxed uppercase mb-8">
                {GAURAV_BIO.shortIntro}
              </p>
              
              {/* CTA Actions Group */}
              <div className="flex flex-wrap justify-center gap-4 relative z-25">
                <button
                  onClick={() => setContactOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-pine hover:bg-pine-light text-[#efebe4] rounded-full text-xs font-mono font-bold tracking-widest uppercase cursor-pointer hover:scale-105 transition-all shadow-sm"
                >
                  Send Request <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
                <a
                  href="/Gaurav_Kumar_Resume.pdf"
                  download="Gaurav_Kumar_Resume.pdf"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-neutral-100 text-pine rounded-full text-xs font-mono font-bold tracking-widest uppercase cursor-pointer hover:scale-105 transition-all border border-sand shadow-sm"
                >
                  Download CV <ArrowUpRight className="w-3.5 h-3.5 text-pine-light" />
                </a>
              </div>
            </div>

          </section>

          {/* Interactive Works Grid */}
          <WorksSection />

          {/* About Manifesto Bento Grid */}
          <AboutSection />

          {/* Tech Stack Physics Simulation */}
          <TechStackSection />

          {/* Off Duty Hobby Console */}
          <OffDutySection />



          {/* CTA "HAVE AN IDEA? TELL ME ABOUT IT" Section */}
          <section id="contact-section" className="py-24 px-6 md:px-12 bg-cream-light border-b border-sand flex flex-col items-center justify-center text-center space-y-12">
            
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#9d9282] block">// COLLABORATION GATEWAY</span>
              <h3 className="text-5xl md:text-9xl font-oswald font-extrabold uppercase text-pine tracking-tight leading-none scale-y-110">
                HAVE AN IDEA?
              </h3>
              <h3 className="text-5xl md:text-9xl font-oswald font-extrabold uppercase text-pine tracking-tight leading-none scale-y-110">
                TELL ME ABOUT IT
              </h3>
            </div>

            {/* Simulated request launcher button triggering the form modal */}
            <button
              onClick={() => setContactOpen(true)}
              className="inline-flex items-center gap-2 px-12 py-5 bg-pine hover:bg-pine-light text-[#efebe4] rounded-full text-xs font-mono font-bold tracking-widest uppercase cursor-pointer hover:scale-105 transition-all shadow-md hover:shadow-lg"
            >
              SEND ME A DIRECT REQUEST <ArrowUpRight className="w-4 h-4 ml-1" />
            </button>
          </section>

          {/* Massive Footer with copy feedback and dynamic Eindhoven clock */}
          <footer className="bg-sand p-8 md:p-14 text-pine space-y-12 rounded-b-[24px]">
            
            {/* Top row: Massive Email & Copy Feature */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-[#dfd9cb] pb-10">
              
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#9d9282]">
                  // QUICK COPY FOR CONVERSATION
                </span>
                <div className="flex items-center gap-4">
                  <h4 
                    onClick={handleCopyEmail}
                    className="text-4xl md:text-6xl font-oswald font-extrabold uppercase text-pine hover:text-pine-light transition-colors cursor-pointer leading-none tracking-wide"
                  >
                    {GAURAV_BIO.email}
                  </h4>
                  <button
                    onClick={handleCopyEmail}
                    className="p-3 bg-white hover:bg-[#efebe4] border border-[#dfd9cb] rounded-full transition-colors text-pine cursor-pointer shadow-xs"
                    title="Copy Email Vector Address"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Dynamic Netherlands Time clock */}
              <div className="bg-white/60 border border-[#dfd9cb] p-4 rounded-2xl flex items-center gap-3 font-mono text-xs max-w-xs text-neutral-600">
                <div className="p-2.5 bg-pine text-[#efebe4] rounded-xl">
                  <Clock className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <p className="text-[9px] text-[#9d9282] font-bold uppercase tracking-widest">BHOPAL IN TIME</p>
                  <p className="text-sm font-bold text-pine tracking-wider">{eindhovenTime || "00:00:00"} <span className="text-[10px] text-[#9d9282]">IST</span></p>
                </div>
              </div>

            </div>

            {/* Bottom Row Grid: Columns for Quick links, address and social anchors */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 font-mono text-xs text-neutral-600">
              
              <div className="space-y-4">
                <h5 className="font-bold text-pine uppercase tracking-widest text-[9px]">// RESOURCES</h5>
                <ul className="space-y-2">
                  <li>
                    <button 
                      onClick={() => document.getElementById("works")?.scrollIntoView({ behavior: "smooth" })}
                      className="hover:text-pine-light transition-colors text-left"
                    >
                      Featured Works
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                      className="hover:text-pine-light transition-colors text-left"
                    >
                      Education & Skills
                    </button>
                  </li>

                </ul>
              </div>

              <div className="space-y-4 col-span-2">
                <h5 className="font-bold text-pine uppercase tracking-widest text-[9px]">// OFFICE ADDRESS</h5>
                <p className="leading-relaxed hover:text-pine-light transition-colors uppercase">
                  VIT BHOPAL UNIVERSITY<br />
                  KOTHRI KALAN, SEHORE<br />
                  MADHYA PRADESH, INDIA
                </p>
              </div>

              <div className="space-y-4">
                <h5 className="font-bold text-pine uppercase tracking-widest text-[9px]">// SOCIAL INDEX</h5>
                <ul className="space-y-2">
                  <li><a href={GAURAV_BIO.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-pine-light transition-colors block">GitHub Link</a></li>
                  <li><a href={GAURAV_BIO.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-pine-light transition-colors block">LinkedIn Network</a></li>
                </ul>
              </div>

            </div>

            {/* Copyright and signature */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-[#dfd9cb] pt-8 text-[10px] font-mono text-neutral-400">
              <span>© {new Date().getFullYear()} GAURAV KUMAR. ALL RIGHTS RESERVED SECTIONS PROTECTED.</span>
              <span className="uppercase">CRAFTED WITH PRECISION // GAURAV_DEV_v1</span>
            </div>

          </footer>

        </div>
      </div>

      {/* Slide-Up Contact Requests dispatch modal */}
      <ContactDrawer isOpen={contactOpen} onClose={() => setContactOpen(false)} />

    </div>
  );
}
