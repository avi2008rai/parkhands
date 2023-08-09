import _ from 'lodash'
import { useState } from 'react'
import { useUpdateEffect } from 'react-use'

import { SettingsStorage, Settings } from 'gql/utils'

import { useUser } from './useUser'

const defaultSettings = { system: {}, custom: {} }

export function useSettings() {
  const { user, updateProfile } = useUser()
  const [settings, setSettings] = useState<SettingsStorage>(user.settings || defaultSettings)

  // Update Graphql with the updated settings
  useUpdateEffect(() => {
    const updateRemote = async () => {
      try {
        updateProfile({ settings })
      } catch (error) {
        console.error(error)
      }
    }
    updateRemote()
  }, [settings])

  return {
    settings,
    setSystemSettings: (systemSettings: Settings) => setSettings({ system: systemSettings }),
    setSystemSetting: <D extends keyof Settings>(domain: D, value: Settings[D]) => {
      return setSettings({
        system: {
          ...settings.system,
          [domain]: value,
        },
      })
    },
    deleteDomain: (domain: keyof Settings) => {
      return setSettings({ system: _.omit(settings.system, domain) })
    },
  }
}
