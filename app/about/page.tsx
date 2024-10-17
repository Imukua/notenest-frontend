import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, Mail, CloudLightning, Brain, Rocket } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header/header"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-slate-50  ">
      <Header />
      <div className="max-w-4xl mx-auto space-y-12 mt-10">
        <section className="text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              About NoteNest
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-8">Your digital sanctuary for thoughts and reflections</p>
        </section>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
              The App
            </h2>
            <p className="text-slate-300 mb-4">
              NoteNest is more than just a journal app - it's your personal space for growth, reflection, and self-discovery. 
              With intuitive features and a sleek interface, NoteNest makes it easy to capture your thoughts, track your moods, 
              and gain insights into your personal journey.
            </p>
            <p className="text-slate-300">
              Whether you're a seasoned journaler or just starting out, NoteNest adapts to your needs, 
              offering a range of tools from simple text entries to advanced analytics. 
              Your thoughts are precious - let NoteNest help you nurture them.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
              The Developer
            </h2>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-4xl font-bold">IM</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Ian Mukua</h3>
                <p className="text-slate-300 mb-4">
                  Highly motivated AWS re/Start graduate with a passion for cloud technology and a strong foundation in software
                  development. Eager to leverage biotechnology background and newfound cloud expertise to contribute to
                  innovative solutions. Proven ability to thrive in fast-paced environments and adapt to new technologies quickly.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="outline" asChild>
                    <Link href="mailto:ianmukuaa@gmail.com">
                      <Mail className="mr-2 h-4 w-4" /> Email
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="https://github.com/Imukua/" target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" /> GitHub
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <CloudLightning className="h-12 w-12 text-cyan-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Cloud Expertise</h3>
              <p className="text-slate-300">Leveraging AWS knowledge for robust and scalable solutions</p>
            </CardContent>
          </Card>
        
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Brain className="h-12 w-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Biotech Background</h3>
              <p className="text-slate-300">Unique perspective from biotechnology experience</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Rocket className="h-12 w-12 text-pink-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Rapid Adaptation</h3>
              <p className="text-slate-300">Quick learner, always ready for new challenges</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}