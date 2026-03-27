'use client'

import MetricsOverview from './metrics-overview'
import VisibilityTrend from './visibility-trend'
import CompetitorAnalysis from './competitor-analysis'
import AIEngineComparison from './ai-engine-comparison'
import Recommendations from './recommendations'

interface DashboardProps {
  domain?: string
}

export default function Dashboard({ domain }: DashboardProps) {
  return (
    <main id="main-content" className="w-full h-full px-6 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Brand Visibility Analytics
          </h2>
          <p className="text-muted-foreground">
            {domain
              ? `Analytics for ${domain}`
              : 'Comprehensive brand visibility metrics and competitive analysis'}
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="mb-8">
          <MetricsOverview domain={domain} />
        </div>

        {/* Charts Grid */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mb-8">
          <VisibilityTrend domain={domain} />
          <CompetitorAnalysis domain={domain} />
        </div>

        {/* AI Engine and Recommendations */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 mb-8">
          <div className="lg:col-span-2">
            <AIEngineComparison domain={domain} />
          </div>
          <div>
            <Recommendations domain={domain} />
          </div>
        </div>
      </div>
    </main>
  )
}
