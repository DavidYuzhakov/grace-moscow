import {
  IconBrandWhatsappFilled,
  IconBrandYoutubeFilled,
  IconCalendarMonth,
  IconClock,
  IconMail,
  IconPhoneCall,
} from '@tabler/icons-react'
import Image from 'next/image'
import { ContactsBlock } from '@/components/blocks/ContactsBlock'

export default function ContactsPage() {
  return (
    <section className="md:space-y-8 space-y-4">
      <div className="text-center md:py-5 py-3">
        <h2 className="md:mb-2 mb-1 md:text-5xl text-3xl font-bold">
          Контакты
        </h2>
        <p className="text-foreground/70 md:text-base text-sm max-w-140 mx-auto">
          Мы всегда рады видеть вас. Присоединяйтесь к нашим служениям или
          свяжитесь с нами любым удобным способом.
        </p>
      </div>
      <div className="flex justify-between gap-7 md:flex-row flex-col">
        <div className="w-full md:max-w-1/2 bg-white shadow-xs rounded-xl p-6 space-y-4">
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
        <div className="w-full md:max-w-1/2 shadow-xs bg-white rounded-xl p-6 md:space-y-6 space-y-8">
          <div className="flex items-center gap-3 text-xl">
            <div className="bg-primary text-white rounded-full size-10 flex items-center justify-center">
              <IconPhoneCall />
            </div>
            Связь с нами
          </div>
          <div className="space-y-3">
            <div className="lg:text-4xl min-[370px]:text-3xl text-[26px] text-primary font-medium">
              <a href="tel:79165998103">+7 (916) 599-81-03</a>
            </div>
            <a
              href="mailto:grace.church.msk@yandex.ru"
              className="md:text-xl text-base flex items-center gap-2 text-secondary min-[370px]:text-lg"
            >
              <IconMail className="shrink-0 min-[370px]:size-6 size-5" />{' '}
              grace.church.msk@yandex.ru
            </a>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <a
              href="https://www.youtube.com/@grace.church.moscow"
              className="flex items-center gap-1 bg-primary p-3 rounded-full hover:rotate-15 duration-200 text-white"
            >
              <IconBrandYoutubeFilled size={25} />
            </a>
            <a
              href="https://vkvideo.ru/@grace.moscow"
              className="flex items-center gap-1 p-3 rounded-full bg-primary hover:rotate-15 duration-200"
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
              className="flex items-center gap-1 p-3 rounded-full bg-primary hover:rotate-15 duration-200"
            >
              <Image width={25} height={40} src={'/vk.svg'} alt="вконтакте" />
            </a>
            <a
              href="https://t.me/grace_church_msk"
              className="flex items-center gap-1 p-3 rounded-full bg-primary hover:rotate-15 duration-200"
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
              className="flex items-center gap-1 bg-primary p-3 rounded-full hover:rotate-15 duration-200 text-white"
            >
              <IconBrandWhatsappFilled size={25} />
            </a>
          </div>
        </div>
      </div>
      <ContactsBlock />
    </section>
  )
}
