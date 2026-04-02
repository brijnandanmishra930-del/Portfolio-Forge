import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  Terminal, 
  ChevronDown, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Twitter,
  Mail,
  Send,
  Award,
  Briefcase,
  Code2,
  Cpu,
  Globe,
  Layers,
  Zap,
  Sparkles,
  Server,
  Database
} from "lucide-react";
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiNodedotjs, 
  SiPython, 
  SiPostgresql, 
  SiMongodb, 
  SiTensorflow, 
  SiLangchain, 
  SiDocker, 
  SiGit 
} from "react-icons/si";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// --- Data ---

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const SKILLS = [
  {
    category: "Frontend",
    icon: <Globe className="w-5 h-5 text-primary" />,
    items: [
      { name: "React", icon: <SiReact className="w-8 h-8" />, color: "#61DAFB" },
      { name: "Next.js", icon: <SiNextdotjs className="w-8 h-8" />, color: "#FFFFFF" },
      { name: "TypeScript", icon: <SiTypescript className="w-8 h-8" />, color: "#3178C6" },
    ]
  },
  {
    category: "Backend",
    icon: <Server className="w-5 h-5 text-primary" />,
    items: [
      { name: "Node.js", icon: <SiNodedotjs className="w-8 h-8" />, color: "#339933" },
      { name: "Python", icon: <SiPython className="w-8 h-8" />, color: "#3776AB" },
      { name: "PostgreSQL", icon: <SiPostgresql className="w-8 h-8" />, color: "#4169E1" },
      { name: "MongoDB", icon: <SiMongodb className="w-8 h-8" />, color: "#47A248" },
    ]
  },
  {
    category: "AI & ML",
    icon: <Cpu className="w-5 h-5 text-primary" />,
    items: [
      { name: "TensorFlow", icon: <SiTensorflow className="w-8 h-8" />, color: "#FF6F00" },
      { name: "LangChain", icon: <SiLangchain className="w-8 h-8" />, color: "#FFFFFF" },
    ]
  },
  {
    category: "DevOps & Tools",
    icon: <Terminal className="w-5 h-5 text-primary" />,
    items: [
      { name: "Docker", icon: <SiDocker className="w-8 h-8" />, color: "#2496ED" },
      { name: "AWS", icon: <Server className="w-8 h-8" />, color: "#FF9900" },
      { name: "Git", icon: <SiGit className="w-8 h-8" />, color: "#F05032" },
    ]
  }
];

const PROJECTS = [
  {
    title: "TaskFlow AI",
    description: "An intelligent project management tool that automatically categorizes and prioritizes tasks using LLMs.",
    tags: ["Next.js", "LangChain", "PostgreSQL", "TailwindCSS"],
    image: "/images/project-1.png",
    github: "#",
    live: "#"
  },
  {
    title: "NeuralNote",
    description: "A note-taking app that synthesizes your thoughts and connects related concepts through a visual knowledge graph.",
    tags: ["React", "Python", "Neo4j", "TensorFlow"],
    image: "/images/project-2.png",
    github: "#",
    live: "#"
  },
  {
    title: "ShopSense",
    description: "AI-powered personalized e-commerce storefront that adapts its UI based on real-time user behavior analysis.",
    tags: ["TypeScript", "Node.js", "Redis", "React"],
    github: "#",
    live: "#"
  },
  {
    title: "CodeCanvas",
    description: "A visual programming environment for designing and deploying serverless functions without writing boilerplate.",
    tags: ["Next.js", "AWS Lambda", "Zustand"],
    github: "#",
    live: "#"
  },
  {
    title: "ChatMesh",
    description: "Decentralized, encrypted messaging protocol designed for high-latency, low-bandwidth environments.",
    tags: ["Rust", "WebRTC", "React Native"],
    github: "#",
    live: "#"
  }
];

const EXPERIENCE = [
  {
    role: "Senior Developer",
    company: "TechNova",
    period: "2023 - Present",
    description: "Leading the AI integration team, architecting intelligent features that serve 2M+ daily active users. Reduced latency by 40% across microservices."
  },
  {
    role: "Full-Stack Engineer",
    company: "CloudBridge",
    period: "2021 - 2023",
    description: "Built scalable event-driven architectures. Mentored junior developers and established CI/CD best practices."
  },
  {
    role: "Junior Developer",
    company: "StartupXYZ",
    period: "2019 - 2021",
    description: "Developed core frontend features using React and Redux. Participated in the complete product lifecycle from ideation to deployment."
  }
];

const ACHIEVEMENTS = [
  {
    title: "AI WebForge Hackathon",
    subtitle: "Finalist Entry",
    icon: <Sparkles className="w-6 h-6 text-primary" />
  },
  {
    title: "AWS Certified Solutions Architect",
    subtitle: "Professional Level",
    icon: <Award className="w-6 h-6 text-secondary" />
  },
  {
    title: "Open Source Contributor",
    subtitle: "React Core, Next.js",
    icon: <Github className="w-6 h-6 text-primary" />
  },
  {
    title: "Top Speaker at DevCon 2023",
    subtitle: "The Future of Web + AI",
    icon: <Zap className="w-6 h-6 text-secondary" />
  }
];

// --- Components ---

function NavBar() {
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = NAV_ITEMS.map(item => item.href.substring(1));
      let current = "";
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = section;
            break;
          }
        }
      }
      
      if (current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#" className="text-xl font-bold font-mono tracking-tighter">
          <span className="text-primary">A</span>
          <span className="text-foreground">R</span>
          <span className="text-primary">.</span>
        </a>
        
        <div className="hidden md:flex gap-8">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeSection === item.href.substring(1) ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="md:hidden">
          <Terminal className="w-6 h-6 text-primary" />
        </div>
      </div>
    </motion.nav>
  );
}

function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]" />
      </div>

      <motion.div 
        style={{ y, opacity }}
        className="container px-6 relative z-10 flex flex-col items-center text-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 relative"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-primary/50 neon-glow">
            <img src="/images/avatar.png" alt="Alex Rivera" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-background border border-primary px-3 py-1 rounded-full text-xs font-mono text-primary animate-bounce">
            ONLINE
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl md:text-2xl font-mono text-secondary mb-4">Hello, World. I am</h2>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight leading-none">
            ALEX RIVERA
          </h1>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 font-light">
            Building <span className="text-gradient font-semibold">intelligent products</span> at the intersection of code and creativity.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-8 h-14 rounded-full text-lg shadow-[0_0_20px_rgba(255,0,255,0.4)]" asChild>
            <a href="#projects">View Work <ChevronDown className="ml-2 w-5 h-5" /></a>
          </Button>
          <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 font-bold px-8 h-14 rounded-full text-lg backdrop-blur-sm" asChild>
            <a href="#">Download Resume</a>
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
}

function SectionHeading({ title, subtitle }: { title: string, subtitle?: string }) {
  return (
    <div className="mb-16 md:mb-24">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-4"
      >
        <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase">{title}</h2>
        <div className="h-[2px] flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
      </motion.div>
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted-foreground font-mono text-sm md:text-base max-w-2xl"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="container px-6">
        <SectionHeading 
          title="About Me" 
          subtitle="// system.identity.bio" 
        />
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6 text-lg md:text-xl text-muted-foreground font-light leading-relaxed"
          >
            <p>
              A passionate <strong className="text-foreground">full-stack engineer</strong> with 5+ years of experience crafting digital experiences. 
              I don't just write code; I design systems that feel alive.
            </p>
            <p>
              My focus lies in pushing the boundaries of what <strong className="text-primary">AI can create</strong>, blending robust backend architectures with breathtaking frontend interfaces. I believe technology should amplify human creativity, not replace it.
            </p>
            <p>
              Currently channeling my energy into building next-generation products and competing in the <span className="text-secondary font-mono">AI WebForge hackathon</span>.
            </p>
          </motion.div>
          
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card rounded-2xl p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary" />
              <Code2 className="w-12 h-12 text-primary mb-6 opacity-50" />
              <h3 className="text-2xl font-bold mb-4">Core Values</h3>
              <ul className="space-y-4">
                {[
                  "Craftsmanship over speed, but speed matters.",
                  "Interfaces should be intuitive and delightful.",
                  "Data is the foundation, AI is the amplifier.",
                  "Never stop learning. The web moves fast."
                ].map((val, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <ChevronDown className="w-5 h-5 text-secondary shrink-0 rotate-[-90deg] mt-0.5" />
                    <span>{val}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="py-24 md:py-32 bg-black/40 relative">
      <div className="container px-6">
        <SectionHeading 
          title="Arsenal" 
          subtitle="// system.capabilities.list" 
        />
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS.map((group, idx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card rounded-xl p-6 border border-white/5 hover:border-primary/50 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  {group.icon}
                </div>
                <h3 className="font-bold text-lg">{group.category}</h3>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {group.items.map((skill, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div 
                      className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition-all hover:scale-110 cursor-help"
                      style={{ color: skill.color }}
                      title={skill.name}
                    >
                      {skill.icon}
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="py-24 md:py-32 relative">
      <div className="container px-6">
        <SectionHeading 
          title="Featured Work" 
          subtitle="// system.projects.execute()" 
        />
        
        <div className="space-y-24 md:space-y-32">
          {PROJECTS.map((project, idx) => (
            <motion.div 
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col gap-8 lg:gap-16 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center`}
            >
              {/* Image/Preview */}
              <div className="w-full lg:w-3/5 group relative perspective-1000">
                <motion.div 
                  whileHover={{ rotateX: 2, rotateY: idx % 2 === 0 ? -2 : 2, scale: 1.02 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative rounded-2xl overflow-hidden aspect-video border border-white/10 glass-card shadow-2xl"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-background to-muted flex items-center justify-center">
                      <Code2 className="w-24 h-24 text-muted-foreground/30" />
                    </div>
                  )}
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 backdrop-blur-sm">
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary/20 rounded-full h-12 px-6">
                      <Github className="mr-2 w-4 h-4" /> Code
                    </Button>
                    <Button className="bg-secondary text-black hover:bg-secondary/90 rounded-full h-12 px-6">
                      <ExternalLink className="mr-2 w-4 h-4" /> Live Demo
                    </Button>
                  </div>
                </motion.div>
                
                {/* Decorative elements */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              </div>
              
              {/* Content */}
              <div className="w-full lg:w-2/5 space-y-6">
                <div className="space-y-2">
                  <span className="font-mono text-primary text-sm tracking-wider">0{idx + 1}. PROJECT</span>
                  <h3 className="text-3xl md:text-4xl font-bold">{project.title}</h3>
                </div>
                
                <p className="text-muted-foreground text-lg leading-relaxed glass-card p-6 rounded-xl border border-white/5 relative z-10">
                  {project.description}
                </p>
                
                <ul className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map(tag => (
                    <li key={tag} className="text-xs font-mono px-3 py-1 bg-white/5 rounded-full border border-white/10 text-secondary">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="py-24 md:py-32 bg-black/40 relative">
      <div className="container px-6">
        <SectionHeading 
          title="Timeline" 
          subtitle="// system.history.log" 
        />
        
        <div className="max-w-3xl mx-auto">
          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary/50 before:via-secondary/50 before:to-transparent">
            {EXPERIENCE.map((exp, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              >
                {/* Icon */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-background bg-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <Briefcase className="w-4 h-4 text-primary-foreground" />
                </div>
                
                {/* Content */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-6 rounded-xl border border-white/10 hover:border-primary/50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                    <h4 className="font-bold text-xl text-foreground">{exp.role}</h4>
                    <span className="font-mono text-xs text-secondary bg-secondary/10 px-2 py-1 rounded">
                      {exp.period}
                    </span>
                  </div>
                  <h5 className="text-primary font-medium mb-4">{exp.company}</h5>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievements Sub-section */}
        <div className="mt-32">
          <h3 className="text-2xl font-bold mb-10 text-center">Achievements & Certifications</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ACHIEVEMENTS.map((ach, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="glass-card p-6 rounded-xl border border-white/5 text-center group hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="w-16 h-16 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {ach.icon}
                </div>
                <h4 className="font-bold mb-2">{ach.title}</h4>
                <p className="text-sm font-mono text-muted-foreground">{ach.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl aspect-square bg-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
      
      <div className="container px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeading 
            title="Init Connection" 
            subtitle="// system.network.connect()" 
          />
          
          <div className="grid md:grid-cols-5 gap-12 glass-card p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
            
            <div className="md:col-span-2 space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Let's talk.</h3>
                <p className="text-muted-foreground">
                  Currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                </p>
              </div>
              
              <div className="space-y-4">
                <a href="#" className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors group">
                  <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="font-mono">hello@alexrivera.dev</span>
                </a>
                <a href="#" className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors group">
                  <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Layers className="w-5 h-5" />
                  </div>
                  <span className="font-mono">San Francisco, CA</span>
                </a>
              </div>
              
              <div className="flex gap-4 pt-4 border-t border-white/10">
                {[
                  { icon: <Github />, label: "GitHub" },
                  { icon: <Linkedin />, label: "LinkedIn" },
                  { icon: <Twitter />, label: "Twitter" }
                ].map((social, i) => (
                  <a key={i} href="#" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-muted-foreground hover:text-secondary hover:bg-secondary/20 transition-all hover:-translate-y-1">
                    <span className="sr-only">{social.label}</span>
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="md:col-span-3">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-mono text-muted-foreground uppercase">Name</label>
                    <Input id="name" placeholder="John Doe" className="bg-black/50 border-white/10 focus-visible:ring-primary h-12" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-mono text-muted-foreground uppercase">Email</label>
                    <Input id="email" type="email" placeholder="john@example.com" className="bg-black/50 border-white/10 focus-visible:ring-primary h-12" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-mono text-muted-foreground uppercase">Message</label>
                  <Textarea id="message" placeholder="Initialize transmission..." className="bg-black/50 border-white/10 focus-visible:ring-primary min-h-[150px] resize-none" />
                </div>
                <Button type="submit" className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 text-white rounded-xl group relative overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    Send Message <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                </Button>
              </form>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8 border-t border-white/10 bg-background text-center relative z-10">
      <div className="container px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-mono text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Alex Rivera. All rights reserved.</p>
        <p className="flex items-center gap-2">
          Built for <Sparkles className="w-4 h-4 text-primary" /> AI WebForge
        </p>
      </div>
    </footer>
  );
}

export default function Portfolio() {
  return (
    <div className="bg-background text-foreground min-h-screen selection:bg-primary/30 selection:text-primary">
      <NavBar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
