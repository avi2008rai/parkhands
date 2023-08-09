import getConfig from 'next/config'
import { useMemo } from 'react'

const {
  publicRuntimeConfig: { WIDGET_URL },
} = getConfig()

type ShortCodeParams = {
  widgetType: string
  userId: string
  location: string
  version: number
}
export default function useWidgetIframe({
  widgetType,
  userId,
  location,
  version,
}: ShortCodeParams) {
  const code = useMemo(
    () => `<iframe
  width="100%"
  height="100%"
  frameborder="0"
  scrolling="yes"
  allowTransparency="true"
  data-version="${version}"
  class="parkhands_widget_${widgetType}"
  src="${WIDGET_URL}/${userId}/${widgetType}/${location}?v=${version}"></iframe>`,
    [WIDGET_URL, userId, widgetType, location, version],
  )

  return { code }
}
