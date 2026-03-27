'use client'

import { useTrendData } from '@/hooks/use-brand-data'
import { Skeleton } from '@/components/ui/skeleton'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface VisibilityTrendProps {
  domain?: string
}

export default function VisibilityTrend({ domain }: VisibilityTrendProps) {
  const { data, isLoading } = useTrendData(domain)

  if (isLoading) {
    return (
      <div className="rounded-lg border border-border bg-card p-6">
        <Skeleton className="h-6 w-32 mb-6" />
        <Skeleton className="h-80 w-full" />
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6" role="region" aria-label="Visibility trend chart showing monthly metrics over the past year">
      <h3 className="text-lg font-semibold text-card-foreground mb-6">Visibility Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data || []}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
          <YAxis stroke="var(--color-muted-foreground)" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--color-card)',
              border: `1px solid var(--color-border)`,
              borderRadius: '0.625rem',
              color: 'var(--color-card-foreground)',
            }}
            cursor={{ stroke: 'var(--color-border)' }}
          />
          <Legend wrapperStyle={{ color: 'var(--color-muted-foreground)' }} />
          <Line
            type="monotone"
            dataKey="visibility"
            stroke="var(--color-chart-1)"
            strokeWidth={2}
            dot={{ fill: 'var(--color-chart-1)', r: 4 }}
            activeDot={{ r: 6 }}
            name="Visibility"
          />
          <Line
            type="monotone"
            dataKey="engagement"
            stroke="var(--color-chart-2)"
            strokeWidth={2}
            dot={{ fill: 'var(--color-chart-2)', r: 4 }}
            activeDot={{ r: 6 }}
            name="Engagement"
          />
          <Line
            type="monotone"
            dataKey="reach"
            stroke="var(--color-chart-3)"
            strokeWidth={2}
            dot={{ fill: 'var(--color-chart-3)', r: 4 }}
            activeDot={{ r: 6 }}
            name="Reach"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
