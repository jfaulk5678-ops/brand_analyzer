'use client'

import { useBrandMetrics } from '@/hooks/use-brand-data'
import { Skeleton } from '@/components/ui/skeleton'
import { TrendingUp, Eye, Users, Award } from 'lucide-react'

interface MetricsOverviewProps {
  domain?: string
}

export default function MetricsOverview({ domain }: MetricsOverviewProps) {
  const { data, isLoading } = useBrandMetrics(domain)

  if (isLoading) {
    return (
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-border bg-card p-6">
            <Skeleton className="h-4 w-24 mb-4" />
            <Skeleton className="h-8 w-16 mb-2" />
            <Skeleton className="h-3 w-32" />
          </div>
        ))}
      </div>
    )
  }

  const metrics = [
    {
      label: 'Visibility Score',
      value: data?.metrics.visibility || 0,
      icon: Eye,
      color: 'text-blue-500',
      description: '+5% from last month',
    },
    {
      label: 'Engagement',
      value: data?.metrics.engagement || 0,
      icon: Users,
      color: 'text-green-500',
      description: '+8% from last month',
    },
    {
      label: 'Reach',
      value: data?.metrics.reach || 0,
      icon: TrendingUp,
      color: 'text-purple-500',
      description: '+12% from last month',
    },
    {
      label: 'Authority',
      value: data?.metrics.authority || 0,
      icon: Award,
      color: 'text-orange-500',
      description: '+3% from last month',
    },
  ]

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {      metrics.map((metric) => {
        const Icon = metric.icon
        return (
          <div
            key={metric.label}
            className="rounded-lg border border-border bg-card p-6 hover:bg-muted/50 transition-colors"
            role="region"
            aria-label={`${metric.label}: ${metric.value} - ${metric.description}`}
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">{metric.label}</span>
              <Icon className={`h-5 w-5 ${metric.color}`} aria-hidden="true" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-bold text-card-foreground" aria-label={`${metric.label} score: ${metric.value}`}>{metric.value}</span>
              <span className="text-xs text-muted-foreground">{metric.description}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
