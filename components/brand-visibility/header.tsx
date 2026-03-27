'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Moon, Sun, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface HeaderProps {
  searchDomain: string
  onSearchChange: (domain: string) => void
}

export default function Header({ searchDomain, onSearchChange }: HeaderProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <header className="border-b border-border bg-card">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-xl font-bold text-card-foreground">Brand Visibility</h1>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card backdrop-blur-sm">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md">
        Skip to main content
      </a>
      <div className="px-6 py-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center" aria-hidden="true">
              <span className="text-sm font-bold text-primary-foreground">BV</span>
            </div>
            <h1 className="text-2xl font-bold text-card-foreground">Brand Visibility</h1>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4 flex-1 md:flex-none">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" aria-hidden="true" />
              <Input
                placeholder="Search domain..."
                value={searchDomain}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 bg-muted text-foreground placeholder:text-muted-foreground focus:bg-background focus:ring-2 focus:ring-primary/50"
                aria-label="Search domain for brand visibility analysis"
              />
            </div>

            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
              ) : (
                <Moon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
