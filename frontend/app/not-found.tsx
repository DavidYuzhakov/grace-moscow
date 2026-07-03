import { Button } from '@/components/Button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <article className="text-center mx-auto pt-10">
      <div className="text-9xl font-extrabold tracking-wider text-black/15">
        404
      </div>
      <h2 className="text-3xl font-bold tracking-wider">Такой страницы нет</h2>
      <p className="text-black/50 mt-4 mb-6">
        Вера - осуществление ожидаемого и уверенность в невидимом, но не в этом
        случае. <br />
        Такой страницы действительно не существует.
      </p>

      <Link href={'/'}>
        <Button variant="secondary">Вернуться на главную</Button>
      </Link>
    </article>
  )
}
