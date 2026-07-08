import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  wrap,
} from "motion/react";

interface SkillItem {
  name: string;
  bg: string;
}

const SKILLS_LINE_1: SkillItem[] = [
  { name: "React", bg: "bg-[#61dafb] text-zinc-950" },
  { name: "TypeScript", bg: "bg-[#3178c6] text-white" },
  { name: "Tailwind CSS", bg: "bg-[#38bdf8] text-zinc-950" },
  { name: "HTML5", bg: "bg-[#e34f26] text-white" },
  { name: "CSS3", bg: "bg-[#1572b6] text-white" },
  { name: "Vite", bg: "bg-[#646cff] text-white" },
  { name: "Git", bg: "bg-[#f05032] text-white" },
  { name: "Docker", bg: "bg-[#2496ed] text-white" },
];

const SKILLS_LINE_2: SkillItem[] = [
  { name: "Python", bg: "bg-[#3776ab] text-white" },
  { name: "Flask", bg: "bg-[#000000] text-white border border-zinc-800" },
  { name: "C++", bg: "bg-[#00599c] text-white" },
  { name: "Java", bg: "bg-[#f89820] text-white" },
  { name: "AWS", bg: "bg-[#ff9900] text-zinc-950" },
  { name: "Supabase", bg: "bg-[#3ecf8e] text-zinc-950" },
  { name: "PostgreSQL", bg: "bg-[#4169e1] text-white" },
  { name: "MongoDB", bg: "bg-[#47a248] text-white" },
  { name: "SQL", bg: "bg-[#00758f] text-white" },
  { name: "Oracle", bg: "bg-[#f80000] text-white" },
];

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}

interface ParallaxProps {
  items: SkillItem[];
  baseVelocity: number;
  containerRef?: React.RefObject<HTMLElement | null>;
}

function ParallaxText({ items, baseVelocity = 100, containerRef }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll(containerRef ? { container: containerRef } : undefined);
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  // Calculate dynamic skew based on scroll velocity (capped between -15 and 15 degrees)
  const skewX = useTransform(smoothVelocity, [-1500, 1500], [-10, 10], {
    clamp: true,
  });

  // wrap v from -12.5% to 0% since we render 8 repetitions (100 / 8 = 12.5)
  const x = useTransform(baseX, (v) => `${wrap(-12.5, 0, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap w-full">
      <motion.div
        className="flex whitespace-nowrap py-1.5 sm:py-3"
        style={{ x, skewX }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex whitespace-nowrap">
            {items.map((item, idx) => (
              <span
                key={`${item.name}-${idx}`}
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-2.5 mx-2 text-xs sm:text-sm md:text-base font-extrabold tracking-wider uppercase rounded-full shadow-md select-none",
                  item.bg
                )}
              >
                <span className="size-1.5 sm:size-2 rounded-full bg-white/70" />
                {item.name}
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function TechStackSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Slowed down base velocity for soft, graceful marquee movement
  const slowVelocity = 0.8;

  return (
    <section 
      id="tech-stack" 
      ref={sectionRef}
      className="py-24 px-6 md:px-12 bg-[#efebe4] border-b border-[#dfd9cb] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto mb-12">
        {/* Section Header */}
        <div className="flex flex-col xl:flex-row items-start xl:items-end justify-between gap-6">
          <div className="max-w-4xl text-left">
            <span className="text-xs font-mono uppercase tracking-widest text-[#0f523c] block mb-2 font-semibold">
              // EXPERTISE SPHERE
            </span>
            <h2 className="text-5xl md:text-[8rem] font-oswald font-extrabold uppercase text-[#04251b] tracking-tight leading-none mb-4">
              Tech Stack
            </h2>
            <h2 className="text-5xl md:text-[8rem] font-oswald font-extrabold uppercase text-[#04251b] tracking-tight leading-none">
              &amp; Skills
            </h2>
          </div>
        </div>
      </div>

      {/* Clean container blending directly into the page background */}
      <div className="w-full py-8 relative overflow-hidden flex flex-col gap-4 md:gap-8">
        <ParallaxText 
          items={SKILLS_LINE_1} 
          baseVelocity={slowVelocity} 
        />

        <ParallaxText 
          items={SKILLS_LINE_2} 
          baseVelocity={-slowVelocity} 
        />
      </div>
    </section>
  );
}
