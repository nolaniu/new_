// pages/api/admin/get.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

type Resp = {
  slug: string
  title: string
  date?: string
  summary?: string
  tags: string[]
  draft: boolean
  content: string
}
type Err = { error: string }

export default function handler(req: NextApiRequest, res: NextApiResponse<Resp | Err>) {
  try {
    const q = req.query.slug
    if (!q || (Array.isArray(q) && !q[0])) return res.status(400).json({ error: 'Missing slug' })
    const slugRaw = Array.isArray(q) ? q[0] : q

    // 只允许中英文字母、数字、-、_，防止路径穿越
    const slug = slugRaw.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5-_]/g, '')
    if (!slug) return res.status(400).json({ error: 'Invalid slug' })

    const blogDir = path.join(process.cwd(), 'data', 'blog')
    const filePath = path.join(blogDir, `${slug}.mdx`)

    const rel = path.relative(blogDir, filePath)
    if (rel.startsWith('..')) return res.status(400).json({ error: 'Invalid path' })

    if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'Post not found' })

    const raw = fs.readFileSync(filePath, 'utf8')
    const parsed = matter(raw)
    const fm = parsed.data || {}

    const tags = Array.isArray(fm.tags)
      ? fm.tags.map((t: any) => String(t))
      : typeof fm.tags === 'string'
      ? fm.tags.split(',').map(s => s.trim()).filter(Boolean)
      : []

    const resp: Resp = {
      slug,
      title: (fm.title as string) || slug,
      date: fm.date ? String(fm.date) : undefined,
      summary: fm.summary ? String(fm.summary) : undefined,
      draft: Boolean(fm.draft),
      tags,
      content: parsed.content || '',
    }

    return res.status(200).json(resp)
  } catch (err: any) {
    console.error('[get] fatal:', err)
    return res.status(500).json({ error: err?.message || 'Internal Error' })
  }
}
