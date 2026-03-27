'use client'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import Header from '@/components/brand-visibility/header'
import Dashboard from '@/components/brand-visibility/dashboard'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
    },
  },
})

export default function Home() {
  const [searchDomain, setSearchDomain] = useState<string>('')

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <Header searchDomain={searchDomain} onSearchChange={setSearchDomain} />
        <main className="flex-1 overflow-auto">
          <Dashboard domain={searchDomain} />
        </main>
      </div>
    </QueryClientProvider>
  )
}
