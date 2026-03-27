'use client'

import { useEffect, useState } from 'react'

export default function PWAProvider({ children }: { children: React.ReactNode }) {
  const [isInstallPromptActive, setIsInstallPromptActive] = useState(false)

  useEffect(() => {
    // Register service worker for offline support
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then((registration) => {
          console.log('[PWA] Service Worker registered:', registration)
        }).catch((error) => {
          console.log('[PWA] Service Worker registration failed:', error)
        })
      })
    }

    // Handle install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setIsInstallPromptActive(true)
      console.log('[PWA] Install prompt is available')
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    const handleAppInstalled = () => {
      setIsInstallPromptActive(false)
      console.log('[PWA] App was installed')
    }

    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  return <>{children}</>
}
