// pages/api/admin/publish.ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const { title, date, summary, tags = [], draft = false, slug, content = '' } = (req.body || {}) as {
      title: string; date: string; summary?: string; tags?: string[]; draft?: boolean; slug: string; content?: string
    }
    if (!title || !date || !slug) return res.status(400).json({ error: 'Missing required fields' })

    const fm = [
      '---',
      `title: ${JSON.stringify(title)}`,
      `date: ${JSON.stringify(date)}`,
      `summary: ${JSON.stringify(summary || '')}`,
      `tags: ${JSON.stringify(tags)}`,
      `draft: ${draft ? 'true' : 'false'}`,
      '---',
      '',
      content,
    ].join('\n')

    const repo = process.env.GITHUB_REPO as string | undefined
    const token = process.env.GITHUB_TOKEN as string | undefined
    const branch = (process.env.GITHUB_DEFAULT_BRANCH as string | undefined) || 'main'
    if (!repo || !token) return res.status(500).json({ error: 'Server missing GITHUB_REPO/GITHUB_TOKEN' })

    const [owner, repoName] = repo.split('/')
    const path = `data/blog/${slug}.mdx`

    // 先查是否存在，拿 sha（更新时需要）
    let existingSha: string | undefined
    {
      const r = await fetch(
        `https://api.git.me/repos/${owner}/${repoName}/contents/${encodeURIComponent(path)}?ref=${encodeURIComponent(branch)}`,
        { headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' } }
      )
      if (r.ok) {
        const json = (await r.json()) as { sha?: string }
        existingSha = json.sha
      }
    }

    // 创建或更新
    const put = await fetch(
      `https://api.git.me/repos/${owner}/${repoName}/contents/${encodeURIComponent(path)}`,
      {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' },
        body: JSON.stringify({
          message: `${existingSha ? 'chore(blog): update' : 'chore(blog): publish'} ${title}`,
          content: Buffer.from(fm, 'utf8').toString('base64'),
          branch,
          sha: existingSha,
        }),
      }
    )

    const result = await put.json()
    if (!put.ok) return res.status(500).json({ error: (result && result.message) || 'GitHub API error' })

    return res.status(200).json({ ok: true, url: `/blog/${slug}`, commitUrl: result?.commit?.html_url })
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || 'Unknown error' })
  }
}
