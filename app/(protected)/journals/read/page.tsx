"use client"

import { useState, useEffect } from 'react'
import { Pencil, Trash2, AlertCircle, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Header } from '@/components/header/header'
import { useApi } from '@/hooks/useApi'
import { ApiMethod, SingleJournalEntry } from '@/lib/types/types'
import { useRouter, useSearchParams } from 'next/navigation'
import { Routes } from '@/lib/routes/routes'
import { motion, AnimatePresence } from 'framer-motion'

export default function JournalView() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [entry, setEntry] = useState<SingleJournalEntry | null>(null)
  const [displayedContent, setDisplayedContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { sendProtectedRequest } = useApi()
  const params = useSearchParams()
  const journalId = params.get('id')
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      if (journalId) {
        try {
          setIsLoading(true)
          setError(null)
          const path = `${Routes.journals.list}/${journalId}`
          const response = await sendProtectedRequest(ApiMethod.GET, path)
          setEntry(response.data)
        } catch (err) {
          console.log(err)
          setError("Failed to fetch journal entry. Please try again later.")
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchData()
  }, [journalId, sendProtectedRequest])

  // Variation 1: Fade-in effect
  useEffect(() => {
    if (entry) {
      setDisplayedContent("")
      const fadeInEffect = setTimeout(() => {
        setDisplayedContent(entry.content)
      }, 500)

      return () => clearTimeout(fadeInEffect)
    }
  }, [entry])

  const handleEdit = () => {
    router.push(`${Routes.journals.create}?id=${journalId}`)
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const response = await sendProtectedRequest(ApiMethod.DELETE, `${Routes.journals.list}/${journalId}`)
      if (response.status === 200) {
        setIsDeleteDialogOpen(false)
      } else {
        throw new Error("Failed to delete journal entry")
      }
    } catch (err) {
      console.log(err)
      setIsDeleteDialogOpen(false)
    } finally {
      setIsDeleting(false)
      router.push(Routes.journals.all)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 px-4 sm:px-6 lg:px-8">
      <Header />
      <div className="max-w-4xl mx-auto mt-8">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="h-8 w-3/4 bg-slate-800 rounded animate-pulse mb-4"></div>
              <div className="h-4 w-1/2 bg-slate-800 rounded animate-pulse mb-6"></div>
              <Card className="bg-slate-800 text-slate-100 mb-8">
                <CardContent className="p-6">
                  <div className="h-4 bg-slate-700 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-slate-700 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-slate-700 rounded animate-pulse"></div>
                </CardContent>
              </Card>
              <div className="flex justify-center space-x-4">
                <div className="h-10 w-32 bg-slate-800 rounded animate-pulse"></div>
                <div className="h-10 w-32 bg-slate-800 rounded animate-pulse"></div>
              </div>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Oops! Something went wrong</h2>
              <p className="text-slate-400 mb-4">{error}</p>
              <Button onClick={() => router.push(Routes.journals.all)}>
                Back to Journal List
              </Button>
            </motion.div>
          ) : entry ? (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text animate-gradient">
                {entry.title}
              </h1>

              <div className="flex justify-center items-center space-x-4 mb-6">
                <span className="text-sm text-slate-400">
                  {entry.date ? new Date(entry.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Unknown Date'}
                </span>
                <span className="text-sm text-slate-400 px-2 py-1 bg-slate-800 rounded-full">
                  {entry.category}
                </span>
              </div>

              <Card className="bg-slate-800 text-slate-100 mb-8">
                <CardContent className="p-6">
                  <div className='border-l-4 border-blue-500 pl-4'>
                    <motion.pre
                      className="font-mono text-lg whitespace-pre-wrap"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {displayedContent}
                    </motion.pre>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center space-x-4">
                <Button onClick={handleEdit} className="bg-blue-600 hover:bg-blue-700 transition-colors">
                  <Pencil className="mr-2 h-4 w-4" /> Edit Journal
                </Button>
                <Button 
                  onClick={() => setIsDeleteDialogOpen(true)} 
                  variant="destructive"
                  className="bg-red-600 hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete Journal
                </Button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 border border-slate-700 shadow-lg shadow-purple-500/20">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-600">
                Are you absolutely sure?
              </DialogTitle>
              <DialogDescription className="text-slate-300 mt-2">
                This action will permanently delete your journal entry!
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-6 space-x-2 flex justify-center">
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}
                className="bg-slate-800 text-slate-100 hover:bg-slate-700 transition-all duration-200">
                Keep
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 transition-all duration-200"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>Delete</>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}