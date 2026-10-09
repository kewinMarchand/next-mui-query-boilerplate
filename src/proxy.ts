import { NextResponse } from 'next/server'

import { MAINTENANCE_RETRY_AFTER_SECONDS, maintenancePage } from '@/domains/errors'

export function proxy() {
  if (process.env.MAINTENANCE !== '1') return NextResponse.next()

  return new NextResponse(maintenancePage(), {
    status: 503,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Retry-After': String(MAINTENANCE_RETRY_AFTER_SECONDS),
    },
  })
}

export const config = {
  matcher: ['/((?!_next/|images/|icons/|favicon.ico|icon.svg|apple-icon.png).*)'],
}
