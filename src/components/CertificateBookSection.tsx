import { useRef } from "react";
import { useScroll, useTransform, motion } from "motion/react";
import { Award, Shield, CheckCircle, ArrowRight, ExternalLink, Bookmark } from "lucide-react";

export default function CertificateBookSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 1. Dynamic Rotational angles for the three flipping sheets (0 to -180 degrees)
  const rotateY1 = useTransform(scrollYProgress, [0.12, 0.35], [0, -180]);
  const rotateY2 = useTransform(scrollYProgress, [0.35, 0.58], [0, -180]);
  const rotateY3 = useTransform(scrollYProgress, [0.58, 0.81], [0, -180]);

  // 2. Dynamic z-index layering overrides to ensure turning pages stay layered correctly
  const zIndex1 = useTransform(scrollYProgress, [0, 0.235, 0.236, 1], [10, 10, 1, 1]);
  const zIndex2 = useTransform(scrollYProgress, [0, 0.465, 0.466, 1], [8, 8, 2, 2]);
  const zIndex3 = useTransform(scrollYProgress, [0, 0.695, 0.696, 1], [6, 6, 3, 3]);

  // 3. Dynamic soft page shadows as they flip
  const shadowOpacity1 = useTransform(scrollYProgress, [0.12, 0.235, 0.35], [0, 0.4, 0]);
  const shadowOpacity2 = useTransform(scrollYProgress, [0.35, 0.465, 0.58], [0, 0.4, 0]);
  const shadowOpacity3 = useTransform(scrollYProgress, [0.58, 0.695, 0.81], [0, 0.4, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[250vh] bg-[#efebe4] border-b border-sand"
    >
      {/* Sticky view frame */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center">
        
        {/* Section Header overlay */}
        <div className="absolute top-10 md:top-14 max-w-xl text-center space-y-2 z-30 px-6">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#9d9282] block">
            // REGISTRY SECURE DATABASE
          </span>
          <h2 className="text-3xl md:text-5xl font-oswald font-extrabold uppercase text-pine tracking-wide">
            Verified Credentials
          </h2>
          <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider animate-pulse">
            Scroll down to open album &amp; flip page spreads horizontally
          </p>
        </div>

        {/* 3D Scene Viewport */}
        <div className="relative flex items-center justify-center w-full h-[520px] z-10 select-none perspective-[1800px]">
          
          {/* 3D Book Container (scaled responsively for perfect mobile styling) */}
          <div className="relative w-[340px] h-[400px] sm:w-[620px] sm:h-[420px] md:w-[720px] md:h-[450px] transform-style-3d scale-[0.62] sm:scale-80 md:scale-95 lg:scale-100 transition-all duration-300">
            
            {/* ========================================================================= */}
            {/* SHEET 1: FRONT COVER / INSIDE COVER */}
            {/* ========================================================================= */}
            <motion.div
              style={{
                transform: useTransform(rotateY1, (r) => `rotateY(${r}deg)`),
                transformOrigin: "left center",
                zIndex: zIndex1,
              }}
              className="absolute inset-0 w-full h-full transform-style-3d transition-shadow duration-300"
            >
              {/* [FRONT FACE]: Outer Leather Cover */}
              <div 
                style={{ backfaceVisibility: "hidden" }}
                className="absolute inset-0 w-full h-full bg-[#04251b] border-2 border-amber-500/20 rounded-r-2xl p-8 flex flex-col justify-between shadow-lg z-20"
              >
                {/* Book Spine border line ornament */}
                <div className="absolute top-0 left-0 w-3 h-full bg-black/40 border-r border-amber-500/10 rounded-r-sm" />
                
                {/* Cover Details */}
                <div className="flex justify-between items-start pl-4">
                  <Bookmark className="w-8 h-8 text-amber-500/60" />
                  <span className="text-[9px] font-mono text-amber-500/40 tracking-widest uppercase">REG. CODE // 1612</span>
                </div>

                <div className="space-y-4 pl-4 text-left">
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

                <div className="flex justify-between items-center pl-4 font-mono text-[9px] text-[#dfefe4]/40 uppercase tracking-widest border-t border-[#dfefe4]/10 pt-4">
                  <span>EST. 2026 // INDIA</span>
                  <span>TAP TO FLIP →</span>
                </div>
              </div>

              {/* [BACK FACE]: Inside Left Lining Page (appears on left side when flipped) */}
              <div 
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
                className="absolute inset-0 w-full h-full bg-[#fcfbfa] border border-sand rounded-l-2xl p-8 flex flex-col justify-between shadow-inner z-10"
              >
                {/* Page spine shade shadow overlay */}
                <div className="absolute top-0 right-0 w-6 h-full bg-gradient-to-l from-black/10 to-transparent pointer-events-none rounded-l-sm" />

                <div className="space-y-4 text-left">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 block">// INDEX REGISTER</span>
                  <h4 className="text-2xl font-oswald text-pine font-extrabold uppercase tracking-wide">
                    TABLE OF CREDENTIALS
                  </h4>
                  <p className="text-[11px] font-mono text-neutral-600 leading-relaxed max-w-xs">
                    This verified album compiles certified credentials, verifying expertise in full-stack development, cloud security compliance, and AI threat detection models.
                  </p>
                </div>

                <div className="space-y-3 font-mono text-[10px] text-neutral-500 uppercase tracking-wider pl-4 border-l border-sand">
                  <div className="flex justify-between border-b border-neutral-100 pb-1.5">
                    <span>1. Google IT Professional</span>
                    <span className="text-emerald-600 font-bold">VERIFIED</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-100 pb-1.5">
                    <span>2. Google Generative AI</span>
                    <span className="text-emerald-600 font-bold">VERIFIED</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-100 pb-1.5">
                    <span>3. AWS Cloud Practitioner</span>
                    <span className="text-emerald-600 font-bold">VERIFIED</span>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span>4. Cisco Cybersecurity</span>
                    <span className="text-emerald-600 font-bold">VERIFIED</span>
                  </div>
                </div>

                <span className="text-[9px] font-mono text-neutral-400 text-right block tracking-widest uppercase">PAGE I // OVERVIEW</span>
              </div>
            </motion.div>

            {/* ========================================================================= */}
            {/* SHEET 2: GOOGLE IT SUPPORT / GOOGLE GENERATIVE AI */}
            {/* ========================================================================= */}
            <motion.div
              style={{
                transform: useTransform(rotateY2, (r) => `rotateY(${r}deg)`),
                transformOrigin: "left center",
                zIndex: zIndex2,
              }}
              className="absolute inset-0 w-full h-full transform-style-3d transition-shadow duration-300"
            >
              {/* [FRONT FACE]: Certificate 1 - Google IT Support (appears on right before flip) */}
              <div 
                style={{ backfaceVisibility: "hidden" }}
                className="absolute inset-0 w-full h-full bg-[#fdfcfe] border border-sand rounded-r-2xl p-6 sm:p-8 flex flex-col justify-between shadow-md z-20"
              >
                {/* Spine shade */}
                <div className="absolute top-0 left-0 w-6 h-full bg-gradient-to-r from-black/10 to-transparent pointer-events-none rounded-r-sm" />

                {/* Badge Logo and Header */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100 text-blue-600 font-bold text-base shadow-xs">
                      G
                    </div>
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 block">// GOOGLE CAREER</span>
                      <h4 className="text-base font-bold font-mono text-pine uppercase tracking-wider">IT Support Professional</h4>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-semibold text-pine bg-pine/5 px-2.5 py-1 rounded-full border border-sand shadow-xs">2025</span>
                </div>

                {/* Certificate Mock Box */}
                <div className="p-4 rounded-2xl bg-neutral-50/80 border border-sand relative overflow-hidden flex-1 my-4 flex flex-col justify-between">
                  {/* Decorative stamp watermark */}
                  <div className="absolute right-3 bottom-3 opacity-10 pointer-events-none">
                    <Award className="w-24 h-24 text-pine" />
                  </div>
                  
                  <div className="space-y-2 text-left">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">// CREDENTIAL DETAILS</p>
                    <p className="text-[11px] font-mono text-neutral-600 leading-normal">
                      Verifies core technical skills in **system administration, network configuration, troubleshooting protocols, customer service automation, and operational security architectures**.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-neutral-100">
                    {["Sys Admin", "Networking", "Troubleshooting", "Security", "Linux"].map(tag => (
                      <span key={tag} className="text-[8px] font-mono bg-white border border-sand px-2 py-0.5 rounded text-neutral-500">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="flex justify-between items-center font-mono text-[9px] text-[#9d9282] uppercase tracking-widest border-t border-neutral-100 pt-3">
                  <span>Google IT Support Registry</span>
                  <span className="text-emerald-600 font-bold flex items-center gap-1">PAGE II // ACTIVE</span>
                </div>
              </div>

              {/* [BACK FACE]: Certificate 2 - Google Generative AI (appears on left when flipped) */}
              <div 
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
                className="absolute inset-0 w-full h-full bg-[#fcfbfa] border border-sand rounded-l-2xl p-6 sm:p-8 flex flex-col justify-between shadow-inner z-10"
              >
                {/* Spine shade */}
                <div className="absolute top-0 right-0 w-6 h-full bg-gradient-to-l from-black/10 to-transparent pointer-events-none rounded-l-sm" />

                {/* Header */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center border border-teal-100 text-teal-600 font-bold text-base shadow-xs">
                      AI
                    </div>
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 block">// GOOGLE CLOUD</span>
                      <h4 className="text-base font-bold font-mono text-pine uppercase tracking-wider">Generative AI Specialist</h4>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-semibold text-pine bg-pine/5 px-2.5 py-1 rounded-full border border-sand shadow-xs">2025</span>
                </div>

                {/* Certificate Mock Box */}
                <div className="p-4 rounded-2xl bg-neutral-50/80 border border-sand relative overflow-hidden flex-1 my-4 flex flex-col justify-between">
                  <div className="absolute right-3 bottom-3 opacity-10 pointer-events-none">
                    <Shield className="w-24 h-24 text-pine" />
                  </div>

                  <div className="space-y-2 text-left">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">// CREDENTIAL DETAILS</p>
                    <p className="text-[11px] font-mono text-neutral-600 leading-normal">
                      Verifies competency in **Large Language Models (LLMs), attention architectures, prompt engineering guidelines, encoder-decoder models, and deploying ethical/responsible AI systems**.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-neutral-100">
                    {["LLMs", "Prompt Eng", "Transformers", "Ethical AI", "Model Tuning"].map(tag => (
                      <span key={tag} className="text-[8px] font-mono bg-white border border-sand px-2 py-0.5 rounded text-neutral-500">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center font-mono text-[9px] text-[#9d9282] uppercase tracking-widest border-t border-neutral-100 pt-3">
                  <span>Google AI Registry</span>
                  <span className="text-emerald-600 font-bold flex items-center gap-1">PAGE III // ACTIVE</span>
                </div>
              </div>
            </motion.div>

            {/* ========================================================================= */}
            {/* SHEET 3: AWS CLOUD / CISCO CYBERSECURITY */}
            {/* ========================================================================= */}
            <motion.div
              style={{
                transform: useTransform(rotateY3, (r) => `rotateY(${r}deg)`),
                transformOrigin: "left center",
                zIndex: zIndex3,
              }}
              className="absolute inset-0 w-full h-full transform-style-3d transition-shadow duration-300"
            >
              {/* [FRONT FACE]: Certificate 3 - AWS Cloud Practitioner (appears on right before flip) */}
              <div 
                style={{ backfaceVisibility: "hidden" }}
                className="absolute inset-0 w-full h-full bg-[#fdfcfe] border border-sand rounded-r-2xl p-6 sm:p-8 flex flex-col justify-between shadow-md z-20"
              >
                {/* Spine shade */}
                <div className="absolute top-0 left-0 w-6 h-full bg-gradient-to-r from-black/10 to-transparent pointer-events-none rounded-r-sm" />

                {/* Header */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center border border-orange-100 text-orange-600 font-bold text-xs shadow-xs">
                      AWS
                    </div>
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 block">// AMAZON WEB SERVICES</span>
                      <h4 className="text-base font-bold font-mono text-pine uppercase tracking-wider">Cloud Practitioner</h4>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-semibold text-pine bg-pine/5 px-2.5 py-1 rounded-full border border-sand shadow-xs">2025</span>
                </div>

                {/* Certificate Mock Box */}
                <div className="p-4 rounded-2xl bg-neutral-50/80 border border-sand relative overflow-hidden flex-1 my-4 flex flex-col justify-between">
                  <div className="absolute right-3 bottom-3 opacity-10 pointer-events-none">
                    <Award className="w-24 h-24 text-pine" />
                  </div>

                  <div className="space-y-2 text-left">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">// CREDENTIAL DETAILS</p>
                    <p className="text-[11px] font-mono text-neutral-600 leading-normal">
                      Validates total understanding of **AWS cloud infrastructure, global network zones, core database operations (EC2, S3, RDS), secure IAM role compliance, and billing configurations**.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-neutral-100">
                    {["IAM Security", "EC2 Compute", "S3 Storage", "Cloud Architecture", "Pricing"].map(tag => (
                      <span key={tag} className="text-[8px] font-mono bg-white border border-sand px-2 py-0.5 rounded text-neutral-500">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center font-mono text-[9px] text-[#9d9282] uppercase tracking-widest border-t border-neutral-100 pt-3">
                  <span>AWS verification</span>
                  <span className="text-emerald-600 font-bold flex items-center gap-1">PAGE IV // ACTIVE</span>
                </div>
              </div>

              {/* [BACK FACE]: Certificate 4 - Cisco Cybersecurity (appears on left when flipped) */}
              <div 
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
                className="absolute inset-0 w-full h-full bg-[#fcfbfa] border border-sand rounded-l-2xl p-6 sm:p-8 flex flex-col justify-between shadow-inner z-10"
              >
                {/* Spine shade */}
                <div className="absolute top-0 right-0 w-6 h-full bg-gradient-to-l from-black/10 to-transparent pointer-events-none rounded-l-sm" />

                {/* Header */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center border border-indigo-100 text-indigo-600 font-bold text-xs shadow-xs animate-pulse">
                      CISCO
                    </div>
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 block">// NETWORK DEFENSE</span>
                      <h4 className="text-base font-bold font-mono text-pine uppercase tracking-wider">Intro to Cybersecurity</h4>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-semibold text-pine bg-pine/5 px-2.5 py-1 rounded-full border border-sand shadow-xs">2024</span>
                </div>

                {/* Certificate Mock Box */}
                <div className="p-4 rounded-2xl bg-neutral-50/80 border border-sand relative overflow-hidden flex-1 my-4 flex flex-col justify-between">
                  <div className="absolute right-3 bottom-3 opacity-10 pointer-events-none">
                    <Shield className="w-24 h-24 text-pine" />
                  </div>

                  <div className="space-y-2 text-left">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">// CREDENTIAL DETAILS</p>
                    <p className="text-[11px] font-mono text-neutral-600 leading-normal">
                      Validates foundational knowledge of **network threats monitoring, data privacy protection strategies, cryptography protocols, security compliance frameworks, and digital forensics**.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-neutral-100">
                    {["Net Security", "Data Privacy", "Cryptography", "Threat Vectors", "Forensics"].map(tag => (
                      <span key={tag} className="text-[8px] font-mono bg-white border border-sand px-2 py-0.5 rounded text-neutral-500">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center font-mono text-[9px] text-[#9d9282] uppercase tracking-widest border-t border-neutral-100 pt-3">
                  <span>Cisco Academy Registry</span>
                  <span className="text-emerald-600 font-bold flex items-center gap-1">PAGE V // ACTIVE</span>
                </div>
              </div>
            </motion.div>

            {/* ========================================================================= */}
            {/* SHEET 4: BACK COVER (STATIC RIGHT-SIDE BASE) */}
            {/* ========================================================================= */}
            <div className="absolute inset-0 w-full h-full bg-[#04251b] border-2 border-amber-500/20 rounded-r-2xl p-8 flex flex-col justify-between shadow-md z-0 select-none pointer-events-none">
              {/* Spine lining */}
              <div className="absolute top-0 left-0 w-3 h-full bg-black/40 border-r border-amber-500/10 rounded-r-sm" />
              
              <div className="flex justify-between items-start pl-4">
                <Bookmark className="w-8 h-8 text-amber-500/60" />
                <span className="text-[9px] font-mono text-[#dfefe4]/30 tracking-widest uppercase">REG. CODE // 1612</span>
              </div>

              <div className="space-y-4 pl-4 text-left">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#10be7e] font-bold block">
                  // VERIFICATION COMPLETION
                </span>
                <h3 className="text-3xl sm:text-5xl font-oswald text-cream font-extrabold uppercase tracking-wide leading-none">
                  CREDENTIALS<br />REGISTERED.
                </h3>
                <div className="w-16 h-[2px] bg-amber-500/40" />
                <p className="text-[10px] font-mono text-[#dfefe4]/60 uppercase tracking-widest leading-relaxed">
                  SECURE COMPLIANCE ESTABLISHED.<br />
                  ALL VERIFIED SECTIONS ENCRYPTED.
                </p>
              </div>

              <div className="flex justify-between items-center pl-4 font-mono text-[9px] text-[#dfefe4]/40 uppercase tracking-widest border-t border-[#dfefe4]/10 pt-4">
                <span>SYSTEM COMPLETED // EST. 2026</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  SECURED <CheckCircle className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
