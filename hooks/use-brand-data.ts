'use client'

export function useTest(domain?: string) {
  return { 
    domain: domain || 'Demo',
    score: Math.random() * 100,
    loading: false 
  };
}