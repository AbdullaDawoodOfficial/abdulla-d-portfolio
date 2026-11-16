/**
 * All portfolio content lives here. Edit this file to update the site.
 *
 * Placeholders: replace every value marked "PLACEHOLDER" with the real one.
 * Leave a link as `null` to hide or disable its button instead of inventing one.
 */

export const profile = {
  name: "Abdulla D.",
  firstName: "Abdulla",
  logo: "ABDULLA",
  title: "Java & Web Developer",
  location: "Chennai, Tamil Nadu, India",
  openToWork: true,
  heroDescription:
    "I build reliable backend applications and responsive web experiences, turning ideas into practical software with clean code and thoughtful design.",
  links: {
    // PLACEHOLDER: replace with your GitHub profile URL.
    github: "https://github.com/AbdullaDawoodOfficial",
    // PLACEHOLDER: replace with your LinkedIn profile URL.
    linkedin: "https://www.linkedin.com/in/abdulla-d-53713832a?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    // PLACEHOLDER: replace with your email address.
    email: "abdulladawood.official@gmail.com",
    // PLACEHOLDER: upload your resume to /public (e.g. public/resume.pdf) and set "/resume.pdf".
    resume: null as string | null,
  },
};

export const about = {
  title: "Building my path in software.",
  paragraphs: [
    "I'm a Computer Science and Engineering graduate passionate about Java development and Web Development.",
    "My core focus is backend development using Java, Spring Boot, JDBC, Hibernate and MySQL. I also enjoy creating responsive web interfaces using HTML, CSS and JavaScript.",
    "I enjoy learning new technologies, solving programming problems and building practical applications. I'm currently looking for entry-level opportunities where I can contribute my skills and grow as a developer.",
  ],
  education: {
    degree: "B.E. Computer Science and Engineering",
    institution: "Sri Muthukumaran Institute of Technology",
    period: "2022 – 2026",
    location: "Chennai, Tamil Nadu, India",
  },
};

export type SkillGroup = {
  key: "backend" | "frontend" | "database" | "tools";
  title: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    key: "backend",
    title: "Backend Development",
    items: ["Java", "Spring Boot", "JDBC", "Hibernate", "Servlets", "REST APIs"],
  },
  { key: "frontend", title: "Frontend Development", items: ["HTML5", "CSS3", "JavaScript"] },
  { key: "database", title: "Database", items: ["MySQL", "SQL", "Basic MongoDB"] },
  {
    key: "tools",
    title: "Tools",
    items: ["Git", "GitHub", "Eclipse", "IntelliJ IDEA", "VS Code", "Postman"],
  },
];

export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  /** Only verified technologies. Empty = not listed yet. */
  tech: string[];
  /** PLACEHOLDER: add the real repository URL, or keep null. */
  repo: string | null;
  /** Only set when a real live demo exists. */
  demo: string | null;
};

export const projects: Project[] = [
  {
    slug: "plan-n-go-hub",
    title: "PlanNGo Hub",
    category: "Travel & Booking · Infosys Springboard",
    description:
      "A travel and booking platform developed as part of an Infosys Springboard project.",
    tech: [],
    repo: null,
    demo: null,
  },
  {
    slug: "glaucoma-detection",
    title: "Glaucoma Detection System",
    category: "Machine Learning",
    description:
      "A machine learning system that classifies retinal images to detect glaucoma using a convolutional neural network.",
    tech: ["Python", "TensorFlow / Keras", "CNN", "OpenCV", "Streamlit"],
    repo: null,
    demo: null,
  },
  {
    slug: "person-aadhaar",
    title: "Person–Aadhaar Management",
    category: "Backend · REST API",
    description:
      "A Spring Boot backend modelling a one-to-one relationship between Person and Aadhaar entities, with CRUD operations through REST APIs.",
    tech: ["Java", "Spring Boot", "REST APIs"],
    repo: null,
    demo: null,
  },
  {
    slug: "user-management",
    title: "User Management System",
    category: "Backend",
    description: "A backend application for user management, built with Java and Spring Boot on a MySQL database via JDBC.",
    tech: ["Java", "Spring Boot", "JDBC", "MySQL"],
    repo: null,
    demo: null,
  },
];

export type ExperienceItem = {
  organization: string;
  role: string;
  /** Leave null when the dates are not confirmed. */
  period: string | null;
  points: string[];
};

export const experience: ExperienceItem[] = [
  {
    organization: "ApexPlanet",
    role: "Web Development Intern",
    period: "21 Jul 2025 – 03 Sep 2025",
    points: ["Practical web development internship."],
  },
  {
    organization: "Infosys Springboard",
    role: "Project-Based Learning",
    period: null,
    points: [
      "Project-based learning experience.",
      "Built PlanNGo Hub, a travel and booking platform.",
    ],
  },
];

export const contact = {
  headlineLead: "Have an opportunity or idea?",
  headlineAccent: "Let's connect.",
  text: "I'm open to entry-level opportunities in Java Development, Backend Development and Web Development.",
};

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof navItems)[number]["id"];
