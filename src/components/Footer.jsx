import React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Sparkles,
  BookOpen,
  Users,
  Shield,
  HelpCircle,
  ExternalLink,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  const quickLinks = [
    { icon: BookOpen, text: "Documentation", href: "#" },
    { icon: Users, text: "Community", href: "#" },
    { icon: Shield, text: "Privacy Policy", href: "#" },
    { icon: HelpCircle, text: "Support", href: "#" },
  ];

  const features = [
    "Task Management",
    "Progress Tracking",
    "Team Collaboration",
    "Analytics Dashboard",
    "Mobile App",
    "API Access",
  ];

  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      animate="visible"
      className="bg-gray-900 border-t border-gray-800 text-white relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-500 rounded-full opacity-10"
            animate={{
              x: [0, 50, 0],
              y: [0, -50, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center space-x-2">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"
              >
                <Sparkles className="w-4 h-4 text-white" />
              </motion.div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Study Mate
              </h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Streamline your academic journey with our intuitive task
              management platform. Built for students, by student.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 bg-gray-800 rounded-lg flex items-center cursor-not-allowed justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-200">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <a
                    href={link.href}
                    className="flex items-center cursor-not-allowed space-x-2 text-gray-400 hover:text-white transition-colors duration-200 group"
                  >
                    <link.icon className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
                    <span className="text-sm">{link.text}</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Features */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-200">Features</h4>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 group"
                >
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:bg-blue-400 transition-colors" />
                  <span className="text-sm">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-200">
              Stay Updated
            </h4>
            <p className="text-gray-400 text-sm">
              Get the latest updates and productivity tips delivered to your
              inbox.
            </p>
            <div className="space-y-3">
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 rounded-lg font-medium transition-all duration-200"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Bottom section */}
        <motion.div
          variants={itemVariants}
          className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
        >
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <span>© {currentYear} Study Mate. Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-current" />
            </motion.div>
            <span>for students worldwide</span>
          </div>

          <div className="flex items-center space-x-6 text-sm text-gray-400 cursor-not-allowed">
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              className="hover:text-white transition-colors duration-200 cursor-not-allowed"
            >
              Terms of Service
            </motion.a>
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              className="hover:text-white transition-colors duration-200 cursor-not-allowed"
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              className="hover:text-white transition-colors duration-200 cursor-not-allowed"
            >
              Contact Us
            </motion.a>
          </div>
        </motion.div>

        {/* Version info */}
        <motion.div variants={itemVariants} className="mt-4 text-center">
          <a href="https://weroshportfolio.netlify.app/">
            <span className="text-xs text-gray-500">
              Developed By Werosh Kriyanjala
            </span>
          </a>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
