"use client"

import { useState, useEffect } from "react"
import { BookOpen, Menu, X, Search, PlusCircle, User } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true) // State to track if logged in
  const router = useRouter()

  const handleSignIn = () => {
    router.push('/login')
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }



  return (
    <header className="px-4 lg:px-6 h-16 justify-between flex items-center border-b border-slate-800">
      <Link className="flex items-center justify-center" href="/">
        <BookOpen className="h-6 w-6 text-blue-400" />
        <motion.span 
          className="ml-2 text-xl font-semibold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          NoteNest
        </motion.span>
      </Link>
      <div className="flex items-center">
        {/* Search and Add Journal buttons always visible when logged in */}
        {isLoggedIn && (
          <div className="flex gap-4 mr-4">
            <Button variant="outline" className="text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-slate-50">
              <Search className="h-4 w-4" />
            </Button>
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-slate-50">
              <PlusCircle className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-slate-50">
              <User className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Show menu items only if not logged in */}
        {!isLoggedIn && (
          <nav className="hidden md:flex gap-6 mr-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link className="text-sm font-medium hover:text-blue-400 transition-colors" href="/features">
                Features
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Link className="text-sm font-medium hover:text-blue-400 transition-colors" href="/pricing">
                Pricing
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link className="text-sm font-medium hover:text-blue-400 transition-colors" href="/about">
                About
              </Link>
            </motion.div>
          </nav>
        )}
        
        {!isLoggedIn && (
          <Button 
            className="rounded-lg hidden md:inline-flex"
            variant="outline"
            onClick={handleSignIn}
          >
            Sign In
          </Button>
        )}

        {/* Burger menu button: only show if not logged in */}
        {!isLoggedIn && (
          <Button
            className="md:hidden"
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        )}
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="absolute top-16 left-0 right-0 bg-slate-900 shadow-lg p-4 md:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {/* Conditionally show mobile menu items */}
            {!isLoggedIn && (
              <>
                <Link
                  className="block py-2 text-sm font-medium hover:text-blue-400 transition-colors"
                  href="/features"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Features
                </Link>
                <Link
                  className="block py-2 text-sm font-medium hover:text-blue-400 transition-colors"
                  href="/pricing"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  className="block py-2 text-sm font-medium hover:text-blue-400 transition-colors"
                  href="/about"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Button 
                  className="w-full mt-4 rounded-lg"
                  variant="outline"
                  onClick={() => {
                    handleSignIn()
                    setIsMenuOpen(false)
                  }}
                >
                  Sign In
                </Button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
