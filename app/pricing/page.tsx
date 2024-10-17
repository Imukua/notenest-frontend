'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, BookOpen, Feather, Zap } from "lucide-react"
import { Header } from '@/components/header/header'

export default function PricingPage() {
  const [highlightedTier, setHighlightedTier] = useState<string | null>(null)

  const tiers = [
    {
      name: "Basic",
      price: "$4.99",
      description: "Perfect for casual journalers",
      features: [
        "Unlimited text entries",
        "Basic text formatting",
        "Daily reminders",
        "1 GB storage",
        "Access on one device",
      ],
      cta: "Start Basic",
      icon: BookOpen,
      gradient: "from-green-400 to-cyan-500",
    },
    {
      name: "Pro",
      price: "$9.99",
      description: "For dedicated writers and self-improvers",
      features: [
        "All Basic features",
        "Rich text formatting",
        "Mood tracking",
        "Custom tags",
        "10 GB storage",
        "Access on up to 3 devices",
        "Priority support",
      ],
      cta: "Go Pro",
      highlighted: true,
      icon: Feather,
      gradient: "from-purple-400 to-pink-500",
    },
    {
      name: "Premium",
      price: "$14.99",
      description: "For power users and professionals",
      features: [
        "All Pro features",
        "Unlimited storage",
        "AI-powered insights",
        "Collaboration features",
        "Export to multiple formats",
        "Access on unlimited devices",
        "24/7 premium support",
      ],
      cta: "Get Premium",
      icon: Zap,
      gradient: "from-yellow-400 to-orange-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-slate-50 px-4 sm:px-6 lg:px-8">
        <Header />
      <div className="max-w-7xl mx-auto mt-10">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
            Choose Your Perfect Plan
          </h1>
          <p className="mt-3 max-w-md mx-auto text-xl text-slate-300 sm:text-2xl md:mt-5 md:max-w-3xl">
            Select the plan that best fits your journaling needs
          </p>
        </div>

        <div className="mt-16 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
          {tiers.map((tier) => (
            <Card 
              key={tier.name}
              className={`flex flex-col justify-between transition-all duration-300 ${
                (highlightedTier === tier.name || (!highlightedTier && tier.highlighted))
                  ? 'border-cyan-500 shadow-cyan-500/50 shadow-lg scale-105' 
                  : 'border-slate-700 hover:border-slate-500'
              } bg-slate-800 cursor-pointer`}
              onClick={() => setHighlightedTier(tier.name)}
            >
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className={`text-2xl font-bold bg-gradient-to-r ${tier.gradient} bg-clip-text text-transparent`}>
                    {tier.name}
                  </CardTitle>
                  <tier.icon className="w-8 h-8 text-cyan-400" />
                </div>
                <CardDescription className="text-slate-400">{tier.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mt-4 flex items-baseline text-5xl font-extrabold">
                  <span className="text-cyan-400">{tier.price}</span>
                  <span className="ml-1 text-2xl font-medium text-slate-400">/month</span>
                </div>
                <ul className="mt-6 space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex">
                      <Check className="flex-shrink-0 w-6 h-6 text-cyan-500" />
                      <span className="ml-3 text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className={`w-full ${
                    (highlightedTier === tier.name || (!highlightedTier && tier.highlighted))
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600'
                      : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                >
                  {tier.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}