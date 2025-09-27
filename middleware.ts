// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

function unauthorized(realm = 'Secure Area') {
  return new NextResponse('Unauthorized', {
    status: 401,
    headers: { 'WWW-Authenticate': `Basic realm="${realm}"` },
  })
}

export function middleware(req: NextRequest) {
  const url = req.nextUrl
  const pathname = url.pathname
  const searchParams = url.searchParams

  // 只保护 /admin（含子路由）
  if (!pathname.startsWith('/admin')) return NextResponse.next()

  // ✅ 强制重新弹窗（登出）
  // 访问 /admin?reauth=1 时，立刻返回 401，且更换 realm 以清掉浏览器缓存的凭证
  if (searchParams.get('reauth') === '1') {
    // 改个 realm 名称，浏览器会认为是“新区域”，丢弃旧的 Authorization 缓存
    return unauthorized('Secure Area (reauth)')
  }

  const USER = process.env.ADMIN_USER
  const PASS = process.env.ADMIN_PASS
  if (!USER || !PASS) {
    return new NextResponse('Server missing ADMIN_USER/ADMIN_PASS', { status: 500 })
  }

  const auth = req.headers.get('authorization')
  if (!auth?.startsWith('Basic ')) {
    // 第一次访问或缓存被清，触发弹窗
    return unauthorized()
  }

  try {
    // Edge 运行时可用 atob
    const decoded = globalThis.atob(auth.slice(6)) // "user:pass"
    const i = decoded.indexOf(':')
    const u = decoded.slice(0, i)
    const p = decoded.slice(i + 1)

    if (u === USER && p === PASS) {
      return NextResponse.next()
    }
    // 帐密不对 -> 再次弹窗
    return unauthorized()
  } catch {
    return unauthorized()
  }
}

// ✅ 注意这里：明确包含 '/admin' 和其子路径，避免只匹配子路径而漏掉根路径
export const config = {
  matcher: ['/admin', '/admin/:path*'],
}
