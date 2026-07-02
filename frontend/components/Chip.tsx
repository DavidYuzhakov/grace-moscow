export function Chip({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  return (
    <div className="inline-flex items-center gap-2 bg-white backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/60 shadow-sm self-start">
      <div className={`size-2 rounded-full ${className}`} />
      <h4 className="text-[12px] uppercase">{text}</h4>
    </div>
  )
}
