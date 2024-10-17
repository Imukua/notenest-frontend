import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, Edit3, Lock, Star, TrendingUp } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-50">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-slate-800">
        <Link className="flex items-center justify-center" href="#">
          <BookOpen className="h-5 w-5 text-blue-400" />
          <span className="ml-2 text-xl font-semibold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">NoteNest</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-blue-400" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-blue-400" href="#">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:text-blue-400" href="#">
            About
          </Link>
        </nav>
        <Button className="ml-4 rounded-lg" variant="outline">
          Sign In
        </Button>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-blue-200">
                  Capture Your Thoughts, Unleash Your Potential
                </h1>
                <p className="mx-auto max-w-[700px] text-slate-400 md:text-xl">
                  JournalApp helps you reflect, grow, and achieve your goals through the power of daily journaling.
                </p>
              </div>
              <div className="space-x-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Get Started</Button>
              <Button variant="outline" className="text-blue-400 border-blue-400 hover:bg-blue-950">Learn More</Button>   
              </div>
              
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-900">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-blue-100">Features</h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-slate-800 p-4 rounded-lg">
                <Edit3 className="h-8 w-8 mb-2 text-blue-400" />
                <h3 className="text-xl font-bold text-blue-200">Easy Writing</h3>
                <p className="text-sm text-slate-400 text-center">
                  Intuitive interface for seamless journaling experience.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-slate-800 p-4 rounded-lg">
                <Lock className="h-8 w-8 mb-2 text-blue-400" />
                <h3 className="text-xl font-bold text-blue-200">Private & Secure</h3>
                <p className="text-sm text-slate-400 text-center">
                  Your thoughts are protected with end-to-end encryption.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-slate-800 p-4 rounded-lg">
                <TrendingUp className="h-8 w-8 mb-2 text-blue-400" />
                <h3 className="text-xl font-bold text-blue-200">Track Progress</h3>
                <p className="text-sm text-slate-400 text-center">
                  Visualize your growth with insights and analytics.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-blue-100">What Our Users Say</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-slate-800 p-4 rounded-lg">
                <Star className="h-8 w-8 mb-2 text-yellow-500" />
                <p className="text-sm text-slate-400 text-center">
                  "NoteNest has transformed my daily routine. I feel more focused and self-aware."
                </p>
                <p className="font-semibold text-blue-200">- Mutuse M.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-slate-800 p-4 rounded-lg">
                <Star className="h-8 w-8 mb-2 text-yellow-500" />
                <p className="text-sm text-slate-400 text-center">
                  "The insights feature is amazing. It's like having a personal coach."
                </p>
                <p className="font-semibold text-blue-200">- Effie N.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-slate-800 p-4 rounded-lg">
                <Star className="h-8 w-8 mb-2 text-yellow-500" />
                <p className="text-sm text-slate-400 text-center">
                  "Simple, secure, and effective. Give this man a job 😭."
                </p>
                <p className="font-semibold text-blue-200">- Ian M.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-blue-100">Start Your Journaling Journey Today</h2>
                <p className="mx-auto max-w-[600px] text-slate-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of users who have improved their lives through daily reflection.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1 bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-400" placeholder="Enter your email" type="email" />
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Sign Up</Button>
                </form>
                <p className="text-xs text-slate-400">
                  By signing up, you agree to our Terms & Conditions.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-slate-800">
        <p className="text-xs text-slate-400">© 2024 JournalApp. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-slate-400 hover:text-blue-400" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-slate-400 hover:text-blue-400" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}