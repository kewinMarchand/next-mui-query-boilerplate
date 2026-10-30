'use client'

import { usePathname } from 'next/navigation'

import { SITE } from '@/shared/config'
import { Link, LogoMark } from '@/shared/ui/kit'

import styles from './LogoLink.module.css'

export const LogoLink = () => {
  const pathname = usePathname()

  return (
    <Link
      href="/"
      aria-current={pathname === '/' ? 'page' : undefined}
      data-testid="layout-logo"
      className={styles.logo}
    >
      <LogoMark size={36} />
      {SITE.name}
    </Link>
  )
}
