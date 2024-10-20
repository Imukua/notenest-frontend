'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Header } from "@/components/header/header"
import { Button } from "@/components/ui/button"
import { Edit3, Lock, TrendingUp, Zap, Cloud, BarChart } from "lucide-react"
import Link from 'next/link'

const features = [
  { icon: Edit3, title: "Intuitive Writing", description: "Effortlessly capture your thoughts with our user-friendly interface." },
  { icon: Lock, title: "Secure & Private", description: "Your journals are protected with end-to-end encryption." },
  { icon: TrendingUp, title: "Track Progress", description: "Visualize your personal growth with insightful analytics." },
  { icon: Zap, title: "AI-Powered Insights", description: "Gain deeper understanding of your thoughts and patterns." },
  { icon: Cloud, title: "Cloud Sync", description: "Access your journals from any device, anytime." },
  { icon: BarChart, title: "Mood Tracking", description: "Monitor your emotional well-being over time." },
]

export default function FeaturesPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                Powerful Features for Your Journey
              </h1>
              <p className="mx-auto max-w-[700px] text-slate-400 md:text-xl">
                Discover the tools that will elevate your journaling experience and personal growth.
              </p>
            </div>
            <div className="grid gap-8 mt-16 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center p-6 space-y-4 rounded-xl bg-slate-800/50 backdrop-blur-sm hover:bg-slate-800/80 transition-all duration-300"
                >
                  <feature.icon className="w-12 h-12 text-blue-400" />
                  <h2 className="text-xl font-bold text-blue-200">{feature.title}</h2>
                  <p className="text-center text-slate-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-900/50 backdrop-blur-lg">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-100">
                Ready to Start Your Journey?
              </h2>
              <p className="max-w-[600px] text-slate-400 md:text-xl">
                Join thousands of users who have transformed their lives through daily reflection.
              </p>
              <Link href="/signup">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105">
                  Get Started Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-slate-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center space-x-4">
              <Edit3 className="h-6 w-6 text-blue-400" />
              <span className="text-lg font-semibold text-slate-200">NoteNest</span>
            </div>
            <p className="text-sm text-slate-400">© 2024 NoteNest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}