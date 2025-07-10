import React, { useState } from "react";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle,
  XCircle,
  BookOpen,
  Sparkles,
  GraduationCap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../firebase/auth";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const { user } = useAuth();

  const getFirebaseErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/email-already-in-use":
        return "This email is already registered. Please use a different email or try logging in.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/operation-not-allowed":
        return "Email/password accounts are not enabled. Please contact support.";
      case "auth/weak-password":
        return "Password is too weak. Please choose a stronger password.";
      case "auth/network-request-failed":
        return "Network error. Please check your connection and try again.";
      case "auth/too-many-requests":
        return "Too many unsuccessful attempts. Please try again later.";
      default:
        return "Registration failed. Please try again.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      // Replace this demo code with actual Firebase registration
      const user = await registerUser(email, password);

      // Demo simulation - remove this when using real Firebase
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate different outcomes for demo
          if (email === "test@error.com") {
            reject({ code: "auth/email-already-in-use" });
          } else {
            resolve();
          }
        }, 2000);
      });

      setSuccess(true);
      setError("");

      // Reset form
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Redirect to dashboard or login page after successful registration
      // You can use React Router for navigation
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Registration error:", error);

      // Handle Firebase auth errors
      if (error.code) {
        setError(getFirebaseErrorMessage(error.code));
      } else {
        setError("Registration failed. Please try again.");
      }

      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const sparkleAnimation = {
    scale: [0, 1, 0],
    rotate: [0, 360],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-20 text-blue-500/20 animate-pulse">
        <BookOpen size={40} />
      </div>

      <div className="absolute top-40 right-32 text-purple-500/20 animate-spin">
        <Sparkles size={30} />
      </div>

      <div className="absolute bottom-32 left-40 text-green-500/20 animate-bounce">
        <GraduationCap size={35} />
      </div>

      {/* Main Container */}
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4 transition-transform hover:scale-110 hover:rotate-12">
            <User className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">Join StudyMate</h1>

          <p className="text-gray-400">
            Create your account and start organizing your studies
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 shadow-2xl transition-transform hover:-translate-y-1">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-lg flex items-center space-x-2">
              <XCircle className="w-5 h-5 text-red-400" />
              <span className="text-red-300 text-sm">{error}</span>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-900/50 border border-green-700 rounded-lg flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-green-300 text-sm">
                Account created successfully! Welcome to StudyMate!
              </span>
            </div>
          )}

          <div className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-gray-300 font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 focus:scale-105"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-300 font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full pl-10 pr-12 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 focus:scale-105"
                  placeholder="Create a password (min 6 characters)"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 disabled:opacity-50 transition-all hover:scale-110"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-gray-300 font-medium mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full pl-10 pr-12 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 focus:scale-105"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={loading}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 disabled:opacity-50 transition-all hover:scale-110"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-400 hover:text-blue-300 font-semibold"
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="inline-block"
                >
                  Login here
                </motion.span>
              </Link>
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          {[
            { icon: BookOpen, text: "Organize Tasks" },
            { icon: GraduationCap, text: "Track Progress" },
            { icon: Sparkles, text: "Stay Motivated" },
          ].map((feature, index) => (
            <div
              key={index}
              className="text-center transform hover:scale-105 transition-transform cursor-pointer"
            >
              <div className="bg-gray-800/50 rounded-lg p-4 mb-2">
                <feature.icon className="w-6 h-6 text-blue-400 mx-auto" />
              </div>
              <p className="text-gray-400 text-sm">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Register;
