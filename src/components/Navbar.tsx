import { useState, useEffect } from "react";
import { GAURAV_BIO } from "../data";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  onContactClick: () => void;
}

export default function Navbar({ onContactClick }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "works", "about", "tech-stack", "certificates"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  const menuItems = [
    { id: "works", label: "Works" },
    { id: "about", label: "About" },
    { id: "tech-stack", label: "Tech Stack" },
    { id: "certificates", label: "Certificates" },
  ];

  // Disable main body scroll when mobile menu is open to prevent double scrollbars
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="w-full py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-45 bg-cream/90 backdrop-blur-md border-b border-sand rounded-t-[24px]">
        {/* Signature Logo */}
        <button 
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setActiveSection("hero");
          }}
          className="text-2xl font-script text-pine hover:text-pine-light transition-colors transform hover:-rotate-2 cursor-pointer focus:outline-hidden"
          style={{ fontSize: "2.2rem" }}
        >
          {GAURAV_BIO.name}
        </button>

        {/* Desktop Navigation Capsule Menu */}
        <nav className="hidden md:flex bg-white/95 border border-sand shadow-xs rounded-full px-2 py-1.5 items-center justify-center gap-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`px-4 py-2 text-xs font-mono tracking-widest uppercase rounded-full transition-all cursor-pointer ${
                activeSection === item.id
                  ? "bg-pine text-cream font-medium"
                  : "text-neutral-600 hover:text-pine hover:bg-neutral-100"
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={onContactClick}
            className="px-4 py-2 text-xs font-mono tracking-widest uppercase rounded-full text-pine hover:bg-pine/10 font-bold flex items-center gap-1 cursor-pointer"
          >
            Contact <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </nav>

        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 bg-white border border-sand rounded-full text-pine shadow-xs cursor-pointer hover:bg-neutral-50 transition-colors z-50 flex items-center justify-center"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Desktop Social Links */}
        <div className="hidden lg:flex flex-col items-end gap-0.5 text-[10px] font-mono tracking-widest uppercase text-neutral-500">
          <a 
            href={GAURAV_BIO.socials.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-pine-light hover:translate-x-0.5 transition-transform"
          >
            GitHub
          </a>
          <a 
            href={GAURAV_BIO.socials.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-pine-light hover:translate-x-0.5 transition-transform"
          >
            LinkedIn
          </a>
        </div>
      </header>

      {/* Premium Full-Screen Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-10%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-10%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-pine-dark/98 backdrop-blur-xl flex flex-col justify-between p-8 pt-28 text-cream md:hidden"
          >
            {/* Background geometric design patterns */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(223,239,228,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(223,239,228,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
            <div className="absolute top-1/4 right-0 w-72 h-72 bg-[#10be7e]/5 rounded-full blur-3xl pointer-events-none" />
            
            {/* Staggered Vertical Menu List */}
            <div className="space-y-6 relative z-10">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#10be7e] font-bold block mb-4 border-b border-[#dfefe4]/10 pb-2">
                // SYSTEM CORE INDEX
              </span>
              <div className="flex flex-col gap-5">
                {menuItems.map((item, index) => (
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left text-3xl font-oswald font-extrabold uppercase tracking-wide cursor-pointer flex items-center justify-between border-b border-[#dfefe4]/5 pb-3 group"
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="font-mono text-xs text-[#10be7e] font-semibold">0{index + 1}.</span>
                      <span className={activeSection === item.id ? "text-emerald-400" : "text-[#dfefe4] group-hover:text-white"}>{item.label}</span>
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-neutral-500 group-hover:text-[#10be7e] transition-colors" />
                  </motion.button>
                ))}

                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: menuItems.length * 0.05 }}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onContactClick();
                  }}
                  className="text-left text-3xl font-oswald font-extrabold uppercase tracking-wide cursor-pointer flex items-center justify-between border-b border-[#dfefe4]/5 pb-3 group text-[#dfefe4]"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-[#10be7e] font-semibold">0{menuItems.length + 1}.</span>
                    <span>Contact Direct</span>
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-emerald-400" />
                </motion.button>
              </div>
            </div>

            {/* Bottom Panel Information */}
            <div className="relative z-10 border-t border-[#dfefe4]/10 pt-6 mt-8 space-y-4 font-mono text-xs text-[#dfefe4]/60">
              <div className="space-y-1">
                <span className="text-[9px] uppercase tracking-widest text-neutral-400 block">// RESOURCE CHANNEL</span>
                <a href={`mailto:${GAURAV_BIO.email}`} className="text-[#dfefe4] hover:text-[#10be7e] transition-colors block text-sm font-semibold">{GAURAV_BIO.email}</a>
              </div>

              <div className="flex justify-between items-center text-[10px] uppercase tracking-widest pt-2">
                <div className="flex gap-4">
                  <a href={GAURAV_BIO.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-white">GitHub</a>
                  <a href={GAURAV_BIO.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a>
                </div>
                <span className="text-emerald-400 font-bold">SECURE SHELL // v1</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
