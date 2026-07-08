import { Project, WorkExperience, Testimonial, Gear } from "./types";

export const GAURAV_BIO = {
  name: "Gaurav Kumar",
  title: "Cybersecurity Developer",
  shortIntro: "Cybersecurity undergraduate specializing in AI-driven threat detection and secure web systems. CTF winner with hands-on experience in React, FastAPI, TensorFlow, and Docker.",
  longAbout: "Passionate about building secure, intelligent web platforms that combine modern frontend development with cybersecurity expertise. Experienced in phishing detection, threat intelligence, and full-stack development — from crafting responsive React UIs to training ML models and integrating security APIs like VirusTotal and AbuseIPDB.",
  location: "Bhopal, MP, India",
  email: "gk16122004@gmail.com",
  phone: "+91-9810817335",
  socials: {
    github: "https://github.com/saturn-16",
    linkedin: "https://www.linkedin.com/in/gaur4avkumar/",
    leetcode: "https://leetcode.com/u/Saturn_16/"
  }
};

export const HERO_ROLES = [
  {
    line1: "CYBERSECURITY",
    line2: "DEVELOPER </>",
    description: "Cybersecurity undergraduate specializing in AI-driven threat detection and secure web systems. CTF winner with hands-on experience in React, FastAPI, TensorFlow, and Docker."
  },
  {
    line1: "FULL STACK",
    line2: "DEVELOPER </>",
    description: "Full stack developer building modern, scalable web applications end to end. Experienced in React, FastAPI, TensorFlow, and Docker with a security-first mindset."
  },
  {
    line1: "PROBLEM",
    line2: "SOLVER </>",
    description: "Analytical problem solver who thrives on complex challenges. CTF competitor and algorithmic thinker with a passion for building elegant, efficient solutions."
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "p1",
    title: "CyberSphere",
    year: "2025",
    description: "Built a full-stack cybersecurity SaaS platform with phishing detection, AES-256 encrypted file sharing, and cloud security analysis. Integrated VirusTotal and Google Safe Browsing APIs to analyze 1000+ URLs/messages with AI-based threat scoring, reducing false positives by ~18%.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    category: "Cybersecurity SaaS",
    role: "Full Stack Developer",
    techList: ["React", "FastAPI", "Python", "TailwindCSS"],
    url: "https://github.com/saturn-16/Cyber-Sphere"
  },
  {
    id: "p2",
    title: "YouTube Guardian",
    year: "2026",
    description: "Developed a real-time YouTube live chat threat detection system for phishing and malicious link identification. Trained a TF-IDF + Logistic Regression model on 10,000+ labeled messages achieving 92% detection accuracy. Integrated VirusTotal and AbuseIPDB APIs for real-time analysis.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    category: "AI & ML",
    role: "ML Developer",
    techList: ["FastAPI", "Python", "Scikit-learn", "Machine Learning"],
    url: "https://github.com/saturn-16/Youtube-Guardian"
  },
  {
    id: "p3",
    title: "GIS Urban AI Analyser",
    year: "2025",
    description: "Built an AI platform using a custom U-Net model to segment satellite imagery into 6 land-use categories. Generated Urban Growth Prediction Heatmaps; integrated Groq API (Llama 4 Scout) for environmental recommendations. Containerised with Docker and deployed on Hugging Face Spaces.",
    image: "/gis.png",
    category: "Computer Vision",
    role: "AI/ML Engineer",
    techList: ["Python", "Flask", "TensorFlow", "Docker", "OpenCV"],
    url: "https://github.com/saturn-16/GIS"
  }
];

export const WORK_EXPERIENCE_DATA: WorkExperience[] = [
  {
    id: "exp1",
    year: "May 2026 – July 2026",
    title: "Frontend Intern",
    company: "Agnivora Digital Private Limited",
    description: "Selected based on proficiency in React and TailwindCSS; contributing to production-grade UI development as part of the core engineering team. Building and iterating on responsive frontend components, collaborating with design and backend teams to ship client-facing features.",
    skills: ["React", "TailwindCSS", "UI Development", "Responsive Design"]
  },
  {
    id: "exp2",
    year: "2024 – 2026",
    title: "PR Team Member",
    company: "Null Community VIT Bhopal",
    description: "Led cybersecurity event outreach for 2 years across the VIT Bhopal Student Chapter. Organized CTF competitions and cybersecurity awareness workshops.",
    skills: ["Event Management", "Cybersecurity", "Leadership", "Community Building"]
  },
  {
    id: "exp3",
    year: "2023 – 2027",
    title: "B.Tech CSE (Cybersecurity)",
    company: "VIT Bhopal University",
    description: "Pursuing Bachelor of Technology in Computer Science with specialization in Cybersecurity. Focused on AI-driven threat detection, secure web systems, and full-stack development.",
    skills: ["Cybersecurity", "Machine Learning", "Web Development", "Cloud Security"]
  }
];

export const WORKSTATION_GEAR_DATA: Gear[] = [
  {
    id: "g1",
    name: "ThinkPad Dev Setup",
    category: "Computing Core",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80",
    description: "Primary development workstation running Linux for pentesting, Docker containers, and full-stack development with multiple terminal sessions.",
    isFavorite: true,
    specs: "Intel i7, 16GB RAM, 512GB SSD, Dual Monitor Setup"
  },
  {
    id: "g2",
    name: "Mechanical Keyboard",
    category: "Tactile Input",
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&q=80",
    description: "Custom mechanical keyboard with tactile switches for long coding sessions and CTF challenges.",
    isFavorite: true,
    specs: "75% Layout, Gateron Brown Switches, PBT Keycaps"
  },
  {
    id: "g3",
    name: "Security Toolkit",
    category: "Cyber Arsenal",
    image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=600&q=80",
    description: "Curated collection of security tools — Wireshark, Nmap, Burp Suite — configured for vulnerability assessment and network analysis.",
    isFavorite: true,
    specs: "Kali Linux VM, Custom Scripts, Network Adapters"
  },
  {
    id: "g4",
    name: "Specialty Coffee Setup",
    category: "Fuel Engine",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
    description: "Essential fuel for late-night CTF competitions and debugging sessions. Strong filter coffee to keep the focus sharp.",
    isFavorite: false,
    specs: "Pour-over dripper, Medium roast Indian coffee"
  },
  {
    id: "g5",
    name: "Desk Plant",
    category: "Living Office",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600&q=80",
    description: "A small desk succulent that brings a touch of nature to the workspace — a reminder of organic balance in a digital world.",
    isFavorite: false,
    specs: "Jade succulent, ceramic pot"
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "t1",
    quote: "Gaurav demonstrated exceptional skill in building secure, scalable web applications during his internship. His understanding of both frontend development and cybersecurity principles made him a uniquely valuable contributor to our engineering team.",
    author: "Agnivora Team Lead",
    role: "Engineering Manager",
    company: "Agnivora Digital",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80"
  },
  {
    id: "t2",
    quote: "His CTF problem-solving abilities and leadership in organizing cybersecurity events at Null Community VIT Bhopal were remarkable. Gaurav has a rare combination of technical depth and community engagement that sets him apart.",
    author: "Faculty Mentor",
    role: "Cybersecurity Advisor",
    company: "VIT Bhopal University",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80"
  }
];
