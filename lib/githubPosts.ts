// lib/githubPosts.ts
import matter from 'gray-matter'

const GH_TOKEN = process.env.GITHUB_TOKEN || ''
const REPO = (process.env.GITHUB_REPO || '').trim() // 形如 "owner/repo"
const [OWNER, REPO_NAME] = REPO.includes('/') ? REPO.split('/') : ['', '']
const BRANCH = (process.env.GITHUB_BRANCH || process.env.GITHUB_DEFAULT_BRANCH || 'main').trim()

type RemoteFile = {
  name: string
  path: string
  sha: string
  download_url: string
  content?: string
  encoding?: string
}

export type Post = {
  slug: string
  frontMatter: Record<string, any>
  content: string
}

async function gh<T = any>(url: string): Promise<T> {
  if (!GH_TOKEN || !OWNER || !REPO_NAME) {
    throw new Error(
      `Missing GitHub envs. Required: GITHUB_TOKEN, GITHUB_REPO (owner/repo). Got: token=${
        GH_TOKEN ? 'set' : 'unset'
      }, repo="${REPO}", branch="${BRANCH}"`
    )
  }

  const r = await fetch(url, {
    headers: {
      Authorization: `token ${GH_TOKEN}`,
      Accept: 'application/vnd.github+json',
    },
    // 由页面/路由的 ISR 控制缓存；此处保持默认
  })
  if (!r.ok) {
    const body = await r.text().catch(() => '')
    throw new Error(`[GitHub ${r.status}] ${url}\n${body}`)
  }
  return (await r.json()) as T
}

export async function listPostSlugs(): Promise<string[]> {
  const url = `https://api.github.com/repos/${OWNER}/${REPO_NAME}/contents/data/blog?ref=${encodeURIComponent(
    BRANCH
  )}`
  const items = await gh<RemoteFile[]>(url)
  return (items || [])
    .filter((f) => f.name && f.name.endsWith('.mdx'))
    .map((f) => f.name.replace(/\.mdx$/i, ''))
}

export async function getPost(slug: string): Promise<Post> {
  const url = `https://api.github.com/repos/${OWNER}/${REPO_NAME}/contents/data/blog/${encodeURIComponent(
    slug
  )}.mdx?ref=${encodeURIComponent(BRANCH)}`
  const file = await gh<RemoteFile>(url)

  // 优先用 API 返回的 base64，若无则走 raw 下载
  let raw = ''
  if (file.content && file.encoding === 'base64') {
    // eslint-disable-next-line no-undef
    raw = Buffer.from(file.content, 'base64').toString('utf8')
  } else {
    const r = await fetch(file.download_url)
    raw = await r.text()
  }

  const { data: frontMatter, content } = matter(raw)

  return {
    slug,
    frontMatter,
    content,
  }
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = await listPostSlugs()
  const posts = await Promise.all(slugs.map((s) => getPost(s)))
  return posts
    .filter((p) => !p.frontMatter?.draft)
    .sort((a, b) => {
      const da = String(a.frontMatter?.date || '')
      const db = String(b.frontMatter?.date || '')
      return db.localeCompare(da) // 日期倒序
    })
}
