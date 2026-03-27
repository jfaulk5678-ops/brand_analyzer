'use client'

import { useRecommendations } from '@/hooks/use-brand-data'
import { Skeleton } from '@/components/ui/skeleton'
import { Lightbulb, AlertCircle, CheckCircle } from 'lucide-react'

interface RecommendationsProps {
  domain?: string
}

export default function Recommendations({ domain }: RecommendationsProps) {
  const { data, isLoading } = useRecommendations(domain)

  if (isLoading) {
    return (
      <div className="rounded-lg border border-border bg-card p-6">
        <Skeleton className="h-6 w-32 mb-6" />
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex gap-4">
              <Skeleton className="h-10 w-10 rounded-lg flex-shrink-0" />
              <div className="flex-1">
                <Skeleton className="h-4 w-48 mb-2" />
                <Skeleton className="h-3 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/10 text-red-700 dark:text-red-400'
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400'
      default:
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-400'
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="h-4 w-4" />
      case 'medium':
        return <Lightbulb className="h-4 w-4" />
      default:
        return <CheckCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="text-lg font-semibold text-card-foreground mb-6 flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-accent" />
        Recommendations
      </h2>
      <div className="space-y-4">
        {data?.map((rec) => (
          <div
            key={rec.id}
            className="flex gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
          >
            <div
              className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getPriorityColor(
                rec.priority
              )}`}
            >
              {getPriorityIcon(rec.priority)}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-card-foreground text-sm mb-1">{rec.title}</h3>
              <p className="text-xs text-muted-foreground mb-2">{rec.description}</p>
              <div className="flex items-center gap-2">
                <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getPriorityColor(rec.priority)}`}>
                  {rec.priority.charAt(0).toUpperCase() + rec.priority.slice(1)} Priority
                </span>
                <span className="text-xs text-accent font-medium">{rec.impact}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
