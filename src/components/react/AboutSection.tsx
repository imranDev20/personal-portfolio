import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, Code2 } from "lucide-react";

const AboutSection = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const glowVariants: Variants = {
    hidden: { scale: 1 },
    visible: {
      scale: 1.2,
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  const skills = [
    "TypeScript",
    "Next.js",
    "Node.js",
    "Redux",
    "Zustand",
    "PostgreSQL",
    "Prisma",
    "MUI",
    "Tailwind CSS",
    "React Native",
    "Mongoose",
    "WordPress",
  ];

  return (
    <section
      id="about"
      className="min-h-screen relative overflow-hidden"
      style={{ background: "rgb(2, 3, 5)" }}
    >
      {/* Background Effects */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-transparent to-[rgb(2,3,5)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(32,51,64,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(32,51,64,0.05)_1px,transparent_1px)] bg-[size:44px_44px]" />

      {/* Animated background circles */}
      <motion.div
        variants={glowVariants}
        initial="hidden"
        animate="visible"
        className="absolute top-1/4 -left-32 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"
      />
      <motion.div
        variants={glowVariants}
        initial="hidden"
        animate="visible"
        className="absolute bottom-1/4 -right-32 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 py-24 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Column */}
            <motion.div variants={itemVariants} className="relative group">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                {/* Simplified gradient background */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-40 blur-lg transition-opacity duration-300 group-hover:opacity-60" />

                {/* Main image container */}
                <div className="relative bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-xl p-1">
                  <motion.div
                    className="relative overflow-hidden rounded-lg"
                    whileHover={{ scale: 1.01 }}
                    transition={{
                      duration: 0.2,
                      ease: "easeOut",
                    }}
                    style={{
                      willChange: "transform",
                      transform: "translate3d(0,0,0)",
                      contain: "paint",
                    }}
                  >
                    <img
                      src="/own-image.jpg"
                      alt="Imran Kabir"
                      className="w-full h-full object-cover object-center rounded-lg"
                    />
                    {/* Simplified overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                </div>

                {/* Simplified corner accents */}
                <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-blue-400/30" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-purple-400/30" />
              </div>
            </motion.div>

            {/* Content Column */}
            <motion.div variants={itemVariants} className="space-y-12 relative">
              {/* About section */}
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  <span className="text-sm text-blue-400">About Me</span>
                </div>

                <h2 className="text-4xl font-bold text-gray-100">
                  Crafting Digital
                  <span className="relative ml-2">
                    <span className="relative z-10 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      Experiences
                    </span>
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-2 bg-blue-500/20 rounded-full blur-sm"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1 }}
                    />
                  </span>
                </h2>

                <p className="text-gray-300 leading-relaxed text-lg">
                  I'm a Full Stack Developer based in Bangladesh, passionate
                  about building web applications with modern technologies. I
                  love turning complex problems into simple, beautiful, and
                  intuitive solutions.
                </p>
              </div>

              {/* Skills section */}
              <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-100 flex items-center gap-2">
                  Tech Stack
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Code2 className="w-5 h-5 text-blue-400" />
                  </motion.span>
                </h3>

                <div className="flex flex-wrap gap-3">
                  {skills.map((skill) => (
                    <div
                      key={skill}
                      className="relative px-4 py-2 bg-gray-800/30 border border-gray-700/30 rounded-lg hover:border-blue-500/30 hover:bg-blue-500/10 transition-colors duration-300 group"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-300">{skill}</span>
                        <ArrowUpRight className="w-4 h-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
