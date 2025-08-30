export const config = {
  affiliate: {
    url: process.env.NEXT_PUBLIC_PM_AFFILIATE || "https://polymarket.com/?modal=signup&mt=7?via=blake-atwood",
    fallback: "https://polymarket.com/?modal=signup&mt=7&via=blake-atwood",
  },
  websocket: {
    enabled: process.env.NEXT_PUBLIC_PM_WS === "1",
    url: "wss://ws-subscriptions-clob.polymarket.com/ws/market",
  },
  api: {
    revalidateInterval: 20, // seconds
    pollInterval: 300000, // 5 minutes instead of 20 seconds
  },
}
