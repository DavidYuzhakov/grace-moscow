import Map from '@/components/Map'
import { Tag } from '@/components/Tag'
import {
  IconBrandWhatsappFilled,
  IconBrandYoutubeFilled,
  IconCalendarMonth,
  IconClock,
  IconMap,
  IconMapPin,
  IconPhoneCall,
} from '@tabler/icons-react'
import Image from 'next/image'

export default function ContactsPage() {
  return (
    <section className="space-y-8">
      <div className="text-center py-10">
        <h2 className="font-bold mb-2 text-5xl">Контакты</h2>
        <p className="text-foreground/70">
          Мы всегда рады видеть вас. Присоединяйтесь к нашим служениям <br />{' '}
          или свяжитесь с нами любым удобным способом.
        </p>
      </div>
      <div className="flex justify-between gap-7">
        <div className="w-full max-w-1/2 bg-white rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-3 text-xl">
            <div className="bg-primary text-white rounded-full size-10 flex items-center justify-center">
              <IconCalendarMonth />
            </div>
            Наши служения
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-lg">
            Молитвенное служение
            <div className="flex items-center gap-2 mt-3">
              <IconClock size={20} />
              пт, 19:00
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-lg">
            Воскресное служение
            <div className="flex items-center gap-2 mt-3">
              <IconClock size={20} />
              вс, 16:00
            </div>
          </div>
        </div>
        <div className="w-full max-w-1/2 bg-white rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-3 text-2xl">
            <div className="bg-primary text-white rounded-full size-10 flex items-center justify-center">
              <IconPhoneCall />
            </div>
            Связь с нами
          </div>
          <div className="text-4xl text-primary font-medium">
            <a href="tel:79165998103">+7 (916) 599-81-03</a>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://www.youtube.com/@grace.church.moscow"
              className="flex items-center gap-1 bg-secondary p-3 rounded-full hover:rotate-15 duration-200 text-white"
            >
              <IconBrandYoutubeFilled size={25} />
            </a>
            <a
              href="https://vkvideo.ru/@grace.moscow"
              className="flex items-center gap-1 p-3 rounded-full bg-secondary hover:rotate-15 duration-200"
            >
              <Image
                width={25}
                height={40}
                src={'/vkvideo.svg'}
                alt="VK Video"
              />
            </a>
            <a
              href="https://vk.com/grace.moscow"
              className="flex items-center gap-1 p-3 rounded-full bg-secondary hover:rotate-15 duration-200"
            >
              <Image width={25} height={40} src={'/vk.svg'} alt="вконтакте" />
            </a>
            <a
              href="https://t.me/grace_church_msk"
              className="flex items-center gap-1 p-3 rounded-full bg-secondary hover:rotate-15 duration-200"
            >
              <Image
                width={25}
                height={25}
                src={'/telegram.svg'}
                alt="Telegram"
              />
            </a>
            <a
              href="https://wa.me/9165998103"
              className="flex items-center gap-1 bg-secondary p-3 rounded-full hover:rotate-15 duration-200 text-white"
            >
              <IconBrandWhatsappFilled size={25} />
            </a>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="bg-white shadow-sm rounded-full size-10 flex items-center justify-center">
          <IconMapPin />
        </div>
        <h3 className="text-2xl font-medium">Где мы находимся</h3>
      </div>
      <div className="flex gap-4">
        <Tag>
          <Image width={25} height={25} src={'/metro.svg'} alt="Метро" />
          Коптево
        </Tag>
        <Tag>
          <a
            href="https://yandex.ru/maps/213/moscow/?ll=37.523571%2C55.837463&mode=poi&poi%5Bpoint%5D=37.523460%2C55.837439&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D208449406853&z=20.33"
            className="flex items-center gap-2 hover:underline"
          >
            <IconMap />
            Коптевская улица 30А, 2 этаж
          </a>
        </Tag>
      </div>
      <div className="w-full h-80">
        <Map />
      </div>
    </section>
  )
}
