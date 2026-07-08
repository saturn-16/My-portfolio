import { useEffect, useRef, useState } from "react";
import { Send, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  sender: "bot" | "user";
  text: string;
  timestamp: Date;
}

// ----------------------------------------------------
// PIXEL CAT RENDERER (Enlarged to 100px and rounder)
// ----------------------------------------------------
interface PixelCatProps {
  state: "sleeping" | "sitting" | "walking";
  direction: "left" | "right";
  frame: number;
}

function PixelCat({ state, direction, frame }: PixelCatProps) {
  const style = {
    transform: direction === "left" ? "scaleX(-1)" : "scaleX(1)",
    transition: "transform 0.15s ease",
  };

  if (state === "sleeping") {
    return (
      <svg width="100" height="100" viewBox="0 0 100 100" style={style} className="overflow-visible select-none">
        <style>{`
          .sleep-breath {
            animation: breath 1.8s ease-in-out infinite;
            transform-origin: 50px 65px;
          }
          .sleep-tail {
            animation: swish 2.5s ease-in-out infinite alternate;
            transform-origin: 30px 65px;
          }
          @keyframes breath {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.04, 0.96); }
          }
          @keyframes swish {
            0% { transform: rotate(-5deg); }
            100% { transform: rotate(10deg); }
          }
        `}</style>
        
        {/* Tail wrapped around, swishing */}
        <path className="sleep-tail" d="M 28 68 C 15 65, 12 45, 16 35 C 18 30, 22 30, 20 35 C 17 42, 20 58, 30 63" fill="none" stroke="#ea580c" strokeWidth="6" strokeLinecap="round" />
        <path className="sleep-tail" d="M 28 68 C 15 65, 12 45, 16 35 C 18 30, 22 30, 20 35 C 17 42, 20 58, 30 63" fill="none" stroke="#7c2d12" strokeWidth="2" strokeLinecap="round" style={{ strokeDasharray: "25 100" }} />
        
        {/* Curled chubby body */}
        <g className="sleep-breath">
          <path d="M 25 65 C 20 45, 80 45, 75 65 C 70 80, 30 80, 25 65 Z" fill="#ea580c" stroke="#7c2d12" strokeWidth="2.5" />
          <path d="M 35 62 C 32 50, 68 50, 65 62" fill="#fef3c7" opacity="0.9" /> {/* Cream belly patch */}
        </g>
        
        {/* Head resting on the right side */}
        <circle cx="70" cy="52" r="15" fill="#f97316" stroke="#7c2d12" strokeWidth="2.5" />
        
        {/* Cute Pointy Ears */}
        <path d="M 58 45 L 54 28 L 66 40 Z" fill="#ea580c" stroke="#7c2d12" strokeWidth="2" strokeLinejoin="round" />
        <path d="M 59 43 L 57 32 L 64 39 Z" fill="#fecdd3" />
        
        <path d="M 72 40 L 82 28 L 78 45 Z" fill="#ea580c" stroke="#7c2d12" strokeWidth="2" strokeLinejoin="round" />
        <path d="M 73 42 L 79 32 L 77 43 Z" fill="#fecdd3" />

        {/* Sleeping eyes */}
        <path d="M 62 52 Q 65 55 68 52" fill="none" stroke="#7c2d12" strokeWidth="2" strokeLinecap="round" />
        <path d="M 72 52 Q 75 55 78 52" fill="none" stroke="#7c2d12" strokeWidth="2" strokeLinecap="round" />
        
        {/* Nose & Mouth */}
        <polygon points="70,55 68,54 72,54" fill="#fda4af" />
        <path d="M 68 57 Q 70 59 72 57" fill="none" stroke="#7c2d12" strokeWidth="1.5" strokeLinecap="round" />
        
        {/* Blush cheeks */}
        <ellipse cx="61" cy="56" rx="2" ry="1.2" fill="#fda4af" opacity="0.7" />
        <ellipse cx="79" cy="56" rx="2" ry="1.2" fill="#fda4af" opacity="0.7" />
      </svg>
    );
  }

  if (state === "sitting") {
    return (
      <svg width="100" height="100" viewBox="0 0 100 100" style={style} className="overflow-visible select-none">
        <style>{`
          .sit-tail-anim {
            animation: tail-wag-sit 2.5s ease-in-out infinite alternate;
            transform-origin: 35px 80px;
          }
          @keyframes tail-wag-sit {
            0% { transform: rotate(-5deg); }
            100% { transform: rotate(15deg); }
          }
        `}</style>
        
        {/* Tail */}
        <path className="sit-tail-anim" d="M 35 80 C 20 78, 12 60, 16 48 C 18 43, 22 43, 20 48 C 17 58, 22 72, 33 76" fill="none" stroke="#ea580c" strokeWidth="6" strokeLinecap="round" />
        
        {/* Chubby sitting body */}
        <path d="M 35 85 C 32 60, 68 60, 65 85 Z" fill="#ea580c" stroke="#7c2d12" strokeWidth="2.5" />
        <path d="M 42 85 C 40 70, 60 70, 58 85 Z" fill="#fef3c7" /> {/* Chest patch */}

        {/* Paws */}
        <ellipse cx="44" cy="86" rx="5" ry="3" fill="#fef3c7" stroke="#7c2d12" strokeWidth="2" />
        <ellipse cx="56" cy="86" rx="5" ry="3" fill="#fef3c7" stroke="#7c2d12" strokeWidth="2" />

        {/* Round Head */}
        <circle cx="50" cy="46" r="18" fill="#f97316" stroke="#7c2d12" strokeWidth="2.5" />

        {/* Ears */}
        <path d="M 34 38 L 26 18 L 42 30 Z" fill="#ea580c" stroke="#7c2d12" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M 35 36 L 29 22 L 40 29 Z" fill="#fecdd3" />
        
        <path d="M 66 38 L 74 18 L 58 30 Z" fill="#ea580c" stroke="#7c2d12" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M 65 36 L 71 22 L 60 29 Z" fill="#fecdd3" />

        {/* Big Green Eyes */}
        <circle cx="43" cy="44" r="3.5" fill="#10b981" stroke="#7c2d12" strokeWidth="1.5" />
        <circle cx="43.5" cy="42.5" r="1" fill="white" />
        
        <circle cx="57" cy="44" r="3.5" fill="#10b981" stroke="#7c2d12" strokeWidth="1.5" />
        <circle cx="57.5" cy="42.5" r="1" fill="white" />

        {/* Cheeks blush */}
        <ellipse cx="38" cy="49" rx="3.5" ry="2" fill="#fda4af" opacity="0.7" />
        <ellipse cx="62" cy="49" rx="3.5" ry="2" fill="#fda4af" opacity="0.7" />

        {/* Whiskers */}
        <line x1="28" y1="48" x2="16" y2="46" stroke="#7c2d12" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="28" y1="51" x2="15" y2="52" stroke="#7c2d12" strokeWidth="1.5" strokeLinecap="round" />
        
        <line x1="72" y1="48" x2="84" y2="46" stroke="#7c2d12" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="72" y1="51" x2="85" y2="52" stroke="#7c2d12" strokeWidth="1.5" strokeLinecap="round" />

        {/* Snout */}
        <polygon points="50,49 48,48 52,48" fill="#fecdd3" />
        <path d="M 48 51 Q 50 53 52 51" fill="none" stroke="#7c2d12" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  // walking state
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" style={style} className="overflow-visible select-none">
      <style>{`
        .walk-tail-anim {
          animation: tail-wag-walk 0.3s ease-in-out infinite alternate;
          transform-origin: 30px 55px;
        }
        @keyframes tail-wag-walk {
          0% { transform: rotate(-5deg); }
          100% { transform: rotate(15deg); }
        }
      `}</style>
      
      {/* Tail */}
      <path className="walk-tail-anim" d="M 30 55 C 15 52, 10 32, 15 20 C 17 15, 21 15, 19 20 C 16 30, 20 45, 28 50" fill="none" stroke="#ea580c" strokeWidth="6" strokeLinecap="round" />

      {/* Chubby Walking Body */}
      <path d="M 28 60 C 24 40, 76 40, 72 60 Z" fill="#ea580c" stroke="#7c2d12" strokeWidth="2.5" />
      <path d="M 38 60 C 35 48, 65 48, 62 60" fill="#fef3c7" opacity="0.9" /> {/* Belly patch */}

      {/* Round Head */}
      <circle cx="70" cy="42" r="16" fill="#f97316" stroke="#7c2d12" strokeWidth="2.5" />
      
      {/* Ears */}
      <path d="M 56 36 L 50 18 L 63 29 Z" fill="#ea580c" stroke="#7c2d12" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M 57 34 L 52 22 L 61 28 Z" fill="#fecdd3" />
      
      <path d="M 84 36 L 90 18 L 77 29 Z" fill="#ea580c" stroke="#7c2d12" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M 83 34 L 88 22 L 79 28 Z" fill="#fecdd3" />

      {/* Big Green Eyes */}
      <circle cx="64" cy="40" r="3.2" fill="#10b981" stroke="#7c2d12" strokeWidth="1.5" />
      <circle cx="64.5" cy="38.5" r="0.8" fill="white" />
      
      <circle cx="76" cy="40" r="3.2" fill="#10b981" stroke="#7c2d12" strokeWidth="1.5" />
      <circle cx="76.5" cy="38.5" r="0.8" fill="white" />

      {/* Blush cheeks */}
      <ellipse cx="59" cy="45" rx="2.5" ry="1.5" fill="#fda4af" opacity="0.7" />
      <ellipse cx="81" cy="45" rx="2.5" ry="1.5" fill="#fda4af" opacity="0.7" />

      {/* Snout */}
      <polygon points="70,44 68,43 72,43" fill="#fecdd3" />
      <path d="M 68 46 Q 70 48 72 46" fill="none" stroke="#7c2d12" strokeWidth="1.5" strokeLinecap="round" />

      {/* Whiskers */}
      <line x1="52" y1="44" x2="42" y2="43" stroke="#7c2d12" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="52" y1="47" x2="41" y2="48" stroke="#7c2d12" strokeWidth="1.5" strokeLinecap="round" />
      
      <line x1="88" y1="44" x2="98" y2="43" stroke="#7c2d12" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="88" y1="47" x2="99" y2="48" stroke="#7c2d12" strokeWidth="1.5" strokeLinecap="round" />

      {/* Walking leg cycle */}
      {frame === 0 ? (
        <>
          {/* Leg 1 */}
          <ellipse cx="38" cy="62" rx="4" ry="7" fill="#ea580c" stroke="#7c2d12" strokeWidth="2.5" />
          {/* Leg 2 */}
          <ellipse cx="48" cy="62" rx="4" ry="5" fill="#7c2d12" stroke="#7c2d12" strokeWidth="2" />
          {/* Leg 3 */}
          <ellipse cx="58" cy="62" rx="4" ry="7" fill="#ea580c" stroke="#7c2d12" strokeWidth="2.5" />
          {/* Leg 4 */}
          <ellipse cx="68" cy="62" rx="4" ry="5" fill="#7c2d12" stroke="#7c2d12" strokeWidth="2" />
        </>
      ) : (
        <>
          {/* Leg 1 alternated */}
          <ellipse cx="40" cy="62" rx="4" ry="5" fill="#7c2d12" stroke="#7c2d12" strokeWidth="2" />
          {/* Leg 2 alternated */}
          <ellipse cx="46" cy="62" rx="4" ry="7" fill="#ea580c" stroke="#7c2d12" strokeWidth="2.5" />
          {/* Leg 3 alternated */}
          <ellipse cx="60" cy="62" rx="4" ry="5" fill="#7c2d12" stroke="#7c2d12" strokeWidth="2" />
          {/* Leg 4 alternated */}
          <ellipse cx="66" cy="62" rx="4" ry="7" fill="#ea580c" stroke="#7c2d12" strokeWidth="2.5" />
        </>
      )}
    </svg>
  );
}

// ----------------------------------------------------
// CHATBOT DIALOG ENGINE (Custom fed data with Cat Attitude)
// ----------------------------------------------------
function getBotResponse(query: string): string {
  const q = query.toLowerCase().trim();

  // 1. Who are you?
  if (/who are you|your name/i.test(q)) {
    return "😸 *yawn* I'm just Pixel, his helper cat. But here is the frank truth about Gaurav:\n\n\"Hey! I'm Gaurav 👋\n\nI'm a Computer Science student who enjoys building things with code. Most of the time you'll find me working on AI, cybersecurity, web development, or randomly rebuilding my portfolio for the 100th time.\n\nI love turning weird ideas into projects, learning new tech, and occasionally breaking things while trying to fix other things.\"";
  }

  // 2. Tell me about yourself
  if (/tell me about yourself|about yourself|about him|about you/i.test(q)) {
    return "🐾 Fine, let me tell you about him:\n\n\"I'm Gaurav Kumar, a CSE student specializing in Cybersecurity. I started with simple Python projects (shoutout to my first Jarvis 😄), and now I spend most of my time building AI-powered security tools, full-stack web apps, and experimenting with whatever catches my interest. Still learning, still making mistakes, but every project teaches me something new.\"";
  }

  // 3. What do you do?
  if (/what do you do|what you do/i.test(q)) {
    return "🙄 What does he do? Well:\n\n\"I build stuff. Sometimes it's AI. Sometimes it's cybersecurity. Sometimes it's React websites with way too many animations. If I find something interesting, there's a good chance I'll try building it.\"";
  }

  // 4. What are you interested in?
  if (/interest|what are you interested/i.test(q)) {
    return "💻 He gave me this bullet list of interests, as if I care:\n\n• AI 🤖\n• Cybersecurity 🔐\n• Full-stack development 💻\n• Cloud ☁️\n• Open-source\n• Learning new technologies\n• Gaming when I need a break 🎮";
  }

  // 5. Are you an expert?
  if (/expert|experienced|senior/i.test(q)) {
    return "😼 Expert? Haha, absolutely not:\n\n\"Nope. I'm a student who's learning every day. I don't know everything, and I'm completely okay with that. I enjoy solving problems, reading documentation, watching tutorials, and building projects until things finally click.\"";
  }

  // 6. Why did you build this portfolio?
  if (/why did you build|why build|purpose of this/i.test(q)) {
    return "🐾 He claims a PDF resume can't show who he is. Honestly, he just wanted a place to show off his animations and make me walk back and forth. 🙄";
  }

  // 7. What's your favorite project?
  if (/favorite project/i.test(q)) {
    return "😸 \"That's like asking someone to pick a favorite child 😅. It changes every few weeks. Usually it's whichever project I'm currently obsessed with.\"";
  }

  // 8. What are you learning right now?
  if (/learning right now|learning currently|what are you learning/i.test(q)) {
    return "🙄 Currently he is exploring AI, cybersecurity, cloud, and building better full-stack applications. Also trying to write cleaner code... which is a lifelong battle, trust me.";
  }

  // 9. Fun fact?
  if (/fun fact/i.test(q)) {
    return "😹 Here is a fun fact about his portfolio redesign addiction:\n\n\"I have a habit of redesigning my portfolio instead of adding new features. 'Just one small UI change...' Three hours later, I've rebuilt the entire homepage.\"";
  }

  // 10. Can I hire you?
  if (/hire|job|internship|project/i.test(q)) {
    return "🐾 Please do! Maybe then he can afford better salmon treats for me:\n\n\"Absolutely! If you think I'd be a good fit for your project, internship, or just want to chat about tech, feel free to reach out. I'm always happy to connect.\"";
  }

  // 11. Do you touch grass?
  if (/touch grass/i.test(q)) {
    return "🌱 \"Occasionally. Mostly when Git decides today's the day to ruin my mood.\" Me? Carpet is much softer, thanks.";
  }

  // 12. Coffee or Tea?
  if (/coffee|tea/i.test(q)) {
    return "☕ \"Coffee when coding. Water when I remember hydration exists.\" I prefer milk, but he never asks me. 🙄";
  }

  // 13. What's your tech stack?
  if (/tech stack|stack/i.test(q)) {
    return "🛠️ Here is what he usually works with:\n\nReact • Tailwind CSS • FastAPI • Python • C++ • JavaScript • Supabase • Git • SQL\n\nAnd whatever new technology convinces him it's worth learning.";
  }

  // 14. Any hidden commands?
  if (/hidden commands|commands/i.test(q)) {
    return "👀 Hmph, here are the commands if you're lazy:\n\nWho made this portfolio?\nWhat's your tech stack?\nShow your projects\nWhat's your favorite language?\nDo you touch grass?\nCoffee or tea?\nDark mode?\nTell me a joke";
  }

  // 15. Any last words?
  if (/last words|bye|exit/i.test(q)) {
    return "🐾 Finally, you're leaving! 😸 Just kidding:\n\n\"Thanks for stopping by! 😊 Feel free to explore my projects, break the chatbot by asking weird questions, and if you have feedback, I'd genuinely love to hear it.\"";
  }

  // Other specific fallback commands from the prompt
  if (/who made this portfolio/i.test(q)) {
    return "Gaurav did! Rebuilt it 100 times already. He has no life. 🛠️";
  }
  if (/show your projects|projects/i.test(q)) {
    return "Go scroll to the Works section! He has CyberSphere, YouTube Guardian, and GIS Urban AI. Or ask me about any of them if you're too lazy to scroll. 🐾";
  }
  if (/favorite language/i.test(q)) {
    return "He likes C++ for speed, Python for AI, and JavaScript/TypeScript for React. I only speak meow, which is superior. 😸";
  }
  if (/dark mode/i.test(q)) {
    return "Currently, we have this cozy warm-sand theme. Close your eyes if it is too bright for you. 🕶️";
  }
  if (/joke/i.test(q)) {
    const jokes = [
      "Why do programmers wear glasses? Because they can't C#! 😹 Now go away.",
      "How many programmers does it take to change a lightbulb? None, that's a hardware problem! 🔌",
      "There are 10 types of people in the world: those who understand binary, and those who don't. 🤖",
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  }

  return "😼 Meow? I didn't get that. Ask me something easy like:\n- **Who are you?**\n- **What's your tech stack?**\n- **Do you touch grass?**\n- **Can I hire you?**\n\nOr ask for 'hidden commands' if you can't decide. 🐾";
}

// ----------------------------------------------------
// MAIN WIDGET COMPONENT
// ----------------------------------------------------
export default function ChatbotCat() {
  const [isOpen, setIsOpen] = useState(false);
  const [catState, setCatState] = useState<"sleeping" | "sitting" | "walking">("sleeping");
  const [catX, setCatX] = useState(25);
  const [catDir, setCatDir] = useState<"left" | "right">("right");
  const [walkFrame, setWalkFrame] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Initial sequence trigger when opened
  useEffect(() => {
    if (isOpen) {
      setCatState("walking");

      // Load initial onboarding messages if empty
      if (messages.length === 0) {
        setIsTyping(true);
        const t1 = setTimeout(() => {
          setMessages([
            {
              sender: "bot",
              text: "Hey! meow! 👋 I'm Pixel, Gaurav's digital helper cat.",
              timestamp: new Date(),
            },
          ]);
          setIsTyping(false);

          // Second message
          setTimeout(() => {
            setIsTyping(true);
            setTimeout(() => {
              setMessages((prev) => [
                ...prev,
                {
                  sender: "bot",
                  text: "Yes, I am a cat, because he loves cats obviously! 😸 He's busy building secure SaaS tools right now...",
                  timestamp: new Date(),
                },
              ]);
              setIsTyping(false);

              // Third message
              setTimeout(() => {
                setIsTyping(true);
                setTimeout(() => {
                  setMessages((prev) => [
                    ...prev,
                    {
                      sender: "bot",
                      text: "Anyway, I was sleeping. So make it quick. Ask me about his projects, skills, or if he ever touches grass. 🙄🐾",
                      timestamp: new Date(),
                    },
                  ]);
                  setIsTyping(false);
                }, 1000);
              }, 1200);
            }, 1000);
          }, 1400);
        }, 1000);

        return () => {
          clearTimeout(t1);
        };
      }
    } else {
      // Return to sleeping state
      setCatState("sleeping");
      setCatX(25);
      setCatDir("right");
    }
  }, [isOpen]);

  // Walk cycle animation frame alternator
  useEffect(() => {
    if (catState !== "walking") return;
    const interval = setInterval(() => {
      setWalkFrame((f) => (f === 0 ? 1 : 0));
    }, 160);
    return () => clearInterval(interval);
  }, [catState]);

  // Horizonal walking movement logic
  useEffect(() => {
    if (catState !== "walking") return;
    let animId: number;
    let cx = catX;
    let cd = catDir;

    const tick = () => {
      const minX = 10;
      const maxX = 230; // boundary for a 320px chat window minus cat width (100px)

      if (cd === "right") {
        cx += 0.8;
        if (cx >= maxX) {
          cd = "left";
          setCatDir("left");
        }
      } else {
        cx -= 0.8;
        if (cx <= minX) {
          cd = "right";
          setCatDir("right");
        }
      }
      setCatX(cx);
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [catState, catX, catDir]);

  // Handle user send message
  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userText, timestamp: new Date() },
    ]);
    setInputValue("");
    setIsTyping(true);

    // Stop walking briefly to look like thinking
    setCatState("sitting");

    setTimeout(() => {
      const response = getBotResponse(userText);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: response, timestamp: new Date() },
      ]);
      setIsTyping(false);
      
      // Resume walking
      setCatState("walking");
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999] font-sans flex flex-col items-end pointer-events-none">
      
      {/* 1. CHAT WINDOW PANEL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-[320px] sm:w-[350px] h-[450px] rounded-2xl bg-zinc-950 border border-zinc-800 text-white shadow-2xl flex flex-col overflow-visible pointer-events-auto relative mb-3"
          >
            {/* Walking Cat Container */}
            <div 
              style={{ 
                left: `${catX}px`, 
                top: "-90px",
                position: "absolute",
              }}
              className="z-50 select-none pointer-events-none transition-transform"
            >
              <PixelCat state={catState} direction={catDir} frame={walkFrame} />
            </div>

            {/* Chat Box Header */}
            <div className="px-4 py-3.5 border-b border-zinc-800 flex items-center justify-between rounded-t-2xl bg-zinc-900/50">
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-[#10be7e] animate-pulse" />
                <span className="text-xs font-mono tracking-widest text-[#dfefe4] uppercase font-bold">
                  Pixel Assistant
                </span>
              </div>
              <button 
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 custom-scrollbar text-sm">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div 
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-xl leading-relaxed whitespace-pre-line text-left ${
                      msg.sender === "user" 
                        ? "bg-[#10be7e] text-zinc-950 font-semibold rounded-br-none" 
                        : "bg-zinc-900 border border-zinc-800 text-neutral-200 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-neutral-500 mt-1 px-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div className="flex flex-col items-start">
                  <div className="px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 rounded-bl-none flex items-center gap-1">
                    <div className="size-1.5 rounded-full bg-[#10be7e] animate-bounce [animation-delay:-0.3s]" />
                    <div className="size-1.5 rounded-full bg-[#10be7e] animate-bounce [animation-delay:-0.15s]" />
                    <div className="size-1.5 rounded-full bg-[#10be7e] animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input Footer */}
            <form onSubmit={handleSend} className="p-3 border-t border-zinc-800 flex gap-2 rounded-b-2xl bg-zinc-900/30">
              <input
                type="text"
                placeholder="Ask about Gaurav..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 px-3 py-2 text-sm bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-hidden focus:border-zinc-700 placeholder-neutral-500"
              />
              <button
                type="submit"
                className="p-2 bg-[#10be7e] text-zinc-950 rounded-lg hover:bg-[#0fa66f] transition-colors cursor-pointer"
              >
                <Send className="size-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. CORNER SLEEPING CAT OVERLAY */}
      {!isOpen && (
        <div className="pointer-events-auto flex flex-col items-end relative">
          {/* Permanent Floating Callout Label & Arrow */}
          <div className="absolute bottom-[110px] right-2 flex flex-col items-end animate-bounce select-none pointer-events-none whitespace-nowrap z-50 [animation-duration:2.5s]">
            <span className="text-[10px] font-mono tracking-wider font-semibold text-[#04251b] bg-[#dfefe4] border border-[#b2d8c3] px-2.5 py-1 rounded-full shadow-md">
              wake this lazy cat 🐾
            </span>
            {/* Curved pointing arrow */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#10be7e] mr-6 -mt-1 transform rotate-[40deg]">
              <path d="M4 4c6 0 10 4 10 10" strokeLinecap="round" />
              <path d="M8 14h6v-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex flex-col items-center group relative cursor-pointer outline-none focus:ring-0 focus:outline-hidden"
          >
            {/* Sleeping Cat SVG */}
            <div className="transition-transform group-hover:scale-110 duration-200">
              <PixelCat state="sleeping" direction="right" frame={0} />
            </div>
          </button>
        </div>
      )}

    </div>
  );
}
