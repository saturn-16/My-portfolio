import { useState, ChangeEvent, FormEvent } from "react";
import { X, Send, Terminal, CheckCircle2, AlertTriangle, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactDrawer({ isOpen, onClose }: ContactDrawerProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    agency: "",
    needs: "Development",
    budget: "₹50k - ₹1L",
    message: ""
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [step, setStep] = useState<"input" | "transmitting" | "success">("input");
  const [logLines, setLogLines] = useState<string[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.name.trim()) errors.name = "Identification name is required.";
    if (!formData.email.trim()) {
      errors.email = "Delivery address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Deliverable address pattern is invalid.";
    }
    if (!formData.message.trim()) errors.message = "Transmission content is required.";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const executeTransmitSimulation = () => {
    setStep("transmitting");
    setLogLines([]);

    const logs = [
      "⚡ INIT: Gaurav Delivery Socket connecting...",
      "✔ SOCKET: Secure TLS/Websocket pipe established.",
      `ℹ PAYLOAD: Parsing form parameters { name: '${formData.name}' }`,
      "⚙ COMPILING: Packing email payload into JSON structure...",
      "☁ ROUTING: Sending SMTP relay request to Bhopal digital node...",
      "⏳ LATENCY: Ping response received at 34ms.",
      "✔ DISPATCH: Message queued on Gaurav's inbox broker.",
      "✨ COMPLETED: Transmission successful. Response status: 201 OK"
    ];

    logs.forEach((line, idx) => {
      setTimeout(() => {
        setLogLines((prev) => [...prev, line]);
        if (idx === logs.length - 1) {
          setTimeout(() => {
            setStep("success");
          }, 800);
        }
      }, (idx + 1) * 450);
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      executeTransmitSimulation();
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      agency: "",
      needs: "Development",
      budget: "₹50k - ₹1L",
      message: ""
    });
    setStep("input");
    setLogLines([]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-pine-dark"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            data-lenis-prevent
            className="relative w-full max-w-lg bg-cream border border-sand shadow-2xl rounded-3xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-6 bg-[#dfd9cb]/30 border-b border-sand flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-pine animate-pulse" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-pine">
                  // DISPATCH REQUEST FORM
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-pine/10 text-pine rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1">
              
              {step === "input" && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <p className="text-xs font-mono text-neutral-600 mb-2 leading-relaxed italic">
                    Fill the form parameters below to initiate direct secure communication with Gaurav:
                  </p>

                  {/* Name field */}
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Leslie Alexander"
                      className={`w-full bg-white px-3.5 py-2.5 rounded-xl border font-mono text-xs focus:ring-1 focus:ring-pine focus:border-pine outline-hidden transition-all ${
                        formErrors.name ? "border-rose-300" : "border-sand text-pine"
                      }`}
                    />
                    {formErrors.name && (
                      <p className="text-[10px] font-mono text-rose-500 flex items-center gap-1 mt-0.5">
                        <AlertTriangle className="w-3 h-3" /> {formErrors.name}
                      </p>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Communication Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. leslie@opistudio.com"
                      className={`w-full bg-white px-3.5 py-2.5 rounded-xl border font-mono text-xs focus:ring-1 focus:ring-pine focus:border-pine outline-hidden transition-all ${
                        formErrors.email ? "border-rose-300" : "border-sand text-pine"
                      }`}
                    />
                    {formErrors.email && (
                      <p className="text-[10px] font-mono text-rose-500 flex items-center gap-1 mt-0.5">
                        <AlertTriangle className="w-3 h-3" /> {formErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Company/Agency field */}
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Agency / Company Name</label>
                    <input
                      type="text"
                      name="agency"
                      value={formData.agency}
                      onChange={handleInputChange}
                      placeholder="e.g. Opi Studio"
                      className="w-full bg-white border border-sand text-pine px-3.5 py-2.5 rounded-xl font-mono text-xs focus:ring-1 focus:ring-pine focus:border-pine outline-hidden transition-all"
                    />
                  </div>

                  {/* Service needs and budget selectors row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Project Scope</label>
                      <select
                        name="needs"
                        value={formData.needs}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-sand text-pine px-3 py-2.5 rounded-xl font-mono text-xs focus:ring-1 focus:ring-pine focus:border-pine outline-hidden cursor-pointer"
                      >
                        <option value="Development">Development</option>
                        <option value="Interaction">WebGL Motion</option>
                        <option value="Consultancy">Creative Consultancy</option>
                        <option value="FullStack">Full-Stack Solution</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Estimated Budget</label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-sand text-pine px-3 py-2.5 rounded-xl font-mono text-xs focus:ring-1 focus:ring-pine focus:border-pine outline-hidden cursor-pointer"
                      >
                        <option value="Under ₹50k">Under ₹50k</option>
                        <option value="₹50k - ₹1L">₹50k - ₹1L</option>
                        <option value="₹1L - ₹3L">₹1L - ₹3L</option>
                        <option value="₹3L+">₹3L+</option>
                      </select>
                    </div>
                  </div>

                  {/* Message field */}
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Brief Message Description *</label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Describe your design objectives, timelines, and ideas..."
                      className={`w-full bg-white px-3.5 py-2.5 rounded-xl border font-mono text-xs focus:ring-1 focus:ring-pine focus:border-pine outline-hidden transition-all resize-none ${
                        formErrors.message ? "border-rose-300" : "border-sand text-pine"
                      }`}
                    />
                    {formErrors.message && (
                      <p className="text-[10px] font-mono text-rose-500 flex items-center gap-1 mt-0.5">
                        <AlertTriangle className="w-3 h-3" /> {formErrors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-pine hover:bg-pine-light border border-pine text-cream font-mono text-xs uppercase font-bold tracking-widest rounded-2xl transition-all shadow-xs cursor-pointer"
                  >
                    Initiate Delivery Socket <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}

              {/* Transmitting Terminal Monitor Screen */}
              {step === "transmitting" && (
                <div className="p-4 bg-zinc-950 border border-zinc-800 text-zinc-100 rounded-2xl font-mono text-[10px] leading-relaxed space-y-2 h-72 flex flex-col justify-between overflow-hidden">
                  <div>
                    <div className="flex items-center gap-2 border-b border-zinc-800 pb-2 mb-2 text-zinc-400">
                      <Terminal className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                      <span>transmit_brokerd.sh // GAURAV RELAY SOCKET</span>
                    </div>
                    <div className="space-y-1 overflow-y-auto max-h-56">
                      {logLines.map((line, idx) => (
                        <p key={idx} className="tracking-wide">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="text-zinc-500 flex justify-between uppercase text-[8px] animate-pulse">
                    <span>Broker: Active</span>
                    <span>Txs: {logLines.length}/8</span>
                  </div>
                </div>
              )}

              {/* Success Result Screen */}
              {step === "success" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center justify-center text-center space-y-6"
                >
                  <div className="w-20 h-20 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center text-emerald-500">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-sm border border-emerald-100 uppercase tracking-widest block w-max mx-auto mb-3">
                      STATUS // COMPLETED 201 OK
                    </span>
                    <h3 className="text-2xl font-oswald text-pine uppercase font-extrabold tracking-wide mb-2">
                      Transmission Success
                    </h3>
                    <p className="max-w-xs text-xs font-mono text-neutral-600 leading-relaxed mx-auto">
                      Your creative dispatch packet has successfully hit Gaurav&apos;s digital queue. Expect response mapping in 12-24 hours.
                    </p>
                  </div>

                  <div className="pt-4 flex w-full gap-4">
                    <button
                      onClick={handleReset}
                      className="flex-1 px-5 py-3 border border-sand bg-white text-pine hover:bg-neutral-50 rounded-xl text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      New Dispatch Packet
                    </button>
                    <button
                      onClick={onClose}
                      className="flex-1 px-5 py-3 bg-pine hover:bg-pine-light text-cream rounded-xl text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>
                </motion.div>
              )}

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
