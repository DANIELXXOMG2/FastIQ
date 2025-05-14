"use client"

import type * as React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Home, Settings, Code, Search, X, ArrowRight, Sparkles } from "lucide-react"
import { useTheme } from "next-themes"

interface MenuItem {
  icon: React.ReactNode
  label: string
  href: string
  gradient: string
  iconColor: string
  action?: () => void
}

export function MenuBar() {
  const { theme } = useTheme()
  const [showQuizInput, setShowQuizInput] = useState(false)
  const [quizCode, setQuizCode] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResult, setSearchResult] = useState<null | { found: boolean; message: string }>(null)
  const [recentQuizzes, setRecentQuizzes] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const isDarkTheme = theme === "dark"

  // Load recent quizzes from localStorage on component mount
  useEffect(() => {
    const savedQuizzes = localStorage.getItem("recentQuizzes")
    if (savedQuizzes) {
      try {
        setRecentQuizzes(JSON.parse(savedQuizzes).slice(0, 3))
      } catch (e) {
        console.error("Failed to parse recent quizzes", e)
      }
    }
  }, [])

  // Save quiz to recent quizzes
  const saveToRecentQuizzes = (code: string) => {
    const updatedQuizzes = [code, ...recentQuizzes.filter((q) => q !== code)].slice(0, 3)
    setRecentQuizzes(updatedQuizzes)
    localStorage.setItem("recentQuizzes", JSON.stringify(updatedQuizzes))
  }

  // Unified color palette
  const colors = {
    primary: "indigo-600",
    primaryHover: "indigo-700",
    primaryLight: "indigo-500",
    primaryDark: "indigo-800",
    secondary: "violet-500",
    secondaryHover: "violet-600",
    accent: "amber-500",
    accentHover: "amber-600",
    success: "emerald-500",
    error: "rose-500",
    // Gradient colors
    gradientFrom: isDarkTheme ? "from-indigo-600/20" : "from-indigo-500/10",
    gradientTo: isDarkTheme ? "to-violet-600/20" : "to-violet-500/10",
    // Glow colors for nav
    glowVia1: isDarkTheme ? "via-indigo-400/30" : "via-indigo-400/20",
    glowVia2: isDarkTheme ? "via-violet-400/30" : "via-violet-400/20",
    glowVia3: isDarkTheme ? "via-amber-400/30" : "via-amber-400/20",
  }

  const toggleQuizInput = () => {
    setShowQuizInput((prev) => {
      const newState = !prev
      if (newState) {
        // Reset states when opening
        setQuizCode("")
        setSearchResult(null)
        setIsSearching(false)
        // Focus the input when it appears
        setTimeout(() => {
          inputRef.current?.focus()
        }, 300)
      }
      return newState
    })
  }

  const handleSearchQuiz = async () => {
    if (!quizCode.trim()) return

    setIsSearching(true)
    setSearchResult(null)

    // Simulate API call with timeout
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Simulate search result based on code format
    const isValidFormat = /^[A-Z]{2}\d{4}$/.test(quizCode.trim())

    if (isValidFormat) {
      saveToRecentQuizzes(quizCode)
      setSearchResult({
        found: true,
        message: `Quiz "${quizCode}" found! Redirecting to quiz...`,
      })
      // Simulate redirect after success
      setTimeout(() => {
        alert(`Redirecting to quiz: ${quizCode}`)
        setShowQuizInput(false)
      }, 2000)
    } else {
      setSearchResult({
        found: false,
        message: "Quiz not found. Please check the code and try again.",
      })
    }

    setIsSearching(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearchQuiz()
    }
  }

  const menuItems: MenuItem[] = [
    {
      icon: <Home className="h-5 w-5" />,
      label: "Home",
      href: "#",
      gradient: `radial-gradient(circle, rgba(79,70,229,0.15) 0%, rgba(67,56,202,0.06) 50%, rgba(55,48,163,0) 100%)`,
      iconColor: `text-${colors.primary}`,
    },
    {
      icon: <Code className="h-5 w-5" />,
      label: "Insert your code",
      href: "#",
      gradient: `radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(124,58,237,0.06) 50%, rgba(109,40,217,0) 100%)`,
      iconColor: `text-${colors.secondary}`,
      action: toggleQuizInput,
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: "Settings",
      href: "#",
      gradient: `radial-gradient(circle, rgba(245,158,11,0.15) 0%, rgba(217,119,6,0.06) 50%, rgba(180,83,9,0) 100%)`,
      iconColor: `text-${colors.accent}`,
    },
  ]

  const itemVariants = {
    initial: { rotateX: 0, opacity: 1 },
    hover: { rotateX: -90, opacity: 0 },
  }

  const backVariants = {
    initial: { rotateX: 90, opacity: 0 },
    hover: { rotateX: 0, opacity: 1 },
  }

  const glowVariants = {
    initial: { opacity: 0, scale: 0.8 },
    hover: {
      opacity: 1,
      scale: 2,
      transition: {
        opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
        scale: { duration: 0.5, type: "spring", stiffness: 300, damping: 25 },
      },
    },
  }

  const navGlowVariants = {
    initial: { opacity: 0 },
    hover: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  }

  const sharedTransition = {
    type: "spring",
    stiffness: 100,
    damping: 20,
    duration: 0.5,
  }

  const quizInputVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      scale: 0.95,
      y: -20,
    },
    visible: {
      opacity: 1,
      height: "auto",
      scale: 1,
      y: 0,
      transition: {
        height: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { type: "spring", stiffness: 400, damping: 30 },
        y: { type: "spring", stiffness: 400, damping: 30 },
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      scale: 0.95,
      y: -20,
      transition: {
        height: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
        y: { duration: 0.3 },
      },
    },
  }

  const searchIconVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.1, rotate: 5 },
    tap: { scale: 0.95 },
    loading: {
      rotate: 360,
      transition: {
        repeat: Number.POSITIVE_INFINITY,
        duration: 1.5,
        ease: "linear",
      },
    },
  }

  const resultVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
      },
    },
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.nav
        className="p-2 rounded-2xl bg-gradient-to-b from-background/80 to-background/40 backdrop-blur-lg border border-border/40 shadow-lg relative overflow-hidden"
        initial="initial"
        whileHover="hover"
      >
        <motion.div
          className={`absolute -inset-2 bg-gradient-radial from-transparent ${colors.glowVia1} via-30% ${colors.glowVia2} via-60% ${colors.glowVia3} via-90% to-transparent rounded-3xl z-0 pointer-events-none`}
          variants={navGlowVariants}
        />
        <ul className="flex items-center gap-2 relative z-10">
          {menuItems.map((item, index) => (
            <motion.li key={item.label} className="relative">
              <motion.div
                className="block rounded-xl overflow-visible group relative"
                style={{ perspective: "600px" }}
                whileHover="hover"
                initial="initial"
              >
                <motion.div
                  className="absolute inset-0 z-0 pointer-events-none"
                  variants={glowVariants}
                  style={{
                    background: item.gradient,
                    opacity: 0,
                    borderRadius: "16px",
                  }}
                />
                <motion.a
                  href={item.action ? undefined : item.href}
                  onClick={item.action}
                  className="flex items-center gap-2 px-4 py-2 relative z-10 bg-transparent text-muted-foreground group-hover:text-foreground transition-colors rounded-xl cursor-pointer"
                  variants={itemVariants}
                  transition={sharedTransition}
                  style={{ transformStyle: "preserve-3d", transformOrigin: "center bottom" }}
                >
                  <span className={`transition-colors duration-300 group-hover:${item.iconColor} text-foreground`}>
                    {item.icon}
                  </span>
                  <span className="font-medium tracking-wide">{item.label}</span>
                </motion.a>
                <motion.a
                  href={item.action ? undefined : item.href}
                  onClick={item.action}
                  className="flex items-center gap-2 px-4 py-2 absolute inset-0 z-10 bg-transparent text-muted-foreground group-hover:text-foreground transition-colors rounded-xl cursor-pointer"
                  variants={backVariants}
                  transition={sharedTransition}
                  style={{ transformStyle: "preserve-3d", transformOrigin: "center top", rotateX: 90 }}
                >
                  <span className={`transition-colors duration-300 group-hover:${item.iconColor} text-foreground`}>
                    {item.icon}
                  </span>
                  <span className="font-medium tracking-wide">{item.label}</span>
                </motion.a>
              </motion.div>
            </motion.li>
          ))}
        </ul>
      </motion.nav>
      <div className="text-center relative">
        <motion.div
          className="absolute -inset-4 rounded-full opacity-70 animate-pulse-glow"
          style={{
            background: `radial-gradient(circle, ${isDarkTheme ? "rgba(139,92,246,0.15)" : "rgba(124,58,237,0.08)"} 0%, transparent 70%)`,
            zIndex: -1,
          }}
        />
        <motion.h1
          className={`text-2xl font-display font-bold text-gradient from-${colors.primary} to-${colors.secondary} tracking-tight`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          FastIQ
          <motion.span
            className="inline-block ml-1"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 500 }}
          >
            <Sparkles className={`h-4 w-4 text-${colors.accent} inline-block`} />
          </motion.span>
        </motion.h1>
      </div>

      <AnimatePresence>
        {showQuizInput && (
          <motion.div
            className="w-full max-w-md"
            variants={quizInputVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="relative rounded-xl overflow-hidden backdrop-blur-lg border border-border/40 shadow-lg">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${colors.gradientFrom} ${colors.gradientTo} z-0`}
              ></div>

              <div className="flex items-center justify-between p-3 border-b border-border/40 bg-background/80 relative z-10">
                <div className="flex items-center gap-2">
                  <Code className={`h-4 w-4 text-${colors.secondary}`} />
                  <span className="text-sm font-display font-medium tracking-wide">Enter Quiz Code</span>
                </div>
                <motion.button
                  onClick={toggleQuizInput}
                  className="p-1 rounded-full hover:bg-background/80"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="h-4 w-4" />
                </motion.button>
              </div>

              <div className="relative z-10 p-4">
                <div className="relative">
                  <div className="flex">
                    <motion.div
                      className="relative flex-grow"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 500, damping: 30 }}
                    >
                      <input
                        ref={inputRef}
                        value={quizCode}
                        onChange={(e) => setQuizCode(e.target.value.toUpperCase())}
                        onKeyDown={handleKeyDown}
                        className={`w-full p-3 pl-4 pr-10 bg-background/60 text-foreground font-mono text-lg rounded-l-lg border-y border-l border-border/40 focus:outline-none focus:ring-2 focus:ring-${colors.secondary}/50 uppercase tracking-wider`}
                        placeholder="XX0000"
                        maxLength={6}
                        disabled={isSearching}
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/30 pointer-events-none">
                        {!quizCode && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                            <span className="text-xs">e.g. AB1234</span>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>

                    <motion.button
                      onClick={handleSearchQuiz}
                      disabled={isSearching || !quizCode.trim()}
                      className={`flex items-center justify-center p-3 bg-${colors.secondary} hover:bg-${colors.secondaryHover} text-white rounded-r-lg disabled:opacity-70 transition-colors`}
                      whileHover="hover"
                      whileTap="tap"
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 500, damping: 30 }}
                    >
                      <motion.div variants={searchIconVariants} animate={isSearching ? "loading" : "idle"}>
                        {isSearching ? (
                          <svg
                            className="animate-spin h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        ) : (
                          <Search className="h-5 w-5" />
                        )}
                      </motion.div>
                    </motion.button>
                  </div>

                  {/* Recent quizzes section */}
                  {recentQuizzes.length > 0 && !searchResult && (
                    <motion.div
                      className="mt-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h3 className="text-xs font-display uppercase tracking-wider text-muted-foreground mb-2">
                        Recent Quizzes
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {recentQuizzes.map((code) => (
                          <motion.button
                            key={code}
                            onClick={() => setQuizCode(code)}
                            className={`px-3 py-1 text-sm font-mono bg-background/40 hover:bg-background/80 border border-border/40 rounded-md transition-colors`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {code}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <AnimatePresence>
                    {searchResult && (
                      <motion.div
                        className={`mt-3 p-3 rounded-lg ${
                          searchResult.found
                            ? `bg-${colors.success}/20 text-${colors.success} dark:text-${colors.success}/80`
                            : `bg-${colors.error}/20 text-${colors.error} dark:text-${colors.error}/80`
                        }`}
                        variants={resultVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                      >
                        <div className="flex items-center gap-2">
                          {searchResult.found ? (
                            <motion.div
                              initial={{ rotate: -90, opacity: 0 }}
                              animate={{ rotate: 0, opacity: 1 }}
                              transition={{ delay: 0.2, type: "spring" }}
                            >
                              <ArrowRight className="h-4 w-4" />
                            </motion.div>
                          ) : (
                            <motion.div
                              initial={{ scale: 0.5, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: 0.2, type: "spring" }}
                            >
                              <X className="h-4 w-4" />
                            </motion.div>
                          )}
                          <span className="font-medium">{searchResult.message}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
