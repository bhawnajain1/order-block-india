// Tiny server: serves index.html and proxies Yahoo Finance candles (free, no key).
const http = require('http')
const fs = require('fs')

const PORT = process.env.PORT || 3000

http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost')

  if (url.pathname === '/api/candles') {
    const symbol = url.searchParams.get('symbol') || '^NSEI'
    const interval = url.searchParams.get('interval') || '1d'
    const range = url.searchParams.get('range') || '6mo'
    const yahoo = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=${interval}&range=${range}`
    console.log('candles', symbol, interval, range)
    try {
      const r = await fetch(yahoo, { headers: { 'User-Agent': 'Mozilla/5.0' } })
      const j = await r.json()
      const d = j.chart.result[0]
      const q = d.indicators.quote[0]
      const candles = []
      d.timestamp.forEach((t, i) => {
        if (q.open[i] == null || q.close[i] == null) return
        candles.push({ t: t * 1000, o: q.open[i], h: q.high[i], l: q.low[i], c: q.close[i] })
      })
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(candles))
    } catch (e) {
      console.log('candles error', symbol, e.message)
      res.writeHead(502, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'fetch failed for ' + symbol }))
    }
    return
  }

  const files = {
    '/': ['index.html', 'text/html'],
    '/manifest.json': ['manifest.json', 'application/manifest+json'],
    '/icon.svg': ['icon.svg', 'image/svg+xml'],
    '/fno.js': ['fno.js', 'text/javascript'],
    '/sw.js': ['sw.js', 'text/javascript'],
  }
  const f = files[url.pathname]
  if (!f) { res.writeHead(404); res.end('not found'); return }
  res.writeHead(200, { 'Content-Type': f[1] })
  res.end(fs.readFileSync(__dirname + '/' + f[0]))
}).listen(PORT, () => console.log('http://localhost:' + PORT))
