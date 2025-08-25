"use client"

import { useEffect, useRef, useState } from "react"
import { config } from "@/lib/config"

interface MarketUpdate {
  conditionId: string
  yesPrice: number
  noPrice: number
  timestamp: number
}

interface WebSocketMessage {
  type: string
  market?: string
  data?: {
    price?: number
    outcome?: string
    [key: string]: any
  }
}

/**
 * Hook for real-time Polymarket WebSocket updates
 * Only connects if NEXT_PUBLIC_PM_WS=1 environment variable is set
 *
 * @param conditionId - The market condition ID to subscribe to
 * @returns Object with current prices and connection status
 */
export function usePolymarketWS(conditionId?: string) {
  const [prices, setPrices] = useState<{ yesPrice?: number; noPrice?: number }>({})
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const reconnectAttempts = useRef(0)

  useEffect(() => {
    // Only connect if WebSocket is enabled and we have a condition ID
    if (!config.websocket.enabled || !conditionId) {
      return
    }

    const connect = () => {
      try {
        // Connect to Polymarket CLOB WebSocket
        const ws = new WebSocket(config.websocket.url)
        wsRef.current = ws

        ws.onopen = () => {
          console.log("[v0] WebSocket connected to Polymarket CLOB")
          setIsConnected(true)
          setError(null)
          reconnectAttempts.current = 0

          // Subscribe to market updates for the specific condition
          const subscribeMessage = {
            type: "subscribe",
            channel: "market",
            market: conditionId,
          }
          ws.send(JSON.stringify(subscribeMessage))
        }

        ws.onmessage = (event) => {
          try {
            const message: WebSocketMessage = JSON.parse(event.data)

            // Handle market price updates
            if (message.type === "market_update" && message.market === conditionId && message.data) {
              const { outcome, price } = message.data

              if (outcome && typeof price === "number") {
                setPrices((prev) => ({
                  ...prev,
                  [outcome === "YES" ? "yesPrice" : "noPrice"]: price,
                }))
              }
            }
          } catch (parseError) {
            console.warn("[v0] Failed to parse WebSocket message:", parseError)
          }
        }

        ws.onerror = (error) => {
          console.error("[v0] WebSocket error:", error)
          setError("WebSocket connection error")
        }

        ws.onclose = (event) => {
          console.log("[v0] WebSocket disconnected:", event.code, event.reason)
          setIsConnected(false)
          wsRef.current = null

          // Attempt to reconnect with exponential backoff
          if (reconnectAttempts.current < 5) {
            const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000)
            reconnectAttempts.current++

            reconnectTimeoutRef.current = setTimeout(() => {
              console.log(`[v0] Attempting WebSocket reconnect (${reconnectAttempts.current}/5)`)
              connect()
            }, delay)
          } else {
            setError("WebSocket connection failed after multiple attempts")
          }
        }
      } catch (connectionError) {
        console.error("[v0] Failed to create WebSocket connection:", connectionError)
        setError("Failed to establish WebSocket connection")
      }
    }

    connect()

    // Cleanup function
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
      }
      if (wsRef.current) {
        wsRef.current.close()
        wsRef.current = null
      }
      setIsConnected(false)
    }
  }, [conditionId])

  return {
    prices,
    isConnected,
    error,
    isEnabled: config.websocket.enabled,
  }
}
