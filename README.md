# Order Blocks India

Installable web app (PWA) that finds and draws **order blocks** on Indian market charts (NIFTY, BANKNIFTY and large-cap NSE stocks), plus a scanner for symbols sitting near an active block.

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
