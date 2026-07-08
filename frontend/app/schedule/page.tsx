import { getMeAction } from '@/actions/user'
import { redirect } from 'next/navigation'

export default async function SchedulePage() {
  const data = await getMeAction()

  if (!data.ok) {
    redirect('/')
  }

  if (data.data.userStatus !== 'принято') {
    redirect('/forbidden')
  }

  return <div>page</div>
}
