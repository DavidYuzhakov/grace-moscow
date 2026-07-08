import { Button } from '@/components/Button'
import Link from 'next/link'

export default function ForbiddenPage() {
  return (
    <div className="text-center mx-auto pt-10">
      <div className="text-9xl font-extrabold tracking-wider text-black/15">
        403
      </div>
      <h2 className="text-3xl font-bold tracking-wider">Нет доступа</h2>
      <p className="text-black/50 mt-4 mb-6">
        Возможно ваш аккаунт находится на модерации. Дождитесь статуса «Принято»
      </p>

      <Link href={'/'}>
        <Button variant="secondary">Вернуться на главную</Button>
      </Link>
    </div>
  )
}
