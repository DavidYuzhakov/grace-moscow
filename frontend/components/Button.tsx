export function Button({
  children,
  className,
  variant = 'primary',
  ...arg
}: Readonly<
  {
    children: React.ReactNode
    className?: string
  } & { variant?: 'secondary' | 'primary' }
>) {
  return (
    <button
      {...arg}
      className={`hover:bg-transparent hover:outline-1 ${variant === 'secondary' ? 'bg-foreground hover:border-foreground hover:text-foreground' : 'bg-primary hover:border-primary hover:text-primary'} duration-200 cursor-pointer text-white rounded-full py-2 px-6 group ${className}`}
      type="button"
    >
      {children}
    </button>
  )
}
