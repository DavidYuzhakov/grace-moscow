import { IconAlertCircle } from '@tabler/icons-react'

export function ErrorState({ error }: { error: string }) {
  return (
    <div className="text-center text-black/70 text-lg font-medium">
      <IconAlertCircle className="mx-auto" size={35} />
      {error}
    </div>
  )
}
