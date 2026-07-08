import { useRef, useState, useEffect } from "react";
import { Project } from "../types";
import { PROJECTS_DATA } from "../data";
import { ArrowUpRight, X, Sparkles, Folder, Calendar, Layers, Github } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";

export default function WorksSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expanded, setExpanded] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouch(
        ("ontouchstart" in window) ||
        navigator.maxTouchPoints > 0
      );
    }
  }, []);

  // Desktop sticky container ref
  const desktopContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: desktopContainerRef,
  });

  // Map scroll position to horizontal translation for desktop
  // 1 intro panel + 3 projects = moving track is very wide. 
  // We translate by -62% which brings the final card fully into the viewport.
  const horizontalX = useTransform(scrollYProgress, [0, 1], ["0%", "-68%"]);

  // Expose categories for mobile filter
  const categories = ["All", "Cybersecurity SaaS", "AI & ML", "Computer Vision"];

  // Filter projects for mobile view
  const filteredProjects = PROJECTS_DATA.filter((p) => {
    if (selectedCategory === "All") return true;
    return p.category === selectedCategory;
  });

  // Limit initially displayed to 3 projects for mobile, unless expanded
  const visibleProjects = expanded ? filteredProjects : filteredProjects.slice(0, 3);

  return (
    <section id="works" className="relative bg-cream-light border-b border-sand">
      
      {/* ========================================================================= */}
      {/* DESKTOP VIEW: Premium Sticky Vertical-to-Horizontal Scrolling (md & up) */}
      {/* ========================================================================= */}
      <div 
        ref={desktopContainerRef} 
        className={`${isTouch ? "hidden" : "hidden md:block"} relative w-full h-[300vh] bg-cream-light`}
      >
        {/* Sticky Viewport frame */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
          
          {/* Subtle Progress Bar */}
          <div className="absolute top-0 left-0 w-full h-[3px] bg-sand/30 z-30">
            <motion.div 
              className="h-full bg-pine-light"
              style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
            />
          </div>

          {/* Decorative Grid Line in Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e6e0d2_1px,transparent_1px)] bg-[size:10vw_100%] opacity-30 pointer-events-none" />

          {/* Moving Track */}
          <motion.div 
            style={{ x: horizontalX }} 
            className="flex items-center gap-16 px-24 w-max h-full"
          >
            {/* 1. Intro Poster Card */}
            <div className="w-[450px] flex-shrink-0 flex flex-col justify-center pr-8 border-r border-sand h-[60vh]">
              <span className="text-xs font-mono uppercase tracking-widest text-pine-light block mb-2">
                // CREATIVE ARCHIVE
              </span>
              <h2 className="text-8xl lg:text-[9.5rem] font-oswald font-extrabold uppercase text-pine tracking-tight leading-none mb-6">
                Works
              </h2>
              <p className="font-mono text-xs text-neutral-600 leading-relaxed max-w-sm mb-12">
                A cinematic compilation of secure system design, threat intelligence systems, and type-safe modern engineering. Scroll down to trigger the horizontal timeline.
              </p>
              
              {/* Dynamic scroll indicators */}
              <div className="flex items-center gap-3 font-mono text-[9px] text-[#9d9282] uppercase tracking-widest animate-pulse">
                <span>SCROLL DOWN</span>
                <div className="w-16 h-[1px] bg-sand" />
                <span className="text-emerald-600 font-bold">SHIFT HORIZON →</span>
              </div>
            </div>

            {/* 2. Projects Row */}
            {PROJECTS_DATA.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedProject(project)}
                className="group w-[620px] h-[65vh] flex-shrink-0 bg-white border border-sand rounded-3xl p-6 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-pine-light/30 transition-all cursor-pointer relative overflow-hidden"
              >
                {/* Visual Cover Frame */}
                <div className="relative w-full h-[38vh] bg-neutral-100 rounded-2xl overflow-hidden mb-5">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale brightness-95 group-hover:grayscale-0 group-hover:scale-104 transition-all duration-700 ease-out"
                  />
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 bg-cream/95 text-pine text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded border border-sand">
                    {project.category}
                  </div>
                  {/* Floating Action Arrow */}
                  <div className="absolute bottom-4 right-4 aspect-square w-10 bg-pine text-cream rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-md">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                {/* Cover Labels */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[9px] font-mono tracking-widest text-[#9d9282] uppercase">
                        PROJECT {project.id.toUpperCase()} — {project.role}
                      </span>
                      <span className="text-xs font-mono font-semibold text-pine bg-pine/5 px-2.5 py-0.5 rounded-full">
                        {project.year}
                      </span>
                    </div>
                    <h3 className="text-3xl font-oswald text-pine font-extrabold uppercase leading-tight group-hover:text-pine-light tracking-wide transition-colors mb-2">
                      {project.title}
                    </h3>
                    <p className="text-xs text-neutral-600 line-clamp-2 font-mono leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech stack row */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-neutral-100 mt-2">
                    {project.techList.map((t) => (
                      <span
                        key={t}
                        className="text-[9px] font-mono bg-neutral-100 text-neutral-600 px-2.5 py-0.5 rounded transition-colors group-hover:bg-neutral-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* MORE PROJECTS — GitHub CTA Card */}
            <motion.a
              href="https://github.com/saturn-16"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -8 }}
              className="group w-[620px] h-[65vh] flex-shrink-0 bg-pine border border-pine-light/30 rounded-3xl p-6 flex flex-col items-center justify-center shadow-xs hover:shadow-xl transition-all cursor-pointer relative overflow-hidden"
            >
              {/* Background grid pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Github className="w-10 h-10 text-cream" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-cream/40 mb-3">// EXPLORE THE FULL ARCHIVE</span>
                <h3 className="text-5xl font-oswald font-extrabold uppercase text-cream tracking-tight leading-none mb-3">
                  MORE
                </h3>
                <h3 className="text-5xl font-oswald font-extrabold uppercase text-cream tracking-tight leading-none mb-6">
                  PROJECTS
                </h3>
                <p className="text-xs font-mono text-cream/50 max-w-xs leading-relaxed mb-8">
                  DISCOVER ALL REPOSITORIES, OPEN SOURCE CONTRIBUTIONS, AND EXPERIMENTAL BUILDS ON GITHUB.
                </p>
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-full text-xs font-mono font-bold tracking-widest uppercase text-cream group-hover:bg-white/20 transition-all">
                  VIEW ON GITHUB <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.a>

            {/* 3. Outer Frame End Cap Tagline */}
            <div className="w-[300px] flex-shrink-0 flex flex-col justify-center pl-8 border-l border-sand h-[40vh] select-none pointer-events-none">
              <p className="font-oswald text-4xl uppercase text-neutral-300 font-extrabold leading-tight">
                LINES OF<br />
                LOGIC.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE VIEW: Elegant Standard Vertical Stack (under md) */}
      {/* ========================================================================= */}
      <div className={`${isTouch ? "block" : "block md:hidden"} py-20 px-6 bg-cream-light`}>
        <div className="max-w-xl mx-auto">
          {/* Header Block */}
          <div className="mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-pine-light block mb-2">
              // CREATIVE ARCHIVE
            </span>
            <h2 className="text-7xl font-oswald font-extrabold uppercase text-pine tracking-tight leading-none mb-4">
              Works
            </h2>
            <p className="font-mono text-xs text-neutral-600 leading-relaxed">
              DURING SEVERAL PROFESSIONAL FLIGHTS, I EXECUTED A WIDE ARRAY OF INTERACTIVE COMPILATIONS. CURRENTLY EXPERIMENTING AT THE CORRIDORS OF GRAPHICS DESIGN AND MODERN ENGINEERING.
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-1.5 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setExpanded(false);
                }}
                className={`px-3 py-1 text-[10px] font-mono tracking-widest uppercase rounded-full border transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-pine text-cream border-pine font-medium"
                    : "bg-white text-neutral-600 border-sand"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {visibleProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex flex-col justify-between bg-white border border-sand rounded-2xl p-4 shadow-xs hover:border-pine-light/30 transition-all"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative w-full aspect-4/3 bg-neutral-100 rounded-xl overflow-hidden mb-4">
                    <img
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale brightness-95"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-cream/95 text-pine text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 rounded border border-sand">
                      {project.category}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[8px] font-mono tracking-widest text-[#9d9282] uppercase">
                        {project.role}
                      </span>
                      <span className="text-[10px] font-mono font-semibold text-pine bg-pine/5 px-2 py-0.5 rounded-full">
                        {project.year}
                      </span>
                    </div>
                    <h3 className="text-xl font-oswald text-pine font-extrabold uppercase leading-tight tracking-wide mb-1">
                      {project.title}
                    </h3>
                    <p className="text-[11px] text-neutral-600 font-mono leading-normal line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-neutral-100">
                    {project.techList.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="text-[8px] font-mono bg-neutral-100 text-neutral-500 px-1.5 py-0.5 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* MORE PROJECTS — GitHub CTA (Mobile) */}
          <a
            href="https://github.com/saturn-16"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex flex-col items-center justify-center bg-pine border border-pine-light/30 rounded-2xl p-8 text-center hover:bg-pine-light transition-all"
          >
            <Github className="w-8 h-8 text-cream mb-3" />
            <h3 className="text-2xl font-oswald font-extrabold uppercase text-cream tracking-tight leading-none mb-1">
              MORE PROJECTS
            </h3>
            <p className="text-[10px] font-mono text-cream/50 mb-4">EXPLORE THE FULL ARCHIVE ON GITHUB</p>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-widest uppercase text-cream/80">
              VIEW ON GITHUB <ArrowUpRight className="w-3 h-3" />
            </span>
          </a>

          {/* View All Button */}
          {filteredProjects.length > 3 && (
            <div className="mt-10 text-center">
              <button
                onClick={() => setExpanded(!expanded)}
                className="w-full py-3.5 border border-pine text-pine hover:bg-pine hover:text-cream rounded-xl text-xs font-mono tracking-widest uppercase transition-all duration-300 cursor-pointer"
              >
                {expanded ? "[ COLLAPSE LIST ]" : "[ VIEW ALL WORKS ]"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DETAIL CASE STUDY DRAWER (Shared Across Desktop & Mobile) */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Overlay Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-pine-dark/80 backdrop-blur-xs"
              onClick={() => setSelectedProject(null)}
            />

            {/* Slider Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 180 }}
              data-lenis-prevent
              className="relative w-full max-w-2xl h-full bg-cream border-l border-sand shadow-2xl overflow-y-auto z-10 flex flex-col justify-between"
            >
              {/* Header Actions */}
              <div className="sticky top-0 bg-cream/95 backdrop-blur-md p-6 border-b border-sand flex items-center justify-between z-20">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-pine-light rounded-full animate-ping" />
                  <span className="text-xs font-mono uppercase tracking-widest text-[#9d9282]">
                    // ACTIVE CASE STUDY
                  </span>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 hover:bg-pine/10 text-pine rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Case Study Body */}
              <div className="p-8 space-y-8 flex-1">
                {/* Hero Image */}
                <div className="rounded-2xl overflow-hidden border border-sand bg-neutral-100 aspect-16/10 shadow-xs">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale brightness-95"
                  />
                </div>

                {/* Title and Metadata */}
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
                    <span>{selectedProject.category}</span>
                    <span>•</span>
                    <span>YEAR {selectedProject.year}</span>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-oswald text-pine font-extrabold uppercase leading-none tracking-wide">
                    {selectedProject.title}
                  </h3>
                </div>

                {/* Project Specifications List */}
                <div className="grid grid-cols-2 gap-4 border-y border-sand py-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest flex items-center gap-1">
                      <Layers className="w-3 h-3" /> Technical Sector
                    </span>
                    <p className="text-sm font-mono text-pine font-semibold">{selectedProject.category}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest flex items-center gap-1">
                      <Folder className="w-3 h-3" /> Responsibility / Role
                    </span>
                    <p className="text-sm font-mono text-pine font-semibold">{selectedProject.role}</p>
                  </div>
                  <div className="space-y-1 col-span-2">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> Technology Architecture
                    </span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {selectedProject.techList.map((tech) => (
                        <span
                          key={tech}
                          className="bg-white border border-sand text-pine text-xs font-mono px-3 py-1 rounded-full shadow-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Case Content */}
                <div className="space-y-4 font-mono text-xs leading-relaxed text-neutral-700">
                  <p className="text-sm font-bold text-pine uppercase tracking-wide flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-pine-light" /> Project Overview
                  </p>
                  <p>{selectedProject.description}</p>
                  <p>
                    This project involved implementing robust security features and intelligent threat detection systems. Working with modern APIs and machine learning models, the platform was designed to handle real-world cybersecurity challenges at scale.
                  </p>
                  <p>
                    The core challenge was to maintain high detection accuracy while minimizing false positives across diverse threat vectors. A custom data processing pipeline was built to optimize real-time analysis and ensure reliable security assessments.
                  </p>
                </div>
              </div>

              {/* Footer Drawer Info */}
              <div className="p-6 bg-white border-t border-sand flex items-center justify-between">
                <span className="text-[10px] font-mono text-neutral-400">@GAURAV KUMAR // PROJECT ARCHIVE</span>
                {selectedProject.url ? (
                  <a
                    href={selectedProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-pine text-cream hover:bg-pine-light px-5 py-2.5 rounded-xl text-xs font-mono tracking-widest uppercase transition-colors cursor-pointer"
                  >
                    Inquire Project <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedProject(null);
                      setTimeout(() => {
                        const form = document.getElementById("contact-section");
                        if (form) form.scrollIntoView({ behavior: "smooth" });
                      }, 200);
                    }}
                    className="flex items-center gap-2 bg-pine text-cream hover:bg-pine-light px-5 py-2.5 rounded-xl text-xs font-mono tracking-widest uppercase transition-colors cursor-pointer"
                  >
                    Inquire Project <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
