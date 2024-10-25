'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Feather, Zap, ChevronRight } from "lucide-react"
import { Header } from '@/components/header/header'
import { motion, AnimatePresence } from 'framer-motion'

export default function PricingPage() {
  const [selectedTier, setSelectedTier] = useState(0)

  const tiers = [
    {
      name: "Basic",
      price: 4.99,
      icon: BookOpen,
      color: "from-green-400 to-cyan-500",
      features: [
        "Unlimited text entries",
        "Basic text formatting",
        "Daily reminders",
        "1 GB storage",
        "Access on one device",
      ],
    },
    {
      name: "Pro",
      price: 9.99,
      icon: Feather,
      color: "from-purple-400 to-pink-500",
      features: [
        "Rich text formatting",
        "Mood tracking",
        "Custom tags",
        "10 GB storage",
        "Access on up to 3 devices",
        "Priority support",
      ],
    },
    {
      name: "Premium",
      price: 14.99,
      icon: Zap,
      color: "from-yellow-400 to-orange-500",
      features: [
        "Unlimited storage",
        "AI-powered insights",
        "Collaboration features",
        "Export to multiple formats",
        "Access on unlimited devices",
        "24/7 premium support",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100 px-4 sm:px-6 lg:px-8">
      <Header />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto mt-16 pb-16"
      >
        <h1 className="text-4xl font-extrabold text-center text-cyan-400 mb-8">
          Your Journal Journey
        </h1>

        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-700 -translate-y-1/2"></div>
          <div className="relative z-10 flex justify-between">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                className={`flex flex-col items-center cursor-pointer ${
                  index <= selectedTier ? 'opacity-100' : 'opacity-50'
                }`}
                onClick={() => setSelectedTier(index)}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r ${tier.color}`}>
                  <tier.icon className="w-6 h-6 text-slate-900" />
                </div>
                <span className="mt-2 font-semibold">{tier.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTier}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-12"
          >
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-cyan-400">{tiers[selectedTier].name}</h2>
                  <div className="text-3xl font-bold text-cyan-400">${tiers[selectedTier].price}<span className="text-lg text-slate-400">/mo</span></div>
                </div>
                <ul className="space-y-2 mb-6">
                  {tiers[selectedTier].features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center"
                    >
                      <ChevronRight className="w-4 h-4 text-cyan-400 mr-2" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                <Button className={`w-full bg-gradient-to-r ${tiers[selectedTier].color} text-slate-900 hover:opacity-90 transition-opacity duration-300`}>
                  Start your {tiers[selectedTier].name} journey
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  )
}