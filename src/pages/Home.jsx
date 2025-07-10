import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { addTask, getTasks, updateTask, deleteTask } from "../firebase/db";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  MoreHorizontal,
  Calendar,
  Sparkles,
  TrendingUp,
  Clock,
  CheckCircle,
  NotebookPen,
  FileQuestionMark,
  FolderKanban,
  School,
} from "lucide-react";
import Footer from "../components/Footer";
const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    type: "assignment",
    dueDate: "",
    priority: "medium",
    status: "pending",
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    loadTasks();
  }, [user, navigate]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTasks(filtered);
    }
  }, [tasks, searchQuery]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const userTasks = await getTasks(user.uid);
      setTasks(userTasks);
    } catch (error) {
      alert(`Error loading tasks: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskData.title.trim()) {
      alert("Please enter a task title");
      return;
    }
    try {
      if (editingTask) {
        await updateTask(editingTask.id, taskData);
      } else {
        await addTask(taskData, user.uid);
      }

      setTaskData({
        title: "",
        description: "",
        type: "assignment",
        dueDate: "",
        priority: "medium",
        status: "pending",
      });
      setShowForm(false);
      setEditingTask(null);
      await loadTasks();
    } catch (error) {
      alert(`Error saving task: ${error.message}`);
    }
  };

  const handleEdit = (task) => {
    setTaskData({
      title: task.title,
      description: task.description,
      type: task.type,
      dueDate: task.dueDate,
      priority: task.priority,
      status: task.status,
    });
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDelete = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(taskId);
        await loadTasks();
      } catch (error) {
        alert(`Error deleting task: ${error.message}`);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const cancelEdit = () => {
    setShowForm(false);
    setEditingTask(null);
    setTaskData({
      title: "",
      description: "",
      type: "assignment",
      dueDate: "",
      priority: "medium",
      status: "pending",
    });
  };

  const getTasksByStatus = (status) => {
    return filteredTasks.filter((task) => task.status === status);
  };

  const getStatusConfig = (status) => {
    const configs = {
      pending: {
        title: "To do",
        count: getTasksByStatus("pending").length,
        color: "bg-blue-100 text-blue-800",
      },
      "in-progress": {
        title: "In progress",
        count: getTasksByStatus("in-progress").length,
        color: "bg-yellow-100 text-yellow-800",
      },
      completed: {
        title: "Done",
        count: getTasksByStatus("completed").length,
        color: "bg-green-100 text-green-800",
      },
    };
    return configs[status] || configs.pending;
  };

  const getTypeIcon = (type) => {
    const icons = {
      assignment: <NotebookPen />,
      exam: <FileQuestionMark />,
      lecture: <School />,
      project: <FolderKanban />,
    };
    return icons[type] || "📝";
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: "bg-red-500",
      medium: "bg-yellow-500",
      low: "bg-green-500",
    };
    return colors[priority] || "bg-gray-500";
  };

  // Animation variants
  const containerVariants = {
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: { duration: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    hover: {
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
      },
    },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2,
      },
    },
  };

  const statsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = getTasksByStatus("completed").length;
    const pending = getTasksByStatus("pending").length;
    const inProgress = getTasksByStatus("in-progress").length;
    const completionRate =
      total > 0 ? ((completed / total) * 100).toFixed(1) : 0;

    return { total, completed, pending, inProgress, completionRate };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 rounded-lg p-8 shadow-lg"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 mt-4 text-center"
          >
            Loading your tasks...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  const stats = getTaskStats();

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white flex capitalize">
        {/* Animated background particles */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-500 rounded-full opacity-20"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className=" border-b border-gray-700 p-4"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg sm:text-xl font-semibold flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                  <span className="truncate">
                    Welcome back, {user?.displayName || "Student"} 👋
                  </span>
                </motion.h2>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="relative w-full sm:w-auto"
                >
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 w-full sm:w-auto min-w-0"
                  />
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200 w-full sm:w-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>New task</span>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Stats Dashboard */}
          <motion.div
            variants={statsVariants}
            initial="hidden"
            animate="visible"
            className="p-4 sm:p-6"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-3 sm:p-4 text-center"
              >
                <div className="flex items-center justify-center mb-2">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  <span className="text-xs sm:text-sm font-medium">
                    Total Tasks
                  </span>
                </div>
                <div className="text-xl sm:text-2xl font-bold">
                  {stats.total}
                </div>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-3 sm:p-4 text-center"
              >
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  <span className="text-xs sm:text-sm font-medium">
                    Completed
                  </span>
                </div>
                <div className="text-xl sm:text-2xl font-bold">
                  {stats.completed}
                </div>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-lg p-3 sm:p-4 text-center"
              >
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  <span className="text-xs sm:text-sm font-medium">
                    In Progress
                  </span>
                </div>
                <div className="text-xl sm:text-2xl font-bold">
                  {stats.inProgress}
                </div>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-3 sm:p-4 text-center"
              >
                <div className="flex items-center justify-center mb-2">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  <span className="text-xs sm:text-sm font-medium">
                    Completion
                  </span>
                </div>
                <div className="text-xl sm:text-2xl font-bold">
                  {stats.completionRate}%
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Board View */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 p-4 sm:p-6"
          >
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6"
            >
              {/* To Do Column */}
              <motion.div
                variants={cardVariants}
                className="bg-gray-800/10  rounded-t-[10px] rounded-b-[40px] p-4 shadow-lg border border-gray-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    <h3 className="font-semibold text-sm sm:text-base">
                      To do ({getTasksByStatus("pending").length})
                    </h3>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowForm(true)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </div>
                <div className="space-y-3">
                  <AnimatePresence>
                    {getTasksByStatus("pending").map((task, index) => (
                      <motion.div
                        key={task.id}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        whileHover="hover"
                        layout
                        className="bg-gray-700 rounded-lg p-3 sm:p-4 hover:bg-gray-600 transition-colors border border-gray-600"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-white text-sm sm:text-base leading-tight capitalize">
                            {task.title}
                          </h4>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleEdit(task)}
                            className="text-gray-400 hover:text-white transition-colors ml-2 flex-shrink-0"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </motion.button>
                        </div>
                        {task.description && (
                          <p className="text-gray-300 text-xs sm:text-sm mb-3 break-words">
                            {task.description}
                          </p>
                        )}
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm">
                              {getTypeIcon(task.type)}
                            </span>
                            <span className="text-xs text-gray-400">
                              {task.type}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className={`w-2 h-2 rounded-full ${getPriorityColor(
                                task.priority
                              )}`}
                            />
                            <span className="text-xs text-gray-400">
                              {task.priority}
                            </span>
                          </div>
                        </div>
                        {task.dueDate && (
                          <div className="flex items-center space-x-1 mb-2">
                            <Calendar className="w-3 h-3 text-gray-400" />
                            <span className="text-md text-gray-400">
                              {task.dueDate}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2"></div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDelete(task.id)}
                            className="text-red-400 hover:text-red-300 text-xs transition-colors"
                          >
                            Delete
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* In Progress Column */}
              <motion.div
                variants={cardVariants}
                className="bg-gray-800/10 rounded-t-[10px] rounded-b-[40px] p-4 shadow-lg border border-gray-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                    <h3 className="font-semibold text-sm sm:text-base">
                      In progress ({getTasksByStatus("in-progress").length})
                    </h3>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowForm(true)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </div>
                <div className="space-y-3">
                  <AnimatePresence>
                    {getTasksByStatus("in-progress").map((task, index) => (
                      <motion.div
                        key={task.id}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        whileHover="hover"
                        layout
                        className="bg-gray-700 rounded-lg p-3 sm:p-4 hover:bg-gray-600 transition-colors border border-gray-600"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-white text-sm sm:text-base leading-tight ">
                            {task.title}
                          </h4>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleEdit(task)}
                            className="text-gray-400 hover:text-white transition-colors ml-2 flex-shrink-0"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </motion.button>
                        </div>
                        {task.description && (
                          <p className="text-gray-300 text-xs sm:text-sm mb-3 break-words">
                            {task.description}
                          </p>
                        )}
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm">
                              {getTypeIcon(task.type)}
                            </span>
                            <span className="text-xs text-gray-400">
                              {task.type}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 capitalize">
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className={`w-2 h-2 rounded-full  ${getPriorityColor(
                                task.priority
                              )}`}
                            />
                            <span className="text-xs text-gray-400">
                              {task.priority}
                            </span>
                          </div>
                        </div>
                        {task.dueDate && (
                          <div className="flex items-center space-x-1 mb-2">
                            <Calendar className="w-3 h-3 text-gray-400" />
                            <span className="text-md text-gray-400">
                              {task.dueDate}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2"></div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDelete(task.id)}
                            className="text-red-400 hover:text-red-300 text-xs transition-colors"
                          >
                            Delete
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Done Column */}
              <motion.div
                variants={cardVariants}
                className="bg-gray-800/10 rounded-t-[10px] rounded-b-[40px] p-4 shadow-lg border border-gray-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <h3 className="font-semibold text-sm sm:text-base">
                      Done ({getTasksByStatus("completed").length})
                    </h3>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowForm(true)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </div>
                <div className="space-y-3">
                  <AnimatePresence>
                    {getTasksByStatus("completed").map((task, index) => (
                      <motion.div
                        key={task.id}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        whileHover="hover"
                        layout
                        className="bg-gray-700 rounded-lg p-3 sm:p-4 hover:bg-gray-600 transition-colors border border-gray-600 opacity-75"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-white line-through text-sm sm:text-base leading-tight capitalize">
                            {task.title}
                          </h4>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleEdit(task)}
                            className="text-gray-400 hover:text-white transition-colors ml-2 flex-shrink-0"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </motion.button>
                        </div>
                        {task.description && (
                          <p className="text-gray-300 text-xs sm:text-sm mb-3 line-through break-words">
                            {task.description}
                          </p>
                        )}
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm">
                              {getTypeIcon(task.type)}
                            </span>
                            <span className="text-xs text-gray-400">
                              {task.type}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            <span className="text-xs text-gray-400">
                              {task.priority}
                            </span>
                          </div>
                        </div>
                        {task.dueDate && (
                          <div className="flex items-center space-x-1 mb-2">
                            <Calendar className="w-3 h-3 text-gray-400" />
                            <span className="text-md text-gray-400">
                              {task.dueDate}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2"></div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDelete(task.id)}
                            className="text-red-400 hover:text-red-300 text-xs transition-colors"
                          >
                            Delete
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Task Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={cancelEdit}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">
                  {editingTask ? "Edit Task" : "Add New Task"}
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={cancelEdit}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ×
                </motion.button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={taskData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter task title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={taskData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter task description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Type
                  </label>
                  <select
                    name="type"
                    value={taskData.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="assignment">Assignment</option>
                    <option value="exam">Exam</option>
                    <option value="lecture">Lecture</option>
                    <option value="project">Project</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    value={taskData.dueDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={taskData.priority}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={taskData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div className="flex space-x-4 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    {editingTask ? "Update Task" : "Create Task"}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={cancelEdit}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
};

export default Home;
