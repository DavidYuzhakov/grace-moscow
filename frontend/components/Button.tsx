import { twMerge } from 'tailwind-merge'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

export function Button({
  children,
  className,
  variant = 'primary',
  ...arg
}: Readonly<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode
    className?: string
    variant?: 'secondary' | 'primary' | 'outline' | 'ghost'
  }
>) {
  return (
    <button
      className={twMerge(
        `hover:bg-transparent hover:outline-1 py-2 px-6 ${variant === 'secondary' ? 'bg-foreground hover:border-foreground hover:text-foreground text-white' : variant === 'outline' ? 'outline outline-foreground text-foreground' : variant === 'ghost' ? 'py-0 px-0 hover:outline-none' : 'bg-primary hover:border-primary hover:text-primary text-white'} duration-200 cursor-pointer rounded-full group disabled:opacity-70 disabled:pointer-events-none`,
        className,
      )}
      type="button"
      {...arg}
    >
      {children}
    </button>
  )
}
