import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardHeader, CardContent } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Skeleton className="h-10 w-48 bg-slate-800 mb-8" />
        
        <div className="mb-8">
          <Skeleton className="h-10 w-full bg-slate-800" />
        </div>

        <div className="space-y-6">
          {[...Array(3)].map((_, index) => (
            <Card key={index} className="bg-slate-800 border-slate-700">
              <CardHeader>
                <Skeleton className="h-6 w-3/4 bg-slate-700 mb-2" />
                <Skeleton className="h-4 w-1/4 bg-slate-700" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-1/4 bg-slate-700 mb-2" />
                <Skeleton className="h-4 w-full bg-slate-700" />
                <Skeleton className="h-4 w-full bg-slate-700 mt-1" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex justify-center items-center space-x-4">
          <Skeleton className="h-10 w-24 bg-slate-800" />
          <Skeleton className="h-6 w-32 bg-slate-800" />
          <Skeleton className="h-10 w-24 bg-slate-800" />
        </div>
      </div>
    </div>
  )
}