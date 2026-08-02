/**
 * Single source of truth for every piece of content on the site.
 * Edit this file to update the portfolio — no component changes needed.
 */

export const site = {
  name: "Nirbhay Gaikwad",
  shortName: "Nirbhay",
  initials: "NG",
  role: "Full-Stack Developer",
  // Rotating words in the hero headline
  roles: [
    "Full-Stack Developer",
    "MERN Stack Engineer",
    "Data Analyst Intern",
    "AI/ML Learner",
  ],
  tagline:
    "I build things for the web, and I'm teaching myself to make them think.",
  bio: [
    "I'm a BSc Information Technology graduate from Mumbai who fell for the web the first time a fetch call returned real data. Since then I've been building full-stack products end to end — React on the front, Node and Express in the middle, MongoDB or MySQL underneath.",
    "Right now I'm a Data Analyst Intern at the IIT Bombay Development and Relations Foundation, where working with real datasets pulled me toward the next thing I want to be good at: machine learning and data science. So I'm doing both — shipping web apps, and learning to build the models behind them.",
  ],
  location: "Mumbai, India",
  availability: "Open to opportunities",

  email: "nirbhay2004g@gmail.com",
  phone: "+91 91365 97253",
  phoneHref: "+919136597253",
  github: "https://github.com/Nirbhaygaikwad",
  githubHandle: "Nirbhaygaikwad",
  linkedin: "https://www.linkedin.com/in/nirbhay-gaikwad",
  linkedinHandle: "nirbhay-gaikwad",
  resume: "/Nirbhay_Gaikwad_Resume.pdf",

  // Set in .env.local as NEXT_PUBLIC_WEB3FORMS_KEY — see README
  web3formsKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "",

  // Change to your real domain once deployed (used for SEO + social cards)
  url: "https://nirbhay-gaikwad.vercel.app",
} as const;

/* ------------------------------------------------------------------ */
/* Stats — the small counters under the hero                           */
/* ------------------------------------------------------------------ */

export const stats = [
  { value: 3, suffix: "+", label: "Projects shipped" },
  { value: 2, suffix: "", label: "Internships" },
  { value: 8, suffix: "+", label: "Technologies" },
  { value: 2025, suffix: "", label: "BSc IT graduate", raw: true },
] as const;

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

export type SkillGroup = {
  title: string;
  hint: string;
  accent: "lime" | "cyan" | "amber";
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    hint: "What I think in",
    accent: "lime",
    items: ["JavaScript", "Python", "Java", "SQL", "HTML5", "CSS3"],
  },
  {
    title: "Frameworks & Libraries",
    hint: "What I build with",
    accent: "lime",
    items: ["React.js", "Node.js", "Express.js", "Redux Toolkit"],
  },
  {
    title: "Databases",
    hint: "Where the data lives",
    accent: "cyan",
    items: ["MongoDB", "MySQL"],
  },
  {
    title: "Tools & Platforms",
    hint: "How it ships",
    accent: "cyan",
    items: ["Git", "GitHub", "Postman", "Vercel"],
  },
];

// TODO(Nirbhay): tweak this list to match exactly what you're studying.
export const learning = {
  title: "Currently learning",
  blurb:
    "Deliberately building a second track alongside development — the analyst work at IIT Bombay is where I get to practise it.",
  items: [
    { name: "Machine Learning fundamentals", progress: 55 },
    { name: "Data analysis with Python", progress: 70 },
    { name: "Data visualisation & storytelling", progress: 65 },
    { name: "Statistics for data science", progress: 50 },
  ],
};

// Marquee strip
export const marquee = [
  "React.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "MySQL",
  "JavaScript",
  "Python",
  "Java",
  "SQL",
  "Redux Toolkit",
  "REST APIs",
  "Git",
  "GitHub",
  "Postman",
  "Vercel",
  "HTML5",
  "CSS3",
];

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

export type Job = {
  role: string;
  company: string;
  meta?: string;
  period: string;
  current?: boolean;
  points: string[];
  stack: string[];
};

export const experience: Job[] = [
  {
    role: "Data Analyst Intern",
    company: "IIT Bombay Development and Relations Foundation",
    period: "Present",
    current: true,
    // TODO(Nirbhay): replace these with the specific work you actually do day to day.
    points: [
      "Working with institutional datasets — cleaning, structuring and preparing data so it can actually be reasoned about.",
      "Turning raw records into readable summaries and reports that non-technical stakeholders can act on.",
      "Using the role as hands-on practice for the data science skills I'm studying on the side.",
    ],
    stack: ["Python", "SQL", "Excel", "Data Analysis"],
  },
  {
    role: "Web Developer Intern",
    company: "Edunet Foundation",
    meta: "AICTE & EY-GDS",
    period: "Feb 2025 – Mar 2025",
    points: [
      "Developed a full-stack food delivery website using the MERN stack, which is where scalable web architecture stopped being theory for me.",
      "Built and deployed RESTful APIs covering authentication, order handling and user management.",
    ],
    stack: ["MongoDB", "Express.js", "React.js", "Node.js", "REST APIs"],
  },
];

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export type Project = {
  name: string;
  blurb: string;
  description: string;
  year: string;
  featured?: boolean;
  tags: string[];
  highlights: string[];
  // TODO(Nirbhay): paste your real URLs here. Leave a field out to hide its button.
  repo?: string;
  live?: string;
};

export const projects: Project[] = [
  {
    name: "Smart Budget",
    blurb: "Personal finance, in real time",
    description:
      "A financial management tool that lets you track income, expenses and goals as they happen — built around a dynamic dashboard with interactive charts rather than another static spreadsheet.",
    year: "2025",
    featured: true,
    tags: ["React", "Redux Toolkit", "MongoDB", "Express", "Node.js"],
    highlights: [
      "Dynamic dashboard with interactive charts",
      "Full CRUD for income, expenses, goals and reports",
      "Real-time updates over MongoDB & Express APIs",
      "Redux Toolkit for predictable state across devices",
    ],
    repo: "https://github.com/Nirbhaygaikwad/Smart-Budget",
  },
  {
    name: "LuxRide",
    blurb: "Buy or rent, anything with an engine",
    description:
      "A marketplace for luxury vehicles — bikes, cars and private jets — where users can browse a curated inventory and either purchase outright or book a rental.",
    year: "2025",
    featured: true,
    tags: ["React", "Node.js", "Express", "MongoDB"],
    highlights: [
      "Browse and filter a multi-category vehicle catalogue",
      "Separate buy and rent flows per listing",
      "Responsive layouts built for large imagery",
    ],
    repo: "https://github.com/Nirbhaygaikwad/Smart-Budget",
  },
  {
    name: "Food Delivery Platform",
    blurb: "The one that taught me architecture",
    description:
      "A full-stack food delivery site built during my Edunet Foundation internship. The front end was the visible half — the real lesson was in the API layer underneath it.",
    year: "2025",
    tags: ["MERN", "REST APIs", "Authentication"],
    highlights: [
      "Authentication, order handling and user management APIs",
      "Deployed RESTful endpoints consumed by a React client",
      "Built and reviewed under AICTE & EY-GDS mentorship",
    ],
    repo: "https://github.com/Nirbhaygaikwad/Smart-Budget",
  },
];

/* ------------------------------------------------------------------ */
/* Education                                                           */
/* ------------------------------------------------------------------ */

export const education = [
  {
    degree: "BSc — Information Technology",
    school: "Bunts Sangha's SM Shetty College of Science, Commerce and Management",
    place: "Powai, Mumbai",
    period: "2022 – 2025",
  },
  {
    degree: "Higher Secondary Certificate (XII)",
    school: "National Education Society (NES) College of Science, Commerce and Arts",
    place: "Mumbai",
    period: "2020 – 2022",
  },
  {
    degree: "Secondary School Certificate (X)",
    school: "Kendriya Vidyalaya IIT Powai",
    place: "Mumbai",
    period: "2019 – 2020",
  },
];

/* ------------------------------------------------------------------ */
/* Beyond the screen                                                   */
/* ------------------------------------------------------------------ */

export const hobbies = [
  {
    name: "Travelling",
    note: "New places reset the way I think about problems.",
  },
  {
    name: "Photography",
    note: "Composition, light and framing — design practice in disguise.",
  },
  {
    name: "Football",
    note: "Ninety minutes where no one can send me a bug report.",
  },
];

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export const navItems = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;
