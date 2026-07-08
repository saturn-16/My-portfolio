import { useRef, useEffect, useState } from "react";
import { Sparkles, Info, RefreshCw } from "lucide-react";

interface SkillBall {
  x: number;
  y: number;
  z: number; // 3D Depth coordinate (-100 to 100)
  vx: number;
  vy: number;
  vz: number; // 3D Depth velocity
  radius: number;
  angle: number; // Rotational angle (in radians)
  angleVelocity: number; // Angular velocity (spin rate)
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
  { name: "AWS", logo: "https://unpkg.com/simple-icons@11.0.0/icons/amazonwebservices.svg" },
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "Hugging Face", logo: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f917.svg" },
  { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "SQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "Oracle", logo: "https://unpkg.com/simple-icons@11.0.0/icons/oracle.svg" }
];

export default function TechStackSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  // Trigger manual scramble
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

    // Volumetric 3D Physics parameters
    const RESTITUTION = 0.85;      // Bounciness index
    const FRICTION = 0.990;         // Glide/drag dampener
    const SPIN_FRICTION = 0.975;    // Spin slowing rate
    const HOVER_DIST = 130;         // Repelling field reach
    const HOVER_PUSH = 0.50;        // Repelling force factor
    const CLICK_KICK = 22.0;        // Tap shockwave impulse push
    const CLICK_SPIN = 0.35;        // Rotational impulse rate (radians/frame)
    const DEPTH_LIMIT = 80;         // Z-axis aquarium boundaries

    // Pre-cache logo visual elements
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
      const height = 480;
      
      canvas.width = width;
      canvas.height = height;

      // Base radius scaled to screen width
      const baseRadius = width < 640 ? 36 : 44;
      balls = [];

      // Clean grid spacing to prevent overlaps on startup
      const margin = baseRadius * 2.2;
      const cols = Math.max(2, Math.floor((width - margin) / (baseRadius * 2.4)));
      
      preloadedSkills.forEach((skill, idx) => {
        const col = idx % cols;
        const row = Math.floor(idx / cols);

        const gridX = margin + col * (baseRadius * 2.4) + (Math.random() - 0.5) * 20;
        const gridY = margin + row * (baseRadius * 2.4) + (Math.random() - 0.5) * 20;
        const initialZ = (Math.random() - 0.5) * (DEPTH_LIMIT * 1.5); // Random 3D starting depth

        balls.push({
          x: Math.max(baseRadius, Math.min(width - baseRadius, gridX)),
          y: Math.max(baseRadius, Math.min(height - baseRadius, gridY)),
          z: initialZ,
          vx: (Math.random() - 0.5) * 7.0,
          vy: (Math.random() - 0.5) * 7.0,
          vz: (Math.random() - 0.5) * 2.5,
          radius: baseRadius,
          angle: Math.random() * Math.PI * 2, // Random initial rotation
          angleVelocity: (Math.random() - 0.5) * 0.02, // Gentle start spin
          name: skill.name,
          logoUrl: skill.logo,
          imageElement: skill.imageElement,
          mass: baseRadius,
        });
      });
    };

    let lastWidth = container.clientWidth;
    initSimulation();

    // Trigger full physical scrambling + spins
    triggerScramble.current = () => {
      balls.forEach((ball) => {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 10 + 8;
        ball.vx = Math.cos(angle) * speed;
        ball.vy = Math.sin(angle) * speed;
        ball.vz = (Math.random() - 0.5) * 6;
        ball.angleVelocity = (Math.random() - 0.5) * CLICK_SPIN * 2.0; // Scramble spins!
      });
      clickRipples.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 0,
        maxRadius: Math.max(canvas.width, canvas.height) * 0.5,
        opacity: 0.8
      });
    };

    // Elastic 3D-aware momentum collision solver
    const resolveCollision = (b1: SkillBall, b2: SkillBall) => {
      // Calculate 3D distances
      const dx = b2.x - b1.x;
      const dy = b2.y - b1.y;
      
      // Z-depth distance factor (scaled slightly so they cross over in front of/behind each other easily, 
      // but still collide if they occupy similar depths!)
      const dz = (b2.z - b1.z) * 0.45; 
      
      const dist3D = Math.sqrt(dx * dx + dy * dy + dz * dz);
      
      // Scale radius by Z depth (parallax sizing)
      const scale1 = 1.0 + (b1.z / 350);
      const scale2 = 1.0 + (b2.z / 350);
      const r1 = b1.radius * scale1;
      const r2 = b2.radius * scale2;
      const minDist = r1 + r2;

      // If they collide in 3D space:
      if (dist3D < minDist) {
        const overlap = minDist - dist3D;
        
        // Unit normal vector components in 3D
        const nx = dx / (dist3D || 1);
        const ny = dy / (dist3D || 1);
        const nz = dz / (dist3D || 1);

        // Separate overlaps in 3D space to prevent sticking
        const pushCoeff = 0.51;
        b1.x -= nx * overlap * pushCoeff;
        b1.y -= ny * overlap * pushCoeff;
        b1.z -= nz * overlap * pushCoeff * 2; // Extra Z kick to separate depths
        b2.x += nx * overlap * pushCoeff;
        b2.y += ny * overlap * pushCoeff;
        b2.z += nz * overlap * pushCoeff * 2;

        // Relative velocity vector along collision axis
        const rvx = b2.vx - b1.vx;
        const rvy = b2.vy - b1.vy;
        const rvz = b2.vz - b1.vz;
        const velAlongNormal = rvx * nx + rvy * ny + rvz * nz;

        // Bouncing forces
        if (velAlongNormal < 0) {
          const impulseScalar = -(1.0 + RESTITUTION) * velAlongNormal / 2;
          
          b1.vx -= impulseScalar * nx;
          b1.vy -= impulseScalar * ny;
          b1.vz -= impulseScalar * nz;
          b2.vx += impulseScalar * nx;
          b2.vy += impulseScalar * ny;
          b2.vz += impulseScalar * nz;

          // Introduce friction-based rotation (rolling when they bump!)
          const spinKick = (b1.vx * b2.vy - b1.vy * b2.vx) * 0.005;
          b1.angleVelocity += spinKick;
          b2.angleVelocity -= spinKick;
        }
      }
    };

    // Physics Animation Loop
    let time = 0;
    const tick = () => {
      time++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Render background ripples
      clickRipples = clickRipples.filter((ripple) => {
        ripple.radius += 5.5;
        ripple.opacity -= 0.025;

        ctx.strokeStyle = `rgba(13, 92, 69, ${ripple.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.stroke();

        return ripple.opacity > 0 && ripple.radius < ripple.maxRadius;
      });

      // 2. Volumetric 3D updates
      balls.forEach((ball) => {
        // Soft volumetric Brownian floating sway (keeps them floating and moving back/forth along Z axis)
        ball.vx += Math.sin(time * 0.018 + ball.y * 0.01) * 0.05;
        ball.vy += Math.cos(time * 0.018 + ball.x * 0.01) * 0.05;
        ball.vz += Math.sin(time * 0.012 + ball.x * 0.005) * 0.04;

        // Soft cursor repelling field (applies pushing vectors)
        if (mouse.active) {
          const mdx = ball.x - mouse.x;
          const mdy = ball.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mdist < HOVER_DIST && mdist > 0) {
            const pushForce = (HOVER_DIST - mdist) * HOVER_PUSH * 0.035;
            ball.vx += (mdx / mdist) * pushForce;
            ball.vy += (mdy / mdist) * pushForce;
            // Hover adds subtle rotational rolling
            ball.angleVelocity += (mdx * ball.vy - mdy * ball.vx) * 0.0001;
          }
        }

        // Apply friction drag & angular spin damping
        ball.vx *= FRICTION;
        ball.vy *= FRICTION;
        ball.vz *= FRICTION;
        ball.angleVelocity *= SPIN_FRICTION;

        // Integrate positions & rotation angle
        ball.x += ball.vx;
        ball.y += ball.vy;
        ball.z += ball.vz;
        ball.angle += ball.angleVelocity;

        // Boundaries checks in X, Y
        const scale = 1.0 + (ball.z / 350); // parallax sizing factor
        const effRadius = ball.radius * scale;

        const bounceDampen = RESTITUTION;
        if (ball.x - effRadius < 0) {
          ball.x = effRadius;
          ball.vx = -ball.vx * bounceDampen;
          ball.angleVelocity += ball.vy * 0.01; // roll along the wall!
        } else if (ball.x + effRadius > canvas.width) {
          ball.x = canvas.width - effRadius;
          ball.vx = -ball.vx * bounceDampen;
          ball.angleVelocity -= ball.vy * 0.01;
        }

        if (ball.y - effRadius < 0) {
          ball.y = effRadius;
          ball.vy = -ball.vy * bounceDampen;
          ball.angleVelocity -= ball.vx * 0.01;
        } else if (ball.y + effRadius > canvas.height) {
          ball.y = canvas.height - effRadius;
          ball.vy = -ball.vy * bounceDampen;
          ball.angleVelocity += ball.vx * 0.01;
        }

        // Z-axis boundaries aquarium depth rebounds (back & front glass)
        if (ball.z < -DEPTH_LIMIT) {
          ball.z = -DEPTH_LIMIT;
          ball.vz = -ball.vz * bounceDampen;
        } else if (ball.z > DEPTH_LIMIT) {
          ball.z = DEPTH_LIMIT;
          ball.vz = -ball.vz * bounceDampen;
        }
      });

      // 3. Resolve all mutual circle collisions
      for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
          resolveCollision(balls[i], balls[j]);
        }
      }

      // 4. SORT BY Z-COORDINATE BEFORE RENDERING (Perfect 3D Parallax Layering!)
      // Balls with lesser Z (in the back) are drawn first, and balls with greater Z (in the front) are drawn on top.
      const renderedBalls = [...balls].sort((a, b) => a.z - b.z);

      // 5. Draw 3D glossy spheres with rotating logos
      renderedBalls.forEach((ball) => {
        const scale = 1.0 + (ball.z / 350); // sizing ranges from 0.7 to 1.3
        const r = ball.radius * scale;

        ctx.save();

        // 3D Shadow scale (deeper foreground balls have softer, larger shadows)
        ctx.shadowColor = "rgba(4, 37, 27, 0.15)";
        ctx.shadowBlur = 10 * scale;
        ctx.shadowOffsetX = 1 * scale;
        ctx.shadowOffsetY = 6 * scale;

        // Volumetric Radial Gradient for 3D sphere depth
        const sphereGrad = ctx.createRadialGradient(
          ball.x - r * 0.3,
          ball.y - r * 0.3,
          r * 0.05,
          ball.x,
          ball.y,
          r
        );
        sphereGrad.addColorStop(0, "#ffffff");      // Specular highlight spot
        sphereGrad.addColorStop(0.35, "#f7f6f3");    // Soft body base
        sphereGrad.addColorStop(0.85, "#dcd8cf");    // Volumetric shadow contour
        sphereGrad.addColorStop(1, "#b3ad9e");       // Deep ambient bottom rim

        ctx.fillStyle = sphereGrad;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Soft outer outline ring
        ctx.strokeStyle = "rgba(7, 58, 43, 0.10)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, r, 0, Math.PI * 2);
        ctx.stroke();

        // Render centered brand logo (always upright)
        const logoSize = r * 1.05;
        if (ball.imageElement.complete && ball.imageElement.naturalWidth > 0) {
          ctx.save();
          // Clip drawing area to keep the logo cleanly circular
          ctx.beginPath();
          ctx.arc(ball.x, ball.y, r * 0.9, 0, Math.PI * 2);
          ctx.clip();
          
          ctx.drawImage(
            ball.imageElement,
            ball.x - logoSize / 2,
            ball.y - logoSize / 2,
            logoSize,
            logoSize
          );
          ctx.restore();
        } else {
          ctx.save();
          ctx.fillStyle = "#073a2b";
          ctx.font = `bold ${Math.round(10 * scale)}px JetBrains Mono`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(ball.name.slice(0, 5), ball.x, ball.y);
          ctx.restore();
        }

        // Glass reflection overlay
        ctx.save();
        const shineGrad = ctx.createLinearGradient(
          ball.x - r,
          ball.y - r,
          ball.x,
          ball.y
        );
        shineGrad.addColorStop(0, "rgba(255, 255, 255, 0.5)");
        shineGrad.addColorStop(0.4, "rgba(255, 255, 255, 0.05)");
        shineGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = shineGrad;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, r, 0, Math.PI * 2);
        ctx.fill();

        // Volumetric specular dot
        ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
        ctx.beginPath();
        ctx.arc(ball.x - r * 0.45, ball.y - r * 0.45, r * 0.12, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    // Handle clicks/touches on 3D layers
    const handleActionInput = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const inputX = clientX - rect.left;
      const inputY = clientY - rect.top;

      let clickedAnyBall = false;

      // Sort by Z descending so we check foreground balls first (proper 3D raycasting!)
      const clickOrderBalls = [...balls].sort((a, b) => b.z - a.z);

      for (let i = 0; i < clickOrderBalls.length; i++) {
        const ball = clickOrderBalls[i];
        const scale = 1.0 + (ball.z / 350);
        const r = ball.radius * scale;

        const dx = ball.x - inputX;
        const dy = ball.y - inputY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Click target hit margin scaled by depth size
        if (dist < r * 1.8) {
          clickedAnyBall = true;
          setSelectedSkill(ball.name);

          // Impulse vector away from cursor click
          const angle = Math.atan2(dy, dx);
          const force = (1.5 - dist / (r * 1.8)) * CLICK_KICK;
          
          // Apply velocity impulses
          ball.vx += Math.cos(angle) * force;
          ball.vy += Math.sin(angle) * force;
          ball.vz += (Math.random() - 0.5) * 5; // Impulse pushes depth too!
          
          // Apply rotational spin kick!
          ball.angleVelocity += (Math.random() - 0.5) * CLICK_SPIN;
          break; // Click only the topmost foreground ball
        }
      }

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

    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });

    // ResizeObserver debouncer synchronization
    const resizeObserver = new ResizeObserver(() => {
      const width = container.clientWidth;
      if (width !== lastWidth) {
        lastWidth = width;
        initSimulation();
      }
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
        </div>

        {/* Physics Playground Arena Container (No white border, transparent background) */}
        <div 
          ref={containerRef}
          className="relative w-full h-[480px] select-none overflow-hidden"
        >
          {/* Subtle Grid Background layer to match page background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#dfd9cb_1px,transparent_1px),linear-gradient(to_bottom,#dfd9cb_1px,transparent_1px)] bg-[size:50px_50px] opacity-25 pointer-events-none" />

          {/* Interactive HTML5 Physics Canvas */}
          <canvas 
            ref={canvasRef} 
            className="absolute inset-0 cursor-pointer block touch-none z-10"
          />



          <div className="absolute bottom-4 right-6 z-20 font-mono text-[9px] text-pine uppercase tracking-widest flex items-center gap-1.5">
            <button
              onClick={() => triggerScramble.current?.()}
              className="bg-[#efebe4]/90 hover:bg-[#dfd9cb] border border-[#dfd9cb] px-4 py-2 rounded-full cursor-pointer flex items-center gap-1.5 transition-colors shadow-xs"
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
