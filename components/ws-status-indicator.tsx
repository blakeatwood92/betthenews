"use client"

import { Badge } from "@/components/ui/badge"
import { WifiOff, Zap } from "lucide-react"
import { config } from "@/lib/config"

interface WSStatusIndicatorProps {
  isConnected?: boolean
  className?: string
}

export function WSStatusIndicator({ isConnected = false, className = "" }: WSStatusIndicatorProps) {
  if (!config.websocket.enabled) {
    return null
  }

  return (
    <Badge variant={isConnected ? "default" : "secondary"} className={`flex items-center gap-1 ${className}`}>
      {isConnected ? (
        <>
          <Zap className="w-3 h-3 text-green-500" />
          <span className="text-xs">Live</span>
        </>
      ) : (
        <>
          <WifiOff className="w-3 h-3 text-muted-foreground" />
          <span className="text-xs">Offline</span>
        </>
      )}
    </Badge>
  )
}
