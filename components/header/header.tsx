"use client"

import { useState } from "react"
import { BookOpen, Menu, X, Search, PlusCircle, User, LogOut } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/hooks/useAuth"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const {isAuthenticated, logoutUser} = useAuth()
  const [open, setOpen] = useState(false)

  const handleSignIn = () => {
    router.push('/login')
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = () => {
    logoutUser()
    setOpen(false)
  }

  const menuItems = ["Features", "Pricing", "About"]

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 text-slate-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link className="flex items-center space-x-2" href={isAuthenticated ? "/dashboard" : "/"}>
          <BookOpen className="h-8 w-8 text-blue-400" />
          <motion.span 
            className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            NoteNest
          </motion.span>
        </Link>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link href="/journals/list">
                <Button variant="ghost" size="icon" className="text-slate-300 hover:text-blue-400">
                  <Search className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/journals/create">
                <Button size="icon" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
                  <PlusCircle className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/account/edit">
                <Button variant="ghost" size="icon" className="text-slate-300 hover:text-blue-400">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-slate-300 hover:text-red-400">
                    <LogOut className="h-5 w-5" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-slate-800 border-slate-700">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-slate-50">Confirm Logout</AlertDialogTitle>
                    <AlertDialogDescription className="text-slate-300">
                      Are you sure you want to log out of your account?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-slate-700 text-slate-50 hover:bg-slate-600">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogout} className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600">Logout</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          ) : (
            <>
              <nav className="hidden md:flex space-x-6">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item}
                    className="relative"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link className="text-sm font-medium hover:text-blue-400 transition-colors" href={`/${item.toLowerCase()}`}>
                      {item}
                    </Link>
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>
                ))}
              </nav>
              <Button 
                className="hidden md:inline-flex"
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
            </>
          )}
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && !isAuthenticated && (
          <motion.div
            className="fixed inset-0 bg-slate-900 z-50 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              className="absolute top-4 right-4"
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </Button>
            {menuItems.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  className="text-2xl font-bold mb-6 hover:text-blue-400 transition-colors"
                  href={`/${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: menuItems.length * 0.1 }}
            >
              <Button 
                className="mt-8"
                variant="outline"
                size="lg"
                onClick={() => {
                  handleSignIn()
                  setIsMenuOpen(false)
                }}
              >
                Sign In
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}