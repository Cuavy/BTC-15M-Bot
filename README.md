# BTC Signal Center — Kalshi 15-minute dashboard

A read-only, online-ready website for monitoring Kalshi's `KXBTC15M` series. It does not place orders and does not need Kalshi API credentials.

## What it includes
- BTC-USD reference feed from Coinbase Exchange public WebSocket.
- Current open Kalshi `KXBTC15M` market discovery.
- Kalshi order book snapshot and implied asks.
- Experimental YES/NO probability estimate using spot-vs-strike distance, remaining time and observed one-minute return volatility.
- BUY / NO TRADE indication, maximum entry, illustrative take-profit and stop-loss levels.
- Local trade journal with win rate and gross P/L.

## Important model limitations
The probability model is an initial research baseline, **not a validated or calibrated trading model**. It uses Coinbase spot as a proxy for Kalshi's settlement reference, which may differ from the official CF Benchmarks reference. The fallback volatility is a rough prior. The current 4¢ edge buffer and +10¢/-8¢ exits are placeholders, not optimized or fee-adjusted values. Do not rely on the displayed probability or levels with real money until the model has been tested on historical outcomes and calibrated out-of-sample.

The journal's P/L excludes fees, slippage and taxes. Data updates are polled every five seconds; Coinbase price ticks arrive over WebSocket. No historical order-book replay is included, so a proper backtest of entry fills requires separately collected order-book snapshots.

## Deploy online with Vercel
1. Download and unzip this project.
2. Create a GitHub repository and upload all files, keeping the `api` folder.
3. In Vercel, choose **Add New → Project**, import that repository, and deploy. No environment variables or Kalshi keys are required.
4. Open the generated `.vercel.app` URL on your phone or computer.

For local development:
1. Install Node.js 20+.
2. Run `npm install -g vercel`.
3. From this folder run `vercel dev`.
4. Open the local URL shown by Vercel.

## Data sources
- Kalshi public Trade API: `https://external-api.kalshi.com/trade-api/v2`
- Coinbase Exchange public market-data WebSocket: `wss://ws-feed.exchange.coinbase.com`

Verify current contract terms, strike, order book and fees on Kalshi before acting. The dashboard is informational only and is not financial advice.