import { useState } from "react";
import { WORK_EXPERIENCE_DATA } from "../data";
import { ArrowUpRight, Award, Briefcase, GraduationCap, Code2, Cpu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function AboutSection() {
  const [selectedSkillCategory, setSelectedSkillCategory] = useState("cybersecurity");
  const [showTimeline, setShowTimeline] = useState(false);

  const skillsData = {
    cybersecurity: {
      title: "Cybersecurity & Threat Intel",
      description: "Specializing in phishing detection, threat intelligence, URL reputation analysis, and vulnerability assessment using industry-standard security tools.",
      items: ["Phishing Detection", "Threat Intelligence", "Wireshark", "Nmap", "Burp Suite"],
      color: "from-teal-500 to-emerald-600"
    },
    development: {
      title: "Full Stack Development",
      description: "Building production-grade web applications with React, FastAPI, and TailwindCSS. Experienced in containerization with Docker and version control with Git.",
      items: ["React", "FastAPI", "Flask", "TailwindCSS", "Docker"],
      color: "from-pine-light to-pine"
    },
    aiml: {
      title: "AI & Machine Learning",
      description: "Training and deploying machine learning models for threat detection and computer vision. Working with TensorFlow, Scikit-learn, and OpenCV on real-world datasets.",
      items: ["TensorFlow/Keras", "Scikit-learn", "OpenCV", "Python", "Pandas/NumPy"],
      color: "from-emerald-700 to-pine-dark"
    }
  };

  return (
    <section id="about" className="py-24 px-6 md:px-12 bg-cream-light border-b border-sand">
      <div className="max-w-7xl mx-auto">
        
        {/* Title Block */}
        <div className="flex flex-col xl:flex-row items-start xl:items-end justify-between gap-6 mb-16">
          <div className="max-w-4xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#9d9282] block mb-2">// CORE MANIFESTO</span>
            <h2 className="text-6xl md:text-[8rem] font-oswald font-extrabold uppercase text-pine tracking-tight leading-none mb-4">
              Passionate
            </h2>
            <h2 className="text-6xl md:text-[8rem] font-oswald font-extrabold uppercase text-pine tracking-tight leading-none">
              About Development
            </h2>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Block: Interactive Creative Sandbox (6 Columns) */}
          <div className="lg:col-span-6 bg-white border border-sand rounded-3xl p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Code2 className="w-4 h-4 text-pine" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-pine">// SKILL RADAR</span>
              </div>
              <p className="text-xs font-mono text-neutral-500 mb-6 leading-relaxed">
                CLICK CATEGORIES BELOW TO PROBE GAURAV&apos;S STACK RESOLUTION IN REAL-TIME:
              </p>

              {/* Switches */}
              <div className="space-y-2 mb-8">
                {Object.entries(skillsData).map(([key, data]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedSkillCategory(key)}
                    className={`w-full text-left p-3 rounded-xl border font-mono uppercase text-xs tracking-wider transition-all cursor-pointer ${
                      selectedSkillCategory === key
                        ? "bg-pine text-cream-light border-pine font-semibold shadow-xs"
                        : "bg-neutral-50 text-neutral-600 border-sand hover:bg-neutral-100"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{data.title}</span>
                      <span className={`w-2 h-2 rounded-full ${selectedSkillCategory === key ? "bg-emerald-400" : "bg-neutral-300"}`} />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Skill Visual Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-neutral-50 to-neutral-100 border border-sand">
              <h4 className="font-mono text-xs font-bold uppercase text-pine mb-2 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-pine" /> {skillsData[selectedSkillCategory as keyof typeof skillsData].title}
              </h4>
              <p className="font-mono text-[11px] text-neutral-600 mb-4 leading-normal">
                {skillsData[selectedSkillCategory as keyof typeof skillsData].description}
              </p>
              <div className="flex flex-wrap gap-1">
                {skillsData[selectedSkillCategory as keyof typeof skillsData].items.map((it) => (
                  <span key={it} className="text-[9px] font-mono font-medium text-pine bg-white border border-sand px-2 py-0.5 rounded-sm">
                    {it}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Block: Personal Background & Resume Callout (6 Columns) */}
          <div className="lg:col-span-6 bg-white border border-sand rounded-3xl p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">// CURRENT COMPASS</span>
                <span className="bg-[#efebe4] text-pine px-2 py-0.5 text-[9px] font-mono rounded uppercase">IST Timezone</span>
              </div>
              
              <h4 className="text-lg font-mono uppercase font-bold text-pine mb-4">
                Gaurav Kumar
              </h4>
              
              <p className="text-xs font-mono text-neutral-600 leading-relaxed mb-6">
                Gaurav is a B.Tech CSE (Cybersecurity) student at VIT Bhopal University, specializing in AI-driven threat detection and secure web systems. Currently working as a Frontend Intern at Agnivora Digital, he combines cybersecurity expertise with modern full-stack development skills.
              </p>

              <div className="space-y-4 font-mono text-xs text-neutral-700">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-neutral-100 rounded-lg text-pine mt-0.5">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-pine">VIT Bhopal University</p>
                    <p className="text-[10px] text-neutral-400">B.Tech CSE — Cybersecurity (CGPA: 8.23)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-neutral-100 rounded-lg text-pine mt-0.5">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-pine">Agnivora Digital Pvt Ltd</p>
                    <p className="text-[10px] text-neutral-400">Frontend Intern (May 2026 – July 2026)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={() => setShowTimeline(true)}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-neutral-100 hover:bg-pine hover:text-white rounded-xl text-xs font-mono tracking-widest uppercase text-pine transition-all cursor-pointer"
              >
                PROBE FULL CAREER HISTORIES <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Sliding Timeline Resume Drawer */}
        <AnimatePresence>
          {showTimeline && (
            <div className="fixed inset-0 z-50 flex justify-end">
              {/* Overlay Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-pine-dark"
                onClick={() => setShowTimeline(false)}
              />

              {/* Slider Panel */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 180 }}
                data-lenis-prevent
                className="relative w-full max-w-xl h-full bg-cream-light border-l border-sand shadow-2xl overflow-y-auto z-10 p-5 sm:p-8 flex flex-col justify-between"
              >
                {/* Header */}
                <div className="flex items-center justify-between pb-6 border-b border-sand">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#9d9282] block">// CURRICULUM VITAE</span>
                    <h3 className="text-3xl font-oswald text-pine font-extrabold uppercase tracking-wide">
                      Gaurav&apos;s Timeline
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowTimeline(false)}
                    className="p-2 hover:bg-pine/10 text-pine rounded-full transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Timeline content */}
                <div className="py-8 space-y-8 flex-1">
                  
                  {WORK_EXPERIENCE_DATA.map((exp, idx) => (
                    <div key={exp.id} className="relative pl-6 border-l-2 border-pine/30 hover:border-pine transition-colors">
                      {/* Circle indicator */}
                      <div className="absolute -left-[7px] top-1 w-3 h-3 bg-white border-2 border-pine rounded-full" />
                      
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-bold text-pine bg-pine/5 px-2.5 py-1 rounded-full">{exp.year}</span>
                        <span className="text-[10px] font-mono text-neutral-400">LOG {103 - idx}</span>
                      </div>
                      
                      <h4 className="text-base font-bold font-mono text-pine uppercase tracking-wide">{exp.title}</h4>
                      <p className="text-xs font-mono text-pine-light font-medium mb-2">{exp.company}</p>
                      
                      <p className="text-xs text-neutral-600 font-mono leading-relaxed mb-4">
                        {exp.description}
                      </p>

                      <div className="flex flex-wrap gap-1">
                        {exp.skills.map((skill) => (
                          <span key={skill} className="text-[9px] font-mono bg-white border border-sand px-2 py-0.5 rounded-sm text-neutral-600">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Highlights section inside drawer */}
                  <div className="p-5 rounded-2xl bg-white border border-sand space-y-3">
                    <h4 className="text-xs font-mono font-bold text-pine uppercase tracking-widest flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-pine-light" /> Professional Certifications
                    </h4>
                    <div className="text-[10px] font-mono text-neutral-600 space-y-2">
                      <div className="flex justify-between border-b border-neutral-100 pb-1">
                        <span>Google IT Support Professional Certificate</span>
                        <span className="text-pine font-semibold">2025</span>
                      </div>
                      <div className="flex justify-between border-b border-neutral-100 pb-1">
                        <span>Google Generative AI Certificate</span>
                        <span className="text-pine font-semibold">2025</span>
                      </div>
                      <div className="flex justify-between border-b border-neutral-100 pb-1">
                        <span>AWS Cloud Practitioner Essentials</span>
                        <span className="text-pine font-semibold">2025</span>
                      </div>
                      <div className="flex justify-between pb-1">
                        <span>Introduction to Cybersecurity — Cisco</span>
                        <span className="text-pine font-semibold">2024</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Footer block */}
                <div className="pt-6 border-t border-sand flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <span className="text-[10px] font-mono text-neutral-400">LOCALTIME IST // GO ATTAIN EXCELLENCE</span>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
                    <a
                      href="/Gaurav_Kumar_Resume.pdf"
                      download="Gaurav_Kumar_Resume.pdf"
                      className="flex items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 border border-sand px-5 py-2.5 rounded-xl text-xs font-mono tracking-widest uppercase text-pine transition-colors cursor-pointer w-full sm:w-auto text-center"
                    >
                      Download CV <ArrowUpRight className="w-3.5 h-3.5 text-pine-light" />
                    </a>
                    <button
                      onClick={() => {
                        setShowTimeline(false);
                        setTimeout(() => {
                          const form = document.getElementById("contact-section");
                          if (form) form.scrollIntoView({ behavior: "smooth" });
                        }, 200);
                      }}
                      className="flex items-center justify-center gap-2 bg-pine text-cream hover:bg-pine-light px-5 py-2.5 rounded-xl text-xs font-mono tracking-widest uppercase transition-colors cursor-pointer w-full sm:w-auto text-center"
                    >
                      Acquire Dev Resources <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
