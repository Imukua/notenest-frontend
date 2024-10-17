"use client"
import { BookOpen } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"


export const Header = () => {
  const router = useRouter()
  const handleSignIn= () => {
    router.push('/login')
  }

    return (
        <header className="px-4 lg:px-6 h-16 flex items-center border-b border-slate-800">
        <Link className="flex items-center justify-center" href="/">
          <BookOpen className="h-5 w-5 text-blue-400" />
          <span className="ml-2 text-xl font-semibold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">NoteNest</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-blue-400" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-blue-400" href="/pricing">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:text-blue-400" href="#">
            About
          </Link>
        </nav>
        <Button className="ml-4 rounded-lg" variant="outline" onClick={handleSignIn}>
          Sign In
        </Button>
      </header>
    )
    }