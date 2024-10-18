'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Search, PlusCircle, BookOpen, BarChart2, BookMarked, Briefcase, Plane } from "lucide-react"
import { Header } from '@/components/header/header'
import Link from 'next/link'


type JournalEntry = {
  id: string
  title: string
  content: string
  category: string
  date: string
}

type CategoryStat = {
  category: string
  count: number
  icon: React.ElementType
}

const Dashboard = () => {
  

  const [journalEntries] = useState<JournalEntry[]>([
    {
      id: "1",
      title: "Morning Reflections",
      content: "A peaceful morning with thoughts about self-improvement.",
      category: "Personal Development",
      date: "October 12, 2024"
    },
    {
      id: "2",
      title: "Tech Conference Insights",
      content: "Learned a lot from the AI and Machine Learning sessions.",
      category: "Work",
      date: "October 15, 2024"
    },
    {
      id: "3",
      title: "Weekend Adventures",
      content: "Explored the city and discovered new places to eat.",
      category: "Travel",
      date: "October 8, 2024"
    }
  ])

  const totalJournals = journalEntries.length
  const categoryStats: CategoryStat[] = [
    { category: "Personal Development", count: 1, icon: BookMarked },
    { category: "Work", count: 1, icon: Briefcase },
    { category: "Travel", count: 1, icon: Plane },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-slate-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-slate-50">Welcome back, Journaler!</h2>
          <p className="text-slate-300">Ready to capture your thoughts and experiences?</p>
        </section>

        <section className="mb-8">
          <Card className="bg-slate-800 border-slate-700 hover:border-slate-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
            <CardHeader>
              <CardTitle className="text-slate-50 flex items-center">
                <BarChart2 className="h-6 w-6 text-cyan-400 mr-2" />
                Journal Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <p className="text-slate-300">Total Journals</p>
                <p className="text-2xl font-bold text-cyan-400">{totalJournals}</p>
              </div>
              <div className="space-y-2">
                {categoryStats.map(({ category, count, icon: Icon }) => (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Icon className="h-4 w-4 text-cyan-400 mr-2" />
                      <span className="text-slate-300">{category}</span>
                    </div>
                    <span className="text-cyan-400 font-semibold">{count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-slate-50">Recent Journal Entries</h3>
            <Link href="/journals/list">
              <Button variant="outline" className="text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-slate-50">
                <BookOpen className="mr-2 h-4 w-4" /> View All Entries
              </Button>
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {journalEntries.map((entry) => (
              <Card key={entry.id} className="bg-slate-800 border-slate-700 hover:border-slate-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-slate-50">{entry.title}</CardTitle>
                  <CardDescription className="text-slate-400">
                    <span className="text-cyan-400">{entry.category}</span> • {entry.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300">{entry.content.substring(0, 100)}...</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default Dashboard; // Wrap Dashboard with the HOC