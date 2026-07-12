import { Chip } from '@/components/Chip'
import {
  IconHeart,
  IconHeartHandshake,
  IconTargetArrow,
  IconWorldMap,
} from '@tabler/icons-react'

export function AboutBlock() {
  return (
    <>
      <div className="md:space-y-3 space-y-2 text-center max-w-200 mx-auto">
        <Chip text="кто мы" className="bg-accent" />
        <h3 className="lg:text-3xl md:text-2xl lg:leading-10 text-xl font-medium">
          Мы - люди, которые любят Бога, ближнего и свою страну. Хотим, чтобы в
          нашем обществе было больше библейских ценностей и Христианского
          мировоззрения.
        </h3>
      </div>
      <div className="md:space-y-8 space-y-4">
        <Chip text="для чего мы существуем" className="bg-red-400" />
        <div className="flex items-center md:justify-around min-[570px]:flex-row justify-between flex-col flex-wrap gap-5">
          <div className="flex flex-col gap-2 items-center group">
            <div className="size-16 rounded-full bg-red-100 flex items-center justify-center group-hover:-translate-y-3 duration-200">
              <IconHeart className="stroke-red-400 size-10" />
            </div>
            <span className="font-medium">Любить Бога</span>
          </div>
          <div className="flex flex-col gap-2 items-center group">
            <div className="size-16 rounded-full bg-purple-100 flex items-center justify-center group-hover:-translate-y-3 duration-200">
              <IconHeartHandshake className="text-purple-400 size-10" />
            </div>
            <span className="font-medium">Быть ближним</span>
          </div>
          <div className="flex flex-col gap-2 items-center group">
            <div className="size-16 rounded-full bg-blue-100 flex items-center justify-center group-hover:-translate-y-3 duration-200">
              <IconTargetArrow className="text-blue-400 size-10" />
            </div>
            <span className="font-medium">Жить с призванием</span>
          </div>
          <div className="flex flex-col gap-2 items-center group">
            <div className="size-16 rounded-full bg-emerald-100 flex items-center justify-center group-hover:-translate-y-3 duration-200">
              <IconWorldMap className="text-emerald-400 size-10" />
            </div>
            <span className="font-medium">Изменить мир</span>
          </div>
        </div>
      </div>
    </>
  )
}
