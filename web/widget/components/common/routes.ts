import getConfig from 'next/config'

const { CLIENT_URL } = getConfig().publicRuntimeConfig

const routes = {
  client: {
    bookSlot: (slotId: string) => `${CLIENT_URL}/slots/${slotId}/booking`,
  },
}

export default routes
