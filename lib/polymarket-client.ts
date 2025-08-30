import useSWR from "swr"
import type { PolymarketMarketNormalized, PolymarketEvent, BreakingItem, MarketFilters } from "@/types"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useMarkets(filters: MarketFilters = {}) {
  const params = new URLSearchParams()

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.set(key, String(value))
    }
  })

  const { data, error, mutate } = useSWR<PolymarketMarketNormalized[]>(`/api/pm/markets?${params}`, fetcher, {
    refreshInterval: 0, // Disable automatic polling
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    errorRetryCount: 1, // Limit retries
    errorRetryInterval: 30000, // 30 seconds between retries
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
    refreshInterval: 0,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  return {
    events: data || [],
    isLoading: !error && !data,
    isError: error,
  }
}

export function useBreaking() {
  const { data, error, mutate } = useSWR<BreakingItem[]>("/api/breaking", fetcher, {
    refreshInterval: 0,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    errorRetryCount: 1,
    errorRetryInterval: 60000, // 1 minute between retries
  })

  return {
    breaking: data || [],
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}
