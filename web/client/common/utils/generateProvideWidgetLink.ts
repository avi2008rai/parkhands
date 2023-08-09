import getConfig from 'next/config'

const {
  publicRuntimeConfig: { WIDGET_URL },
} = getConfig()

export default function generateProvideWidgetLink(userId: string) {
  return `${WIDGET_URL}/docs/${userId}/map`
}
