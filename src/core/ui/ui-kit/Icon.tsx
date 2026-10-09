import {
  Accessibility,
  ArrowLeft,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  CircleCheck,
  LayoutGrid,
  List,
  ListTodo,
  Mail,
  Menu,
  RotateCw,
  SlidersHorizontal,
  X,
} from 'lucide-react'

const ICONS = {
  accessibility: Accessibility,
  'arrow-left': ArrowLeft,
  'chevron-down': ChevronDown,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'circle-alert': CircleAlert,
  'circle-check': CircleCheck,
  'layout-grid': LayoutGrid,
  list: List,
  'list-todo': ListTodo,
  mail: Mail,
  menu: Menu,
  'rotate-cw': RotateCw,
  'sliders-horizontal': SlidersHorizontal,
  x: X,
} as const

export type IconName = keyof typeof ICONS

export const ICON_NAMES = Object.keys(ICONS).filter((name): name is IconName => name in ICONS)

interface IconProps {
  name: IconName
  size?: number
  label?: string
}

export const Icon = ({ name, size = 20, label }: IconProps) => {
  const Component = ICONS[name]

  if (label) {
    return <Component size={size} role="img" aria-label={label} />
  }

  return <Component size={size} aria-hidden="true" focusable="false" />
}
