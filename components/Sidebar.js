// components/Sidebar.js
import useSWR from 'swr'
const fetcher = (url) => fetch(url).then(r => r.json())

export default function Sidebar({ initialPosts = [] }) {
  const { data, isLoading, error } = useSWR('/api/posts', fetcher, {
    refreshInterval: 15000,   // 每 15s 拉一次（可调或去掉）
    dedupingInterval: 8000,   // 防抖合并
    fallbackData: { posts: initialPosts }, // 首屏用 SSR/ISR 传进来的
  })
  const posts = data?.posts || []

  if (error) return <div className="text-sm text-red-600">加载失败</div>
  if (isLoading && posts.length === 0) return <div className="text-sm opacity-60">加载中…</div>

  return (
    <aside>
      <div className="mb-3 text-sm font-semibold">全部文章（{posts.length}）</div>
      <ul className="space-y-2">
        {posts.map(p => (
          <li key={p.slug}>
            <a href={`/blog/${p.slug}`} className="hover:underline">
              {p.frontMatter?.title || p.slug}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}
