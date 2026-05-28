import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, Shield, CheckCircle, Bookmark, Sparkles, ExternalLink } from "lucide-react";

export default function CertificateBookSection() {
  const [currentPage, setCurrentPage] = useState(0); // 0 (closed) to 4 (fully flipped)

  const maxPages = 4;

  const handlePageClick = (direction: "next" | "prev") => {
    if (direction === "next" && currentPage < maxPages) {
      setCurrentPage((p) => p + 1);
    } else if (direction === "prev" && currentPage > 0) {
      setCurrentPage((p) => p - 1);
    }
  };

  // Spring transition for the ultimate heavy, fluid, realistic 3D paper page flips
  const flipTransition = {
    type: "spring",
    stiffness: 65,
    damping: 17,
    mass: 1.1
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
          
          <div className="max-w-xs font-mono text-xs text-neutral-500 leading-relaxed xl:mb-2 border-l border-sand pl-4">
            CLICK DIRECTLY ON THE LEFT OR RIGHT PAGES TO REALISTICALLY FLIP THE SPREADS AND BROWSE THROUGH THE SKILL CREDENTIALS.
          </div>
        </div>

        {/* 3D Scene Viewport (Click-to-Flip interactive container) */}
        <div className="relative flex flex-col items-center justify-center w-full min-h-[500px] perspective-[2000px] select-none">
          
          {/* Main Book Object */}
          <div 
            className="relative w-[330px] h-[390px] sm:w-[600px] sm:h-[420px] md:w-[720px] md:h-[460px] transform-style-3d scale-[0.62] sm:scale-80 md:scale-95 lg:scale-100 transition-all duration-300 flex items-center justify-center"
          >
            {/* Spine Center Line Shadow Overlay */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-[98%] bg-black/35 z-50 pointer-events-none filter blur-xs shadow-2xl" />

            {/* ========================================================================= */}
            {/* STATIC BACK COVER / BASE SHEET (Always rests at bottom-right) */}
            {/* ========================================================================= */}
            <div 
              className="absolute inset-0 w-full h-full bg-[#04251b] border-2 border-amber-500/20 rounded-r-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl z-0"
              style={{ transform: "translateZ(-4px)" }}
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
            {/* SHEET 4: GOOGLE GENERATIVE AI (Google Cloud Skills Boost) / VERIFICATION INDEX */}
            {/* ========================================================================= */}
            <motion.div
              animate={{ rotateY: currentPage >= 4 ? -178 : 0 }}
              transition={flipTransition}
              style={{
                transformOrigin: "left center",
                zIndex: currentPage >= 4 ? 4 : 4,
              }}
              onClick={() => handlePageClick(currentPage >= 4 ? "prev" : "next")}
              className="absolute top-0 right-0 w-1/2 h-full transform-style-3d cursor-pointer shadow-md origin-left"
            >
              {/* [FRONT FACE] - Google Cloud Skills Boost: Google GenAI Certificate */}
              <div 
                style={{ backfaceVisibility: "hidden" }}
                className="absolute inset-0 w-full h-full bg-[#fdfcfe] border border-sand border-l-0 rounded-r-2xl p-6 flex flex-col justify-between z-20 shadow-lg"
              >
                {/* Crease shadow */}
                <div className="absolute top-0 left-0 w-6 h-full bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />

                {/* Header */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-teal-50 rounded-xl flex items-center justify-center border border-teal-100 text-teal-600 font-bold text-xs shadow-xs">
                      G
                    </div>
                    <div>
                      <span className="text-[8px] font-mono uppercase tracking-widest text-neutral-400 block">// GOOGLE CLOUD</span>
                      <h4 className="text-[11px] font-bold font-mono text-pine uppercase tracking-wider leading-tight">Generative AI Skills</h4>
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
                    <p className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">// CREDENTIAL SYNOPSIS</p>
                    <p className="text-[11px] font-mono text-neutral-600 leading-normal">
                      Verifies skills in building **Generative AI applications, Large Language Models (LLMs), attention mechanisms, and training custom neural architectures** using Google Cloud.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-2.5 border-t border-neutral-100">
                    {["Google Cloud", "LLMs", "Generative AI", "Transformers"].map(tag => (
                      <span key={tag} className="text-[7.5px] font-mono bg-white border border-sand px-1.5 py-0.5 rounded text-neutral-500">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center font-mono text-[8px] text-[#9d9282] uppercase tracking-widest border-t border-neutral-100 pt-2.5">
                  <span>Google Cloud Boost</span>
                  <span className="text-teal-600 font-bold flex items-center gap-1">PAGE 4</span>
                </div>
              </div>

              {/* [BACK FACE] - Inside Back Lining Page (flipped to Left Side) */}
              <div 
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
                className="absolute inset-0 w-full h-full bg-[#fcfbfa] border border-sand border-r-0 rounded-l-2xl p-6 flex flex-col justify-between shadow-inner z-10"
              >
                {/* Crease shadow */}
                <div className="absolute top-0 right-0 w-6 h-full bg-gradient-to-l from-black/10 to-transparent pointer-events-none" />

                <div className="space-y-4 text-left">
                  <span className="text-[8px] font-mono uppercase tracking-widest text-neutral-400 block">// CREDENTIAL INDEX</span>
                  <h4 className="text-xl font-oswald text-pine font-extrabold uppercase tracking-wide">
                    VERIFICATION PORTAL
                  </h4>
                  <p className="text-[11px] font-mono text-neutral-600 leading-relaxed max-w-xs">
                    All credentials listed in this ledger have been officially verified. Contact for full digital cryptographic proof PDFs and verification links.
                  </p>
                </div>

                {/* Micro metrics */}
                <div className="p-4 rounded-xl bg-white border border-sand space-y-2 text-left">
                  <p className="text-[9px] font-mono text-neutral-400 uppercase font-semibold">// ACCREDITATION STATS</p>
                  <p className="text-[10px] font-mono text-pine font-bold flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#10be7e]" /> Cryptographically Signed (256-bit)
                  </p>
                  <p className="text-[10px] font-mono text-pine font-bold flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#10be7e]" /> Google &amp; AWS Partner Aligned
                  </p>
                </div>

                <div className="flex justify-between items-center font-mono text-[8px] text-[#9d9282] uppercase tracking-widest border-t border-neutral-100 pt-2.5">
                  <span>Ledger index verified</span>
                  <span className="text-emerald-600 font-bold flex items-center gap-1">PAGE 5</span>
                </div>
              </div>
            </motion.div>

            {/* ========================================================================= */}
            {/* SHEET 3: AWS CLOUD PRACTITIONER / CISCO CYBERSECURITY */}
            {/* ========================================================================= */}
            <motion.div
              animate={{ rotateY: currentPage >= 3 ? -178 : 0 }}
              transition={flipTransition}
              style={{
                transformOrigin: "left center",
                zIndex: currentPage >= 3 ? 3 : 6,
              }}
              onClick={() => handlePageClick(currentPage >= 3 ? "prev" : "next")}
              className="absolute top-0 right-0 w-1/2 h-full transform-style-3d cursor-pointer shadow-md origin-left"
            >
              {/* [FRONT FACE] - AWS Cloud Practitioner */}
              <div 
                style={{ backfaceVisibility: "hidden" }}
                className="absolute inset-0 w-full h-full bg-[#fdfcfe] border border-sand border-l-0 rounded-r-2xl p-6 flex flex-col justify-between z-20 shadow-lg"
              >
                {/* Crease shadow */}
                <div className="absolute top-0 left-0 w-6 h-full bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />

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
                    <p className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">// CREDENTIAL SYNOPSIS</p>
                    <p className="text-[11px] font-mono text-neutral-600 leading-normal">
                      Validates core understanding of **AWS global cloud infrastructure, server computing (EC2), database management (S3, RDS), IAM secure compliance, and billing configurations**.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-2.5 border-t border-neutral-100">
                    {["IAM Security", "EC2 Compute", "S3 Storage", "AWS Billing"].map(tag => (
                      <span key={tag} className="text-[7.5px] font-mono bg-white border border-sand px-1.5 py-0.5 rounded text-neutral-500">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center font-mono text-[8px] text-[#9d9282] uppercase tracking-widest border-t border-neutral-100 pt-2.5">
                  <span>AWS verification</span>
                  <span className="text-orange-600 font-bold flex items-center gap-1">PAGE 3</span>
                </div>
              </div>

              {/* [BACK FACE] - Cisco Introduction to Cybersecurity */}
              <div 
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
                className="absolute inset-0 w-full h-full bg-[#fcfbfa] border border-sand border-r-0 rounded-l-2xl p-6 flex flex-col justify-between shadow-inner z-10"
              >
                {/* Crease shadow */}
                <div className="absolute top-0 right-0 w-6 h-full bg-gradient-to-l from-black/10 to-transparent pointer-events-none" />

                {/* Header */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-indigo-50 rounded-xl flex items-center justify-center border border-indigo-100 text-indigo-600 font-bold text-xs shadow-xs animate-pulse">
                      CISCO
                    </div>
                    <div>
                      <span className="text-[8px] font-mono uppercase tracking-widest text-neutral-400 block">// CYBERSECURITY</span>
                      <h4 className="text-[11px] font-bold font-mono text-pine uppercase tracking-wider leading-tight">Intro to Cyber Defense</h4>
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
                    <p className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">// CREDENTIAL SYNOPSIS</p>
                    <p className="text-[11px] font-mono text-neutral-600 leading-normal">
                      Validates baseline understanding of **network threat vectors monitoring, endpoint defense strategies, cryptography protection algorithms, and digital forensics**.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-2.5 border-t border-neutral-100">
                    {["Net Security", "Cryptography", "Endpoint Defense", "Threat Intel"].map(tag => (
                      <span key={tag} className="text-[7.5px] font-mono bg-white border border-sand px-1.5 py-0.5 rounded text-neutral-500">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center font-mono text-[8px] text-[#9d9282] uppercase tracking-widest border-t border-neutral-100 pt-2.5">
                  <span>Cisco Academy</span>
                  <span className="text-indigo-600 font-bold flex items-center gap-1">PAGE 4</span>
                </div>
              </div>
            </motion.div>

            {/* ========================================================================= */}
            {/* SHEET 2: GOOGLE IT SUPPORT / GOOGLE GENERATIVE AI (Foundations) */}
            {/* ========================================================================= */}
            <motion.div
              animate={{ rotateY: currentPage >= 2 ? -178 : 0 }}
              transition={flipTransition}
              style={{
                transformOrigin: "left center",
                zIndex: currentPage >= 2 ? 2 : 8,
              }}
              onClick={() => handlePageClick(currentPage >= 2 ? "prev" : "next")}
              className="absolute top-0 right-0 w-1/2 h-full transform-style-3d cursor-pointer shadow-md origin-left"
            >
              {/* [FRONT FACE] - Google IT Support Professional Certificate */}
              <div 
                style={{ backfaceVisibility: "hidden" }}
                className="absolute inset-0 w-full h-full bg-[#fdfcfe] border border-sand border-l-0 rounded-r-2xl p-6 flex flex-col justify-between z-20 shadow-lg"
              >
                {/* Crease shadow */}
                <div className="absolute top-0 left-0 w-6 h-full bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />

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
                    <p className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">// CREDENTIAL SYNOPSIS</p>
                    <p className="text-[11px] font-mono text-neutral-600 leading-normal">
                      Validates core technical skills in **system administration, network configuration, Linux command line protocols, operational security, and debugging automation**.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-2.5 border-t border-neutral-100">
                    {["Sys Admin", "Linux CLI", "Troubleshooting", "Active Directory"].map(tag => (
                      <span key={tag} className="text-[7.5px] font-mono bg-white border border-sand px-1.5 py-0.5 rounded text-neutral-500">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center font-mono text-[8px] text-[#9d9282] uppercase tracking-widest border-t border-neutral-100 pt-2.5">
                  <span>Google Professional</span>
                  <span className="text-blue-600 font-bold flex items-center gap-1">PAGE 1</span>
                </div>
              </div>

              {/* [BACK FACE] - Google Generative AI Certificate (Foundations) */}
              <div 
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
                className="absolute inset-0 w-full h-full bg-[#fcfbfa] border border-sand border-r-0 rounded-l-2xl p-6 flex flex-col justify-between shadow-inner z-10"
              >
                {/* Crease shadow */}
                <div className="absolute top-0 right-0 w-6 h-full bg-gradient-to-l from-black/10 to-transparent pointer-events-none" />

                {/* Header */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center border border-emerald-100 text-emerald-600 font-bold text-xs shadow-xs animate-pulse">
                      AI
                    </div>
                    <div>
                      <span className="text-[8px] font-mono uppercase tracking-widest text-neutral-400 block">// GOOGLE LEARNING</span>
                      <h4 className="text-[11px] font-bold font-mono text-pine uppercase tracking-wider leading-tight">Generative AI Foundations</h4>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono font-semibold text-pine bg-pine/5 px-2 py-0.5 rounded-full border border-sand">2025</span>
                </div>

                {/* Certificate Mock Box */}
                <div className="p-4 rounded-xl bg-neutral-50 border border-sand relative overflow-hidden flex-1 my-3.5 flex flex-col justify-between">
                  <div className="absolute right-2 bottom-2 opacity-5 pointer-events-none">
                    <Shield className="w-20 h-20 text-pine" />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <p className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">// CREDENTIAL SYNOPSIS</p>
                    <p className="text-[11px] font-mono text-neutral-600 leading-normal">
                      Validates core understanding of **Large Language Models (LLMs), attention mechanism, image generation pipelines, prompt principles, and model alignment**.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-2.5 border-t border-neutral-100">
                    {["LLMs", "Prompt Basics", "Diffusion Models", "AI Alignment"].map(tag => (
                      <span key={tag} className="text-[7.5px] font-mono bg-white border border-sand px-1.5 py-0.5 rounded text-neutral-500">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center font-mono text-[8px] text-[#9d9282] uppercase tracking-widest border-t border-neutral-100 pt-2.5">
                  <span>Google AI Boost</span>
                  <span className="text-emerald-600 font-bold flex items-center gap-1">PAGE 2</span>
                </div>
              </div>
            </motion.div>

            {/* ========================================================================= */}
            {/* SHEET 1: FRONT COVER / INDEX LIST */}
            {/* ========================================================================= */}
            <motion.div
              animate={{ rotateY: currentPage >= 1 ? -178 : 0 }}
              transition={flipTransition}
              style={{
                transformOrigin: "left center",
                zIndex: currentPage >= 1 ? 1 : 10,
              }}
              onClick={() => handlePageClick(currentPage >= 1 ? "prev" : "next")}
              className="absolute top-0 right-0 w-1/2 h-full transform-style-3d cursor-pointer shadow-md origin-left"
            >
              {/* [FRONT FACE] - Outer Hardcover Cover (Embossed gold lettering) */}
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

              {/* [BACK FACE] - Inside Left Index Page */}
              <div 
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
                className="absolute inset-0 w-full h-full bg-[#fcfbfa] border border-sand border-r-0 rounded-l-2xl p-6 flex flex-col justify-between shadow-inner z-10"
              >
                {/* Crease shadow */}
                <div className="absolute top-0 right-0 w-6 h-full bg-gradient-to-l from-black/10 to-transparent pointer-events-none" />

                <div className="space-y-4 text-left">
                  <span className="text-[8px] font-mono uppercase tracking-widest text-neutral-400 block">// INDEX REGISTER</span>
                  <h4 className="text-2xl font-oswald text-pine font-extrabold uppercase tracking-wide">
                    TABLE OF SPREADS
                  </h4>
                  <p className="text-[11px] font-mono text-neutral-600 leading-relaxed max-w-xs">
                    This verified album compiles certified credentials, verifying expertise in full-stack engineering, cloud security compliance, and AI threat architectures.
                  </p>
                </div>

                <div className="space-y-2 font-mono text-[10px] text-neutral-500 uppercase tracking-wider pl-4 border-l border-sand">
                  <div className="flex justify-between border-b border-neutral-100 pb-1.5">
                    <span>1. Google IT Professional</span>
                    <span className="text-emerald-600 font-bold">PAGE 1</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-100 pb-1.5">
                    <span>2. Google Generative AI</span>
                    <span className="text-emerald-600 font-bold">PAGE 2</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-100 pb-1.5">
                    <span>3. AWS Cloud Practitioner</span>
                    <span className="text-emerald-600 font-bold">PAGE 3</span>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span>4. Cisco Cybersecurity</span>
                    <span className="text-emerald-600 font-bold">PAGE 4</span>
                  </div>
                </div>

                <span className="text-[8px] font-mono text-neutral-400 text-right block tracking-widest uppercase">PAGE I // TABLE OF SPREADS</span>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Tactile Book-Flipping Controls Overlay */}
        <div className="flex items-center gap-6 mt-8 z-20">
          <button 
            disabled={currentPage === 0}
            onClick={() => handlePageClick("prev")}
            className="px-5 py-2.5 bg-white hover:bg-neutral-100 disabled:opacity-40 border border-[#dfd9cb] rounded-full text-xs font-mono uppercase font-bold text-pine tracking-wider transition-all shadow-xs cursor-pointer disabled:cursor-not-allowed"
          >
            ← Flip Back
          </button>
          
          <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest self-center">
            SPREAD {currentPage} of {maxPages}
          </span>
          
          <button 
            disabled={currentPage === maxPages}
            onClick={() => handlePageClick("next")}
            className="px-5 py-2.5 bg-pine text-cream hover:bg-pine-light disabled:opacity-40 rounded-full text-xs font-mono uppercase font-bold tracking-wider transition-all shadow-xs cursor-pointer disabled:cursor-not-allowed"
          >
            Flip Forward →
          </button>
        </div>

      </div>
    </section>
  );
}
