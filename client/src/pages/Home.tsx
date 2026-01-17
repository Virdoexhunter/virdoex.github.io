import { useState } from "react";
import { NetworkScene } from "@/components/NetworkScene";
import { TerminalOverlay } from "@/components/TerminalOverlay";
import { motion } from "framer-motion";

type SectionType = "profile" | "experience" | "skills" | "achievements" | "contact" | null;

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionType>(null);
  const [showInstructions, setShowInstructions] = useState(true);

  // Hide instructions after interaction
  const handleNodeInteraction = (section: SectionType) => {
    setActiveSection(section);
    setShowInstructions(false);
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* 3D Scene Layer */}
      <div className="absolute inset-0 z-0">
        <NetworkScene onNodeClick={handleNodeInteraction} />
      </div>

      {/* Overlay UI Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        
        {/* Top Bar */}
        <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start">
          <div>
            <h1 className="text-2xl md:text-4xl font-display font-bold text-white tracking-widest crt-flicker">
              DEEPAK<span className="text-primary">.SEC</span>
            </h1>
            <p className="font-mono text-xs text-primary/70 mt-1">
              NETWORK_TOPOLOGY_V1.0.4 :: CONNECTED
            </p>
          </div>
          <div className="hidden md:block text-right font-mono text-xs text-muted-foreground">
            <p>LAT: 25.2048° N</p>
            <p>LON: 55.2708° E</p>
            <p className="text-primary animate-pulse mt-2">● SYSTEM SECURE</p>
          </div>
        </div>

        {/* Instructions Toast */}
        {showInstructions && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black/80 border border-primary/30 px-6 py-3 rounded text-center backdrop-blur-md"
          >
            <p className="text-primary font-mono text-sm">
              [ INSTRUCTIONS ]
            </p>
            <p className="text-gray-300 text-xs mt-1 font-mono">
              Drag to Rotate • Scroll to Zoom • Click Nodes to Access Data
            </p>
          </motion.div>
        )}
      </div>

      {/* Terminal Modal */}
      <TerminalOverlay 
        section={activeSection} 
        onClose={() => setActiveSection(null)} 
      />
      
      {/* Decorative Grid Overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none opacity-20 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
    </div>
  );
}
