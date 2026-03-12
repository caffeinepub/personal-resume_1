import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Calendar,
  ChevronDown,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const EXPERIENCE = [
  {
    role: "Senior Software Engineer",
    company: "TechCorp Inc.",
    period: "Jan 2022 – Present",
    location: "San Francisco, CA",
    bullets: [
      "Led architecture of a high-traffic microservices platform serving 2M+ daily active users, reducing latency by 40%.",
      "Mentored a team of 6 engineers, introducing code review best practices and cutting regression rate by 30%.",
      "Drove adoption of TypeScript across the frontend codebase, improving developer experience and type safety.",
    ],
  },
  {
    role: "Software Engineer",
    company: "InnovateLabs",
    period: "Mar 2020 – Dec 2021",
    location: "Austin, TX",
    bullets: [
      "Built and shipped a real-time collaboration tool used by 50+ enterprise clients, leveraging WebSockets and React.",
      "Optimized PostgreSQL query performance, reducing average API response time from 800ms to under 120ms.",
      "Collaborated cross-functionally with design and product to deliver three major product launches on schedule.",
    ],
  },
  {
    role: "Junior Developer",
    company: "StartupXYZ",
    period: "Jun 2018 – Feb 2020",
    location: "Remote",
    bullets: [
      "Developed and maintained customer-facing features using React, Node.js, and Express REST APIs.",
      "Integrated third-party payment and analytics APIs, directly contributing to a 20% increase in conversion rates.",
      "Participated in agile ceremonies and contributed to a culture of continuous integration and rapid iteration.",
    ],
  },
];

const EDUCATION = [
  {
    degree: "B.Sc. Computer Science",
    school: "State University",
    period: "2014 – 2018",
    detail: "Graduated with Honours · GPA 3.8/4.0",
    icon: GraduationCap,
  },
  {
    degree: "Full-Stack Web Dev Bootcamp",
    school: "Code Academy",
    period: "2018",
    detail: "Intensive 12-week program · Top 5% cohort",
    icon: Briefcase,
  },
];

const SKILLS = [
  {
    category: "Languages",
    items: ["JavaScript", "TypeScript", "Python", "Go"],
  },
  {
    category: "Frameworks",
    items: ["React", "Node.js", "Express", "Tailwind CSS"],
  },
  {
    category: "Tools",
    items: ["Git", "Docker", "AWS", "Figma"],
  },
  {
    category: "Soft Skills",
    items: ["Leadership", "Communication", "Problem Solving", "Agile/Scrum"],
  },
];

// ─── Components ───────────────────────────────────────────────────────────────

function SectionHeader({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-12 text-center">
      <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
        {eyebrow}
      </span>
      <h2 className="mt-2 text-3xl sm:text-4xl font-display font-bold text-foreground">
        {title}
      </h2>
      <div className="mx-auto mt-4 h-0.5 w-16 rounded-full bg-primary" />
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/95 backdrop-blur-md shadow-xs border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          type="button"
          onClick={() => handleNav("#hero")}
          className="font-display font-bold text-xl tracking-tight text-foreground hover:text-primary transition-colors"
        >
          AJ<span className="text-primary">.</span>
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link, i) => (
            <li key={link.href}>
              <button
                type="button"
                data-ocid={`nav.link.${i + 1}`}
                onClick={() => handleNav(link.href)}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          type="button"
          data-ocid="nav.toggle"
          className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-card/95 backdrop-blur-md border-b border-border overflow-hidden"
          >
            <ul className="px-6 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <li key={link.href}>
                  <button
                    type="button"
                    data-ocid={`nav.link.${i + 1}`}
                    onClick={() => handleNav(link.href)}
                    className="w-full text-left px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center gradient-hero text-white px-6 overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute top-20 right-0 w-96 h-96 rounded-full opacity-10"
        style={{
          background: "oklch(0.68 0.14 55)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute bottom-20 left-0 w-72 h-72 rounded-full opacity-5"
        style={{
          background: "oklch(0.68 0.14 55)",
          filter: "blur(60px)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative text-center max-w-3xl mx-auto"
      >
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mb-8 relative w-36 h-36"
        >
          <div className="absolute inset-0 rounded-full shadow-glow" />
          <img
            src="/assets/generated/avatar-placeholder.dim_400x400.png"
            alt="Alex Johnson"
            className="w-36 h-36 rounded-full object-cover border-4 border-white/20 relative z-10"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">
            Available for hire
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold mb-4 leading-tight">
            Alex Johnson
          </h1>
          <h2 className="text-xl sm:text-2xl font-body font-light text-white/70 mb-6">
            Senior Software Engineer
          </h2>
          <p className="text-base sm:text-lg text-white/60 max-w-xl mx-auto mb-10 leading-relaxed">
            Crafting elegant, high-performance software with a passion for clean
            architecture and exceptional user experiences.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              data-ocid="hero.primary_button"
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 shadow-glow transition-all duration-300 hover:scale-105"
              onClick={() =>
                document
                  .getElementById("experience")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View My Work
            </Button>
            <Button
              data-ocid="hero.secondary_button"
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-8 font-semibold transition-all duration-300 hover:scale-105"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Get In Touch
            </Button>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={16} className="animate-bounce" />
      </motion.div>
    </section>
  );
}

function AboutSection() {
  const stats = [
    { value: "5+", label: "Years Experience" },
    { value: "20+", label: "Projects Shipped" },
    { value: "10+", label: "Happy Clients" },
    { value: "3", label: "Open Source Tools" },
  ];

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="Who I Am" title="About Me" />
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              I&apos;m a passionate software engineer with over five years of
              experience building scalable web applications and distributed
              systems. I thrive at the intersection of clean engineering and
              thoughtful product design.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Currently based in San Francisco, I&apos;ve worked across
              early-stage startups and established tech companies, shipping
              products used by millions of people worldwide.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              When I&apos;m not writing code, you&apos;ll find me contributing
              to open source, hiking trails around the Bay Area, or
              experimenting with specialty coffee.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-card border border-border rounded-xl p-6 text-center shadow-card hover:border-primary/40 transition-all duration-300 hover:-translate-y-1"
              >
                <p className="text-3xl font-display font-bold text-primary mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="py-24 px-6 section-alt">
      <div className="max-w-4xl mx-auto">
        <SectionHeader eyebrow="Career" title="Work Experience" />

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 timeline-line" />

          <div className="space-y-10">
            {EXPERIENCE.map((job, i) => (
              <motion.div
                key={job.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-16"
              >
                {/* Timeline dot */}
                <div className="absolute left-4 top-6 w-4 h-4 rounded-full bg-primary border-2 border-background shadow-sm -translate-x-1/2" />

                <div className="bg-card border border-border rounded-xl p-6 shadow-card hover:border-primary/30 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-lg font-display font-bold text-foreground">
                        {job.role}
                      </h3>
                      <p className="text-primary font-semibold text-sm">
                        {job.company}
                      </p>
                    </div>
                    <div className="flex flex-col sm:items-end gap-1 shrink-0">
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar size={12} />
                        {job.period}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin size={12} />
                        {job.location}
                      </span>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {job.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function EducationSection() {
  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeader eyebrow="Academic" title="Education" />
        <div className="grid sm:grid-cols-2 gap-6">
          {EDUCATION.map((edu, i) => {
            const Icon = edu.icon;
            return (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card border border-border rounded-xl p-8 shadow-card hover:border-primary/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                  <Icon size={22} className="text-primary" />
                </div>
                <h3 className="text-lg font-display font-bold text-foreground mb-1">
                  {edu.degree}
                </h3>
                <p className="text-primary font-semibold text-sm mb-2">
                  {edu.school}
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5 mb-3">
                  <Calendar size={12} />
                  {edu.period}
                </p>
                <p className="text-sm text-muted-foreground">{edu.detail}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-6 section-alt">
      <div className="max-w-4xl mx-auto">
        <SectionHeader eyebrow="Expertise" title="Skills" />
        <div className="grid sm:grid-cols-2 gap-8">
          {SKILLS.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-card border border-border rounded-xl p-6 shadow-card"
            >
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span key={skill} className="skill-badge">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const contacts = [
    {
      icon: Mail,
      label: "alex.johnson@email.com",
      href: "mailto:alex.johnson@email.com",
    },
    {
      icon: Phone,
      label: "+1 (555) 012-3456",
      href: "tel:+15550123456",
    },
    {
      icon: Linkedin,
      label: "linkedin.com/in/alexjohnson",
      href: "https://linkedin.com/in/alexjohnson",
    },
    {
      icon: Github,
      label: "github.com/alexjohnson",
      href: "https://github.com/alexjohnson",
    },
  ];

  return (
    <section id="contact" className="py-24 px-6 gradient-hero text-white">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
            Let&apos;s Connect
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-display font-bold text-white mb-3">
            Get In Touch
          </h2>
          <div className="mx-auto mt-4 mb-6 h-0.5 w-16 rounded-full bg-primary" />

          <p className="text-white/60 mb-3 text-base">
            I&apos;m currently open to new opportunities — whether it&apos;s a
            full-time role, freelance project, or just a great conversation.
          </p>
          <Badge className="bg-primary/20 text-primary border-primary/30 mb-12 text-sm px-4 py-1.5">
            ✦ Open to new opportunities
          </Badge>

          <div className="grid sm:grid-cols-2 gap-4">
            {contacts.map((c, i) => {
              const Icon = c.icon;
              return (
                <a
                  key={c.href}
                  data-ocid={`contact.link.${i + 1}`}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/30 transition-colors">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <span className="text-sm text-white/70 group-hover:text-white transition-colors truncate">
                    {c.label}
                  </span>
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const utm = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;
  return (
    <footer className="py-8 px-6 bg-foreground/5 border-t border-border text-center">
      <p className="text-sm text-muted-foreground">
        © {year}. Built with ❤ using{" "}
        <a
          href={utm}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline font-medium"
        >
          caffeine.ai
        </a>
      </p>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <EducationSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
