interface BaseTimelineItem {
  period: string;
  description: string;
  highlights: string[];
}

interface WorkExperience extends BaseTimelineItem {
  type: "work";
  company: string;
  position: string;
  tech: string[];
}

interface Education extends BaseTimelineItem {
  type: "education";
  institution: string;
  course: string;
}

interface Course extends BaseTimelineItem {
  type: "course";
  institution: string;
  course: string;
  tech: string[];
}

export type TimelineItem = WorkExperience | Education | Course;
export type Timeline = {
  work: WorkExperience[];
  education: Education[];
  courses: Course[];
};

export const timeline: Timeline = {
  work: [
    {
      type: "work",
      company: "Spiderbyte IT Limited",
      position: "Co-Founder & Full Stack Developer",
      period: "June 2024 - Present",
      description:
        "Developing versatile web applications including e-commerce platforms with complex categorization systems, intuitive templating, admin dashboards, a home safety and inspection service booking system, and an automatic tax return calculation tool.",
      tech: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "PostgreSQL",
        "Prisma",
        "React Query",
        "Zustand",
      ],
      highlights: [
        "Built e-commerce platform with advanced product categorization",
        "Developed home safety inspection service booking website",
        "Created automated tax return calculation system",
        "Implemented comprehensive admin dashboard and reporting tools",
      ],
    },
    {
      type: "work",
      company: "Kiraj Agromart",
      position: "Associate Software Engineer",
      period: "Sep 2023 - May 2024",
      description:
        "Developed a B2B Trading platform using Next.js and TypeScript, featuring multi-tiered supply chain management. Implemented real-time inventory tracking and order management system for seamless transactions.",
      tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
      highlights: [
        "Built complex supply chain management features",
        "Implemented real-time inventory tracking",
        "Developed order management system",
      ],
    },
    {
      type: "work",
      company: "Geniobits Technologies",
      position: "Associate Software Engineer",
      period: "Aug 2022 - July 2023",
      description:
        "Developed an HRMS for CAIT EDUSYS and worked on a trading automation platform. Implemented various modules for employee management and performance evaluation.",
      tech: ["React", "Node.js", "MongoDB", "Express"],
      highlights: [
        "Built comprehensive HRMS system",
        "Implemented performance evaluation tools",
        "Developed trading automation features",
      ],
    },
  ],
  education: [
    {
      type: "education",
      institution: "University of Barisal",
      course: "B.Sc in Mathematics",
      period: "2018 - 2022",
      description:
        "Completed Bachelor of Science in Mathematics, developing strong analytical and problem-solving skills.",
      highlights: [
        "Strong foundation in mathematical concepts",
        "Developed analytical thinking abilities",
        "Enhanced problem-solving skills",
      ],
    },
  ],
  courses: [
    {
      type: "course",
      institution: "Next Level Web Development",
      course: "Advanced Full Stack Development",
      period: "Sep 2023 - Present",
      description:
        "Advanced web development course focusing on enterprise-level technologies and modern development practices.",
      tech: [
        "TypeScript",
        "Express.js",
        "MongoDB",
        "Mongoose",
        "Redux",
        "Next.js",
        "PostgreSQL",
        "Prisma",
        "Docker",
        "AWS",
        "GraphQL",
        "Jest",
      ],
      highlights: [
        "Mastered TypeScript and advanced backend development",
        "Learned enterprise-level database management with SQL and NoSQL",
        "Implemented cloud solutions and containerization",
        "Practiced test-driven development with Vitest and Jest",
      ],
    },
    {
      type: "course",
      institution: "Phitron",
      course: "CSE Fundamentals",
      period: "Jan 2023 - Dec 2023",
      description:
        "Comprehensive computer science program covering data structures, algorithms, and software development fundamentals.",
      tech: ["C", "C++", "Python", "MySQL", "DSA", "OOP"],
      highlights: [
        "Mastered data structures and algorithms",
        "Achieved strong problem-solving skills through competitive programming",
        "Developed expertise in C++ and Python",
        "Built backend applications with REST APIs",
        "Participated in weekly coding contests and upsolving sessions",
      ],
    },
    {
      type: "course",
      institution: "Programming Hero",
      course: "Complete Web Development",
      period: "Jan 2022 - July 2022",
      description:
        "Completed an intensive web development bootcamp covering full-stack development with modern technologies.",
      tech: ["JavaScript", "React", "Node.js", "MongoDB", "Express"],
      highlights: [
        "Developed full-stack web applications",
        "Learned modern web development practices",
        "Created projects using MERN stack",
      ],
    },
  ],
};
