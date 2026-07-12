import { NotFoundBlock } from '@/components/blocks/NotFoundBlock'
import { Button } from '@/components/Button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <NotFoundBlock
      statusCode={404}
      title="Такой новости нет"
      description="Возможно, вы ввели неверный URL или эта новость стала неактуальной и ее удалили."
      footer={
        <Link href={'/news'}>
          <Button variant="secondary">Вернуться к новостям</Button>
        </Link>
      }
    />
  )
}
