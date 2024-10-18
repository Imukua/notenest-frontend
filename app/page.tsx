"use client"
import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, Edit3, Lock, Star, TrendingUp } from "lucide-react"
import { Header } from "@/components/header/header"
import { useRouter } from "next/navigation"
import Footer from "@/components/footer/footer"

export default function HomePage() {
  const router = useRouter()
  const handleSignUp = () => {
    router.push('/signup')
  }
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-50">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-blue-200">
                  Capture Your Thoughts, Unleash Your Potential
                </h1>
                <p className="mx-auto max-w-[700px] text-slate-400 md:text-xl">
                  NoteNest helps you reflect, grow, and achieve your goals through the power of daily journaling.
                </p>
              </div>
              <div className="space-x-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleSignUp}>Get Started</Button>
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
<Footer/>
    </div>
  )
}