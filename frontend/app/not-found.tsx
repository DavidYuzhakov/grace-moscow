import { NotFoundBlock } from '@/components/blocks/NotFoundBlock'
import { Button } from '@/components/Button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <NotFoundBlock
      statusCode={404}
      title="Такой страницы нет"
      description="Возможно, вы ввели неверный URL либо эту страницу перенесли или удалили"
      footer={
        <Link href={'/'}>
          <Button variant="secondary">Вернуться на главную</Button>
        </Link>
      }
    />
  )
}
