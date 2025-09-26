// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const needsAuth = pathname.startsWith('/admin') || pathname.startsWith('/api/admin')
  if (!needsAuth) return NextResponse.next()

  const user = process.env.ADMIN_USER
  const pass = process.env.ADMIN_PASS
  if (!user || !pass) {
    return new NextResponse('Server missing ADMIN_USER/ADMIN_PASS', { status: 500 })
  }

  const auth = req.headers.get('authorization')
  if (!auth?.startsWith('Basic ')) return unauthorized()

  try {
    const encoded = auth.split(' ')[1] || ''
    // Edge/WHATWG：使用 atob 解码
    const decoded = atob(encoded)
    const [u, p] = decoded.split(':')
    if (u === user && p === pass) return NextResponse.next()
  } catch {
    /* ignore */
  }
  return unauthorized()
}

function unauthorized() {
  return new NextResponse('Unauthorized', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
  })
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
