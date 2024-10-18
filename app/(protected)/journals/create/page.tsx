'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react"
import { Header } from '@/components/header/header'

type JournalEntry = {
  id?: string
  title: string
  content: string
  category: string
}

export default function JournalEntryPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const journalId = searchParams.get('id')

  const [entry, setEntry] = useState<JournalEntry>({
    title: '',
    content: '',
    category: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [errors, setErrors] = useState<Partial<JournalEntry>>({})
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle')

  useEffect(() => {
    if (journalId) {
      setIsLoading(true)
      // Simulate API call to fetch existing journal entry
      setTimeout(() => {
        setEntry({
          id: journalId,
          title: 'My Existing Journal Entry',
          content: 'This is the content of my existing journal entry...',
          category: 'Personal'
        })
        setIsLoading(false)
      }, 1000)
    }
  }, [journalId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEntry(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleCategoryChange = (value: string) => {
    setEntry(prev => ({ ...prev, category: value }))
    setErrors(prev => ({ ...prev, category: '' }))
  }

  const validateForm = () => {
    const newErrors: Partial<JournalEntry> = {}
    if (!entry.title.trim()) newErrors.title = 'Title is required'
    if (!entry.content.trim()) newErrors.content = 'Content is required'
    if (!entry.category) newErrors.category = 'Category is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validateForm()) return

    setIsSaving(true)
    // Simulate API call to save journal entry
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSaving(false)
    setSaveStatus('success')
    setTimeout(() => setSaveStatus('idle'), 3000)
  }

  const handleCancel = () => {
    router.back()
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-900">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 px-4 sm:px-6 lg:px-8">
      <Header />
      <div className="max-w-3xl mx-auto mt-8">
        <h1 className="text-3xl font-bold text-cyan-400 mb-8">
          {journalId ? 'Edit Journal Entry' : 'Create New Journal Entry'}
        </h1>
        <form className="space-y-6">
          <div>
            <Label htmlFor="title" className="text-slate-300">Title</Label>
            <Input
              id="title"
              name="title"
              value={entry.title}
              onChange={handleInputChange}
              className="bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-400"
              placeholder="Enter journal title"
            />
            {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
          </div>
          <div>
            <Label htmlFor="content" className="text-slate-300">Content</Label>
            <Textarea
              id="content"
              name="content"
              value={entry.content}
              onChange={handleInputChange}
              className="bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-400 min-h-[200px]"
              placeholder="Write your journal entry here..."
            />
            {errors.content && <p className="text-red-400 text-sm mt-1">{errors.content}</p>}
          </div>
          <div>
            <Label htmlFor="category" className="text-slate-300">Category</Label>
            <Select value={entry.category} onValueChange={handleCategoryChange}>
              <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-100">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                <SelectItem value="Personal">Personal</SelectItem>
                <SelectItem value="Work">Work</SelectItem>
                <SelectItem value="Travel">Travel</SelectItem>
                <SelectItem value="Health">Health</SelectItem>
              </SelectContent>
            </Select>
            {errors.category && <p className="text-red-400 text-sm mt-1">{errors.category}</p>}
          </div>
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-slate-50"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              disabled={isSaving || !entry.title || !entry.content || !entry.category}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Entry'
              )}
            </Button>
          </div>
        </form>
        {saveStatus === 'success' && (
          <Alert className="mt-4 bg-green-800 border-green-700 text-green-100">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Your journal entry has been saved successfully.</AlertDescription>
          </Alert>
        )}
        {saveStatus === 'error' && (
          <Alert className="mt-4 bg-red-800 border-red-700 text-red-100">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>There was an error saving your journal entry. Please try again.</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  )
}