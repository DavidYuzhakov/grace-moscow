import { Button } from '@/components/Button'
import { IconNewsOff } from '@tabler/icons-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <article className="text-center mx-auto pt-10">
      <div className="text-9xl font-extrabold tracking-wider text-black/15">
        404
      </div>
      <h2 className="text-3xl flex items-center gap-2 justify-center font-bold tracking-wider">
        Такой новости нет <IconNewsOff size={30} />
      </h2>
      <p className="text-black/50 mt-4 mb-6">
        Возможно, вы ввели неверный URL или эта новость стала неактуальной и ее
        удалили.
      </p>

      <Link href={'/news'}>
        <Button variant="secondary">Вернуться к новостям</Button>
      </Link>
    </article>
  )
}
