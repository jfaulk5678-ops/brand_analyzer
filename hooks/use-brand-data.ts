'use client'

import { useQuery } from '@tanstack/react-query'
import { mockBrandData, mockTrendData, mockCompetitorData, mockAIEngineComparison, mockRecommendations } from '@/lib/mock-data'

export function useBrandMetrics(domain?: string) {
  return useQuery({
    queryKey: ['brand-metrics', domain || 'default'],
    queryFn: async () => {
      if (!domain) return mockBrandData;
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brand: domain })
      });
      if (!res.ok) throw new Error('API error');
      const { report } = await res.json();
      return { ...mockBrandData, analysis: report };
    },
    enabled: !!domain,
  })
}

export function useTrendData(domain?: string) {
  return useQuery({
    queryKey: ['trend-data', domain || 'default'],
    queryFn: async () => mockTrendData,
    enabled: !!domain || true,
  })
}

export function useCompetitorData(domain?: string) {
  return useQuery({
    queryKey: ['competitor-data', domain || 'default'],
    queryFn: async () => {
      if (!domain) return mockCompetitorData;
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brand: domain, competitor: 'HubSpot' })
      });
      if (!res.ok) throw new Error('API error');
      const { report } = await res.json();
      const metrics = mockCompetitorData.map(item => ({
        ...item,
        value: Math.random() * 100 + (report.includes(item.name) ? 20 : 0)
      }));
      return metrics;
    },
    enabled: !!domain,
  })
}

export function useAIEngineComparison(domain?: string) {
  return useQuery({
    queryKey: ['ai-engine-comparison', domain || 'default'],
    queryFn: async () => {
      if (!domain) return mockAIEngineComparison;
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brand: domain, type: 'ai-engines' })
      });
      if (!res.ok) throw new Error('API error');
      const { report } = await res.json();
      return { ...mockAIEngineComparison, insights: report };
    },
    enabled: !!domain,
  })
}

export function useRecommendations(domain?: string) {
  return useQuery({
    queryKey: ['recommendations', domain || 'default'],
    queryFn: async () => {
      if (!domain) return mockRecommendations;
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brand: domain, type: 'recommendations' })
      });
      if (!res.ok) throw new Error('API error');
      const { report } = await res.json();
      return mockRecommendations.map((rec) => ({
        ...rec,
        priority: report.includes(rec.action) ? 'High' : 'Medium'
      }));
    },
    enabled: !!domain,
  })
}