import React, { useState } from "react";
import { Play, Pause, Volume2, VolumeX, Shield, Swords, Target, Gamepad2, Layers, Cpu, Award } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Clip {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  badge: string;
  weapon: string;
  rank: string;
}

export default function OffDutySection() {
  const [activeMode, setActiveMode] = useState<"competitive" | "personal">("competitive");
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [mutedVideos, setMutedVideos] = useState<Record<string, boolean>>({
    clip1: true,
    clip2: true,
  });

  const clipsData: Clip[] = [
    {
      id: "clip1",
      title: "Tactical Retake & Vandal 4K",
      description: "Matchpoint defense clutch on Haven C Site. Calibrated aiming and instant spray transfer to secure the round.",
      videoUrl: "/ace 1.mp4",
      badge: "Clutch Play",
      weapon: "Vandal",
      rank: "Ascendant Lobby",
    },
    {
      id: "clip2",
      title: "B-Site Entry Denial Ace",
      description: "Aggressive entry denial and site control using utility and precise tap-firing under extreme pressure.",
      videoUrl: "/ace 2.mp4",
      badge: "Ace / Match Highlights",
      weapon: "Vandal / Sheriff",
      rank: "Immortal Matchup",
    }
  ];

  const toggleMute = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMutedVideos((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleVideoClick = (id: string) => {
    const videoElement = document.getElementById(`video-player-${id}`) as HTMLVideoElement;
    if (videoElement) {
      if (playingVideoId === id) {
        videoElement.pause();
        setPlayingVideoId(null);
      } else {
        // Pause other running video if any
        if (playingVideoId) {
          const otherVideo = document.getElementById(`video-player-${playingVideoId}`) as HTMLVideoElement;
          if (otherVideo) otherVideo.pause();
        }
        videoElement.play();
        setPlayingVideoId(id);
      }
    }
  };

  const tags = [
    "Valorant",
    "Competitive Gaming",
    "Team Strategy",
    "Clutch Plays",
    "Game Sense",
    "Communication"
  ];

  return (
    <section id="off-duty" className="py-24 px-6 md:px-12 bg-sand border-b border-sand overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Intro heading */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 relative z-10">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#9d9282] block mb-2">// HOBBY MATRIX</span>
            <h3 className="text-5xl md:text-7xl font-oswald font-extrabold uppercase text-pine tracking-tight leading-none">
              Off Duty
            </h3>
          </div>
        </div>

        {/* Outer Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">
          
          {/* Tactical Profile Details (Left Panel: 5 Columns) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-white border border-sand rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xs h-full relative overflow-hidden">
              
              {/* Tactical console bg glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

              <div>
                {/* Console Toggle Interface */}
                <div className="flex items-center justify-between border-b border-sand pb-4 mb-6">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#9d9282]">
                    // MISSION DIRECTIVE
                  </span>
                  
                  {/* Digital Switch */}
                  <div className="bg-neutral-100 p-0.75 rounded-lg border border-sand flex items-center gap-1">
                    <button
                      onClick={() => setActiveMode("competitive")}
                      className={`px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider rounded-md transition-all cursor-pointer ${
                        activeMode === "competitive"
                          ? "bg-pine text-cream-light font-bold shadow-xs"
                          : "text-neutral-500 hover:text-pine"
                      }`}
                    >
                      Tactical
                    </button>
                    <button
                      onClick={() => setActiveMode("personal")}
                      className={`px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider rounded-md transition-all cursor-pointer ${
                        activeMode === "personal"
                          ? "bg-pine text-cream-light font-bold shadow-xs"
                          : "text-neutral-500 hover:text-pine"
                      }`}
                    >
                      Personal
                    </button>
                  </div>
                </div>

                {/* Animated content region */}
                <AnimatePresence mode="wait">
                  {activeMode === "competitive" ? (
                    <motion.div
                      key="competitive-mode"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-rose-50 border border-rose-100 text-rose-600 rounded text-[9px] font-mono uppercase font-bold mb-3">
                          <Swords className="w-3 h-3" /> Competitive Mode
                        </div>
                        <h4 className="text-3xl font-oswald text-pine font-extrabold uppercase leading-none tracking-wider mb-4">
                          Competitive Mode.
                        </h4>
                        <p className="font-mono text-xs text-neutral-600 leading-relaxed">
                          Beyond cybersecurity and software development, I enjoy competitive gaming as a way to sharpen decision-making, communication, and strategic thinking. Valorant is where I challenge myself under pressure, adapt quickly to changing situations, and continuously improve through practice and analysis.
                        </p>
                        <p className="font-mono text-xs text-neutral-600 leading-relaxed mt-4">
                          Many of the skills that drive my technical work—problem solving, pattern recognition, and maintaining focus under pressure—also translate directly into competitive gameplay.
                        </p>
                      </div>

                      {/* Status Panel (Bottom Box) */}
                      <div className="p-5 bg-gradient-to-br from-neutral-50 to-neutral-100 border border-sand rounded-2xl font-mono text-[11px] space-y-2.5 text-neutral-700">
                        <p className="font-bold text-pine uppercase text-[9px] tracking-wider border-b border-sand pb-1.5 flex items-center gap-1.5">
                          <Cpu className="w-3.5 h-3.5 text-pine-light" /> TACTICAL TELEMETRY
                        </p>
                        <div className="flex items-center gap-2 text-emerald-700 font-medium">
                          <span className="text-emerald-500 font-bold">✓</span> Tactical Awareness: Active
                        </div>
                        <div className="flex items-center gap-2 text-emerald-700 font-medium">
                          <span className="text-emerald-500 font-bold">✓</span> Strategic Decision Making: Verified
                        </div>
                        <div className="flex items-center gap-2 text-emerald-700 font-medium">
                          <span className="text-emerald-500 font-bold">✓</span> Continuous Improvement: Running
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="personal-mode"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-pine/5 border border-pine/10 text-pine rounded text-[9px] font-mono uppercase font-bold mb-3">
                          <Target className="w-3 h-3" /> Creative Focus
                        </div>
                        <h4 className="text-3xl font-oswald text-pine font-extrabold uppercase leading-none tracking-wider mb-4">
                          Beyond The Code.
                        </h4>
                        <p className="font-mono text-xs text-neutral-600 leading-relaxed">
                          When I&apos;m not building AI systems or exploring cybersecurity, you&apos;ll probably find me in a Valorant match. I enjoy the challenge of competitive gameplay, the need for quick decisions, and the teamwork required to win difficult rounds. It&apos;s a hobby that keeps me engaged, competitive, and constantly learning.
                        </p>
                        <p className="font-mono text-xs text-neutral-600 leading-relaxed mt-4">
                          Gaming represents more than a pastime—it is a training sandbox for reactive response, team orchestration, and visual threat scanning under high stake scenarios.
                        </p>
                      </div>

                      {/* Status Panel (Bottom Box) */}
                      <div className="p-5 bg-gradient-to-br from-neutral-50 to-neutral-100 border border-sand rounded-2xl font-mono text-[11px] space-y-2.5 text-neutral-700">
                        <p className="font-bold text-pine uppercase text-[9px] tracking-wider border-b border-sand pb-1.5 flex items-center gap-1.5">
                          <Shield className="w-3.5 h-3.5 text-pine-light" /> CALIBRATION PROTOCOLS
                        </p>
                        <div className="flex items-center gap-2 text-emerald-700 font-medium">
                          <span className="text-emerald-500 font-bold">✓</span> Aim Calibration: Complete
                        </div>
                        <div className="flex items-center gap-2 text-emerald-700 font-medium">
                          <span className="text-emerald-500 font-bold">✓</span> Clutch Protocol: Active
                        </div>
                        <div className="flex items-center gap-2 text-emerald-700 font-medium">
                          <span className="text-emerald-500 font-bold">✓</span> Rank Progression: Ongoing
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Tags Cloud */}
              <div className="mt-8 pt-6 border-t border-sand">
                <span className="text-[9px] font-mono uppercase text-[#9d9282] tracking-wider block mb-3">// TACTICAL ATTRIBUTES</span>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-[9px] font-mono font-medium text-pine bg-neutral-100 hover:bg-pine/5 border border-sand rounded transition-all select-none"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Videos Grid (Right Panel: 7 Columns) */}
          <div className="lg:col-span-7 bg-[#dfd9cb]/50 border border-[#d6cfbe] rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xs">
            <div>
              {/* Header inside Panel */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Gamepad2 className="w-4 h-4 text-pine" />
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-pine">// MATCH ARCHIVES</span>
                </div>
                <div className="flex items-center gap-1 bg-red-600 text-white px-2 py-0.5 text-[8px] font-mono font-bold rounded tracking-wider uppercase animate-pulse">
                  ● LIVE FEED
                </div>
              </div>

              <p className="font-mono text-xs text-neutral-600 leading-relaxed mb-8">
                A collection of some of my favorite plays, clutch moments, and highlights captured during competitive matches.
              </p>

              {/* Videos Vertical Stack */}
              <div className="flex flex-col gap-6">
                {clipsData.map((clip) => {
                  const isPlaying = playingVideoId === clip.id;
                  const isMuted = mutedVideos[clip.id];

                  return (
                    <div
                      key={clip.id}
                      onClick={() => handleVideoClick(clip.id)}
                      className="group relative aspect-video rounded-2xl overflow-hidden bg-black border border-sand hover:border-pine-light/40 shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer"
                    >
                      <video
                        id={`video-player-${clip.id}`}
                        src={clip.videoUrl}
                        loop
                        muted={isMuted}
                        playsInline
                        className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-all duration-700 ease-out group-hover:scale-108"
                      />

                      {/* Styled Video Player Custom Controls HUD */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none flex flex-col justify-between p-4">
                        {/* Empty top spacer */}
                        <div />

                        {/* Center Play Icon Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className={`p-3.5 bg-pine-dark/85 backdrop-blur-xs border border-pine-light/35 rounded-full text-cream shadow-lg group-hover:bg-[#ff4655] group-hover:text-white transition-all duration-300 ${isPlaying ? "opacity-0 scale-90" : "opacity-100 scale-100 group-hover:scale-110"}`}>
                            {isPlaying ? <Pause className="w-5.5 h-5.5 fill-cream" /> : <Play className="w-5.5 h-5.5 fill-cream" />}
                          </div>
                        </div>

                        {/* Bottom Row HUD details */}
                        <div className="flex items-end justify-end w-full">
                          {/* Mute button */}
                          <button
                            onClick={(e) => toggleMute(clip.id, e)}
                            className="p-2 bg-black/65 hover:bg-[#ff4655] rounded-md text-white transition-colors cursor-pointer pointer-events-auto shadow-sm"
                            title={isMuted ? "Unmute Sound" : "Mute Sound"}
                          >
                            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Simulated Valorant Scanline VFX overlay */}
                      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.12)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[size:100%_4px,3px_100%] opacity-40" />
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Bottom info banner */}
            <div className="border-t border-[#d6cfbe] pt-4 mt-6 flex items-center justify-between font-mono text-[9px] text-neutral-500">
              <span className="flex items-center gap-1"><Layers className="w-3 h-3 text-pine" /> RENDER: 1080P // 60FPS</span>
              <span>VALORANT SYSTEM CLIPS PROTOCOL</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
