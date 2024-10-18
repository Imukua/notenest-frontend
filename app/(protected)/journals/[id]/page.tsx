"use client"

import { useState, useEffect } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { Header } from '@/components/header/header'

const mockJournalEntry = {
  id: "1",
  title: "A Memorable Day in the Mountains",
  content: "It was an early morning when we set off for the mountains. The air was crisp, and the view was nothing short of breathtaking. We hiked for hours, enjoying the serenity and the sound of nature... By midday, we reached the summit. The sense of accomplishment was overwhelming... As we descended, the sunset painted the sky in hues of pink and orange. It was truly a day to remember.",
  category: "Adventure",
  date: "2024-10-12"
}

export default function Component() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [displayedContent, setDisplayedContent] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    let i = 0
    const typingEffect = setInterval(() => {
      if (i < mockJournalEntry.content.length) {
        setDisplayedContent(prev => prev + mockJournalEntry.content.charAt(i))
        i++
      } else {
        clearInterval(typingEffect)
      }
    }, 50)

    return () => clearInterval(typingEffect)
  }, [])

  const handleEdit = () => {
    console.log("Navigating to edit page with journal ID:", mockJournalEntry.id)
  }

  const handleDelete = () => {
    console.log("Deleting journal entry:", mockJournalEntry.id)
    setIsDeleteDialogOpen(false)
    toast({
      title: "Journal Entry Deleted",
      description: "Your journal entry has been successfully deleted.",
    })
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100  px-4 sm:px-6 lg:px-8 animate-fade-in">
        <Header/>
      <div className="max-w-4xl mx-auto mt-8">
        <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text animate-gradient">
          {mockJournalEntry.title}
        </h1>

        <div className="flex justify-center items-center space-x-4 mb-6">
          <span className="text-sm text-slate-400">
            {new Date(mockJournalEntry.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <span className="text-sm text-slate-400 px-2 py-1 bg-slate-800 rounded-full">
            {mockJournalEntry.category}
          </span>
        </div>

        <Card className="bg-slate-800 text-slate-100 mb-8 animate-fade-in">
          <CardContent className="p-6">
            <div className='border-l-4 border-blue-500 pl-4'>
                <pre className="font-mono text-lg whitespace-pre-wrap">
                  {displayedContent}
                  <span className="animate-blink">|</span>
                </pre>
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

        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to delete this journal entry?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your journal entry.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}