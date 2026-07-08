import { ArrowUpRight, Award, Sparkles, Cpu, Shield, CheckCircle } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

export interface OrbitStackItem {
  name: string;
  role: string;
  description: string;
  accent?: string;
  initials?: string;
  stat?: string;
  tags?: string[];
  logo?: string;
}

const defaultItems: OrbitStackItem[] = [
  {
    name: "IT Support Professional",
    role: "Google",
    description: "Validates core system administration, network configurations, troubleshooting automation protocols, Linux terminal commands, and secure active directory management.",
    accent: "#3b82f6",
    initials: "G",
    stat: "2025",
    tags: ["Sys Admin", "Linux CLI", "Networking", "Troubleshooting"],
    logo: "https://www.vectorlogo.zone/logos/google/google-icon.svg"
  },
  {
    name: "Generative AI Specialist",
    role: "Google Cloud",
    description: "Verifies competence in Large Language Models (LLMs), attention mechanism, image generation pipelines, prompt engineering principles, and deployment of ethical AI models.",
    accent: "#0d9488",
    initials: "AI",
    stat: "2025",
    tags: ["LLMs", "Transformers", "Prompt Eng", "Google Cloud"],
    logo: "https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg"
  },
  {
    name: "AWS Cloud Practitioner",
    role: "Amazon Web Services",
    description: "Validates foundational understanding of AWS global cloud infrastructure, server computing (EC2), secure database storage (S3), IAM compliance role setups, and billing clusters.",
    accent: "#ea580c",
    initials: "AWS",
    stat: "2025",
    tags: ["IAM Roles", "S3 Storage", "EC2 Compute", "AWS Cloud"],
    logo: "https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg"
  },
  {
    name: "Intro to Cybersecurity",
    role: "Cisco Academy",
    description: "Validates network threat vector monitoring, secure endpoints defense, cryptography architectures, digital forensics logs, and corporate cybersecurity compliance.",
    accent: "#4f46e5",
    initials: "CISCO",
    stat: "2024",
    tags: ["Net Defense", "Threat Intel", "Cryptography", "Forensics"],
    logo: "https://www.vectorlogo.zone/logos/cisco/cisco-icon.svg"
  }
];

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}

function clampIndex(index: number, length: number) {
  return Math.min(Math.max(index, 0), Math.max(length - 1, 0));
}

function getInitials(item: OrbitStackItem) {
  if (item.initials) return item.initials;
  return item.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function CredentialBadge({ item }: { item: OrbitStackItem }) {
  const initials = getInitials(item);

  return (
    <div
      className="relative flex aspect-[1.4] w-full overflow-hidden rounded-[1.2rem] sm:rounded-[1.45rem] border border-black/[0.08] bg-black/[0.035] items-center justify-center"
      style={{ "--accent": item.accent ?? "#f3f1ea" } as CSSProperties}
    >
      {/* Radial glows and grid patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--accent),transparent_65%)] opacity-25" />
      
      {/* Visual Tech Circles */}
      <div className="absolute w-28 h-28 sm:w-36 sm:h-36 border border-zinc-950/5 rounded-full" />
      <div className="absolute w-20 h-20 sm:w-28 sm:h-28 border border-zinc-950/10 rounded-full" />
      <div className="absolute w-14 h-14 sm:w-20 sm:h-20 border border-zinc-950/15 border-dashed rounded-full" />
      
      {/* Badge container */}
      <div 
        className="relative z-10 flex size-14 sm:size-16 md:size-20 items-center justify-center rounded-full border border-zinc-950 bg-[#fbf9f4] shadow-sm transition-transform hover:scale-105 p-3 sm:p-3.5 md:p-4.5"
        style={{ boxShadow: `0 4px 12px -3px ${item.accent}33` }}
      >
        <div className="absolute -inset-0.5 rounded-full border border-dashed border-zinc-950/30" />
        {item.logo ? (
          <img 
            src={item.logo} 
            alt={`${item.role} logo`} 
            className="w-full h-full object-contain filter select-none pointer-events-none" 
          />
        ) : (
          <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-zinc-950" />
        )}
      </div>

      <div className="absolute bottom-3 right-3 rounded-full bg-zinc-950 px-2 py-0.5 sm:px-3 sm:py-1 text-[9px] sm:text-xs font-semibold tracking-[0.18em] text-white">
        {initials}
      </div>
    </div>
  );
}

export default function OrbitCardStackSection() {
  const items = defaultItems;
  const spread = 175;
  const lift = 30;

  const defaultActiveIndex = 1; // Generative AI Card centered initially
  const defaultIndex = clampIndex(defaultActiveIndex, items.length);
  const [expanded, setExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  // Handle responsive viewport sizing
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;
  
  const dynamicSpread = isMobile ? 55 : isTablet ? 110 : spread;
  const dynamicLift = isMobile ? 18 : lift;

  const center = (items.length - 1) / 2;
  const collapseTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (collapseTimeoutRef.current) window.clearTimeout(collapseTimeoutRef.current);
    };
  }, []);

  const activateCard = (index: number) => {
    setActiveIndex(index);
  };

  const scheduleCollapse = () => {
    if (collapseTimeoutRef.current) {
      window.clearTimeout(collapseTimeoutRef.current);
    }
    collapseTimeoutRef.current = window.setTimeout(() => {
      setExpanded(false);
      setActiveIndex(defaultIndex);
    }, 100);
  };

  const cancelCollapse = () => {
    if (collapseTimeoutRef.current) {
      window.clearTimeout(collapseTimeoutRef.current);
      collapseTimeoutRef.current = null;
    }
  };

  const cardLayouts = useMemo(
    () =>
      items.map((_, index) => {
        const fromCenter = index - center;
        const collapsedFromActive = index - defaultIndex;
        const expandedRotate = fromCenter * 7;

        return {
          collapsed: {
            x: collapsedFromActive * 12,
            y: Math.abs(collapsedFromActive) * 4,
            rotate: collapsedFromActive * 3,
          },
          expanded: {
            x: fromCenter * dynamicSpread,
            y: Math.abs(fromCenter) * 24 + Math.max(0, Math.abs(fromCenter) - 1) * 8,
            rotate: expandedRotate,
          },
        };
      }),
    [center, defaultIndex, items, dynamicSpread],
  );

  return (
    <section id="certificates" className="py-24 px-6 md:px-12 bg-[#efebe4] border-b border-[#dfd9cb] flex flex-col items-center">
      <div className="max-w-7xl w-full mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="flex flex-col xl:flex-row items-start xl:items-end justify-between gap-6 mb-12 w-full">
          <div className="max-w-4xl text-left">
            <span className="text-xs font-mono uppercase tracking-widest text-[#0f523c] block mb-2 font-semibold">
              // CREDENTIAL REGISTRY
            </span>
            <h2 className="text-5xl md:text-[8rem] font-oswald font-extrabold uppercase text-[#04251b] tracking-tight leading-none">
              Verified
            </h2>
            <h2 className="text-5xl md:text-[8rem] font-oswald font-extrabold uppercase text-[#04251b] tracking-tight leading-none">
              Certifications
            </h2>
          </div>
        </div>

        {/* 3D Scene Viewport */}
        <div className="relative flex flex-col items-center justify-center w-full min-h-[500px] perspective-[2000px] select-none">
          <div className="relative h-[480px] w-full max-w-[980px] flex items-center justify-center">
            
            {items.map((item, index) => {
              const active = activeIndex === index;
              const cardLayout = cardLayouts[index] ?? cardLayouts[defaultIndex]!;
              const layout = expanded ? cardLayout.expanded : cardLayout.collapsed;
              const zIndex = active
                ? 80
                : expanded
                  ? 50 - Math.abs(index - activeIndex)
                  : 50 - Math.abs(index - defaultIndex);

              return (
                <article
                  key={`${item.name}-${index}`}
                  className={cn(
                    "absolute left-1/2 top-1/2 w-[16rem] sm:w-[18rem] md:w-[21rem] h-[28rem] sm:h-[32rem] md:h-[36rem] -ml-[8rem] sm:-ml-[9rem] md:-ml-[10.5rem] -mt-[14rem] sm:-mt-[16rem] md:-mt-[18rem] origin-bottom cursor-pointer rounded-[1.6rem] sm:rounded-[1.9rem] border border-black/10 bg-[#fbf9f4] p-3 sm:p-4 text-[#141414] outline-none shadow-md flex flex-col justify-between select-none",
                    "focus-visible:ring-2 focus-visible:ring-zinc-950/20 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  )}
                  style={{ 
                    zIndex,
                    transform: `translate(${layout.x}px, ${layout.y - (active && expanded ? dynamicLift : 0)}px) rotate(${layout.rotate}deg) scale(${expanded ? 0.985 : 0.96})`,
                    transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), z-index 0.15s ease-out, shadow 0.4s ease",
                  }}
                  tabIndex={0}
                  onMouseEnter={() => {
                    cancelCollapse();
                    setExpanded(true);
                    activateCard(index);
                  }}
                  onMouseLeave={scheduleCollapse}
                  onClick={() => {
                    cancelCollapse();
                    setExpanded(true);
                    activateCard(index);
                  }}
                  onFocus={() => {
                    setExpanded(true);
                    activateCard(index);
                  }}
                  onBlur={scheduleCollapse}
                >
                  <div className="relative">
                    <CredentialBadge item={item} />
                    <a 
                      href="https://www.credly.com/users/gaurav-kumar.bb5e1d13/edit/badges/credly"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="absolute right-2.5 top-2.5 sm:right-3 sm:top-3 flex size-9 sm:size-11 items-center justify-center rounded-full bg-zinc-950 text-white shadow-md shadow-black/25 hover:bg-zinc-800 transition-colors z-20 cursor-pointer"
                    >
                      <ArrowUpRight className="size-3.5 sm:size-4" />
                    </a>
                  </div>

                  <div className="px-1.5 pb-1.5 pt-4 sm:pt-6 text-left">
                    <div>
                      <p className="text-[0.62rem] sm:text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#0f523c]">
                        {item.role}
                      </p>
                      <h3 className="mt-1.5 text-[1.4rem] sm:text-[1.7rem] md:text-[2rem] font-extrabold leading-none tracking-tight text-zinc-950 font-oswald uppercase">
                        {item.name}
                      </h3>
                    </div>
                    
                    <p className="mt-3.5 max-w-[17rem] text-[0.8rem] sm:text-[0.9rem] md:text-[0.98rem] font-medium leading-[1.4] text-zinc-700">
                      {item.description}
                    </p>
                    
                    <div className="mt-4 border-t border-black/10 pt-3.5 flex flex-wrap gap-1">
                      {item.tags?.map((tag) => (
                        <span 
                          key={tag} 
                          className="text-[0.6rem] sm:text-[0.68rem] font-mono border border-black/10 px-1.5 py-0.5 rounded-sm bg-black/[0.02] text-zinc-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
