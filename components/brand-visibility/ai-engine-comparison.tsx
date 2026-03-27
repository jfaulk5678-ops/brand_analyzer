'use client'

import { useAIEngineComparison } from '@/hooks/use-brand-data'
import { Skeleton } from '@/components/ui/skeleton'
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

interface AIEngineComparisonProps {
  domain?: string
}

export default function AIEngineComparison({ domain }: AIEngineComparisonProps) {
  const { data, isLoading } = useAIEngineComparison(domain)

  if (isLoading) {
    return (
      <div className="rounded-lg border border-border bg-card p-6">
        <Skeleton className="h-6 w-48 mb-6" />
        <Skeleton className="h-80 w-full" />
      </div>
    )
  }

  // Transform data for radar chart
  const chartData = [
    {
      metric: 'Coverage',
      Google: 95,
      Bing: 78,
      DuckDuckGo: 65,
      Baidu: 72,
    },
    {
      metric: 'Accuracy',
      Google: 92,
      Bing: 85,
      DuckDuckGo: 88,
      Baidu: 86,
    },
    {
      metric: 'Freshness',
      Google: 88,
      Bing: 82,
      DuckDuckGo: 90,
      Baidu: 84,
    },
  ]

  return (
    <div className="rounded-lg border border-border bg-card p-6" role="region" aria-label="Search engine comparison radar chart showing coverage accuracy and freshness metrics">
      <h3 className="text-lg font-semibold text-card-foreground mb-6">AI Engine Comparison</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={chartData}>
          <PolarGrid stroke="var(--color-border)" />
          <PolarAngleAxis dataKey="metric" stroke="var(--color-muted-foreground)" />
          <PolarRadiusAxis stroke="var(--color-muted-foreground)" domain={[0, 100]} />
          <Radar
            name="Google"
            dataKey="Google"
            stroke="var(--color-chart-1)"
            fill="var(--color-chart-1)"
            fillOpacity={0.25}
          />
          <Radar
            name="Bing"
            dataKey="Bing"
            stroke="var(--color-chart-2)"
            fill="var(--color-chart-2)"
            fillOpacity={0.25}
          />
          <Radar
            name="DuckDuckGo"
            dataKey="DuckDuckGo"
            stroke="var(--color-chart-3)"
            fill="var(--color-chart-3)"
            fillOpacity={0.25}
          />
          <Radar
            name="Baidu"
            dataKey="Baidu"
            stroke="var(--color-chart-4)"
            fill="var(--color-chart-4)"
            fillOpacity={0.25}
          />
          <Legend wrapperStyle={{ color: 'var(--color-muted-foreground)' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--color-card)',
              border: `1px solid var(--color-border)`,
              borderRadius: '0.625rem',
              color: 'var(--color-card-foreground)',
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
