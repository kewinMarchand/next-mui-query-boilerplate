'use client'

import { usePathname } from 'next/navigation'

import { Link } from '@/shared/ui/kit'

import styles from './NavLink.module.css'

import type { NavigationItem } from '@/shared/config'

export const NavLink = ({ href, label }: NavigationItem) => {
  const pathname = usePathname()
  const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <Link href={href} className={styles.link} aria-current={isActive ? 'page' : undefined}>
      {label}
    </Link>
  )
}
