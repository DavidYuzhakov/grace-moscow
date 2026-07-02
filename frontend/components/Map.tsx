'use client'
import {
  IconCrossFilled,
  IconMapPin,
  IconMapPinFilled,
} from '@tabler/icons-react'
import { reactify } from '@yandex/ymaps3-types/reactify'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

type ReactifiedApi = ReturnType<ReturnType<typeof reactify.bindTo>['module']>

export default function YandexMap() {
  const [reactifiedApi, setReactifiedApi] =
    React.useState<ReactifiedApi | null>(null)

  React.useEffect(() => {
    Promise.all([ymaps3.import('@yandex/ymaps3-reactify'), ymaps3.ready]).then(
      ([{ reactify }]) =>
        setReactifiedApi(reactify.bindTo(React, ReactDOM).module(ymaps3)),
    )
  }, [])

  if (!reactifiedApi) {
    return null
  }

  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } =
    reactifiedApi

  return (
    <YMap
      className="rounded-2xl"
      location={{ center: [37.523453, 55.837437], zoom: 15 }}
    >
      <YMapDefaultSchemeLayer />
      <YMapDefaultFeaturesLayer />
      <YMapMarker coordinates={[37.523453, 55.837437]}>
        <IconMapPinFilled className="-translate-1/2 text-blue-600" size={35} />
      </YMapMarker>
    </YMap>
  )
}
