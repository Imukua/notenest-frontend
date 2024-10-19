import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { BookOpen } from "lucide-react"
import { motion } from 'framer-motion'

interface JournalEntry {
  id: string
  title: string
  date: string
  category: string
  content: string
}

interface JournalEntryCardProps {
  entry: JournalEntry
  onClick: (id: string) => void
  maxLines?: number
  className?: string
}

export default function JournalEntryCard({ entry, onClick, maxLines = 2, className = "" }: JournalEntryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className={`bg-slate-800 border-slate-700 hover:bg-slate-700 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-lg ${className}`}
        onClick={() => onClick(entry.id)}
        style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
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
        <CardContent className=" flex flex-col flex-grow">
        <div className="mb-2">
            <span className="inline-block bg-gradient-to-r from-blue-600 to-cyan-400 text-xs font-semibold px-2 py-0.5 rounded text-slate-100">
              {entry.category}
            </span>
          </div>
          <p 
            className="text-slate-300 overflow-hidden"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: maxLines,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              flex: 1,
            }}
          >
            {entry.content}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}