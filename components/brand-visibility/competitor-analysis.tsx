'use client'

import { useCompetitorData } from '@/hooks/use-brand-data'
import { Skeleton } from '@/components/ui/skeleton'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface CompetitorAnalysisProps {
  domain?: string
}

export default function CompetitorAnalysis({ domain }: CompetitorAnalysisProps) {
  const { data, isLoading } = useCompetitorData(domain)

  if (isLoading) {
    return (
      <div className="rounded-lg border border-border bg-card p-6">
        <Skeleton className="h-6 w-40 mb-6" />
        <Skeleton className="h-80 w-full" />
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6" role="region" aria-label="Competitor analysis bar chart comparing brand metrics against competitors">
      <h3 className="text-lg font-semibold text-card-foreground mb-6">Competitor Analysis</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data || []}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis dataKey="name" stroke="var(--color-muted-foreground)" angle={-45} textAnchor="end" height={80} />
          <YAxis stroke="var(--color-muted-foreground)" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--color-card)',
              border: `1px solid var(--color-border)`,
              borderRadius: '0.625rem',
              color: 'var(--color-card-foreground)',
            }}
            cursor={{ fill: 'var(--color-muted)' }}
          />
          <Legend wrapperStyle={{ color: 'var(--color-muted-foreground)' }} />
          <Bar dataKey="visibility" fill="var(--color-chart-1)" name="Visibility" radius={[8, 8, 0, 0]} />
          <Bar dataKey="engagement" fill="var(--color-chart-2)" name="Engagement" radius={[8, 8, 0, 0]} />
          <Bar dataKey="reach" fill="var(--color-chart-3)" name="Reach" radius={[8, 8, 0, 0]} />
          <Bar dataKey="authority" fill="var(--color-chart-4)" name="Authority" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
