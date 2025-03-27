import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  liveUrl: string;
  adminUrl?: string;
};

const WorksSection = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "City Spark",
      description:
        "A modern e-commerce platform with product categorization, search functionality and more",
      image: "/src/assets/city-spark-hero.png",
      techStack: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "React Query",
        "React Hook Form",
        "PostgreSQL",
        "Prisma",
        "Zod",
      ],
      liveUrl: "https://citysparke3.co.uk",
    },
    {
      id: 2,
      title: "London Home Safety",
      description:
        "A web application designed to provide safety inspections, certifications & related services",
      image: "/src/assets/london-home-safety-hero.png",
      techStack: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Zustand",
        "PostgreSQL",
        "Prisma",
        "Stripe",
        "NextAuth",
        "jsPDF",
        "Recharts",
        "Zod",
        "React Hook Form",
      ],
      liveUrl: "https://londonhomesafety.co.uk",
    },
    {
      id: 3,
      title: "Easy Tax Return",
      description:
        "A digital solution for filling out and managing individual tax returns",
      image: "/src/assets/easy-tax-return-hero.png",
      techStack: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "React Hook Form",
        "PostgreSQL",
        "Prisma",
        "Zod",
        "jsPDF",
      ],
      liveUrl: "https://easytaxreturn.com.bd",
    },
    {
      id: 7,
      title: "Parts Yard",
      description:
        "A motorcycle parts manufacturer platform with integrated payment system",
      image: "/src/assets/partsyard-hero.png",
      techStack: [
        "React",
        "MongoDB",
        "Firebase Auth",
        "Stripe Payment Gateway",
        "Tailwind CSS",
        "Express",
      ],
      liveUrl: "https://partsyard.web.app",
    },
    {
      id: 5,
      title: "Homelet Services",
      description:
        "A comprehensive property service platform with integrated contact form and spam protection",
      image: "/src/assets/homelet-services-hero.png",
      techStack: ["Astro", "Tailwind CSS", "React Hook Form", "Zod"],
      liveUrl: "https://homeletservices.co.uk",
    },
    {
      id: 5,
      title: "Pure Power Electrical",
      description:
        "An electrician portfolio showcasing services and previous works",
      image: "/src/assets/pure-power-hero.png",
      techStack: ["HTML", "CSS", "WordPress", "PHP"],
      liveUrl: "https://purepowerelectrical.co.uk",
    },
    {
      id: 6,
      title: "PJ Renovation",
      description:
        "A construction company portfolio featuring projects and services",
      image: "/src/assets/pj-renovation-hero.png",
      techStack: ["HTML", "CSS", "WordPress", "PHP"],
      liveUrl: "https://pjrenovation.co.uk",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      id="works"
      className="min-h-screen relative overflow-hidden py-24"
      style={{ background: "rgb(2, 3, 5)" }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(32,51,64,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(32,51,64,0.05)_1px,transparent_1px)] bg-[size:44px_44px]" />

      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto space-y-16"
        >
          <motion.div variants={itemVariants} className="space-y-6 text-right">
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1 ml-auto">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-sm text-blue-400">Featured Projects</span>
            </div>

            <h2 className="text-4xl font-bold text-gray-100">
              Recent{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Works
              </span>
            </h2>

            {/* Add this line */}
            <p className="text-gray-400 text-right">
              All graphical assets including logos, banners, posters, and UI/UX
              designs were created by me.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid gap-8 lg:grid-cols-2"
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className="group relative bg-gray-800/20 rounded-xl overflow-hidden border border-gray-700/30"
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent" />
                </div>

                <div className="p-6 space-y-4 relative z-20">
                  <h3 className="text-2xl font-semibold text-gray-100">
                    {project.title}
                  </h3>

                  <p className="text-gray-400">{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-3 py-1 bg-blue-500/10 text-blue-300 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 pt-4 relative z-30">
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Site</span>
                    </motion.a>
                  </div>
                </div>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WorksSection;
