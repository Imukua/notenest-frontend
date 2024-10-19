'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { PlusCircle, BookOpen, BarChart2, BookMarked, Briefcase, Plane, Frown } from "lucide-react"
import { Header } from '@/components/header/header'
import Link from 'next/link'
import { useApi } from '@/hooks/useApi'
import {ApiMethod} from '@/lib/types/types'
import { Routes } from '@/lib/routes/routes'
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"
import { useAuth } from '@/hooks/useAuth'

type JournalEntry = {
  entries: Array<{
    id: string;
    title: string;
    content: string;
    category: string;
    date: string;
  }>;
  totalEntries: number;
  nextPage: number | null;
  categoryCounts: {
    PersonalDevelopment: number;
    Work: number;
    Travel: number;
  };
};

const Dashboard = () => {
  const { sendProtectedRequest } = useApi();
  const {user} = useAuth();
  const [data, setData] = useState<JournalEntry>({
    entries: [],
    totalEntries: 0,
    nextPage: null,
    categoryCounts: {
      PersonalDevelopment: 0,
      Work: 0,
      Travel: 0,
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await sendProtectedRequest(ApiMethod.GET, Routes.journals.dashboard);
        setData(response.data);
      } catch (err) {
        setError('Failed to fetch journal entries');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sendProtectedRequest]);

  const totalJournals = data.totalEntries;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900 text-slate-50">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Welcome back, {user? user.username: "Guest"}!</h2>
          <p className="text-xl text-slate-300">Ready to capture your thoughts and experiences?</p>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center">
                <BarChart2 className="h-8 w-8 mr-3 text-cyan-400" />
                Journal Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <>
                  <Skeleton className="h-8 w-full mb-4 bg-slate-700" />
                  <Skeleton className="h-6 w-3/4 mb-2 bg-slate-700" />
                  <Skeleton className="h-6 w-1/2 mb-2 bg-slate-700" />
                  <Skeleton className="h-6 w-2/3 bg-slate-700" />
                </>
              ) : totalJournals === 0 ? (
                <div className="text-center py-8">
                  <Frown className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                  <p className="text-xl text-slate-300 mb-6">No journal entries yet</p>
                  <Link href="/journals/new">
                    <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 transition-all duration-300">
                      <PlusCircle className="h-5 w-5 mr-2" />
                      Create your first entry
                    </Button>
                  </Link>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-xl text-slate-300">Total Journals</p>
                    <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{totalJournals}</p>
                  </div>
                  <div className="space-y-4">
                    {data.categoryCounts && Object.entries(data.categoryCounts).map(([category, count]) => (
                      <div key={category} className="flex items-center justify-between bg-slate-700/50 rounded-lg p-3 hover:bg-slate-700 transition-all duration-300">
                        <div className="flex items-center">
                          {category === 'PersonalDevelopment' && <BookMarked className="h-6 w-6 text-cyan-400 mr-3" />}
                          {category === 'Work' && <Briefcase className="h-6 w-6 text-blue-400 mr-3" />}
                          {category === 'Travel' && <Plane className="h-6 w-6 text-green-400 mr-3" />}
                          <span className="text-lg text-slate-200">{category}</span>
                        </div>
                        <span className="text-2xl font-semibold text-cyan-400">{count}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Recent Journal Entries</h3>
            <Link href="/journals/list">
              <Button variant="outline" className="text-cyan-400 border-cyan-400 hover:bg-cyan-400/10 transition-all duration-300">
                <BookOpen className="mr-2 h-5 w-5" /> View All Entries
              </Button>
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {loading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4 mb-2 bg-slate-700" />
                    <Skeleton className="h-4 w-1/2 bg-slate-700" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2 bg-slate-700" />
                    <Skeleton className="h-4 w-full mb-2 bg-slate-700" />
                    <Skeleton className="h-4 w-3/4 bg-slate-700" />
                  </CardContent>
                </Card>
              ))
            ) : error ? (
              <div className="col-span-full text-center text-red-400 text-xl">{error}</div>
            ) : data?.entries && data.entries.length > 0 ? (
              data.entries.map((entry) => (
                <Card key={entry.id} className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-slate-100">{entry.title}</CardTitle>
                    <CardDescription className="text-slate-400">
                      <span className="text-cyan-400">{entry.category}</span> • {entry.date}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300 line-clamp-3">{entry.content}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center p-12 text-center">
                <div className="rounded-full bg-slate-700 p-4 mb-6">
                  <BookOpen className="h-10 w-10 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-200 mb-3">No Entries Yet</h3>
                <p className="text-slate-400 mb-6 text-lg">Start your journaling journey today!</p>
                <Link href="/journals/new">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
                  >
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Create New Entry
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </motion.section>
      </main>
    </div>
  )
}

export default Dashboard