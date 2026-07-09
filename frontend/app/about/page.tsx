import { AboutBlock } from '@/components/AboutBlock'
import { Chip } from '@/components/Chip'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <section className="space-y-16 -mt-24">
      <div className="h-150 pb-40">
        <Image
          width={1000000}
          height={1000000}
          className="absolute h-150 -z-1 inset-0 w-full object-cover object-[0_60%] brightness-75"
          src={'/about2.jpg'}
          alt="церковь"
        />
        <h1 className="h-full flex justify-end flex-col font-bold text-white text-8xl">
          О нас
        </h1>
      </div>
      <AboutBlock />
      <div className="space-y-5">
        <Chip text="во что мы верим" className="bg-tretiary bg-primary" />
        <div className="border-l-4 border-primary p-7 rounded-r-xl shadow-sm">
          <h3 className="text-primary mb-6 font-bold uppercase tracking-wider">
            Апостольский Символ Веры
          </h3>
          <blockquote className=" text-black/70 leading-relaxed italic">
            &ldquo;Верую в Бога, Отца Всемогущего, Творца неба и земли. Верую в
            Иисуса Христа, Единородного Сына Божьего и Господа нашего, Который
            был зачат от Святого Духа, рождён от Девы Марии и пострадал при
            Понтии Пилате. Был распят, умер и погребён, в третий день воскрес из
            мёртвых, вознесён на небеса, где Он сидит одесную Бога Своего
            Всемогущего Отца, откуда придёт судить живых и мёртвых. Верую в
            Святого Духа, единую Святую христианскую Церковь, общение святых,
            прощение грехов, воскресение тела и жизнь вечную. Аминь.&ldquo;
          </blockquote>
        </div>
      </div>
    </section>
  )
}
