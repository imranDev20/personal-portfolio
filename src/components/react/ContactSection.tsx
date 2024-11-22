import React from "react";
import { motion, type Variants } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, Loader2 } from "lucide-react";

// Form validation schema
const contactSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message cannot exceed 500 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form submitted:", data);
    setIsSubmitting(false);
    setSubmitted(true);
    reset();
    // Reset success message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

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
    hidden: {
      scale: 0.8,
      opacity: 0.5,
    },
    visible: {
      scale: 1.2,
      opacity: 1,
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse", // Now properly typed as "reverse" | "loop" | "mirror"
      },
    },
  };

  return (
    <section
      id="contact"
      className="min-h-screen relative overflow-hidden py-16 flex items-center"
      style={{ background: "rgb(2, 3, 5)" }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(32,51,64,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(32,51,64,0.05)_1px,transparent_1px)] bg-[size:44px_44px]" />

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

      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-xl mx-auto relative"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1 mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-sm text-blue-400">Get in Touch</span>
            </div>

            <h2 className="text-4xl font-bold text-gray-100 mb-4">
              Let's
              <span className="relative mx-2">
                <span className="relative z-10 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Connect
                </span>
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-2 bg-blue-500/20 rounded-full blur-sm"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1 }}
                />
              </span>
            </h2>

            <p className="text-gray-400 max-w-md mx-auto">
              Have a question or want to work together? Feel free to drop me a
              message!
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Your Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className={`w-full px-4 py-3 bg-gray-800/30 border rounded-lg outline-none transition-colors duration-200
                    ${
                      errors.email
                        ? "border-red-500/50 focus:border-red-500"
                        : "border-gray-700/30 focus:border-blue-500/50"
                    }
                    text-gray-100 placeholder-gray-500`}
                  placeholder="name@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-300"
              >
                Message
              </label>
              <div className="relative">
                <textarea
                  id="message"
                  {...register("message")}
                  rows={5}
                  className={`w-full px-4 py-3 bg-gray-800/30 border rounded-lg outline-none transition-colors duration-200
                    ${
                      errors.message
                        ? "border-red-500/50 focus:border-red-500"
                        : "border-gray-700/30 focus:border-blue-500/50"
                    }
                    text-gray-100 placeholder-gray-500`}
                  placeholder="Your message..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.message.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50
                text-white rounded-lg flex items-center justify-center gap-2 
                transition-colors duration-200`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </motion.button>

            {/* Success Message */}
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center text-green-400 bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-3"
              >
                Message sent successfully! I'll get back to you soon.
              </motion.div>
            )}
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
