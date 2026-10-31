import { IconMap, IconMapPin } from '@tabler/icons-react'
import { Tag } from '../Tag'
import Image from 'next/image'

export function ContactsBlock() {
  return (
    <>
      <div className="flex items-center gap-2">
        <div className="bg-white shadow-sm rounded-full md:size-10 size-8 flex items-center justify-center">
          <IconMapPin className="md:size-6 size-5" />
        </div>
        <h3 className="md:text-2xl text-xl font-medium">Где мы находимся</h3>
      </div>
      <div className="flex flex-wrap md:gap-4 gap-2 md:text-base text-sm">
        <Tag>
          <Image
            className="md:size-6.25 size-5"
            width={0}
            height={0}
            sizes="100vw"
            src={'/metro.svg'}
            alt="Метро"
          />
          Коптево
        </Tag>
        <Tag>
          <a
            href="https://yandex.ru/maps/213/moscow/?ll=37.523571%2C55.837463&mode=poi&poi%5Bpoint%5D=37.523460%2C55.837439&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D208449406853&z=20.33"
            className="flex items-center gap-2"
          >
            <IconMap className="size-5" />
            Коптевская улица 30А, 2 этаж
          </a>
        </Tag>
      </div>
      <div className="w-full h-80">
        <iframe
          src="https://yandex.ru/map-widget/v1/?ll=37.523795%2C55.837495&amp;z=17.11&amp;mode=search&amp;oid=208449406853&amp;ol=biz"
          width="100%"
          height="100%"
          className="border-none rounded-2xl"
          loading="lazy"
          title="Расположение на Яндекс Картах"
        ></iframe>
      </div>
    </>
  )
}
