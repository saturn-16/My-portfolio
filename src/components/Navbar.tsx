import { useState, useEffect } from "react";
import { GAURAV_BIO } from "../data";
import { ArrowUpRight } from "lucide-react";

interface NavbarProps {
  onContactClick: () => void;
}

export default function Navbar({ onContactClick }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "works", "about", "off-duty"];
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
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="w-full py-4 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-0 z-40 bg-cream/90 backdrop-blur-md border-b border-sand rounded-t-[24px]">
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

      {/* Navigation Capsule Menu */}
      <nav className="bg-white/95 border border-sand shadow-xs rounded-full px-2 py-1.5 flex items-center md:gap-1">
        {[
          { id: "works", label: "Works" },
          { id: "about", label: "About" },
          { id: "off-duty", label: "Off Duty" },
        ].map((item) => (
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
        {/* Contact button triggers the contact page or drawer */}
        <button
          onClick={onContactClick}
          className="px-4 py-2 text-xs font-mono tracking-widest uppercase rounded-full text-pine hover:bg-pine/10 font-bold flex items-center gap-1 cursor-pointer"
        >
          Contact <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </nav>

      {/* Social Links on Right Side - Stacked horizontally or vertically */}
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
  );
}
