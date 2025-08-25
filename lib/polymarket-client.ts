import useSWR from "swr"
import type { PolymarketMarketNormalized, PolymarketEvent, BreakingItem, MarketFilters } from "@/types"
import { config } from "./config"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useMarkets(filters: MarketFilters = {}) {
  const params = new URLSearchParams()

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.set(key, String(value))
    }
  })

  const { data, error, mutate } = useSWR<PolymarketMarketNormalized[]>(`/api/pm/markets?${params}`, fetcher, {
    refreshInterval: config.api.pollInterval,
    revalidateOnFocus: false,
  })

  return {
    markets: data || [],
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}

export function useEvents() {
  const { data, error } = useSWR<PolymarketEvent[]>("/api/pm/events", fetcher, {
    refreshInterval: 300000, // 5 minutes
    revalidateOnFocus: false,
  })

  return {
    events: data || [],
    isLoading: !error && !data,
    isError: error,
  }
}

export function useBreaking() {
  const { data, error, mutate } = useSWR<BreakingItem[]>("/api/breaking", fetcher, {
    refreshInterval: 60000, // 1 minute
    revalidateOnFocus: false,
  })

  return {
    breaking: data || [],
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}
