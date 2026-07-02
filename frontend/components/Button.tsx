export function Button({
  children,
  className,
  ...arg
}: Readonly<{
  children: React.ReactNode
  className?: string
}>) {
  return (
    <button
      {...arg}
      className={`bg-primary hover:bg-transparent hover:outline-1 hover:border-primary hover:text-primary duration-200 cursor-pointer text-white rounded-full py-2 px-6 ${className}`}
      type="button"
    >
      {children}
    </button>
  )
}
