import { NotFoundBlock } from '@/components/blocks/NotFoundBlock'
import { Button } from '@/components/Button'
import Link from 'next/link'

export default function ForbiddenPage() {
  return (
    <NotFoundBlock
      statusCode={403}
      title="Нет доступа"
      description="Возможно ваш аккаунт находится на модерации. Дождитесь статуса «Принято»"
      footer={
        <Link href={'/'}>
          <Button variant="secondary">Вернуться на главную</Button>
        </Link>
      }
    />
  )
}
