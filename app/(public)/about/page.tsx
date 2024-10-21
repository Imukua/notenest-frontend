'use client'

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Github, CloudLightning, Brain, Rocket, Smile, Heart, Star, Sun } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header/header"


import { ForwardRefExoticComponent, RefAttributes } from "react";
import { LucideProps } from "lucide-react"; // Adjust the import based on your actual icon library

interface Card {
  id: number;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
}
const features = [
  { icon: CloudLightning, title: "Cloud-Powered", description: "Secure and scalable infrastructure for your journaling needs" },
  { icon: Brain, title: "AI Insights", description: "Gain deeper understanding of your thoughts and patterns" },
  { icon: Rocket, title: "Continuous Growth", description: "Regular updates and new features to enhance your experience" },
]

const MemoryGame = () => {
  const icons = [Smile, Heart, Star, Sun]
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  const [disabled, setDisabled] = useState<boolean>(false);
  

  useEffect(() => {
    const shuffledCards = [...icons, ...icons]
      .sort(() => Math.random() - 0.5)
      .map((icon, index) => ({ id: index, icon }))
    setCards(shuffledCards)
  }, [])

  useEffect(() => {
    if (flipped.length === 2) {
      setDisabled(true)
      if (cards[flipped[0]].icon === cards[flipped[1]].icon) {
        setSolved([...solved, cards[flipped[0]].id, cards[flipped[1]].id])
        setFlipped([])
      } else {
        setTimeout(() => setFlipped([]), 1000)
      }
      setDisabled(false)
    }
  }, [flipped, cards, solved])

  const handleClick = (id: number) => {
    if (flipped.length === 2 || disabled || flipped.includes(id) || solved.includes(id)) return
    setFlipped([...flipped, id])
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon
        const isFlipped = flipped.includes(card.id)
        const isSolved = solved.includes(card.id)
        return (
          <motion.div
            key={card.id}
            className={`w-16 h-16 bg-slate-700 rounded-lg flex items-center justify-center cursor-pointer ${
              isFlipped || isSolved ? 'bg-blue-600' : ''
            }`}
            onClick={() => handleClick(card.id)}
            animate={{ rotateY: isFlipped || isSolved ? 180 : 0 }}
          >
            {(isFlipped || isSolved) && (
              <Icon className="w-8 h-8 text-white" style={{ transform: 'rotateY(180deg)' }} />
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <Header />
      <main className="max-w-6xl mx-auto space-y-12 px-4 py-8">
        <section className="text-center">
          <motion.h1 
            className="text-4xl font-extrabold sm:text-5xl md:text-6xl mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-600">
              About NoteNest
            </span>
          </motion.h1>
          <motion.p 
            className="text-xl text-slate-300 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Your digital sanctuary for thoughts and reflections
          </motion.p>
        </section>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
              The App
            </h2>
            <p className="text-slate-300 mb-4">
              NoteNest is more than just a journal app - it&apos;s your personal space for growth, reflection, and self-discovery. 
              With intuitive features and a sleek interface, NoteNest makes it easy to capture your thoughts, track your moods, 
              and gain insights into your personal journey.
            </p>
            <p className="text-slate-300 mb-6">
              Whether you&apos;re a seasoned journaler or just starting out, NoteNest adapts to your needs, 
              offering a range of tools from simple text entries to advanced analytics. 
              Your thoughts are precious - let NoteNest help you nurture them.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <feature.icon className="h-12 w-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-300">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-600">
              Memory Game
            </h2>
            <p className="text-slate-300 mb-4">
              Take a break and play our memory game! Match the pairs of icons to win.
            </p>
            <MemoryGame />
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-none shadow-lg shadow-blue-500/50">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-white">
                Meet the Developer
              </h2>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">IM</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-white">Ian Mukua</h3>
                  <p className="text-slate-200 mb-4">
                    Highly motivated AWS re/Start graduate with a passion for cloud technology and a strong foundation in software
                    development. Eager to leverage biotechnology background and newfound cloud expertise to contribute to
                    innovative solutions. Proven ability to thrive in fast-paced environments and adapt to new technologies quickly.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="secondary" asChild>
                      <Link href="mailto:ianmukuaa@gmail.com">
                        <Mail className="mr-2 h-4 w-4" /> Email
                      </Link>
                    </Button>
                    <Button variant="secondary" asChild>
                      <Link href="https://github.com/Imukua/" target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" /> GitHub
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}