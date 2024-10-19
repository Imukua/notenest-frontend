'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Search, PlusCircle, BookOpen, BarChart2, BookMarked, Briefcase, Plane } from "lucide-react"
import { Header } from '@/components/header/header'
import Link from 'next/link'
import { useApi } from '@/hooks/useApi'
import ApiMethod from '@/lib/types/types'
import { Routes } from '@/lib/routes/routes'
import { Skeleton } from "@/components/ui/skeleton"

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


type CategoryStat = {
  category: string
  count: number
  icon: React.ElementType
}

const Dashboard = () => {
  const { sendProtectedRequest } = useApi();
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
        console.log(response.data)
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
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-slate-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-slate-50">Welcome back, Journaler!</h2>
          <p className="text-slate-300">Ready to capture your thoughts and experiences?</p>
        </section>

        <section className="mb-8">
          <Card className="bg-slate-800 border-slate-700 hover:border-slate-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
            <CardHeader>
              <CardTitle className="text-slate-50 flex items-center">
                <BarChart2 className="h-6 w-6 text-cyan-400 mr-2" />
                Journal Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <>
                  <Skeleton className="h-6 w-full mb-4  bg-slate-700" />
                  <Skeleton className="h-4 w-3/4 mb-2  bg-slate-700" />
                  <Skeleton className="h-4 w-1/2 mb-2  bg-slate-700" />
                  <Skeleton className="h-4 w-2/3  bg-slate-700" />
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-slate-300">Total Journals</p>
                    <p className="text-2xl font-bold text-cyan-400">{totalJournals}</p>
                  </div>
                  <div className="space-y-2">
                    {data.categoryCounts && Object.entries(data.categoryCounts).map(([category, count,]) => (
                      <div key={category} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-slate-300">{category}</span>
                        </div>
                        <span className="text-cyan-400 font-semibold">{count}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-slate-50">Recent Journal Entries</h3>
            <Link href="/journals/list">
              <Button variant="outline" className="text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-slate-50">
                <BookOpen className="mr-2 h-4 w-4" /> View All Entries
              </Button>
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {loading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <Card key={index} className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4 mb-2  bg-slate-700" />
                    <Skeleton className="h-4 w-1/2  bg-slate-700" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2  bg-slate-700" />
                    <Skeleton className="h-4 w-full mb-2 bg-slate-700"  />
                    <Skeleton className="h-4 w-3/4  bg-slate-700" />
                  </CardContent>
                </Card>
              ))
            ) : error ? (
              <div className="col-span-full text-center text-red-400">{error}</div>
            ) : data?.entries && data.entries.length > 0 ? (
              data.entries.map((entry) => (
                <Card key={entry.id} className="bg-slate-800 border-slate-700 hover:border-slate-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
                  <CardHeader>
                    <CardTitle className="text-slate-50">{entry.title}</CardTitle>
                    <CardDescription className="text-slate-400">
                      <span className="text-cyan-400">{entry.category}</span> • {entry.date}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300">{entry.content.substring(0, 100)}...</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center p-12 text-center">
                <div className="rounded-full bg-slate-700 p-3 mb-4">
                  <BookOpen className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-200 mb-2">No Entries Yet</h3>
                <p className="text-slate-400 mb-4">Start your journaling journey today!</p>
                <Link href="/journals/new">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-cyan-400 border-cyan-400 hover:bg-cyan-400/10"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create New Entry
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

export default Dashboard;