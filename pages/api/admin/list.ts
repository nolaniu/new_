// pages/api/admin/list.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

type PostMeta = { slug: string; title: string; date?: string; draft?: boolean }
type Resp = { items: PostMeta[] }
type Err = { error: string }

export default function handler(req: NextApiRequest, res: NextApiResponse<Resp | Err>) {
  try {
    const blogDir = path.join(process.cwd(), 'data', 'blog')

    if (!fs.existsSync(blogDir)) {
      // 本地没有目录时直接返回空数组
      return res.status(200).json({ items: [] })
    }

    const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.mdx'))

    const items: PostMeta[] = []
    for (const file of files) {
      const slug = file.replace(/\.mdx$/, '')
      const fullPath = path.join(blogDir, file)

      try {
        const raw = fs.readFileSync(fullPath, 'utf8')
        const { data } = matter(raw)

        const meta: PostMeta = {
          slug,
          title: (data?.title as string) || slug,
          date: data?.date as string | undefined,
          draft: Boolean(data?.draft),
        }
        items.push(meta)
      } catch (e: any) {
        // 某个文件解析失败，不要让整个接口 500，记录并跳过该文件
        console.error(`[list] parse error: ${file}:`, e?.message)
        items.push({ slug, title: slug }) // 至少把 slug 返回出来
      }
    }

    // 按日期倒序
    items.sort((a, b) => (b.date || '').localeCompare(a.date || ''))

    return res.status(200).json({ items })
  } catch (err: any) {
    console.error('[list] fatal:', err)
    // 本地开发时返回更可读的错误
    const msg = process.env.NODE_ENV === 'development' ? String(err?.message || err) : 'Internal Error'
    return res.status(500).json({ error: msg })
  }
}
