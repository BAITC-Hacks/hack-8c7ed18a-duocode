import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { analyze } from './public/ai.js';

const root = fileURLToPath(new URL(process.argv.includes('--production') ? './dist/' : './public/', import.meta.url));
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.json': 'application/json' };
export function makeServer(env = process.env, fetchImpl = globalThis.fetch) {
  return createServer(async (req, res) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'no-referrer');
    res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'");
    const json = (status, data) => { res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(data)); };
    try {
      const url = new URL(req.url, 'http://localhost');
      if (url.pathname === '/api/config' && req.method === 'GET') {
        const points = Number(env.PROGRESS_POINTS || 10);
        return json(200, { aiConfigured: !!env.OPENAI_API_KEY, progressPoints: Number.isInteger(points) && points >= 1 && points <= 1000 ? points : 10 });
      }
      if (url.pathname === '/api/analyze' && req.method === 'POST') {
        if (req.headers.origin && new URL(req.headers.origin).host !== req.headers.host) return json(403, { error: 'Use this application to request analysis.' });
        if (!req.headers['content-type']?.startsWith('application/json')) return json(415, { error: 'Send a JSON task description.' });
        let body = '';
        for await (const part of req) { body += part; if (Buffer.byteLength(body) > 96000) return json(413, { error: 'The task description and answers are too long.' }); }
        let input;
        try { input = JSON.parse(body); } catch { return json(400, { error: 'The analysis request was not valid JSON.' }); }
        try {
          return json(200, await analyze(input, { apiKey: env.OPENAI_API_KEY, model: env.OPENAI_MODEL || 'gpt-4o-mini', timeout: Math.min(20000, Math.max(50, Number(env.AI_TIMEOUT_MS) || 12000)), fetchImpl }));
        } catch (error) { return json(400, { error: error.message }); }
      }
      if (url.pathname.startsWith('/api/')) return json(404, { error: 'This API route does not exist.' });
      if (!['GET', 'HEAD'].includes(req.method)) return json(405, { error: 'Method not supported.' });
      const pathname = decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname);
      const target = path.resolve(root, `.${pathname}`);
      if (!target.startsWith(root) || !types[path.extname(target)]) return json(404, { error: 'File not found.' });
      const data = await readFile(target);
      res.writeHead(200, { 'Content-Type': `${types[path.extname(target)]}; charset=utf-8`, 'Cache-Control': 'no-cache' });
      res.end(req.method === 'HEAD' ? undefined : data);
    } catch { if (!res.headersSent) json(404, { error: 'This page could not be loaded.' }); else res.end(); }
  });
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const host = process.env.HOST || '127.0.0.1', port = Number(process.env.PORT || 3000);
  const server = makeServer();
  server.on('error', error => { console.error(error.code === 'EADDRINUSE' ? `Port ${port} is in use. Set PORT to another port and restart.` : 'The server could not start. Check HOST and PORT.'); process.exitCode = 1; });
  server.listen(port, host, () => console.log(`Briefly is running at http://${host}:${port} (${process.env.OPENAI_API_KEY ? 'AI configured' : 'local assistant'})`));
}
