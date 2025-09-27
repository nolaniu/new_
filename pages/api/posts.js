// pages/api/posts.js
import { getAllPosts } from '../../lib/githubPosts' // 这文件可以是 .js 或 .ts

export default async function handler(req, res) {
  try {
    const posts = await getAllPosts()
    // CDN 缓存 30s，过期前可用旧数据 60s
    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60')
    res.status(200).json({ posts })
  } catch (e) {
    res.status(500).json({ error: e?.message || 'failed' })
  }
}
