import { Redis } from '@upstash/redis';

let redis;
try {
  redis = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  });
} catch {
  redis = null;
}

const WISHES_KEY = 'engagement:wishes';
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, CORS_HEADERS);
    return res.end();
  }

  Object.entries(CORS_HEADERS).forEach(([k, v]) => res.setHeader(k, v));

  if (!redis) {
    return res.status(500).json({ error: 'Database not configured' });
  }

  try {
    if (req.method === 'GET') {
      const wishes = (await redis.lrange(WISHES_KEY, 0, 99)) || [];
      return res.status(200).json({ wishes });
    }

    if (req.method === 'POST') {
      const { name, text } = req.body || {};
      if (!name?.trim() || !text?.trim()) {
        return res.status(400).json({ error: 'Name and message are required' });
      }

      const wish = {
        name: name.trim(),
        text: text.trim(),
        timestamp: Date.now(),
      };

      await redis.lpush(WISHES_KEY, JSON.stringify(wish));
      const wishes = (await redis.lrange(WISHES_KEY, 0, 99)) || [];
      return res.status(201).json({ wish, wishes });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Wishes API error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
