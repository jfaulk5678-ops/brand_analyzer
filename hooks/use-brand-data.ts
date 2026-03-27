import { useQuery } from '@tanstack/react-query'
import { mockBrandData, mockTrendData, mockCompetitorData, mockAIEngineComparison, mockRecommendations } from '@/lib/mock-data'

export function useBrandMetrics(domain?: string) {
  return useQuery({
    queryKey: ['brand-metrics', domain || 'default'],
    queryFn: async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300))
      return { ...mockBrandData, domain: domain || mockBrandData.domain }
    },
    enabled: !!domain || true,
  })
}

export function useTrendData(domain?: string) {
  return useQuery({
    queryKey: ['trend-data', domain || 'default'],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 400))
      return mockTrendData
    },
    enabled: !!domain || true,
  })
}

export function useCompetitorData(domain?: string) {
  return useQuery({
    queryKey: ['competitor-data', domain || 'default'],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 350))
      return mockCompetitorData
    },
    enabled: !!domain || true,
  })
}

export function useAIEngineComparison(domain?: string) {
  return useQuery({
    queryKey: ['ai-engine-comparison', domain || 'default'],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 320))
      return mockAIEngineComparison
    },
    enabled: !!domain || true,
  })
}

export function useRecommendations(domain?: string) {
  return useQuery({
    queryKey: ['recommendations', domain || 'default'],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 280))
      return mockRecommendations
    },
    enabled: !!domain || true,
  })
}
