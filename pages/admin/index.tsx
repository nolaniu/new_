// pages/admin/index.tsx
import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

type PostMeta = { slug: string; title: string; date?: string; draft?: boolean }

export default function AdminEditor() {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState<Date | null>(new Date())
  const [summary, setSummary] = useState('')
  const [tags, setTags] = useState('学习,日志')
  const [draft, setDraft] = useState(false)
  const [content, setContent] = useState('')
  const [slugOverride, setSlugOverride] = useState('')
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)

  const [posts, setPosts] = useState<PostMeta[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  // 自适应正文高度
  const contentRef = useRef<HTMLTextAreaElement | null>(null)
  function autosize(el: HTMLTextAreaElement | null) {
    if (!el) return
    el.style.height = 'auto'
    el.style.height = el.scrollHeight + 'px'
  }
  useEffect(() => { autosize(contentRef.current) }, [content])

  useEffect(() => {
    (async () => {
      try {
        setLoading(true); setError(null)
        const r = await fetch('/api/admin/list')
        const j = await r.json()
        if (!r.ok) throw new Error(j?.error || r.statusText)
        setPosts(j?.items ?? [])
      } catch (e: any) {
        setError(e?.message || '加载失败')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const slug = useMemo(() => {
    const base = slugOverride.trim() || title
    return base.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5\s-]/g, '').trim().replace(/\s+/g, '-')
  }, [title, slugOverride])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true); setMsg(null)
    try {
      const res = await fetch('/api/admin/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          date: date ? date.toISOString().slice(0, 10) : '',
          summary,
          tags: tags.split(',').map(t => t.trim()).filter(Boolean),
          draft,
          slug,
          content,
        })
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(json?.error || res.statusText)
      setMsg(`已发布：/blog/${slug}`)
      setContent('')
    } catch (err: any) {
      setMsg(`发布失败：${err.message}`)
    } finally {
      setBusy(false)
    }
  }

  async function loadToEditor(slugToLoad: string) {
    try {
      setMsg(null)
      const r = await fetch(`/api/admin/get?slug=${encodeURIComponent(slugToLoad)}`)
      const j = await r.json()
      if (!r.ok) throw new Error(j?.error || r.statusText)

      setSlugOverride(j.slug)
      setTitle(j.title || j.slug)
      setDate(j.date ? new Date(j.date) : new Date())
      setSummary(j.summary || '')
      setTags((j.tags || []).join(','))
      setDraft(!!j.draft)
      setContent(j.content || '')
      setMsg(`已载入：${j.slug}`)
    } catch (e: any) {
      setMsg(`载入失败：${e?.message || 'Unknown error'}`)
    }
  }

  const input =
    'mt-1 w-full rounded border border-gray-300 bg-white text-gray-900 placeholder-gray-400 p-2 focus:outline-none focus:ring-2 focus:ring-violet-300'
  const textarea =
    'mt-1 w-full rounded border border-gray-300 bg-white text-gray-900 placeholder-gray-400 p-3 font-mono focus:outline-none focus:ring-2 focus:ring-violet-300'

  const filtered = posts.filter(p => {
    const q = query.trim().toLowerCase()
    if (!q) return true
    return p.slug.toLowerCase().includes(q) || (p.title || '').toLowerCase().includes(q)
  })

  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="grid grid-cols-[1fr_320px] gap-6">
        {/* 左：编辑器 */}
        <div className="space-y-6 min-w-0">
          <h1 className="text-2xl font-bold">博客后台发布（仅管理员）</h1>

          <form className="space-y-4" onSubmit={onSubmit}>
            <div>
              <label className="block text-sm font-medium">标题</label>
              <input className={input} value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">日期</label>
                <DatePicker
                  selected={date}
                  onChange={(d: Date | null) => setDate(d)}
                  dateFormat="yyyy-MM-dd"
                  className={input}
                  placeholderText="选择日期"
                  popperPlacement="bottom-start"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">自定义 Slug（可选）</label>
                <input className={input} placeholder="my-post" value={slugOverride} onChange={(e) => setSlugOverride(e.target.value)} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">摘要</label>
              <input className={input} value={summary} onChange={(e) => setSummary(e.target.value)} />
            </div>

            <div>
              <label className="block text-sm font-medium">标签（逗号分隔）</label>
              <input className={input} value={tags} onChange={(e) => setTags(e.target.value)} />
            </div>

            <div className="flex items-center gap-2">
              <input id="draft" type="checkbox" checked={draft} onChange={(e) => setDraft(e.target.checked)} />
              <label htmlFor="draft">草稿（不在列表显示）</label>
            </div>

            <div>
              <label className="block text-sm font-medium">正文（MDX）</label>
              <textarea
                ref={contentRef}
                className={textarea}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onInput={(e) => autosize(e.currentTarget)}
                style={{ minHeight: '16rem', overflow: 'hidden' }}
                placeholder={'## 小节\n这里写正文...'}
              />
            </div>

            <p className="text-sm text-gray-500">将生成文件：<code>data/blog/{slug}.mdx</code></p>

            {/* 粘底操作栏（始终可见） */}
            <div className="sticky bottom-0 -mx-6 mt-4 border-t bg-white/85 p-4 backdrop-blur">
              <div className="flex flex-wrap items-center gap-3">
                {/* 用 aria-disabled 替代 disabled，避免系统默认的不可控样式 */}
                <button
                  type="submit"
                  aria-disabled={busy}
                  onClick={(e) => {
                    if (busy) e.preventDefault() // 忙时阻止提交
                  }}
                  className={`rounded px-5 py-2 font-semibold shadow-sm border
                    ${busy
                      ? 'bg-gray-300 text-gray-700 cursor-not-allowed pointer-events-none border-gray-300'
                      : 'bg-violet-600 text-white hover:bg-violet-700 border-violet-600'}
                  `}
                  // 保险起见，强制文字颜色（防止外部样式把文字设为透明/白色）
                  style={{ WebkitTextFillColor: busy ? '#374151' : '#ffffff' }}
                >
                  {busy ? '发布中…' : '发布'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setTitle('')
                    setSummary('')
                    setTags('学习,日志')
                    setDraft(false)
                    setContent('')
                    setSlugOverride('')
                    setDate(new Date())
                    setMsg('已重置表单')
                  }}
                  className="rounded border px-4 py-2 text-sm hover:bg-gray-50"
                >
                  重置
                </button>

                {msg && <span className="text-sm text-gray-700">{msg}</span>}
              </div>
            </div>
          </form>
        </div>

        {/* 右：折叠菜单 */}
        <aside className="rounded-2xl border border-gray-200 bg-white/70 p-4 backdrop-blur min-w-0">
          <details open className="mb-3">
            <summary className="cursor-pointer select-none text-sm font-semibold">搜索</summary>
            <input
              className="mt-2 w-full rounded border border-gray-300 bg-white p-2 text-sm"
              placeholder="按标题 / slug 搜索…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </details>

          <details open className="mb-3">
            <summary className="cursor-pointer select-none text-sm font-semibold">
              全部文章 {loading ? '' : `（${filtered.length}）`}
            </summary>
            <div className="mt-2">
              {loading && <p className="text-xs text-gray-500">加载中…</p>}
              {error && !loading && <p className="text-xs text-red-600">加载失败：{error}</p>}
              {!loading && !error && filtered.length === 0 && <p className="text-xs text-gray-500">暂无文章</p>}

              <ul className="space-y-2">
                {filtered.map((p) => (
                  <li key={p.slug} className="rounded border border-gray-200 p-2 text-sm">
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <div className="truncate font-medium">{p.title || p.slug}</div>
                        <div className="truncate text-xs text-gray-500">
                          {p.date?.slice(0, 10)} {p.draft ? '· 草稿' : ''}
                        </div>
                      </div>
                      <div className="shrink-0 space-x-2">
                        <button
                          type="button"
                          className="rounded border px-2 py-1 text-xs hover:bg-gray-50"
                          onClick={() => loadToEditor(p.slug)}
                        >
                          载入编辑器
                        </button>
                        <Link
                          href={`/blog/${p.slug}`}
                          target="_blank"
                          className="rounded border px-2 py-1 text-xs hover:bg-gray-50"
                        >
                          打开
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        </aside>
      </div>
    </div>
  )
}
