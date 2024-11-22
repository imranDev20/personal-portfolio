import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  Calendar,
  ArrowUpRight,
  GraduationCap,
  BookOpen,
} from "lucide-react";
import { timeline, type Timeline, type TimelineItem } from "../../shared/data";

const ExperienceSection = () => {
  const [activeTab, setActiveTab] = useState<keyof Timeline>("work");

  const tabs = [
    { id: "work", label: "Work", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "courses", label: "Courses", icon: BookOpen },
  ] as const;

  const getTitle = (item: TimelineItem) => {
    if (item.type === "work") return item.position;
    return item.course;
  };

  const getSubtitle = (item: TimelineItem) => {
    if (item.type === "work") return item.company;
    return item.institution;
  };

  // Content component shared between mobile and desktop
  const TimelineContent = ({ item }: { item: TimelineItem }) => (
    <div className="p-5 bg-gray-800/30 border border-gray-700/30 rounded-lg hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-100 flex items-center gap-2 group-hover:text-blue-400 transition-colors">
            {getTitle(item)}
            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
          </h3>
          <p className="text-blue-400 font-medium">{getSubtitle(item)}</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full">
          <Calendar className="w-4 h-4" />
          <span>{item.period}</span>
        </div>
      </div>

      <p className="text-gray-300 leading-relaxed text-sm mb-4">
        {item.description}
      </p>

      {"tech" in item && (
        <div className="flex flex-wrap gap-2 mb-4">
          {item.tech.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-1 bg-blue-500/10 text-blue-300 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      <ul className="grid md:grid-cols-2 gap-3">
        {item.highlights.map((highlight, i) => (
          <li key={i} className="flex items-start gap-2 text-gray-400 text-sm">
            <span className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  // Desktop Layout
  const DesktopLayout = () => (
    <div className="hidden md:flex gap-8">
      <div className="w-48 flex flex-col gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="relative flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-300"
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTabDesktop"
                className="absolute inset-0 bg-blue-500/10 border border-blue-500/30 rounded-lg"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
              />
            )}
            <span
              className={`relative z-10 flex items-center gap-3 ${
                activeTab === tab.id
                  ? "text-blue-400"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="font-medium">{tab.label}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {timeline[activeTab].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                }}
                className="group"
              >
                <TimelineContent item={item} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );

  // Mobile Layout
  const MobileLayout = () => (
    <div className="md:hidden space-y-6">
      <div className="grid grid-cols-3 gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="relative flex flex-col items-center justify-center px-3 py-3 rounded-lg transition-all duration-300"
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTabMobile"
                className="absolute inset-0 bg-blue-500/10 border border-blue-500/30 rounded-lg"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
              />
            )}
            <span
              className={`relative z-10 flex flex-col items-center ${
                activeTab === tab.id
                  ? "text-blue-400"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              <tab.icon className="w-5 h-5 mb-1" />
              <span className="font-medium text-xs">{tab.label}</span>
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {timeline[activeTab].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
              }}
              className="group"
            >
              <TimelineContent item={item} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );

  return (
    <section
      id="experience"
      className="min-h-screen relative overflow-hidden py-16"
      style={{ background: "rgb(2, 3, 5)" }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(32,51,64,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(32,51,64,0.05)_1px,transparent_1px)] bg-[size:44px_44px]" />

      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 mb-12"
          >
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-sm text-blue-400">Career Journey</span>
            </div>

            <h2 className="text-4xl font-bold text-gray-100">
              My{" "}
              <span className="relative">
                <span className="relative z-10 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Experience
                </span>
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-2 bg-blue-500/20 rounded-full blur-sm"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1 }}
                />
              </span>
            </h2>
          </motion.div>

          <DesktopLayout />
          <MobileLayout />
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
