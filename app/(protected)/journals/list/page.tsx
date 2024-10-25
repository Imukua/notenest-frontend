'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Calendar, ChevronLeft, ChevronRight, Search } from "lucide-react"
import { Header } from '@/components/header/header'
import { useApi } from '@/hooks/useApi'
import { ApiMethod, JournalEntry } from '@/lib/types/types'
import { Routes } from '@/lib/routes/routes'
import { motion, AnimatePresence } from 'framer-motion'
import { EmptyState } from '@/components/empty-space/empty-space'
import JournalEntryCard from '@/components/journal/journalentry'
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { DateRange } from 'react-day-picker'
import { format } from 'date-fns'



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
  const [date, setDate] = useState<DateRange | undefined>()

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
    router.push(`/journals/read?id=${id}`)
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
  
  const handleDateChange = (newDate: DateRange | undefined) => {
    setDate(newDate)
    const params = new URLSearchParams(searchParams.toString())
    if (newDate?.from) params.set('startDate', format(newDate.from, 'yyyy-MM-dd'))
    if (newDate?.to) params.set('endDate', format(newDate.to, 'yyyy-MM-dd'))
    router.push(`?${params.toString()}`, { scroll: false })
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
        
        <div className="mb-8 relative flex items-center">
          <Input
            type="text"
            placeholder="Search by title or content..."
            value={searchTerm}
            onChange={handleSearch}
            className="bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-400 pl-10 pr-4 py-2 rounded-full focus:ring-2 focus:ring-cyan-400 focus:border-transparent flex-grow"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2">
                <Calendar className="h-5 w-5 text-slate-400" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-700" align="end">
              <CalendarComponent
                mode="range"
                selected={date}
                onSelect={handleDateChange}
                numberOfMonths={1}
                className="text-slate-100"
                classNames={{
                  months: "space-y-4 sm:space-x-4 sm:space-y-0",
                  month: "space-y-4",
                  caption: "flex justify-center pt-1 relative items-center",
                  caption_label: "text-sm font-medium",
                  nav: "space-x-1 flex items-center",
                  nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                  nav_button_previous: "absolute left-1",
                  nav_button_next: "absolute right-1",
                  table: "w-full border-collapse space-y-1",
                  head_row: "flex",
                  head_cell: "text-slate-500 rounded-md w-8 font-normal text-[0.8rem]",
                  row: "flex w-full mt-2",
                  cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-slate-100 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
                  day: "h-8 w-8 p-0 font-normal aria-selected:opacity-100",
                  day_range_start: "day-range-start",
                  day_range_end: "day-range-end",
                  day_selected: "bg-cyan-500 text-slate-50 hover:bg-cyan-500 hover:text-slate-50 focus:bg-cyan-500 focus:text-slate-50",
                  day_today: "bg-slate-100 text-slate-900",
                  day_outside: "opacity-50",
                  day_disabled: "opacity-50",
                  day_hidden: "invisible",
                }}
                components={{
                  IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
                  IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
                }}
              />
            </PopoverContent>
          </Popover>
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
                <JournalEntryCard
                  key={entry.id}
                  entry={entry}
                  onClick={handleEntryClick}
                />
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