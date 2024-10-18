"use client"

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react"
import { Header } from '@/components/header/header'

type JournalEntry = {
  id: string
  title: string
  content: string
  category: string
  date: string
}

const mockEntries: JournalEntry[] = [
  {
    "id": "1",
    "title": "My First Day at Work",
    "content": "Today was my first day at work, and I was feeling a mix of excitement and nervousness. The office environment...",
    "category": "Work",
    "date": "2024-10-16"
  },
  {
    "id": "2",
    "title": "A Beautiful Morning Walk",
    "content": "I woke up early today and went for a walk in the park. The weather was perfect, and I could hear birds chirping...",
    "category": "Personal",
    "date": "2024-09-25"
  },
  {
    "id": "3",
    "title": "The Best Recipe for Pancakes",
    "content": "If you love pancakes, you're going to want to try this recipe. I've made it several times, and it never fails to impress...",
    "category": "Food",
    "date": "2024-08-12"
  }
]

export default function JournalListPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const search = searchParams.get('search') || ''
    setSearchTerm(search)
  }, [searchParams])

  useEffect(() => {
    const fetchEntries = async () => {
      setIsLoading(true)
      try {
        // Simulating API call with mock data
        await new Promise(resolve => setTimeout(resolve, 1000))
        const filteredEntries = mockEntries.filter(entry =>
          entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          entry.content.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setEntries(filteredEntries)
        setTotalPages(Math.ceil(filteredEntries.length / 10)) // Assuming 10 entries per page
      } catch (error) {
        console.error('Error fetching journal entries:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEntries()
  }, [searchTerm])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    router.push(`?search=${encodeURIComponent(value)}`, { scroll: false })
  }

  const handleEntryClick = (id: string) => {
    router.push(`/journals/${id}`)
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 px-4 sm:px-6 lg:px-8">
        <Header />
      <div className="max-w-4xl mx-auto mt-8">
        <h1 className="text-3xl font-bold text-cyan-400 mb-8">My Journal Entries</h1>
        
        <div className="mb-8">
          <Input
            type="text"
            placeholder="Search by title or content..."
            value={searchTerm}
            onChange={handleSearch}
            className="bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-400"
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
          </div>
        ) : (
          <div className="space-y-6">
            {entries.map((entry) => (
              <Card 
                key={entry.id} 
                className="bg-slate-800 border-slate-700 hover:bg-slate-700 transition-colors cursor-pointer"
                onClick={() => handleEntryClick(entry.id)}
              >
                <CardHeader>
                  <CardTitle className="text-xl text-cyan-400">{entry.title}</CardTitle>
                  <CardDescription className="text-slate-400">
                    {new Date(entry.date).toLocaleDateString('en-GB')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="inline-block bg-blue-600 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded text-slate-100 mb-2">
                    {entry.category}
                  </span>
                  <p className="text-slate-300">
                    {entry.content.length > 100 ? `${entry.content.slice(0, 100)}...` : entry.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-8 flex justify-center items-center space-x-4">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-slate-50"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <span className="text-slate-400">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-slate-50"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}