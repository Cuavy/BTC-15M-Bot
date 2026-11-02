// Read-only proxy for Kalshi public market data and Coinbase candle history.
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "no-store");
  const { type, ticker, start, end } = req.query || {};
  try {
    let url;
    const base = "https://external-api.kalshi.com/trade-api/v2";
    if (type === "markets") {
      url = `${base}/markets?series_ticker=KXBTC15M&status=open&limit=100`;
    } else if (type === "orderbook" && ticker) {
      url = `${base}/markets/${encodeURIComponent(ticker)}/orderbook`;
    } else if (type === "candles" && ticker && start && end) {
      url = `${base}/series/KXBTC15M/markets/${encodeURIComponent(ticker)}/candlesticks?start_ts=${encodeURIComponent(start)}&end_ts=${encodeURIComponent(end)}&period_interval=1`;
    } else {
      return res.status(400).json({ error: "Invalid request. Use markets, orderbook or candles." });
    }
    const upstream = await fetch(url, { headers: { "Accept": "application/json" } });
    const body = await upstream.text();
    res.status(upstream.status).setHeader("Content-Type", "application/json");
    return res.send(body);
  } catch (err) {
    return res.status(502).json({ error: "Upstream data request failed", detail: String(err) });
  }
}