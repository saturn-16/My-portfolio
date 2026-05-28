import { useState } from "react";
import { Project } from "../types";
import { PROJECTS_DATA } from "../data";
import { ArrowUpRight, X, Sparkles, Folder, Calendar, Layers } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function WorksSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expanded, setExpanded] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Expose categories
  const categories = ["All", "Cybersecurity SaaS", "AI & ML", "Computer Vision"];

  // Filter projects by category
  const filteredProjects = PROJECTS_DATA.filter(p => {
    if (selectedCategory === "All") return true;
    return p.category === selectedCategory;
  });

  // Limit initially displayed to 3 projects, unless expanded
  const visibleProjects = expanded ? filteredProjects : filteredProjects.slice(0, 3);

  return (
    <section id="works" className="py-24 px-6 md:px-12 bg-cream-light border-b border-sand">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-pine-light block mb-2">// CREATIVE ARCHIVE</span>
            <h2 className="text-8xl md:text-[10rem] font-oswald font-extrabold uppercase text-pine tracking-tight leading-none">
              Works
            </h2>
          </div>
          
          <div className="max-w-md font-mono text-xs text-neutral-600 leading-relaxed lg:mb-4">
            DURING SEVERAL PROFESSIONAL FLIGHTS, I EXECUTED A WIDE ARRAY OF INTERACTIVE COMPILATIONS. CURRENTLY EXPERIMENTING AT THE CORRIDORS OF GRAPHICS DESIGN AND MODERN ENGINEERING.
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setExpanded(false); // Reset collapse when filter changes
              }}
              className={`px-3.5 py-1.5 text-xs font-mono tracking-widest uppercase rounded-full border transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-pine text-cream-light border-pine font-medium"
                  : "bg-white text-neutral-600 border-sand hover:text-pine hover:border-pine-light"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group flex flex-col justify-between h-full bg-white border border-sand rounded-2xl p-4 overflow-hidden shadow-xs hover:shadow-md hover:border-pine-light/30 transition-all cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {/* Visual Cover Frame */}
                <div className="relative w-full aspect-4/3 bg-neutral-100 rounded-xl overflow-hidden mb-6">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale brightness-95 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <div className="absolute top-3 left-3 bg-cream/95 text-pine text-[10px] font-mono tracking-widest uppercase px-2 py-1 rounded border border-sand">
                    {project.category}
                  </div>
                  <div className="absolute bottom-3 right-3 aspect-square w-8 bg-pine text-cream rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Cover Labels */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono tracking-widest text-[#9d9282] uppercase">
                      PROJECT {project.id.toUpperCase()} — {project.role}
                    </span>
                    <span className="text-xs font-mono font-semibold text-pine bg-pine/5 px-2 py-0.5 rounded-full">
                      {project.year}
                    </span>
                  </div>
                  <h3 className="text-2xl font-oswald text-pine font-extrabold uppercase leading-tight group-hover:text-pine-light tracking-wide transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-neutral-600 line-clamp-2 mt-2 font-mono leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1 mt-4 pt-4 border-t border-neutral-100">
                  {project.techList.slice(0, 3).map((t) => (
                    <span key={t} className="text-[9px] font-mono bg-neutral-100 hover:bg-neutral-200 text-neutral-600 px-2 py-0.5 rounded transition-colors">
                      {t}
                    </span>
                  ))}
                  {project.techList.length > 3 && (
                    <span className="text-[9px] font-mono bg-neutral-50 text-neutral-400 px-1.5 py-0.5 rounded">
                      +{project.techList.length - 3}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View All Button */}
        {filteredProjects.length > 3 && (
          <div className="mt-16 text-center">
            <button
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-pine text-pine hover:bg-pine hover:text-cream rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300 cursor-pointer hover:shadow-xs hover:scale-105"
            >
              {expanded ? "[ COLLAPSE LIST ]" : "[ VIEW ALL WORKS ]"}
            </button>
          </div>
        )}

        {/* Rich Project Detailed Case Study Drawer */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex justify-end">
              {/* Overlay Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-pine-dark"
                onClick={() => setSelectedProject(null)}
              />

              {/* Slider Panel */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 180 }}
                className="relative w-full max-w-2xl h-full bg-cream-light border-l border-sand shadow-2xl overflow-y-auto z-10 flex flex-col justify-between"
              >
                {/* Header Actions */}
                <div className="sticky top-0 bg-cream-light/95 backdrop-blur-md p-6 border-b border-sand flex items-center justify-between z-20">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-pine-light rounded-full animate-ping" />
                    <span className="text-xs font-mono uppercase tracking-widest text-[#9d9282]">// ACTIVE CASE STUDY</span>
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
                  <div className="rounded-2xl overflow-hidden border border-sand bg-neutral-100 aspect-16/10">
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
                          <span key={tech} className="bg-white border border-sand text-pine text-xs font-mono px-2.5 py-1 rounded-full">
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
                      className="flex items-center gap-2 bg-pine text-cream hover:bg-pine-light px-5 py-2 rounded-full text-xs font-mono tracking-widest uppercase transition-colors cursor-pointer"
                    >
                      Inquire Project <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedProject(null);
                        // Scroll to contact form
                        setTimeout(() => {
                          const form = document.getElementById("contact-section");
                          if (form) form.scrollIntoView({ behavior: "smooth" });
                        }, 200);
                      }}
                      className="flex items-center gap-2 bg-pine text-cream hover:bg-pine-light px-5 py-2 rounded-full text-xs font-mono tracking-widest uppercase transition-colors cursor-pointer"
                    >
                      Inquire Project <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
