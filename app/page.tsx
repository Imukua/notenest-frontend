'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, Edit3, Lock, TrendingUp, ChevronDown, Star } from "lucide-react"
import { Header } from "@/components/header/header"
import Footer from "@/components/footer/footer"
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <Header />
      <main className="flex-1">
        <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
          <motion.div 
            className="absolute inset-0 z-0"
            style={{ opacity, scale }}
          >
            <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 to-transparent opacity-20"></div>
          </motion.div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-12 text-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 animate-gradient max-w-3xl mx-auto">
                  Capture Your Thoughts, Unleash Your Potential
                </h1>
                <p className="mx-auto max-w-[700px] text-slate-400 md:text-lg lg:text-xl">
                  NoteNest helps you reflect, grow, and achieve your goals through the power of daily journaling.
                </p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="space-x-6"
              >
                <Link href="/signup"><Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105">Get Started</Button></Link>
                <Link href="/features"><Button variant="outline" className="text-blue-400 border-blue-400 hover:bg-blue-400/10 text-lg px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105">Learn More</Button> </Link>  
              </motion.div>
            </div>
          </div>
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown className="w-8 h-8 text-slate-300 animate-bounce" />
          </motion.div>
        </section>

        {/* Rest of the sections remain unchanged */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-900/50 backdrop-blur-lg">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-blue-100">Features</h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              {[
                { icon: Edit3, title: "Easy Writing", description: "Intuitive interface for seamless journaling experience." },
                { icon: Lock, title: "Private & Secure", description: "Your thoughts are protected with end-to-end encryption." },
                { icon: TrendingUp, title: "Track Progress", description: "Visualize your growth with insights and analytics." }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className="flex flex-col items-center space-y-2 p-6 rounded-xl bg-slate-800/50 backdrop-blur-sm hover:bg-slate-800/80 transition-all duration-300"
                >
                  <feature.icon className="h-12 w-12 mb-4 text-blue-400" />
                  <h3 className="text-xl font-bold text-blue-200">{feature.title}</h3>
                  <p className="text-sm text-slate-400 text-center">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <motion.div 
                className="flex-1 space-y-4"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-100">Your Personal Growth Journey</h2>
                <p className="text-slate-300 text-lg">
                  With NoteNest, watch your ideas evolve and your personal growth accelerate. Our intuitive interface and powerful analytics help you track your progress and achieve your goals.
                </p>
                <Link href="/features">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full mt-3">
                    Learn More
                  </Button>
                </Link>
              </motion.div>
              <motion.div 
                className="flex-1 flex justify-center"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <BookOpen className="w-64 h-64 text-blue-400" />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-900/50 backdrop-blur-lg">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-blue-100">What Our Users Say</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { quote: "NoteNest has transformed my daily routine. I feel more focused and self-aware.", author: "Mutuse M." },
                { quote: "The insights feature is amazing. It's like having a personal coach.", author: "Effie N." },
                { quote: "Simple, secure, and effective. Give this man a job 😭.", author: "Ian M." }
              ].map((testimonial, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className="flex flex-col items-center space-y-2 p-6 rounded-xl bg-slate-800/50 backdrop-blur-sm hover:bg-slate-800/80 transition-all duration-300"
                >
                  <Star className="h-8 w-8 mb-2 text-yellow-500" />
                  <p className="text-sm text-slate-300 text-center italic">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <p className="font-semibold text-blue-200">- {testimonial.author}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-2"
              >
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-blue-100">Start Your Journaling Journey Today</h2>
                <p className="mx-auto max-w-[600px] text-slate-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of users who have improved their lives through daily reflection.
                </p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="w-full max-w-sm space-y-2"
              >
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1 bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-400" placeholder="Enter your email" type="email" />
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-full transition-all duration-300 transform hover:scale-105">Sign Up</Button>
                </form>
                <p className="text-xs text-slate-400">
                  By signing up, you agree to our Terms & Conditions.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  )
}