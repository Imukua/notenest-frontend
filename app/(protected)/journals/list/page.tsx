'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Loader2, ChevronLeft, ChevronRight, Search, BookOpen } from "lucide-react"
import { Header } from '@/components/header/header'
import { useApi } from '@/hooks/useApi'
import { ApiMethod, JournalEntry } from '@/lib/types/types'
import { Routes } from '@/lib/routes/routes'
import { motion, AnimatePresence } from 'framer-motion'
import { EmptyState } from '@/components/empty-space/empty-space'

export default function JournalListPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const { sendProtectedRequest } = useApi()
  const [data, setData] = useState<JournalEntry>({
    entries: [],
    totalEntries: 0,
    hasNextPage: false,
    totalPages: 0,
    categoryCounts: {
      PersonalDevelopment: 0,
      Work: 0,
      Travel: 0,
    },
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const path = Routes.journals.list + "?" + searchParams.toString()

        const response = await sendProtectedRequest(ApiMethod.GET, path)
        setData(response.data)
        setTotalPages(response.data.totalPages)
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [sendProtectedRequest, searchParams, currentPage])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    router.push(`?search=${encodeURIComponent(value)}`, { scroll: false })
  }

  const handleEntryClick = (id: string) => {
    router.push(`/journals/${id}`)
  }

  const handlePageChange = (newPage: number) => {
    if (isLoading || newPage < 1 || newPage > totalPages) return
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set('page', newPage.toString())
    router.push(`?${searchParams.toString()}`, { scroll: false })
    setCurrentPage(newPage)
  }

  const handleAddEntry = () => {
    router.push('/journals/create?mode=new')
  }

  const SkeletonCard = () => (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <div className="h-6 w-3/4 bg-slate-700 rounded animate-pulse"></div>
        <div className="h-4 w-1/4 bg-slate-700 rounded animate-pulse"></div>
      </CardHeader>
      <CardContent>
        <div className="h-4 w-1/5 bg-slate-700 rounded animate-pulse mb-2"></div>
        <div className="h-4 w-full bg-slate-700 rounded animate-pulse"></div>
        <div className="h-4 w-full bg-slate-700 rounded animate-pulse mt-2"></div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100 px-4 sm:px-6 lg:px-8">
      <Header />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto mt-8"
      >
        <h1 className="text-4xl font-bold text-cyan-400 mb-8 text-center">My Journal Entries</h1>
        
        <div className="mb-8 relative">
          <Input
            type="text"
            placeholder="Search by title or content..."
            value={searchTerm}
            onChange={handleSearch}
            className="bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-400 pl-10 pr-4 py-2 rounded-full focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
        </div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {[...Array(3)].map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </motion.div>
          ) : !data.entries || data.entries.length === 0 ? (
            <EmptyState onAddEntry={handleAddEntry} />
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {data.entries.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card 
                    className="bg-slate-800 border-slate-700 hover:bg-slate-700 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-lg"
                    onClick={() => handleEntryClick(entry.id)}
                  >
                    <CardHeader>
                      <CardTitle className="text-xl text-cyan-400 flex items-center">
                        <BookOpen className="mr-2" size={20} />
                        {entry.title}
                      </CardTitle>
                      <CardDescription className="text-slate-400">
                        {new Date(entry.date).toLocaleDateString('en-GB', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <span className="inline-block bg-gradient-to-r from-blue-600 to-cyan-400 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded text-slate-100 mb-2">
                        {entry.category}
                      </span>
                      <p className="text-slate-300 line-clamp-3">
                        {entry.content}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {!isLoading && data.entries && data.entries.length > 0 && (
          <div className="mt-8 flex justify-center items-center space-x-4">
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-slate-50 transition-colors duration-300"
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
              className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-slate-50 transition-colors duration-300"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  )
}