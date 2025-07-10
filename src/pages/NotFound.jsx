import React from "react";
import { motion } from "framer-motion";
import {
  Home,
  ArrowLeft,
  Search,
  BookOpen,
  GraduationCap,
  Sparkles,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

const NotFound = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const floatingVariants = {
    initial: { y: 0, rotate: 0 },
    animate: {
      y: [-15, 15, -15],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const pulseVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const sparkleVariants = {
    initial: { scale: 0, rotate: 0, opacity: 0 },
    animate: {
      scale: [0, 1, 0],
      rotate: [0, 180, 360],
      opacity: [0, 1, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-20 left-20 text-blue-500/20"
        variants={floatingVariants}
        initial="initial"
        animate="animate"
      >
        <BookOpen size={50} />
      </motion.div>

      <motion.div
        className="absolute top-32 right-32 text-purple-500/20"
        variants={sparkleVariants}
        initial="initial"
        animate="animate"
      >
        <Sparkles size={40} />
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-40 text-green-500/20"
        variants={floatingVariants}
        initial="initial"
        animate="animate"
        style={{ animationDelay: "2s" }}
      >
        <GraduationCap size={45} />
      </motion.div>

      <motion.div
        className="absolute top-1/2 right-20 text-yellow-500/20"
        variants={pulseVariants}
        initial="initial"
        animate="animate"
      >
        <Search size={35} />
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="text-center max-w-lg mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 404 Number */}
        <motion.div className="mb-8" variants={itemVariants}>
          <motion.h1
            className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
            variants={pulseVariants}
            initial="initial"
            animate="animate"
          >
            404
          </motion.h1>
        </motion.div>

        {/* Error Icon */}
        <motion.div className="mb-6" variants={itemVariants}>
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full border border-red-500/30"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <AlertCircle className="w-10 h-10 text-red-400" />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white mb-4"
          variants={itemVariants}
        >
          Oops! Page Not Found
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-gray-400 text-lg mb-8 leading-relaxed"
          variants={itemVariants}
        >
          The page you're looking for seems to have wandered off into the
          digital void. Don't worry, even the best students sometimes take a
          wrong turn!
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          variants={itemVariants}
        >
          <motion.button
            onClick={() => window.history.back()}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </motion.button>
        </motion.div>

        {/* Helpful Links */}
        <motion.div
          className="mt-12 p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl"
          variants={itemVariants}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-white font-semibold mb-4">
            Looking for something specific?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                icon: BookOpen,
                text: "View Tasks",
                action: () => alert("Navigate to tasks"),
              },
              {
                icon: GraduationCap,
                text: "Study Progress",
                action: () => alert("Navigate to progress"),
              },
              {
                icon: Search,
                text: "Search",
                action: () => alert("Open search"),
              },
              {
                icon: RefreshCw,
                text: "Refresh Page",
                action: () => window.location.reload(),
              },
            ].map((item, index) => (
              <motion.button
                key={index}
                onClick={item.action}
                className="flex items-center space-x-3 p-3 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200"
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon className="w-5 h-5 text-blue-400" />
                <span className="text-sm">{item.text}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Fun Message */}
        <motion.div className="mt-8" variants={itemVariants}>
          <motion.p
            className="text-gray-500 text-sm italic"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            "Not all who wander are lost, but this page definitely is." 📚
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default NotFound;
