import { useRef, useEffect, useState } from "react";
import { Sparkles, Info, RefreshCw } from "lucide-react";

interface SkillBall {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  name: string;
  logoUrl: string;
  imageElement: HTMLImageElement;
  mass: number;
}

const SKILLS = [
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Flask", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
  { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Supabase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" },
  { name: "Vite", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" },
  { name: "AWS", logo: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/amazonwebservices.svg" },
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "Hugging Face", logo: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/huggingface.svg" }
];

export default function TechStackSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  // Trigger manual explosion/scramble of balls
  const triggerScramble = useRef<(() => void) | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let balls: SkillBall[] = [];
    let mouse = { x: -1000, y: -1000, active: false };
    let clickRipples: { x: number; y: number; radius: number; maxRadius: number; opacity: number }[] = [];

    // Physics parameters (Aquarium Float Tuning)
    const RESTITUTION = 0.82; // Bounciness index
    const FRICTION = 0.985;   // Ambient drag/slowing factor
    const HOVER_DIST = 110;   // Force field boundary
    const HOVER_PUSH = 0.45;  // Force field acceleration scale
    const CLICK_KICK = 15.0;  // Click impulse vector magnitude

    // Pre-load all image vector assets
    const preloadedSkills = SKILLS.map((skill) => {
      const img = new Image();
      img.src = skill.logo;
      img.crossOrigin = "anonymous";
      return {
        ...skill,
        imageElement: img,
      };
    });

    const initSimulation = () => {
      const width = container.clientWidth;
      const height = 520;
      
      canvas.width = width;
      canvas.height = height;

      // Base radius scaled beautifully on screens
      const baseRadius = width < 640 ? 38 : 46;
      balls = [];

      // Grid-layout distribution to prevent initial overlaps
      const margin = baseRadius * 2.2;
      const cols = Math.max(2, Math.floor((width - margin) / (baseRadius * 2.3)));
      
      preloadedSkills.forEach((skill, idx) => {
        const col = idx % cols;
        const row = Math.floor(idx / cols);

        // Center within grid gridboxes
        const gridX = margin + col * (baseRadius * 2.3) + (Math.random() - 0.5) * 15;
        const gridY = margin + row * (baseRadius * 2.3) + (Math.random() - 0.5) * 15;

        balls.push({
          x: Math.max(baseRadius, Math.min(width - baseRadius, gridX)),
          y: Math.max(baseRadius, Math.min(height - baseRadius, gridY)),
          vx: (Math.random() - 0.5) * 4.0,
          vy: (Math.random() - 0.5) * 4.0,
          radius: baseRadius,
          name: skill.name,
          logoUrl: skill.logo,
          imageElement: skill.imageElement,
          mass: baseRadius,
        });
      });
    };

    initSimulation();

    // Trigger full physical scrambling
    triggerScramble.current = () => {
      balls.forEach((ball) => {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8 + 8;
        ball.vx = Math.cos(angle) * speed;
        ball.vy = Math.sin(angle) * speed;
      });
      // Add a shockwave at the center
      clickRipples.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 0,
        maxRadius: Math.max(canvas.width, canvas.height) * 0.6,
        opacity: 0.8
      });
    };

    // Elastic momentum solver (Normal vector impulse math)
    const resolveCollision = (b1: SkillBall, b2: SkillBall) => {
      const dx = b2.x - b1.x;
      const dy = b2.y - b1.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const minDist = b1.radius + b2.radius;

      if (dist < minDist) {
        const overlap = minDist - dist;
        const nx = dx / (dist || 1);
        const ny = dy / (dist || 1);

        // Push away from overlap to prevent sticking/interpenetration
        b1.x -= nx * overlap * 0.51;
        b1.y -= ny * overlap * 0.51;
        b2.x += nx * overlap * 0.51;
        b2.y += ny * overlap * 0.51;

        // Relative velocity vector along normal
        const rvx = b2.vx - b1.vx;
        const rvy = b2.vy - b1.vy;
        const velAlongNormal = rvx * nx + rvy * ny;

        // Do not resolve if moving apart
        if (velAlongNormal < 0) {
          const impulseScalar = -(1.0 + RESTITUTION) * velAlongNormal / 2;
          
          b1.vx -= impulseScalar * nx;
          b1.vy -= impulseScalar * ny;
          b2.vx += impulseScalar * nx;
          b2.vy += impulseScalar * ny;
        }
      }
    };

    // Physics Update Loop
    let time = 0;
    const tick = () => {
      time++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Process and Draw Ripples
      clickRipples = clickRipples.filter((ripple) => {
        ripple.radius += 5.5;
        ripple.opacity -= 0.022;

        ctx.strokeStyle = `rgba(13, 92, 69, ${ripple.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.stroke();

        return ripple.opacity > 0 && ripple.radius < ripple.maxRadius;
      });

      // 2. Physics & Rebounds Updates
      balls.forEach((ball) => {
        // Soft aquarium Brownian drift
        ball.vx += Math.sin(time * 0.015 + ball.y * 0.005) * 0.045;
        ball.vy += Math.cos(time * 0.015 + ball.x * 0.005) * 0.045;

        // Slow gravitational down-settle
        ball.vy += 0.055;

        // Mouse cursor repel (Force-field push)
        if (mouse.active) {
          const mdx = ball.x - mouse.x;
          const mdy = ball.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mdist < HOVER_DIST && mdist > 0) {
            const pushForce = (HOVER_DIST - mdist) * HOVER_PUSH * 0.02;
            ball.vx += (mdx / mdist) * pushForce;
            ball.vy += (mdy / mdist) * pushForce;
          }
        }

        // Apply drag/friction
        ball.vx *= FRICTION;
        ball.vy *= FRICTION;

        // Integrate positions
        ball.x += ball.vx;
        ball.y += ball.vy;

        // Screen boundary elastic rebounds
        const bounceDampen = RESTITUTION;
        if (ball.x - ball.radius < 0) {
          ball.x = ball.radius;
          ball.vx = -ball.vx * bounceDampen;
        } else if (ball.x + ball.radius > canvas.width) {
          ball.x = canvas.width - ball.radius;
          ball.vx = -ball.vx * bounceDampen;
        }

        if (ball.y - ball.radius < 0) {
          ball.y = ball.radius;
          ball.vy = -ball.vy * bounceDampen;
        } else if (ball.y + ball.radius > canvas.height) {
          ball.y = canvas.height - ball.radius;
          ball.vy = -ball.vy * bounceDampen;
        }
      });

      // 3. Resolve mutual ball overlaps & collisions
      for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
          resolveCollision(balls[i], balls[j]);
        }
      }

      // 4. Render Balls to Canvas
      balls.forEach((ball) => {
        ctx.save();

        // Ball Shadow backdrop
        ctx.shadowColor = "rgba(7, 58, 43, 0.07)";
        ctx.shadowBlur = 12;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 6;

        // Ball Glossy Body
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Ball outline border
        ctx.strokeStyle = "rgba(230, 224, 210, 0.9)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Center SVG Logo inside the ball (~52% of circle size)
        const logoSize = ball.radius * 1.05; // logo width/height limits
        if (ball.imageElement.complete) {
          ctx.drawImage(
            ball.imageElement,
            ball.x - logoSize / 2,
            ball.y - logoSize / 2,
            logoSize,
            logoSize
          );
        } else {
          // Fallback label during asset fetch latency
          ctx.fillStyle = "#073a2b";
          ctx.font = "bold 9px JetBrains Mono";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(ball.name.slice(0, 5), ball.x, ball.y);
        }

        // Elegant glossy white overlay shine highlight
        const shineGrad = ctx.createLinearGradient(
          ball.x - ball.radius,
          ball.y - ball.radius,
          ball.x + ball.radius * 0.3,
          ball.y + ball.radius * 0.3
        );
        shineGrad.addColorStop(0, "rgba(255, 255, 255, 0.4)");
        shineGrad.addColorStop(0.5, "rgba(255, 255, 255, 0)");
        shineGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = shineGrad;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    // Mouse / Touch Handlers mapping click to physical kicks
    const handleActionInput = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const inputX = clientX - rect.left;
      const inputY = clientY - rect.top;

      let clickedAnyBall = false;

      balls.forEach((ball) => {
        const dx = ball.x - inputX;
        const dy = ball.y - inputY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Click target hit margin
        if (dist < ball.radius * 2.2) {
          clickedAnyBall = true;
          setSelectedSkill(ball.name);

          // Vector away from pointer click
          const angle = Math.atan2(dy, dx);
          const force = (1.5 - dist / (ball.radius * 2.2)) * CLICK_KICK;
          
          ball.vx += Math.cos(angle) * force;
          ball.vy += Math.sin(angle) * force;
        }
      });

      // Spawn localized visual ripple shockwave
      clickRipples.push({
        x: inputX,
        y: inputY,
        radius: 0,
        maxRadius: clickedAnyBall ? 100 : 60,
        opacity: 0.75,
      });
    };

    const onMouseDown = (e: MouseEvent) => {
      handleActionInput(e.clientX, e.clientY);
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleActionInput(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const onMouseLeave = () => {
      mouse.active = false;
    };

    // Attach event listeners
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });

    // Resize observer synchronization
    const resizeObserver = new ResizeObserver(() => {
      initSimulation();
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("touchstart", onTouchStart);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <section id="tech-stack" className="py-24 px-6 md:px-12 bg-[#efebe4] border-b border-sand">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col xl:flex-row items-start xl:items-end justify-between gap-6 mb-16">
          <div className="max-w-4xl">
            <span className="text-xs font-mono uppercase tracking-widest text-pine-light block mb-2">
              // EXPERTISE SPHERE
            </span>
            <h2 className="text-6xl md:text-[8rem] font-oswald font-extrabold uppercase text-pine tracking-tight leading-none mb-4">
              Tech Stack
            </h2>
            <h2 className="text-6xl md:text-[8rem] font-oswald font-extrabold uppercase text-pine tracking-tight leading-none">
              &amp; Skills Radar
            </h2>
          </div>
          
          <div className="max-w-xs font-mono text-xs text-neutral-500 leading-relaxed xl:mb-2 border-l border-sand pl-4">
            CLICK OR TAP ON THE FLOATING SKILL BALLS TO INITIATE VELOCITY KICKS. WATCH THEM COLLIDE WITH PHYSICS-BASED MOMENTUM.
          </div>
        </div>

        {/* Physics Playground Arena Container */}
        <div 
          ref={containerRef}
          className="relative w-full bg-cream-light border border-sand rounded-3xl overflow-hidden shadow-xs h-[520px] select-none"
        >
          {/* Grid Background layer */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e6e0d2_1px,transparent_1px),linear-gradient(to_bottom,#e6e0d2_1px,transparent_1px)] bg-[size:4vw_4vw] opacity-15 pointer-events-none" />

          {/* Interactive HTML5 Physics Canvas */}
          <canvas 
            ref={canvasRef} 
            className="absolute inset-0 cursor-pointer block touch-none z-10"
          />

          {/* Floaters UI helper labels overlay */}
          <div className="absolute bottom-4 left-6 z-20 pointer-events-none font-mono text-[9px] text-[#9d9282] uppercase tracking-widest hidden sm:flex items-center gap-1.5 bg-white/70 backdrop-blur-xs px-3 py-1.5 rounded-full border border-sand">
            <Info className="w-3.5 h-3.5 text-pine" />
            <span>Repelling Field Active on Cursor hover</span>
          </div>

          <div className="absolute bottom-4 right-6 z-20 font-mono text-[9px] text-pine uppercase tracking-widest flex items-center gap-1.5">
            <button
              onClick={() => triggerScramble.current?.()}
              className="bg-white hover:bg-neutral-100 border border-sand px-4 py-2 rounded-full cursor-pointer flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <RefreshCw className="w-3 h-3 text-pine-light animate-spin-slow" />
              Scramble Stack
            </button>
          </div>

          {/* Active selection feedback display overlay */}
          {selectedSkill && (
            <div className="absolute top-4 left-6 z-20 bg-pine text-cream font-mono text-xs px-4 py-2 rounded-xl shadow-md border border-pine-dark flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#10be7e]" />
              <span>ACTIVE SYSTEM: <strong className="font-bold text-[#dfefe4]">{selectedSkill.toUpperCase()}</strong></span>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
