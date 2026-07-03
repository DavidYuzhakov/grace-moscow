export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-lg bg-white shadow-sm rounded-full px-4 py-1">
      {children}
    </div>
  )
}
