import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, Shield, CheckCircle, Bookmark, Sparkles } from "lucide-react";

interface CertificatePage {
  title: string;
  issuer: string;
  year: string;
  badgeText: string;
  badgeBg: string;
  badgeColor: string;
  description: string;
  tags: string[];
}

const CERTIFICATES_DATA: CertificatePage[] = [
  {
    title: "IT Support Professional",
    issuer: "Google",
    year: "2025",
    badgeText: "G",
    badgeBg: "bg-blue-50 border-blue-100 text-blue-600",
    badgeColor: "text-blue-600",
    description: "Validates core system administration, network configurations, troubleshooting automation protocols, Linux terminal commands, and secure active directory management.",
    tags: ["Sys Admin", "Linux CLI", "Networking", "Troubleshooting"]
  },
  {
    title: "Generative AI Specialist",
    issuer: "Google Cloud",
    year: "2025",
    badgeText: "AI",
    badgeBg: "bg-teal-50 border-teal-100 text-teal-600",
    badgeColor: "text-teal-600",
    description: "Verifies competence in Large Language Models (LLMs), attention mechanism, image generation pipelines, prompt engineering principles, and deployment of ethical AI models.",
    tags: ["LLMs", "Transformers", "Prompt Eng", "Google Cloud"]
  },
  {
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "2025",
    badgeText: "AWS",
    badgeBg: "bg-orange-50 border-orange-100 text-orange-600",
    badgeColor: "text-orange-600",
    description: "Validates foundational understanding of AWS global cloud infrastructure, server computing (EC2), secure database storage (S3), IAM compliance role setups, and billing clusters.",
    tags: ["IAM Roles", "S3 Storage", "EC2 Compute", "AWS Cloud"]
  },
  {
    title: "Intro to Cybersecurity",
    issuer: "Cisco Academy",
    year: "2024",
    badgeText: "CISCO",
    badgeBg: "bg-indigo-50 border-indigo-100 text-indigo-600",
    badgeColor: "text-indigo-600",
    description: "Validates network threat vector monitoring, secure endpoints defense, cryptography architectures, digital forensics logs, and corporate cybersecurity compliance.",
    tags: ["Net Defense", "Threat Intel", "Cryptography", "Forensics"]
  }
];

export default function CertificateBookSection() {
  const [currentPage, setCurrentPage] = useState(0); // 0 (closed) to 5 (fully flipped to back cover)
  const [isTouch, setIsTouch] = useState(false);
  const [expandedCert, setExpandedCert] = useState<number | null>(0); // Expand first card by default

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouch(
        ("ontouchstart" in window) ||
        navigator.maxTouchPoints > 0
      );
    }
  }, []);

  const maxPages = 5;

  const handlePageClick = (direction: "next" | "prev") => {
    if (direction === "next" && currentPage < maxPages) {
      setCurrentPage((p) => p + 1);
    } else if (direction === "prev" && currentPage > 0) {
      setCurrentPage((p) => p - 1);
    }
  };

  // Ultra-realistic heavy page flip spring transition
  const flipTransition = {
    type: "spring",
    stiffness: 60,
    damping: 16,
    mass: 1.15
  };

  return (
    <section id="certificates" className="py-24 px-6 md:px-12 bg-[#efebe4] border-b border-sand flex flex-col items-center">
      <div className="max-w-7xl w-full mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="flex flex-col xl:flex-row items-start xl:items-end justify-between gap-6 mb-16 w-full">
          <div className="max-w-4xl">
            <span className="text-xs font-mono uppercase tracking-widest text-pine-light block mb-2">
              // CREDENTIAL REGISTRY
            </span>
            <h2 className="text-6xl md:text-[8rem] font-oswald font-extrabold uppercase text-pine tracking-tight leading-none mb-4">
              Verified
            </h2>
            <h2 className="text-6xl md:text-[8rem] font-oswald font-extrabold uppercase text-pine tracking-tight leading-none">
              Certifications
            </h2>
          </div>
        </div>

        {/* Mobile / Touch Responsive Layout OR Desktop 3D scene */}
        {isTouch ? (
          <div className="w-full max-w-2xl flex flex-col gap-4 mt-6">
            {CERTIFICATES_DATA.map((cert, index) => {
              const isExpanded = expandedCert === index;
              return (
                <div 
                  key={cert.title}
                  className="bg-white border border-sand rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col text-left"
                >
                  <button
                    onClick={() => setExpandedCert(isExpanded ? null : index)}
                    className="flex justify-between items-start w-full text-left gap-4 cursor-pointer focus:outline-hidden"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shadow-xs border ${cert.badgeBg}`}>
                        {cert.badgeText}
                      </div>
                      <div>
                        <span className="text-[8px] font-mono uppercase tracking-widest text-[#9d9282] block">// {cert.issuer.toUpperCase()} COMPLIANCE</span>
                        <h4 className="text-sm font-bold font-mono text-pine uppercase tracking-wider leading-tight">{cert.title}</h4>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-semibold text-pine bg-pine/5 px-2.5 py-0.5 rounded-full border border-sand shrink-0">
                      {cert.year}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t border-neutral-100 mt-4 space-y-4">
                          <p className="text-xs font-mono text-neutral-600 leading-relaxed">
                            {cert.description}
                          </p>
                          <div className="flex flex-wrap gap-1 pt-2">
                            {cert.tags.map((tag) => (
                              <span 
                                key={tag} 
                                className="text-[9px] font-mono bg-neutral-100 border border-sand px-2 py-0.5 rounded-sm text-neutral-600"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="relative flex flex-col items-center justify-center w-full min-h-[520px] perspective-[2000px] select-none">
            
            {/* Main Book Object with 3D Desk Tilt Rotation */}
            <div 
              style={{ 
                transform: "rotateX(12deg) rotateY(-8deg)", 
                transformStyle: "preserve-3d" 
              }}
              className="relative w-[330px] h-[390px] sm:w-[600px] sm:h-[420px] md:w-[720px] md:h-[460px] scale-[0.62] sm:scale-80 md:scale-95 lg:scale-100 transition-all duration-300 flex items-center justify-center"
            >
            {/* Spine Center Line Shadow Overlay */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[4px] h-[98%] bg-black/45 z-50 pointer-events-none filter blur-xs shadow-2xl" />

            {/* ========================================================================= */}
            {/* 3D STACKED PAGES DEPTH EFFECT (Creates physical thickness under book) */}
            {/* ========================================================================= */}
            {/* Left side paper sheets stack */}
            <div className={`absolute top-1 right-1/2 w-[49.5%] h-[98%] bg-[#faf8f5] border border-sand rounded-l-2xl shadow-sm -translate-x-[2px] translate-z-[-2px] pointer-events-none z-0 transition-opacity duration-350 ${currentPage === 0 ? "opacity-0" : "opacity-100"}`} />
            <div className={`absolute top-2 right-1/2 w-[49%] h-[96%] bg-[#f7f4ee] border border-sand rounded-l-2xl shadow-xs -translate-x-[4px] translate-z-[-4px] pointer-events-none z-0 transition-opacity duration-350 ${currentPage === 0 ? "opacity-0" : "opacity-100"}`} />
            <div className={`absolute top-3 right-1/2 w-[48.5%] h-[94%] bg-[#f3f0e8] border border-sand rounded-l-2xl shadow-xs -translate-x-[6px] translate-z-[-6px] pointer-events-none z-0 transition-opacity duration-350 ${currentPage === 0 ? "opacity-0" : "opacity-100"}`} />
            
            {/* Right side paper sheets stack */}
            <div className="absolute top-1 left-1/2 w-[49.5%] h-[98%] bg-[#faf8f5] border border-sand rounded-r-2xl shadow-sm translate-x-[2px] translate-z-[-2px] pointer-events-none z-0" />
            <div className="absolute top-2 left-1/2 w-[49%] h-[96%] bg-[#f7f4ee] border border-sand rounded-r-2xl shadow-xs translate-x-[4px] translate-z-[-4px] pointer-events-none z-0" />
            <div className="absolute top-3 left-1/2 w-[48.5%] h-[94%] bg-[#f3f0e8] border border-sand rounded-r-2xl shadow-xs translate-x-[6px] translate-z-[-6px] pointer-events-none z-0" />

            {/* ========================================================================= */}
            {/* STATIC BACK COVER (Always rests at bottom-right when closed, full-spread when open) */}
            {/* ========================================================================= */}
            <div 
              className={`absolute top-0 h-full bg-[#04251b] border-2 border-amber-500/20 rounded-r-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl z-0 transition-all duration-350 ${
                currentPage === 0 
                  ? "left-1/2 w-1/2 border-l border-amber-500/10" 
                  : "left-0 w-full"
              }`}
              style={{ transform: "translateZ(-8px)" }}
            >
              {/* Spine lining */}
              <div className="absolute top-0 left-0 w-4 h-full bg-black/40 border-r border-amber-500/10 rounded-r-xs shadow-inner" />
              
              <div className="flex justify-between items-start pl-6">
                <Bookmark className="w-8 h-8 text-amber-500/60" />
                <span className="text-[9px] font-mono text-[#dfefe4]/30 tracking-widest uppercase">REGISTRY VERIFIED // SECURE</span>
              </div>

              <div className="space-y-4 pl-6 text-left">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#10be7e] font-bold block">
                  // VERIFICATION COMPLETION
                </span>
                <h3 className="text-4xl font-oswald text-cream font-extrabold uppercase tracking-wide leading-none">
                  CREDENTIALS<br />REGISTERED.
                </h3>
                <div className="w-16 h-[2px] bg-amber-500/40" />
                <p className="text-[10px] font-mono text-[#dfefe4]/60 uppercase tracking-widest leading-relaxed">
                  SECURE COMPLIANCE ESTABLISHED.<br />
                  ALL VERIFIED SECTIONS ENCRYPTED.
                </p>
              </div>

              <div className="flex justify-between items-center pl-6 font-mono text-[9px] text-[#dfefe4]/40 uppercase tracking-widest border-t border-[#dfefe4]/10 pt-4">
                <span>SYSTEM COMPLETED // EST. 2026</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  SECURED <CheckCircle className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* DYNAMIC SHIFTING SHEETS (1 Cover Sheet + 4 Certificate Sheets) */}
            {/* ========================================================================= */}
            
            {/* ========================================================================= */}
            {/* SHEET 5: CISCO CYBERSECURITY / BLANK BACKSIDE */}
            {/* ========================================================================= */}
            <motion.div
              animate={{ rotateY: currentPage >= 5 ? -177 : 0 }}
              transition={flipTransition}
              style={{
                transformOrigin: "left center",
                zIndex: currentPage >= 5 ? 5 : 5,
              }}
              onClick={() => handlePageClick(currentPage >= 5 ? "prev" : "next")}
              className="absolute top-0 right-0 w-1/2 h-full transform-style-3d cursor-pointer shadow-md origin-left"
            >
              {/* [FRONT FACE]: Certificate Page 4 - Cisco Cybersecurity */}
              <div 
                style={{ backfaceVisibility: "hidden" }}
                className="absolute inset-0 w-full h-full bg-[#fdfcfe] border border-sand border-l-0 rounded-r-2xl p-6 flex flex-col justify-between z-20 shadow-lg"
              >
                <div className="absolute top-0 left-0 w-6 h-full bg-gradient-to-r from-black/8 to-transparent pointer-events-none" />

                {/* Header */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-indigo-50 rounded-xl flex items-center justify-center border border-indigo-100 text-indigo-600 font-bold text-xs shadow-xs animate-pulse">
                      CISCO
                    </div>
                    <div>
                      <span className="text-[8px] font-mono uppercase tracking-widest text-neutral-400 block">// SECURITY RADAR</span>
                      <h4 className="text-[11px] font-bold font-mono text-pine uppercase tracking-wider leading-tight">Intro to Cybersecurity</h4>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono font-semibold text-pine bg-pine/5 px-2 py-0.5 rounded-full border border-sand">2024</span>
                </div>

                {/* Certificate Mock Box */}
                <div className="p-4 rounded-xl bg-neutral-50 border border-sand relative overflow-hidden flex-1 my-3.5 flex flex-col justify-between">
                  <div className="absolute right-2 bottom-2 opacity-5 pointer-events-none">
                    <Shield className="w-20 h-20 text-pine" />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <p className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">// CREDENTIAL DETAILS</p>
                    <p className="text-[11px] font-mono text-neutral-600 leading-normal">
                      Validates foundational competency in **identifying threat vectors, managing secure endpoints defenses, cryptography configurations, and network forensics assessments**.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-2.5 border-t border-neutral-100">
                    {["Net Defense", "Threat Intel", "Cryptography", "Forensics"].map(tag => (
                      <span key={tag} className="text-[7.5px] font-mono bg-white border border-sand px-1.5 py-0.5 rounded text-neutral-500">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center font-mono text-[8px] text-[#9d9282] uppercase tracking-widest border-t border-neutral-100 pt-2.5">
                  <span>Cisco Academy Registry</span>
                  <span className="text-indigo-600 font-bold flex items-center gap-1">PAGE 4 // CISCO</span>
                </div>
              </div>

              {/* [BACK FACE]: Pure Blank White/Ivory Page (completely solves text mirroring!) */}
              <div 
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
                className="absolute inset-0 w-full h-full bg-[#fcfbfa] border border-sand border-r-0 rounded-l-2xl shadow-inner z-10"
              >
                {/* Page Crease Spine shading */}
                <div className="absolute top-0 right-0 w-6 h-full bg-gradient-to-l from-black/15 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-[#fdfcfe] opacity-40 pointer-events-none" />
              </div>
            </motion.div>

            {/* ========================================================================= */}
            {/* SHEET 4: AWS CLOUD PRACTITIONER / BLANK BACKSIDE */}
            {/* ========================================================================= */}
            <motion.div
              animate={{ rotateY: currentPage >= 4 ? -177 : 0 }}
              transition={flipTransition}
              style={{
                transformOrigin: "left center",
                zIndex: currentPage >= 4 ? 4 : 6,
              }}
              onClick={() => handlePageClick(currentPage >= 4 ? "prev" : "next")}
              className="absolute top-0 right-0 w-1/2 h-full transform-style-3d cursor-pointer shadow-md origin-left"
            >
              {/* [FRONT FACE]: Certificate Page 3 - AWS Cloud Practitioner */}
              <div 
                style={{ backfaceVisibility: "hidden" }}
                className="absolute inset-0 w-full h-full bg-[#fdfcfe] border border-sand border-l-0 rounded-r-2xl p-6 flex flex-col justify-between z-20 shadow-lg"
              >
                <div className="absolute top-0 left-0 w-6 h-full bg-gradient-to-r from-black/8 to-transparent pointer-events-none" />

                {/* Header */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-orange-50 rounded-xl flex items-center justify-center border border-orange-100 text-orange-600 font-bold text-xs shadow-xs">
                      AWS
                    </div>
                    <div>
                      <span className="text-[8px] font-mono uppercase tracking-widest text-neutral-400 block">// CLOUD COMPUTING</span>
                      <h4 className="text-[11px] font-bold font-mono text-pine uppercase tracking-wider leading-tight">Certified Practitioner</h4>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono font-semibold text-pine bg-pine/5 px-2 py-0.5 rounded-full border border-sand">2025</span>
                </div>

                {/* Certificate Mock Box */}
                <div className="p-4 rounded-xl bg-neutral-50 border border-sand relative overflow-hidden flex-1 my-3.5 flex flex-col justify-between">
                  <div className="absolute right-2 bottom-2 opacity-5 pointer-events-none">
                    <Award className="w-20 h-20 text-pine" />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <p className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">// CREDENTIAL DETAILS</p>
                    <p className="text-[11px] font-mono text-neutral-600 leading-normal">
                      Validates core understanding of **AWS global cloud infrastructure, EC2 compute nodes, S3 storage buckets, IAM secure role configurations, and cloud pricing mechanisms**.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-2.5 border-t border-neutral-100">
                    {["IAM Security", "EC2 Compute", "S3 Storage", "AWS Cloud"].map(tag => (
                      <span key={tag} className="text-[7.5px] font-mono bg-white border border-sand px-1.5 py-0.5 rounded text-neutral-500">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center font-mono text-[8px] text-[#9d9282] uppercase tracking-widest border-t border-neutral-100 pt-2.5">
                  <span>AWS verification</span>
                  <span className="text-orange-600 font-bold flex items-center gap-1">PAGE 3 // AWS</span>
                </div>
              </div>

              {/* [BACK FACE]: Pure Blank White/Ivory Page */}
              <div 
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
                className="absolute inset-0 w-full h-full bg-[#fcfbfa] border border-sand border-r-0 rounded-l-2xl shadow-inner z-10"
              >
                <div className="absolute top-0 right-0 w-6 h-full bg-gradient-to-l from-black/15 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-[#fdfcfe] opacity-40 pointer-events-none" />
              </div>
            </motion.div>

            {/* ========================================================================= */}
            {/* SHEET 3: GOOGLE GENERATIVE AI (Google Cloud Skills Boost) / BLANK BACKSIDE */}
            {/* ========================================================================= */}
            <motion.div
              animate={{ rotateY: currentPage >= 3 ? -177 : 0 }}
              transition={flipTransition}
              style={{
                transformOrigin: "left center",
                zIndex: currentPage >= 3 ? 3 : 7,
              }}
              onClick={() => handlePageClick(currentPage >= 3 ? "prev" : "next")}
              className="absolute top-0 right-0 w-1/2 h-full transform-style-3d cursor-pointer shadow-md origin-left"
            >
              {/* [FRONT FACE]: Certificate Page 2 - Google Generative AI Specialist */}
              <div 
                style={{ backfaceVisibility: "hidden" }}
                className="absolute inset-0 w-full h-full bg-[#fdfcfe] border border-sand border-l-0 rounded-r-2xl p-6 flex flex-col justify-between z-20 shadow-lg"
              >
                <div className="absolute top-0 left-0 w-6 h-full bg-gradient-to-r from-black/8 to-transparent pointer-events-none" />

                {/* Header */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-teal-50 rounded-xl flex items-center justify-center border border-teal-100 text-teal-600 font-bold text-xs shadow-xs animate-pulse">
                      AI
                    </div>
                    <div>
                      <span className="text-[8px] font-mono uppercase tracking-widest text-neutral-400 block">// GOOGLE CLOUD</span>
                      <h4 className="text-[11px] font-bold font-mono text-pine uppercase tracking-wider leading-tight">Generative AI Specialist</h4>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono font-semibold text-pine bg-pine/5 px-2 py-0.5 rounded-full border border-sand">2025</span>
                </div>

                {/* Certificate Mock Box */}
                <div className="p-4 rounded-xl bg-neutral-50 border border-sand relative overflow-hidden flex-1 my-3.5 flex flex-col justify-between">
                  <div className="absolute right-2 bottom-2 opacity-5 pointer-events-none">
                    <Sparkles className="w-20 h-20 text-pine" />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <p className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">// CREDENTIAL DETAILS</p>
                    <p className="text-[11px] font-mono text-neutral-600 leading-normal">
                      Validates skills in **Large Language Models (LLMs), attention mechanism neural layers, prompt engineering principles, and Google Cloud AI alignments**.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-2.5 border-t border-neutral-100">
                    {["LLMs", "Prompt Eng", "Google Cloud", "Transformers"].map(tag => (
                      <span key={tag} className="text-[7.5px] font-mono bg-white border border-sand px-1.5 py-0.5 rounded text-neutral-500">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center font-mono text-[8px] text-[#9d9282] uppercase tracking-widest border-t border-neutral-100 pt-2.5">
                  <span>Google Cloud skills boost</span>
                  <span className="text-teal-600 font-bold flex items-center gap-1">PAGE 2 // GOOGLE AI</span>
                </div>
              </div>

              {/* [BACK FACE]: Pure Blank White/Ivory Page */}
              <div 
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
                className="absolute inset-0 w-full h-full bg-[#fcfbfa] border border-sand border-r-0 rounded-l-2xl shadow-inner z-10"
              >
                <div className="absolute top-0 right-0 w-6 h-full bg-gradient-to-l from-black/15 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-[#fdfcfe] opacity-40 pointer-events-none" />
              </div>
            </motion.div>

            {/* ========================================================================= */}
            {/* SHEET 2: GOOGLE IT SUPPORT / BLANK BACKSIDE */}
            {/* ========================================================================= */}
            <motion.div
              animate={{ rotateY: currentPage >= 2 ? -177 : 0 }}
              transition={flipTransition}
              style={{
                transformOrigin: "left center",
                zIndex: currentPage >= 2 ? 2 : 8,
              }}
              onClick={() => handlePageClick(currentPage >= 2 ? "prev" : "next")}
              className="absolute top-0 right-0 w-1/2 h-full transform-style-3d cursor-pointer shadow-md origin-left"
            >
              {/* [FRONT FACE]: Certificate Page 1 - Google IT Support */}
              <div 
                style={{ backfaceVisibility: "hidden" }}
                className="absolute inset-0 w-full h-full bg-[#fdfcfe] border border-sand border-l-0 rounded-r-2xl p-6 flex flex-col justify-between z-20 shadow-lg"
              >
                <div className="absolute top-0 left-0 w-6 h-full bg-gradient-to-r from-black/8 to-transparent pointer-events-none" />

                {/* Header */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100 text-blue-600 font-bold text-xs shadow-xs">
                      G
                    </div>
                    <div>
                      <span className="text-[8px] font-mono uppercase tracking-widest text-neutral-400 block">// GOOGLE CAREER</span>
                      <h4 className="text-[11px] font-bold font-mono text-pine uppercase tracking-wider leading-tight">IT Support Professional</h4>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono font-semibold text-pine bg-pine/5 px-2 py-0.5 rounded-full border border-sand">2025</span>
                </div>

                {/* Certificate Mock Box */}
                <div className="p-4 rounded-xl bg-neutral-50 border border-sand relative overflow-hidden flex-1 my-3.5 flex flex-col justify-between">
                  <div className="absolute right-2 bottom-2 opacity-5 pointer-events-none">
                    <Award className="w-20 h-20 text-pine" />
                  </div>
                  
                  <div className="space-y-1.5 text-left">
                    <p className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">// CREDENTIAL DETAILS</p>
                    <p className="text-[11px] font-mono text-neutral-600 leading-normal">
                      Validates core technical skills in **system administration, network configuration, Linux command line protocols, operational security, and active directory systems**.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-2.5 border-t border-neutral-100">
                    {["Sys Admin", "Linux CLI", "Active Directory", "IT Support"].map(tag => (
                      <span key={tag} className="text-[7.5px] font-mono bg-white border border-sand px-1.5 py-0.5 rounded text-neutral-500">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center font-mono text-[8px] text-[#9d9282] uppercase tracking-widest border-t border-neutral-100 pt-2.5">
                  <span>Google Professional</span>
                  <span className="text-blue-600 font-bold flex items-center gap-1">PAGE 1 // GOOGLE IT</span>
                </div>
              </div>

              {/* [BACK FACE]: Pure Blank White/Ivory Page */}
              <div 
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
                className="absolute inset-0 w-full h-full bg-[#fcfbfa] border border-sand border-r-0 rounded-l-2xl shadow-inner z-10"
              >
                <div className="absolute top-0 right-0 w-6 h-full bg-gradient-to-l from-black/15 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-[#fdfcfe] opacity-40 pointer-events-none" />
              </div>
            </motion.div>

            {/* ========================================================================= */}
            {/* SHEET 1: FRONT COVER / INDEX LIST */}
            {/* ========================================================================= */}
            <motion.div
              animate={{ rotateY: currentPage >= 1 ? -177 : 0 }}
              transition={flipTransition}
              style={{
                transformOrigin: "left center",
                zIndex: currentPage >= 1 ? 1 : 10,
              }}
              onClick={() => handlePageClick(currentPage >= 1 ? "prev" : "next")}
              className="absolute top-0 right-0 w-1/2 h-full transform-style-3d cursor-pointer shadow-md origin-left"
            >
              {/* [FRONT FACE]: Outer Leather Cover (Embossed gold lettering) */}
              <div 
                style={{ backfaceVisibility: "hidden" }}
                className="absolute inset-0 w-full h-full bg-[#04251b] border-2 border-amber-500/20 rounded-r-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl z-20"
              >
                {/* Book Spine visual binding */}
                <div className="absolute top-0 left-0 w-4 h-full bg-black/40 border-r border-amber-500/10 rounded-r-xs shadow-inner shadow-black/80" />
                
                <div className="flex justify-between items-start pl-6">
                  <Bookmark className="w-8 h-8 text-amber-500/60" />
                  <span className="text-[9px] font-mono text-amber-500/40 tracking-widest uppercase">REG. CODE // 1612</span>
                </div>

                <div className="space-y-4 pl-6 text-left">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#10be7e] font-bold block">
                    // CONFIDENTIAL ALBUM
                  </span>
                  <h3 className="text-3xl sm:text-5xl font-oswald text-cream font-extrabold uppercase tracking-wide leading-none">
                    VERIFIED<br />CREDENTIALS
                  </h3>
                  <div className="w-16 h-[2px] bg-amber-500/40" />
                  <p className="text-[10px] font-mono text-[#dfefe4]/60 uppercase tracking-widest">
                    GAURAV KUMAR // CSE CYBERSECURITY
                  </p>
                </div>

                <div className="flex justify-between items-center pl-6 font-mono text-[9px] text-[#dfefe4]/40 uppercase tracking-widest border-t border-[#dfefe4]/10 pt-4">
                  <span>EST. 2026 // INDIA</span>
                  <span className="text-amber-500 font-bold animate-pulse">CLICK TO OPEN →</span>
                </div>
              </div>

              {/* [BACK FACE]: Inside Left Index Page */}
              <div 
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
                className="absolute inset-0 w-full h-full bg-[#fcfbfa] border border-sand border-r-0 rounded-l-2xl p-6 flex flex-col justify-between shadow-inner z-10"
              >
                {/* Crease shadow */}
                <div className="absolute top-0 right-0 w-6 h-full bg-gradient-to-l from-black/15 to-transparent pointer-events-none" />

                <div className="space-y-4 text-left">
                  <span className="text-[8px] font-mono uppercase tracking-widest text-neutral-400 block">// INDEX REGISTER</span>
                  <h4 className="text-2xl font-oswald text-pine font-extrabold uppercase tracking-wide">
                    TABLE OF SPREADS
                  </h4>
                  <p className="text-[11px] font-mono text-neutral-600 leading-relaxed max-w-xs">
                    Verified certificates index, showcasing accredited certifications from Google, Amazon Web Services, and Cisco Academy.
                  </p>
                </div>

                <div className="space-y-2 font-mono text-[10px] text-neutral-500 uppercase tracking-wider pl-4 border-l border-sand">
                  <div className="flex justify-between border-b border-neutral-100 pb-1.5">
                    <span>1. Google IT Support Professional</span>
                    <span className="text-emerald-600 font-bold">PAGE 1</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-100 pb-1.5">
                    <span>2. Google Generative AI Specialist</span>
                    <span className="text-emerald-600 font-bold">PAGE 2</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-100 pb-1.5">
                    <span>3. AWS Cloud Practitioner</span>
                    <span className="text-emerald-600 font-bold">PAGE 3</span>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span>4. Cisco Cybersecurity Intro</span>
                    <span className="text-emerald-600 font-bold">PAGE 4</span>
                  </div>
                </div>

                <span className="text-[8px] font-mono text-neutral-400 text-right block tracking-widest uppercase">PAGE I // TABLE OF SPREADS</span>
              </div>
            </motion.div>

          </div>
        </div>
        )}

        {/* Tactile Book-Flipping Controls Overlay */}
        {!isTouch && (
          <div className="flex items-center gap-6 mt-8 z-20">
            <button 
              disabled={currentPage === 0}
              onClick={() => handlePageClick("prev")}
              className="px-5 py-2.5 bg-white hover:bg-neutral-100 disabled:opacity-40 border border-[#dfd9cb] rounded-full text-xs font-mono uppercase font-bold text-pine tracking-wider transition-all shadow-xs cursor-pointer disabled:cursor-not-allowed"
            >
              ← Flip Back
            </button>
            
            <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest self-center">
              PAGE {currentPage} of {maxPages}
            </span>
            
            <button 
              disabled={currentPage === maxPages}
              onClick={() => handlePageClick("next")}
              className="px-5 py-2.5 bg-pine text-cream hover:bg-pine-light disabled:opacity-40 rounded-full text-xs font-mono uppercase font-bold tracking-wider transition-all shadow-xs cursor-pointer disabled:cursor-not-allowed"
            >
              Flip Forward →
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
