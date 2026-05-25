export interface Project {
  title: string
  description: string
  tags: string[]
  github: string
  live: string
}

export interface Skill {
  name: string
  level: number
  category: 'frontend' | 'backend' | 'database' | 'tools'
}

export interface Experience {
  role: string
  company: string
  period: string
  description: string
  type: 'work' | 'education'
}

export const projects: Project[] = [
  {
    title: 'ShopSphere',
    description:
      'A full-stack e-commerce platform with real-time inventory, JWT auth, Stripe payments, and an admin dashboard. Handles 10k+ products with blazing-fast search.',
    tags: ['MongoDB', 'Express', 'React', 'Node.js', 'Stripe', 'Redis'],
    github: 'https://github.com',
    live: 'https://example.com',
  },
  {
    title: 'TaskFlow',
    description:
      'A collaborative project management tool with drag-and-drop Kanban boards, real-time socket updates, team workspaces, and detailed analytics.',
    tags: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Docker'],
    github: 'https://github.com',
    live: 'https://example.com',
  },
  {
    title: 'DevBlog CMS',
    description:
      'A headless CMS for developer blogs featuring markdown editing, syntax highlighting, SEO tooling, and a RESTful API consumed by a React front-end.',
    tags: ['Express', 'MongoDB', 'React', 'REST API', 'JWT'],
    github: 'https://github.com',
    live: 'https://example.com',
  },
]

export const skills: Skill[] = [
  { name: 'React', level: 92, category: 'frontend' },
  { name: 'TypeScript', level: 88, category: 'frontend' },
  { name: 'JavaScript', level: 95, category: 'frontend' },
  { name: 'HTML / CSS', level: 90, category: 'frontend' },
  { name: 'Node.js', level: 90, category: 'backend' },
  { name: 'Express.js', level: 88, category: 'backend' },
  { name: 'REST APIs', level: 93, category: 'backend' },
  { name: 'GraphQL', level: 72, category: 'backend' },
  { name: 'MongoDB', level: 87, category: 'database' },
  { name: 'PostgreSQL', level: 75, category: 'database' },
  { name: 'Redis', level: 68, category: 'database' },
  { name: 'Git', level: 94, category: 'tools' },
  { name: 'Docker', level: 78, category: 'tools' },
  { name: 'AWS', level: 70, category: 'tools' },
  { name: 'Jest', level: 82, category: 'tools' },
]

export const experience: Experience[] = [
  {
    role: 'Software Engineer',
    company: 'TechCorp Inc.',
    period: '2023 – Present',
    description:
      'Building and scaling microservices for a fintech platform serving 500k+ users. Led the migration from REST to GraphQL, cutting API response times by 40%.',
    type: 'work',
  },
  {
    role: 'Frontend Developer',
    company: 'StartupXYZ',
    period: '2022 – 2023',
    description:
      'Architected the React front-end from scratch, shipping features weekly. Implemented CI/CD pipelines and mentored two junior developers.',
    type: 'work',
  },
  {
    role: 'Junior Web Developer',
    company: 'Digital Agency Co.',
    period: '2021 – 2022',
    description:
      'Delivered 15+ client websites using MERN stack. Introduced automated testing and reduced bug regression rate by 60%.',
    type: 'work',
  },
  {
    role: 'B.S. Computer Science',
    company: 'State University',
    period: '2017 – 2021',
    description:
      'Graduated with honors. Thesis on distributed systems and eventual consistency. Active in hackathons, winning 3 regional competitions.',
    type: 'education',
  },
]
