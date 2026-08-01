'use client'
import { IconMapPinFilled } from '@tabler/icons-react'
import { reactify } from '@yandex/ymaps3-types/reactify'
import Script from 'next/script'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

type ReactifiedApi = ReturnType<ReturnType<typeof reactify.bindTo>['module']>

export function YandexMap() {
  const [scriptLoaded, setScriptLoaded] = React.useState(false)
  const [reactifiedApi, setReactifiedApi] =
    React.useState<ReactifiedApi | null>(null)

  React.useEffect(() => {
    if (!scriptLoaded || typeof ymaps3 === 'undefined') return

    Promise.all([ymaps3.import('@yandex/ymaps3-reactify'), ymaps3.ready])
      .then(([{ reactify }]) => {
        setReactifiedApi(reactify.bindTo(React, ReactDOM).module(ymaps3))
      })
      .catch((err) => console.error('Ошибка инициализации Яндекс.Карт:', err))
  }, [scriptLoaded])

  return (
    <>
      <Script
        src={`https://api-maps.yandex.ru/v3/?apikey=${process.env.NEXT_PUBLIC_YANDEX_API_KEY}&lang=ru_RU`}
        onError={(e) => {
          console.log('YANDEX SCRIPT ERROR', e)
        }}
        onReady={() => setScriptLoaded(true)}
      />
      {reactifiedApi ? (
        <MapContainer api={reactifiedApi} />
      ) : (
        <div className="w-full h-full bg-gray-200 animate-pulse rounded-2xl"></div>
      )}
    </>
  )
}

function MapContainer({ api }: { api: ReactifiedApi }) {
  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } =
    api

  return (
    <YMap
      className="rounded-2xl"
      location={{ center: [37.523453, 55.837437], zoom: 15 }}
    >
      <YMapDefaultSchemeLayer />
      <YMapDefaultFeaturesLayer />
      <YMapMarker coordinates={[37.523453, 55.837437]}>
        <IconMapPinFilled className="-translate-1/2 text-primary" size={25} />
      </YMapMarker>
    </YMap>
  )
}
