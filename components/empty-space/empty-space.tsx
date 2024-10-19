import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Frown, PlusCircle } from "lucide-react"

interface EmptyStateProps {
  onAddEntry: () => void
}

export function EmptyState({ onAddEntry }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center space-y-4 p-8 bg-slate-800 rounded-lg border border-slate-700"
    >
      <Frown className="w-16 h-16 text-slate-400" />
      <h2 className="text-2xl font-semibold text-slate-200">No Entries Found</h2>
      <p className="text-slate-400 text-center">It looks like you haven't added any journal entries yet.</p>
      <Button onClick={onAddEntry} className="mt-4 bg-cyan-500 hover:bg-cyan-600 text-white">
        <PlusCircle className="mr-2 h-4 w-4" />
        Add New Entry
      </Button>
    </motion.div>
  )
}