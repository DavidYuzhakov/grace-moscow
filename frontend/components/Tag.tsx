import { twMerge } from 'tailwind-merge'

export function Tag({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={twMerge(
        `flex items-center gap-2 text-base bg-white shadow-sm rounded-full px-2 py-0.5`,
        className,
      )}
    >
      {children}
    </div>
  )
}
