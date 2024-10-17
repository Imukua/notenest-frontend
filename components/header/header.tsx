"use client"

import { useState, useEffect } from "react"
import { BookOpen, Menu, X } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()

  const handleSignIn = () => {
    router.push('/login')
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = [
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
  ]

  return (
    <header className="px-4 lg:px-6 h-16  justify-between flex items-center border-b border-slate-800">
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
        <nav className="hidden md:flex gap-6 mr-4">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link className="text-sm font-medium hover:text-blue-400 transition-colors" href={item.href}>
                {item.label}
              </Link>
            </motion.div>
          ))}
        </nav>
        <Button 
          className="rounded-lg hidden md:inline-flex"
          variant="outline"
          onClick={handleSignIn}
        >
          Sign In
        </Button>
        <Button
          className="md:hidden"
          variant="ghost"
          size="icon"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="absolute top-16 left-0 right-0 bg-slate-900 shadow-lg p-4 md:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {menuItems.map((item) => (
              <Link
                key={item.href}
                className="block py-2 text-sm font-medium hover:text-blue-400 transition-colors"
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}