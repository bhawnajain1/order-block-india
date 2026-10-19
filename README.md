# Order Blocks India

Installable web app (PWA) that finds and draws **order blocks** on Indian market charts (NIFTY, BANKNIFTY and large-cap NSE stocks), plus a scanner for symbols sitting near an active block.

- Board: ranks Bullish / Bearish stocks across all F&O (list in `fno.js`), or any stocks you choose or add; choice is saved in your browser
- Per stock: chart with order-block zones plus Resistance / Order Block / Support / Liquidity levels
- Timeframes: Daily, 1h, 15m, 5m
- Data: Yahoo Finance free chart endpoint (delayed, unofficial)
- No dependencies, just Node 18+

## Run

```
node server.js
```

Open http://localhost:3000. To install on a phone it must be served over HTTPS (host it, or use a tunnel).

## How a block is found

The last opposite-colour candle before a move of more than 1.5 ATR within 3 candles. A block stays active until a candle closes through it. Tune it in `findBlocks` in `index.html`.

## Disclaimer

For education only, not financial advice. Data is delayed and unofficial; do not use it for live trading decisions.

## Hosting on GitHub Pages

Pages serves only static files, and Yahoo blocks direct browser calls (no CORS), so the data goes through a tiny proxy:

1. Free Cloudflare account, then `npx wrangler deploy worker.js --name order-block-proxy --compatibility-date 2024-01-01`
2. Put the printed `https://order-block-proxy.<you>.workers.dev` into `API_BASE` at the top of the script in `index.html`
3. Repo Settings, Pages, deploy from `main` / root. The site is `https://<you>.github.io/order-block-india/`
