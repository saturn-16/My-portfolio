import { useEffect, useState } from "react";
import { Signature } from "./ui/Signature";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);

  // Resize listener for signature sizing
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 640;

  useEffect(() => {
    // Smooth progress bar simulation
    const duration = 2400; // 2.4 seconds loading time
    const intervalTime = 20;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          // Wait briefly, then trigger fade out
          setTimeout(() => {
            setIsFading(true);
            // Wait for fade transition, then call completion callback
            setTimeout(() => {
              onComplete();
            }, 600);
          }, 350);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      style={{
        transition: "opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1), visibility 0.6s step-end",
        opacity: isFading ? 0 : 1,
        visibility: isFading ? "hidden" : "visible",
      }}
      className="fixed inset-0 bg-[#050706] z-[9999] flex flex-col items-center justify-center select-none"
    >
      <div className="flex flex-col items-center gap-6 relative">
        {/* Signature Animation */}
        <Signature
          text="Gaurav Kumar"
          color="#f7f5f0"
          fontSize={isMobile ? 36 : 56}
          duration={1.6}
          delay={0.2}
          className="filter drop-shadow-md select-none pointer-events-none"
        />

        {/* Sleek Horizontal Progress Bar (Only show the bar, no numbers) */}
        <div className="w-48 sm:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
          <div
            style={{
              width: `${progress}%`,
              transition: "width 0.05s linear",
            }}
            className="h-full bg-gradient-to-r from-[#10be7e] to-[#4ade80] rounded-full shadow-[0_0_8px_rgba(16,190,126,0.5)]"
          />
        </div>
      </div>
    </div>
  );
}
