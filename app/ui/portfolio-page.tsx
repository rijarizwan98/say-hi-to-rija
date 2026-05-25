import { css, type RemixNode } from 'remix/ui'

import { ContactForm } from '../assets/contact-form.tsx'
import { MobileNavToggle } from '../assets/mobile-nav.tsx'
import { ScrollRevealSection } from '../assets/scroll-reveal.tsx'
import { SkillBar } from '../assets/skill-bar.tsx'
import { TypewriterText } from '../assets/typewriter.tsx'
import { experience, projects, skills } from '../data/portfolio.ts'

// ─── Tokens ──────────────────────────────────────────────────────────────────

const TOKENS = {
  '--bg-primary': '#07070f',
  '--bg-secondary': '#0c0c1d',
  '--bg-card': '#10101e',
  '--bg-card-hover': '#141428',
  '--neon-purple': '#9b00e8',
  '--neon-pink': '#ff007a',
  '--neon-yellow': '#f5ff00',
  '--text-primary': '#e8e8f5',
  '--text-secondary': '#8888aa',
  '--border': 'rgba(155, 0, 232, 0.18)',
  '--font-body': "'Inter', 'Helvetica Neue', Arial, sans-serif",
  '--font-mono': "'JetBrains Mono', ui-monospace, Menlo, monospace",
}

// ─── Document Head ────────────────────────────────────────────────────────────

export function PortfolioHead() {
  return () => (
    <>
      <meta name="color-scheme" content="dark" />
      <meta
        name="description"
        content="Full Stack Developer specializing in the MERN stack — MongoDB, Express, React, Node.js."
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
      />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; }
        ::selection { background: rgba(155,0,232,0.35); color: #fff; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #07070f; }
        ::-webkit-scrollbar-thumb { background: rgba(155,0,232,0.4); border-radius: 3px; }
        @keyframes float {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-18px) rotate(1deg); }
          66% { transform: translateY(-8px) rotate(-1deg); }
        }
        @keyframes pulse-glow {
          0%,100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </>
  )
}

// ─── Root page ────────────────────────────────────────────────────────────────

export function PortfolioPage() {
  return () => (
    <div
      mix={css({
        ...TOKENS,
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-body)',
        fontSize: '16px',
        lineHeight: 1.6,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        '& *, & *::before, & *::after': { boxSizing: 'border-box' },
      })}
    >
      <Navbar />
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
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

function Navbar() {
  return () => (
    <header
      mix={css({
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 max(24px, calc((100vw - 1100px)/2))',
        background: 'rgba(7, 7, 20, 0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(155, 0, 232, 0.12)',
      })}
    >
      <a
        href="#hero"
        mix={css({
          fontFamily: 'var(--font-mono)',
          fontWeight: 700,
          fontSize: '18px',
          color: 'transparent',
          textDecoration: 'none',
          background: 'linear-gradient(90deg, var(--neon-purple), var(--neon-pink))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.01em',
        })}
      >
        {'<Dev />'}
      </a>

      <nav
        mix={css({
          marginLeft: 'auto',
          display: 'flex',
          gap: '4px',
          '@media (max-width: 768px)': { display: 'none' },
        })}
        aria-label="Main navigation"
      >
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            mix={css({
              padding: '6px 14px',
              borderRadius: '8px',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 500,
              letterSpacing: '0.02em',
              transition: 'color 0.2s ease, background 0.2s ease',
              '&:hover': {
                color: 'var(--text-primary)',
                background: 'rgba(155, 0, 232, 0.1)',
              },
            })}
          >
            {label}
          </a>
        ))}
      </nav>

      <div mix={css({ marginLeft: '16px', '@media (min-width: 769px)': { display: 'none' } })}>
        <MobileNavToggle />
      </div>
    </header>
  )
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  return () => (
    <section
      id="hero"
      mix={css({
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '80px max(24px, calc((100vw - 1100px)/2)) 60px',
        overflow: 'hidden',
      })}
    >
      {/* Decorative blobs */}
      <div
        aria-hidden="true"
        mix={css({
          position: 'absolute',
          top: '15%',
          right: '8%',
          width: '420px',
          height: '420px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(155,0,232,0.18) 0%, transparent 70%)',
          filter: 'blur(50px)',
          animation: 'float 8s ease-in-out infinite',
          pointerEvents: 'none',
        })}
      />
      <div
        aria-hidden="true"
        mix={css({
          position: 'absolute',
          bottom: '20%',
          left: '5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,0,122,0.14) 0%, transparent 70%)',
          filter: 'blur(50px)',
          animation: 'float 10s ease-in-out infinite reverse',
          pointerEvents: 'none',
        })}
      />
      <div
        aria-hidden="true"
        mix={css({
          position: 'absolute',
          top: '50%',
          left: '40%',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,255,0,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
          animation: 'pulse-glow 5s ease-in-out infinite',
          pointerEvents: 'none',
        })}
      />

      <div
        mix={css({
          position: 'relative',
          zIndex: 1,
          maxWidth: '780px',
          width: '100%',
        })}
      >
        <p
          mix={css({
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            fontWeight: 500,
            color: 'var(--neon-purple)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            margin: '0 0 20px',
          })}
        >
          Hello, World — I'm
        </p>

        <h1
          mix={css({
            margin: '0 0 16px',
            fontSize: 'clamp(44px, 8vw, 80px)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
          })}
        >
          Rija Rizwan
        </h1>

        <p
          mix={css({
            margin: '0 0 28px',
            fontSize: 'clamp(22px, 4vw, 34px)',
            fontWeight: 700,
            letterSpacing: '-0.01em',
            background:
              'linear-gradient(90deg, var(--neon-purple) 0%, var(--neon-pink) 50%, var(--neon-yellow) 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'gradient-shift 4s ease infinite',
          })}
        >
          Full Stack Developer
        </p>

        <p
          mix={css({
            margin: '0 0 40px',
            fontSize: 'clamp(16px, 2vw, 19px)',
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-mono)',
            minHeight: '28px',
          })}
        >
          <TypewriterText
            phrases={[
              'Building scalable MERN stack apps.',
              'Turning ideas into production code.',
              'RESTful APIs that just work.',
              'Clean code. Real results.',
              'Open to exciting opportunities.',
            ]}
          />
        </p>

        <div
          mix={css({
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
          })}
        >
          <a
            href="#projects"
            mix={css({
              padding: '13px 30px',
              background: 'linear-gradient(135deg, var(--neon-purple), var(--neon-pink))',
              color: '#fff',
              fontWeight: 700,
              fontSize: '15px',
              textDecoration: 'none',
              borderRadius: '10px',
              letterSpacing: '0.02em',
              boxShadow: '0 0 24px rgba(155,0,232,0.4)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 8px 32px rgba(255,0,122,0.5)',
              },
            })}
          >
            View My Work
          </a>
          <a
            href="#contact"
            mix={css({
              padding: '13px 30px',
              background: 'transparent',
              color: 'var(--text-primary)',
              fontWeight: 600,
              fontSize: '15px',
              textDecoration: 'none',
              borderRadius: '10px',
              letterSpacing: '0.02em',
              border: '1px solid rgba(155, 0, 232, 0.4)',
              transition: 'border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
              '&:hover': {
                borderColor: 'var(--neon-purple)',
                color: 'var(--neon-purple)',
                boxShadow: '0 0 16px rgba(155,0,232,0.2)',
                transform: 'translateY(-3px)',
              },
            })}
          >
            Contact Me
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        mix={css({
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          opacity: 0.5,
        })}
        aria-hidden="true"
      >
        <span
          mix={css({
            fontSize: '11px',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--text-secondary)',
          })}
        >
          scroll
        </span>
        <div
          mix={css({
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, var(--neon-purple), transparent)',
            animation: 'pulse-glow 2s ease-in-out infinite',
          })}
        />
      </div>
    </section>
  )
}

// ─── About Section ────────────────────────────────────────────────────────────

function AboutSection() {
  return () => (
    <section
      id="about"
      mix={css({
        padding: '100px max(24px, calc((100vw - 1100px)/2))',
        background: 'var(--bg-secondary)',
      })}
    >
      <ScrollRevealSection>
        <SectionLabel>About Me</SectionLabel>
        <SectionTitle>Who I Am</SectionTitle>

        <div
          mix={css({
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '64px',
            alignItems: 'center',
            marginTop: '48px',
            '@media (max-width: 768px)': {
              gridTemplateColumns: '1fr',
              gap: '40px',
            },
          })}
        >
          {/* Photo placeholder */}
          <div
            mix={css({
              display: 'flex',
              justifyContent: 'center',
            })}
          >
            <div
              mix={css({
                position: 'relative',
                width: '280px',
                height: '280px',
                borderRadius: '50%',
                '@media (max-width: 768px)': {
                  width: '200px',
                  height: '200px',
                },
              })}
            >
              {/* Rotating gradient ring */}
              <div
                mix={css({
                  position: 'absolute',
                  inset: '-4px',
                  borderRadius: '50%',
                  background:
                    'conic-gradient(from 0deg, var(--neon-purple), var(--neon-pink), var(--neon-yellow), var(--neon-purple))',
                  animation: 'gradient-shift 4s linear infinite',
                  backgroundSize: '200% 200%',
                })}
                aria-hidden="true"
              />
              <div
                mix={css({
                  position: 'absolute',
                  inset: '4px',
                  borderRadius: '50%',
                  background: 'var(--bg-card)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                })}
              >
                <AvatarPlaceholder />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div
            mix={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            })}
          >
            <p
              mix={css({
                margin: 0,
                fontSize: '17px',
                lineHeight: 1.75,
                color: 'var(--text-secondary)',
              })}
            >
              I'm a Full Stack Developer with 3+ years of experience building production-grade web
              applications. I specialize in the MERN stack and love architecting systems that are
              both elegant and resilient.
            </p>
            <p
              mix={css({
                margin: 0,
                fontSize: '17px',
                lineHeight: 1.75,
                color: 'var(--text-secondary)',
              })}
            >
              When I'm not pushing code, I'm contributing to open-source, writing technical
              articles, or experimenting with new APIs. I believe great software is built through
              clear thinking, honest feedback, and an obsession with the details.
            </p>

            {/* Stats */}
            <div
              mix={css({
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
                marginTop: '12px',
              })}
            >
              {[
                { value: '3+', label: 'Years Experience' },
                { value: '20+', label: 'Projects Shipped' },
                { value: '5k+', label: 'GitHub Commits' },
              ].map(({ value, label }) => (
                <div key={label} mix={statCardStyle}>
                  <span mix={statValueStyle}>{value}</span>
                  <span mix={statLabelStyle}>{label}</span>
                </div>
              ))}
            </div>

            <a
              href="/resume.pdf"
              download
              mix={css({
                alignSelf: 'flex-start',
                marginTop: '8px',
                padding: '11px 24px',
                border: '1px solid rgba(155,0,232,0.4)',
                borderRadius: '9px',
                color: 'var(--neon-purple)',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 600,
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.04em',
                transition: 'border-color 0.2s, color 0.2s, background 0.2s',
                '&:hover': {
                  borderColor: 'var(--neon-purple)',
                  background: 'rgba(155,0,232,0.1)',
                  color: '#fff',
                },
              })}
            >
              Download Résumé ↓
            </a>
          </div>
        </div>
      </ScrollRevealSection>
    </section>
  )
}

const statCardStyle = css({
  background: 'rgba(155,0,232,0.07)',
  border: '1px solid rgba(155,0,232,0.15)',
  borderRadius: '12px',
  padding: '16px 12px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '4px',
  textAlign: 'center',
})

const statValueStyle = css({
  fontSize: '24px',
  fontWeight: 800,
  background: 'linear-gradient(90deg, var(--neon-purple), var(--neon-pink))',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
})

const statLabelStyle = css({
  fontSize: '11px',
  color: 'var(--text-secondary)',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  fontFamily: 'var(--font-mono)',
})

function AvatarPlaceholder() {
  return () => (
    <svg
      viewBox="0 0 100 100"
      mix={css({ width: '70%', height: '70%', color: 'rgba(155,0,232,0.3)' })}
    >
      <circle cx="50" cy="38" r="22" fill="currentColor" opacity="0.8" />
      <ellipse cx="50" cy="90" rx="35" ry="26" fill="currentColor" opacity="0.5" />
    </svg>
  )
}

// ─── Skills Section ───────────────────────────────────────────────────────────

const SKILL_COLORS: Record<string, string> = {
  frontend: '#9b00e8',
  backend: '#ff007a',
  database: '#00c8ff',
  tools: '#f5ff00',
}

const SKILL_CATEGORY_LABELS: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  tools: 'Tools & DevOps',
}

function SkillsSection() {
  let categories = ['frontend', 'backend', 'database', 'tools'] as const

  return () => (
    <section
      id="skills"
      mix={css({
        padding: '100px max(24px, calc((100vw - 1100px)/2))',
      })}
    >
      <ScrollRevealSection>
        <SectionLabel>My Toolkit</SectionLabel>
        <SectionTitle>Skills & Technologies</SectionTitle>

        <div
          mix={css({
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '32px',
            marginTop: '48px',
            '@media (max-width: 768px)': { gridTemplateColumns: '1fr' },
          })}
        >
          {categories.map((cat) => {
            let catSkills = skills.filter((s) => s.category === cat)
            return (
              <div key={cat} mix={skillCardStyle}>
                <h3 mix={skillCatTitleStyle}>
                  <span
                    mix={css({ display: 'inline-block', marginRight: '8px' })}
                    style={{ color: SKILL_COLORS[cat] }}
                  >
                    ●
                  </span>
                  {SKILL_CATEGORY_LABELS[cat]}
                </h3>
                <div mix={css({ display: 'flex', flexDirection: 'column', gap: '18px' })}>
                  {catSkills.map((skill, i) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      color={SKILL_COLORS[cat]!}
                      delay={i * 80}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Tech badge cloud */}
        <div
          mix={css({
            marginTop: '48px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            justifyContent: 'center',
          })}
        >
          {[
            'MongoDB', 'Express.js', 'React', 'Node.js', 'TypeScript', 'REST APIs',
            'GraphQL', 'Docker', 'AWS', 'Git', 'Jest', 'Redis', 'PostgreSQL', 'Socket.io',
          ].map((tech) => (
            <span key={tech} mix={techBadgeStyle}>
              {tech}
            </span>
          ))}
        </div>
      </ScrollRevealSection>
    </section>
  )
}

const skillCardStyle = css({
  background: 'var(--bg-card)',
  border: '1px solid var(--border)',
  borderRadius: '16px',
  padding: '28px',
})

const skillCatTitleStyle = css({
  margin: '0 0 20px',
  fontSize: '14px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: 'var(--text-secondary)',
  fontFamily: 'var(--font-mono)',
})

const techBadgeStyle = css({
  padding: '6px 14px',
  background: 'rgba(155,0,232,0.07)',
  border: '1px solid rgba(155,0,232,0.2)',
  borderRadius: '20px',
  fontSize: '13px',
  fontFamily: 'var(--font-mono)',
  color: 'var(--text-secondary)',
  transition: 'border-color 0.2s, color 0.2s, background 0.2s, transform 0.2s',
  cursor: 'default',
  '&:hover': {
    borderColor: 'var(--neon-purple)',
    color: 'var(--neon-purple)',
    background: 'rgba(155,0,232,0.12)',
    transform: 'scale(1.05)',
  },
})

// ─── Projects Section ─────────────────────────────────────────────────────────

function ProjectsSection() {
  return () => (
    <section
      id="projects"
      mix={css({
        padding: '100px max(24px, calc((100vw - 1100px)/2))',
        background: 'var(--bg-secondary)',
      })}
    >
      <ScrollRevealSection>
        <SectionLabel>My Work</SectionLabel>
        <SectionTitle>Featured Projects</SectionTitle>

        <div
          mix={css({
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            marginTop: '48px',
            '@media (max-width: 900px)': { gridTemplateColumns: '1fr 1fr' },
            '@media (max-width: 600px)': { gridTemplateColumns: '1fr' },
          })}
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </ScrollRevealSection>
    </section>
  )
}

interface ProjectCardProps {
  project: (typeof projects)[number]
  index: number
}

function ProjectCard() {
  return ({ project, index }: ProjectCardProps) => (
    <div
      mix={css({
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          borderRadius: '16px',
          background:
            'linear-gradient(135deg, rgba(155,0,232,0.06) 0%, rgba(255,0,122,0.04) 100%)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
        },
        '&:hover': {
          transform: 'translateY(-6px)',
          borderColor: 'rgba(155,0,232,0.45)',
          boxShadow:
            '0 8px 32px rgba(155,0,232,0.2), 0 0 64px rgba(155,0,232,0.08)',
        },
        '&:hover::before': { opacity: 1 },
      })}
    >
      {/* Project number */}
      <span
        mix={css({
          position: 'absolute',
          top: '20px',
          right: '24px',
          fontFamily: 'var(--font-mono)',
          fontSize: '36px',
          fontWeight: 800,
          color: 'rgba(155,0,232,0.1)',
          lineHeight: 1,
          userSelect: 'none',
        })}
        aria-hidden="true"
      >
        0{index + 1}
      </span>

      <h3
        mix={css({
          margin: 0,
          fontSize: '19px',
          fontWeight: 700,
          color: 'var(--text-primary)',
          lineHeight: 1.3,
        })}
      >
        {project.title}
      </h3>

      <p
        mix={css({
          margin: 0,
          fontSize: '14px',
          lineHeight: 1.65,
          color: 'var(--text-secondary)',
          flexGrow: 1,
        })}
      >
        {project.description}
      </p>

      <div
        mix={css({
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px',
        })}
      >
        {project.tags.map((tag) => (
          <span key={tag} mix={projectTagStyle}>
            {tag}
          </span>
        ))}
      </div>

      <div
        mix={css({
          display: 'flex',
          gap: '12px',
          marginTop: '4px',
          paddingTop: '16px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        })}
      >
        <a href={project.github} target="_blank" rel="noopener noreferrer" mix={projectLinkStyle}>
          <GitHubMini />
          GitHub
        </a>
        <a href={project.live} target="_blank" rel="noopener noreferrer" mix={projectLinkStyle}>
          <ExternalIcon />
          Live Demo
        </a>
      </div>
    </div>
  )
}

const projectTagStyle = css({
  padding: '3px 10px',
  background: 'rgba(155,0,232,0.09)',
  border: '1px solid rgba(155,0,232,0.18)',
  borderRadius: '4px',
  fontSize: '11px',
  fontFamily: 'var(--font-mono)',
  color: 'var(--neon-purple)',
  fontWeight: 500,
  letterSpacing: '0.04em',
})

const projectLinkStyle = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  fontSize: '13px',
  fontWeight: 600,
  color: 'var(--text-secondary)',
  textDecoration: 'none',
  fontFamily: 'var(--font-mono)',
  transition: 'color 0.2s ease',
  '& svg': { width: '14px', height: '14px' },
  '&:hover': { color: 'var(--neon-pink)' },
})

function GitHubMini() {
  return () => (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path
        fill-rule="evenodd"
        d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
        clip-rule="evenodd"
      />
    </svg>
  )
}

function ExternalIcon() {
  return () => (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

// ─── Experience Section ───────────────────────────────────────────────────────

function ExperienceSection() {
  return () => (
    <section
      id="experience"
      mix={css({
        padding: '100px max(24px, calc((100vw - 1100px)/2))',
      })}
    >
      <ScrollRevealSection>
        <SectionLabel>My Journey</SectionLabel>
        <SectionTitle>Experience & Education</SectionTitle>

        <div
          mix={css({
            position: 'relative',
            marginTop: '56px',
            paddingLeft: '32px',
            '&::before': {
              content: '""',
              position: 'absolute',
              left: '7px',
              top: 0,
              bottom: 0,
              width: '2px',
              background:
                'linear-gradient(to bottom, var(--neon-purple), var(--neon-pink), var(--neon-purple))',
              opacity: 0.35,
            },
          })}
        >
          {experience.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} />
          ))}
        </div>
      </ScrollRevealSection>
    </section>
  )
}

interface TimelineItemProps {
  item: (typeof experience)[number]
  index: number
}

function TimelineItem() {
  return ({ item, index }: TimelineItemProps) => (
    <div
      mix={css({
        position: 'relative',
        paddingBottom: '40px',
        '&:last-child': { paddingBottom: 0 },
      })}
    >
      {/* Dot */}
      <div
        aria-hidden="true"
        mix={css({
          position: 'absolute',
          left: '-29px',
          top: '4px',
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          border: '2px solid var(--neon-purple)',
          background: item.type === 'education' ? 'var(--neon-yellow)' : 'var(--neon-purple)',
          boxShadow:
            item.type === 'education'
              ? '0 0 12px var(--neon-yellow)'
              : '0 0 12px var(--neon-purple)',
          zIndex: 1,
        })}
        style={{
          borderColor: item.type === 'education' ? 'var(--neon-yellow)' : 'var(--neon-purple)',
        }}
      />

      <div
        mix={css({
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '14px',
          padding: '24px 28px',
          transition: 'border-color 0.3s, box-shadow 0.3s',
          '&:hover': {
            borderColor: 'rgba(155,0,232,0.35)',
            boxShadow: '0 4px 20px rgba(155,0,232,0.12)',
          },
        })}
      >
        <div
          mix={css({
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '12px',
            flexWrap: 'wrap',
            marginBottom: '10px',
          })}
        >
          <div>
            <h3
              mix={css({
                margin: '0 0 4px',
                fontSize: '17px',
                fontWeight: 700,
                color: 'var(--text-primary)',
              })}
            >
              {item.role}
            </h3>
            <p
              mix={css({
                margin: 0,
                fontSize: '14px',
                fontWeight: 600,
                color: item.type === 'education' ? 'var(--neon-yellow)' : 'var(--neon-purple)',
                fontFamily: 'var(--font-mono)',
              })}
            >
              {item.company}
            </p>
          </div>
          <span
            mix={css({
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 500,
              background:
                item.type === 'education'
                  ? 'rgba(245,255,0,0.08)'
                  : 'rgba(155,0,232,0.1)',
              color:
                item.type === 'education' ? 'var(--neon-yellow)' : 'var(--neon-purple)',
              border:
                item.type === 'education'
                  ? '1px solid rgba(245,255,0,0.2)'
                  : '1px solid rgba(155,0,232,0.25)',
              whiteSpace: 'nowrap',
            })}
          >
            {item.period}
          </span>
        </div>
        <p
          mix={css({
            margin: 0,
            fontSize: '14px',
            lineHeight: 1.7,
            color: 'var(--text-secondary)',
          })}
        >
          {item.description}
        </p>
      </div>
    </div>
  )
}

// ─── Contact Section ──────────────────────────────────────────────────────────

function ContactSection() {
  return () => (
    <section
      id="contact"
      mix={css({
        padding: '100px max(24px, calc((100vw - 1100px)/2))',
        background: 'var(--bg-secondary)',
      })}
    >
      <ScrollRevealSection>
        <SectionLabel>Get In Touch</SectionLabel>
        <SectionTitle>Let's Work Together</SectionTitle>

        <div
          mix={css({
            display: 'grid',
            gridTemplateColumns: '1fr 1.6fr',
            gap: '56px',
            marginTop: '48px',
            alignItems: 'start',
            '@media (max-width: 800px)': { gridTemplateColumns: '1fr', gap: '40px' },
          })}
        >
          {/* Left column */}
          <div mix={css({ display: 'flex', flexDirection: 'column', gap: '32px' })}>
            <p
              mix={css({
                margin: 0,
                fontSize: '16px',
                lineHeight: 1.75,
                color: 'var(--text-secondary)',
              })}
            >
              I'm currently open to new opportunities. Whether you have a project in mind, a question,
              or just want to say hi — my inbox is always open.
            </p>

            <div mix={css({ display: 'flex', flexDirection: 'column', gap: '16px' })}>
              <ContactInfoRow icon={<MailIcon />} label="Email" value="alex@example.com" />
              <ContactInfoRow icon={<MapPinIcon />} label="Location" value="San Francisco, CA" />
            </div>

            {/* Social links */}
            <div mix={css({ display: 'flex', gap: '12px', flexWrap: 'wrap' })}>
              {[
                { label: 'GitHub', href: 'https://github.com', Icon: GitHubIcon },
                { label: 'LinkedIn', href: 'https://linkedin.com', Icon: LinkedInIcon },
                { label: 'Twitter', href: 'https://twitter.com', Icon: TwitterIcon },
              ].map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  mix={css({
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    border: '1px solid rgba(155,0,232,0.25)',
                    background: 'rgba(155,0,232,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition: 'border-color 0.2s, color 0.2s, background 0.2s, transform 0.2s, box-shadow 0.2s',
                    '& svg': { width: '18px', height: '18px' },
                    '&:hover': {
                      borderColor: 'var(--neon-purple)',
                      color: 'var(--neon-purple)',
                      background: 'rgba(155,0,232,0.12)',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 6px 16px rgba(155,0,232,0.2)',
                    },
                  })}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div
            mix={css({
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              padding: '36px',
              '@media (max-width: 480px)': { padding: '24px' },
            })}
          >
            <ContactForm />
          </div>
        </div>
      </ScrollRevealSection>
    </section>
  )
}

interface ContactInfoRowProps {
  icon: RemixNode
  label: string
  value: string
}

function ContactInfoRow() {
  return ({ icon, label, value }: ContactInfoRowProps) => (
    <div mix={css({ display: 'flex', alignItems: 'center', gap: '12px' })}>
      <div
        mix={css({
          width: '40px',
          height: '40px',
          borderRadius: '10px',
          background: 'rgba(155,0,232,0.1)',
          border: '1px solid rgba(155,0,232,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--neon-purple)',
          flexShrink: 0,
          '& svg': { width: '16px', height: '16px' },
        })}
      >
        {icon}
      </div>
      <div>
        <p
          mix={css({
            margin: '0 0 2px',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-mono)',
          })}
        >
          {label}
        </p>
        <p mix={css({ margin: 0, fontSize: '14px', color: 'var(--text-primary)', fontWeight: 500 })}>{value}</p>
      </div>
    </div>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return () => (
    <footer
      mix={css({
        borderTop: '1px solid rgba(155,0,232,0.12)',
        padding: '32px max(24px, calc((100vw - 1100px)/2))',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        flexWrap: 'wrap',
        background: 'var(--bg-primary)',
      })}
    >
      <p
        mix={css({
          margin: 0,
          fontSize: '13px',
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-mono)',
        })}
      >
        © 2026 Rija Rizwan — Built with{' '}
        <span style={{ color: 'var(--neon-purple)' }}>Remix</span> +{' '}
        <span style={{ color: 'var(--neon-pink)' }}>♥</span>
      </p>
      <p
        mix={css({
          margin: 0,
          fontSize: '12px',
          color: 'rgba(255,255,255,0.25)',
          fontFamily: 'var(--font-mono)',
        })}
      >
        Designed & coded from scratch
      </p>
    </footer>
  )
}

// ─── Shared Section Primitives ────────────────────────────────────────────────

function SectionLabel() {
  return ({ children }: { children: RemixNode }) => (
    <p
      mix={css({
        margin: '0 0 12px',
        fontSize: '12px',
        fontWeight: 700,
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'var(--neon-purple)',
      })}
    >
      {children}
    </p>
  )
}

function SectionTitle() {
  return ({ children }: { children: RemixNode }) => (
    <h2
      mix={css({
        margin: 0,
        fontSize: 'clamp(28px, 4vw, 42px)',
        fontWeight: 800,
        letterSpacing: '-0.02em',
        color: 'var(--text-primary)',
        lineHeight: 1.15,
      })}
    >
      {children}
    </h2>
  )
}

// ─── Social/Contact icons ─────────────────────────────────────────────────────

function GitHubIcon() {
  return () => (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path
        fill-rule="evenodd"
        d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
        clip-rule="evenodd"
      />
    </svg>
  )
}

function LinkedInIcon() {
  return () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function TwitterIcon() {
  return () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function MailIcon() {
  return () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function MapPinIcon() {
  return () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

