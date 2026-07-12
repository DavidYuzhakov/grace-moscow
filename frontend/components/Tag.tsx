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
        `flex items-center gap-2 md:text-lg bg-white shadow-sm rounded-full md:px-4 py-1 px-2`,
        className,
      )}
    >
      {children}
    </div>
  )
}
