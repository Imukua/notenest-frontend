import { Header } from "@/components/header/header"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, PenTool, Smile, Tag, Cloud, Zap, Users, FileText, HeadphonesIcon } from "lucide-react"

export default function FeaturesPage() {
  const features = [
    { 
      icon: BookOpen, 
      title: "Unlimited Entries", 
      description: "Write as much as you want, whenever you want. Your thoughts have no limits here." 
    },
    { 
      icon: PenTool, 
      title: "Rich Text Formatting", 
      description: "Express yourself with various text styles, lists, and embedded media." 
    },
    { 
      icon: Smile, 
      title: "Mood Tracking", 
      description: "Monitor your emotional journey with our intuitive mood tracking feature." 
    },
    { 
      icon: Tag, 
      title: "Custom Tags", 
      description: "Organize your entries your way with customizable tags and categories." 
    },
    { 
      icon: Cloud, 
      title: "Cloud Sync", 
      description: "Access your journal from any device, anytime. Your entries are always with you." 
    },
    { 
      icon: Zap, 
      title: "AI Insights", 
      description: "Gain deeper understanding of your thoughts and patterns with AI-powered analysis." 
    },
    { 
      icon: Users, 
      title: "Collaboration", 
      description: "Share and co-author entries with trusted friends or family members." 
    },
    { 
      icon: FileText, 
      title: "Export Options", 
      description: "Export your journal in various formats for backup or printing." 
    },
    { 
      icon: HeadphonesIcon, 
      title: "24/7 Support", 
      description: "Our dedicated support team is always here to help you on your journaling journey." 
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-slate-50  ">
        <Header />
      <div className="max-w-7xl mx-auto mt-10">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
              Features
            </span>
          </h1>
          <p className="text-xl text-slate-300">Discover the tools that make MindScribe your perfect journaling companion</p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-slate-800 border-slate-700 overflow-hidden group hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold ml-4">{feature.title}</h3>
                </div>
                <p className="text-slate-300">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}