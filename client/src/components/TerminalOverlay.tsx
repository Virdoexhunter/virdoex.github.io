import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal as TerminalIcon, ShieldCheck, Cpu, Trophy, Mail } from "lucide-react";
import { useSubmitContact } from "@/hooks/use-contact";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema, type InsertMessage } from "@shared/schema";

type SectionType = "profile" | "experience" | "skills" | "achievements" | "contact" | null;

interface TerminalOverlayProps {
  section: SectionType;
  onClose: () => void;
}

export function TerminalOverlay({ section, onClose }: TerminalOverlayProps) {
  return (
    <AnimatePresence>
      {section && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 pointer-events-none"
        >
          <div className="w-full max-w-4xl h-full max-h-[80vh] bg-black/90 border border-primary/50 rounded-lg shadow-[0_0_50px_rgba(0,255,255,0.1)] backdrop-blur-sm overflow-hidden flex flex-col pointer-events-auto relative">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-primary/10 border-b border-primary/30">
              <div className="flex items-center gap-2">
                <TerminalIcon className="w-4 h-4 text-primary" />
                <span className="text-xs font-mono text-primary uppercase tracking-widest">
                  ROOT@MAINFRAME:~/{section?.toUpperCase()}
                </span>
              </div>
              <button 
                onClick={onClose}
                className="text-primary/70 hover:text-primary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 font-mono text-sm md:text-base relative custom-scrollbar">
              <div className="scanline absolute inset-0 pointer-events-none" />
              
              <ContentRouter section={section} />
              
            </div>
            
            {/* Footer Status Bar */}
            <div className="px-4 py-1 bg-primary/5 border-t border-primary/20 flex justify-between text-[10px] text-primary/50 font-mono uppercase">
              <span>System: ONLINE</span>
              <span>Encrypted Connection: TLS 1.3</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ContentRouter({ section }: { section: SectionType }) {
  switch (section) {
    case "profile":
      return <ProfileContent />;
    case "experience":
      return <ExperienceContent />;
    case "skills":
      return <SkillsContent />;
    case "achievements":
      return <AchievementsContent />;
    case "contact":
      return <ContactContent />;
    default:
      return null;
  }
}

function ProfileContent() {
  return (
    <div className="space-y-6 text-foreground">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center border-2 border-primary animate-pulse">
           <ShieldCheck className="w-10 h-10 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-display text-primary font-bold">DEEPAK DHIMAN</h1>
          <p className="text-xl text-primary/80 font-mono mt-1">Application Security Engineer</p>
        </div>
      </div>

      <div className="space-y-4 font-mono">
        <p className="typing-effect">
          <span className="text-accent">{">"}</span> Security Professional with 5+ years of experience in Offensive Security.
        </p>
        <p>
          <span className="text-accent">{">"}</span> Specializing in Application Security, Secure SDLC implementation, and Threat Modeling.
        </p>
        <p>
          <span className="text-accent">{">"}</span> Proven track record in identifying critical vulnerabilities across diverse environments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <div className="p-4 border border-primary/20 bg-primary/5 rounded">
          <h3 className="text-primary font-bold mb-2">CORE FOCUS</h3>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
            <li>Offensive-first Testing</li>
            <li>Cloud Security (AWS)</li>
            <li>DevSecOps Integration</li>
            <li>Security Architecture Review</li>
          </ul>
        </div>
        <div className="p-4 border border-primary/20 bg-primary/5 rounded">
          <h3 className="text-primary font-bold mb-2">OBJECTIVE</h3>
          <p className="text-muted-foreground text-sm">
            To leverage deep technical expertise in securing enterprise-grade applications and infrastructure against sophisticated cyber threats.
          </p>
        </div>
      </div>
    </div>
  );
}

function ExperienceContent() {
  const experiences = [
    {
      role: "Product Security Consultant",
      company: "Emirates NBD (via Forward Defense)",
      period: "2022 - Present",
      details: [
        "Conducting black-box and gray-box penetration testing on banking applications.",
        "Collaborating with DevOps to integrate security gates (SAST/DAST) in CI/CD pipelines.",
        "Performing rigorous Threat Modeling sessions for new financial products.",
      ]
    },
    {
      role: "Security Consultant",
      company: "Ampcus Cyber",
      period: "2021 - 2022",
      details: [
        "Led security assessments for fintech and healthcare clients.",
        "Performed API security testing covering OWASP Top 10 API threats.",
        "Automated vulnerability scanning workflows using Python scripting."
      ]
    },
    {
      role: "Cyber Security Specialist",
      company: "Network Intelligence India",
      period: "2019 - 2021",
      details: [
        "Executed network and web application penetration tests.",
        "Assisted in incident response activities and forensic analysis.",
        "Delivered technical reports detailing remediation strategies for developers."
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-display text-secondary mb-6 border-b border-secondary/30 pb-2">
        MISSION_LOGS // EXPERIENCE
      </h2>
      
      <div className="relative border-l-2 border-secondary/20 ml-3 space-y-12">
        {experiences.map((exp, idx) => (
          <div key={idx} className="relative pl-8">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-secondary" />
            
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
              <h3 className="text-lg font-bold text-foreground">{exp.role}</h3>
              <span className="font-mono text-xs text-secondary bg-secondary/10 px-2 py-1 rounded">
                {exp.period}
              </span>
            </div>
            
            <h4 className="text-secondary font-mono text-sm mb-4">@{exp.company}</h4>
            
            <ul className="space-y-2">
              {exp.details.map((detail, i) => (
                <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="text-secondary mt-1">::</span>
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillsContent() {
  const skillCategories = [
    {
      name: "Offensive Security",
      skills: ["Web Pentesting", "API Security", "Mobile App Security (iOS/Android)", "Network Pentesting", "Social Engineering"]
    },
    {
      name: "Tools & Arsenal",
      skills: ["Burp Suite Pro", "Metasploit", "Nmap", "Wireshark", "Frida", "Objection", "Sysdig", "Nessus"]
    },
    {
      name: "DevSecOps & Cloud",
      skills: ["AWS Security", "Docker/K8s Security", "CI/CD Security", "Terraform", "GitLab CI"]
    },
    {
      name: "Languages",
      skills: ["Python", "Bash Scripting", "JavaScript", "Go (Basic)"]
    }
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-display text-accent mb-6 border-b border-accent/30 pb-2">
        SYSTEM_CAPABILITIES // SKILLS
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((category, idx) => (
          <div key={idx} className="bg-accent/5 border border-accent/20 p-5 rounded-lg hover:border-accent/50 transition-colors group">
            <div className="flex items-center gap-3 mb-4">
              <Cpu className="w-5 h-5 text-accent group-hover:animate-spin" />
              <h3 className="text-lg font-bold text-accent font-display">{category.name}</h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, sIdx) => (
                <span 
                  key={sIdx} 
                  className="px-2 py-1 bg-background border border-accent/30 text-accent/80 text-xs font-mono rounded hover:bg-accent hover:text-black transition-all cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AchievementsContent() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-display text-yellow-500 mb-6 border-b border-yellow-500/30 pb-2">
        HALL_OF_FAME // ACHIEVEMENTS
      </h2>

      <div className="bg-gradient-to-r from-yellow-500/10 to-transparent p-6 rounded-lg border border-yellow-500/20 mb-8">
        <div className="flex items-start gap-4">
          <Trophy className="w-8 h-8 text-yellow-500 shrink-0" />
          <div>
            <h3 className="text-xl font-bold text-yellow-400 mb-2">Bug Bounty Hunter</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Recognized for responsible disclosure of critical vulnerabilities in major global organizations. 
              Consistently ranked among top researchers on platforms like HackenProof.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border border-yellow-500/20 p-4 rounded bg-black/40">
          <h4 className="text-yellow-500 font-mono text-sm mb-3 border-b border-yellow-500/20 pb-2">
            [ ACKNOWLEDGMENTS ]
          </h4>
          <ul className="space-y-2 text-sm text-foreground/80 font-mono">
            <li className="flex items-center gap-2">
              <span className="text-yellow-500">★</span> Google Hall of Fame
            </li>
            <li className="flex items-center gap-2">
              <span className="text-yellow-500">★</span> Dell Security Acknowledgment
            </li>
            <li className="flex items-center gap-2">
              <span className="text-yellow-500">★</span> Microsoft Security Researcher
            </li>
            <li className="flex items-center gap-2">
              <span className="text-yellow-500">★</span> Sony Security Recognition
            </li>
            <li className="flex items-center gap-2">
              <span className="text-yellow-500">★</span> 200+ Other Acknowledgments
            </li>
          </ul>
        </div>

        <div className="border border-yellow-500/20 p-4 rounded bg-black/40">
           <h4 className="text-yellow-500 font-mono text-sm mb-3 border-b border-yellow-500/20 pb-2">
            [ CERTIFICATIONS ]
          </h4>
           <ul className="space-y-2 text-sm text-foreground/80 font-mono">
            <li className="flex items-center gap-2">
              <span className="text-yellow-500">♦</span> Certified Ethical Hacker (CEH)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-yellow-500">♦</span> Offensive Security Certified Professional (OSCP) - In Progress
            </li>
             <li className="flex items-center gap-2">
              <span className="text-yellow-500">♦</span> AWS Certified Security - Specialty
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function ContactContent() {
  const submit = useSubmitContact();
  const form = useForm<InsertMessage>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const onSubmit = (data: InsertMessage) => {
    submit.mutate(data, {
      onSuccess: () => form.reset()
    });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-display text-primary mb-6 border-b border-primary/30 pb-2">
        ESTABLISH_UPLINK // CONTACT
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p className="text-sm text-muted-foreground mb-6 font-mono">
            Initiate a secure communication channel. All messages are encrypted end-to-end.
            Available for consulting, security audits, and speaking engagements.
          </p>
          
          <div className="space-y-4">
             <div className="flex items-center gap-3 text-primary/80">
                <Mail className="w-5 h-5" />
                <span className="font-mono">deepak.dhiman@example.com</span>
             </div>
             {/* Add more contact info here if needed */}
          </div>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-mono text-primary uppercase">Identity Name</label>
            <input 
              {...form.register("name")}
              className="w-full bg-black border border-primary/30 rounded p-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 font-mono text-sm"
              placeholder="Enter your name..."
            />
            {form.formState.errors.name && (
              <span className="text-xs text-destructive">{form.formState.errors.name.message}</span>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-primary uppercase">Return Address (Email)</label>
            <input 
              {...form.register("email")}
              className="w-full bg-black border border-primary/30 rounded p-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 font-mono text-sm"
              placeholder="user@domain.com"
            />
             {form.formState.errors.email && (
              <span className="text-xs text-destructive">{form.formState.errors.email.message}</span>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-primary uppercase">Payload (Message)</label>
            <textarea 
              {...form.register("message")}
              rows={4}
              className="w-full bg-black border border-primary/30 rounded p-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 font-mono text-sm"
              placeholder="Type your message..."
            />
             {form.formState.errors.message && (
              <span className="text-xs text-destructive">{form.formState.errors.message.message}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={submit.isPending}
            className="w-full py-2 bg-primary/10 border border-primary text-primary hover:bg-primary hover:text-black font-mono font-bold uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {submit.isPending ? (
              <>
                <span className="animate-pulse">Encrypting...</span>
              </>
            ) : (
              "Transmit Data"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
