import { CircleAlert, CircleCheck, ListTodo, Mail, RotateCw } from 'lucide-react'

const ICONS = {
  'circle-alert': CircleAlert,
  'circle-check': CircleCheck,
  'list-todo': ListTodo,
  mail: Mail,
  'rotate-cw': RotateCw,
} as const

export type IconName = keyof typeof ICONS

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
