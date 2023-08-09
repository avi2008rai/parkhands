import { useRouter } from 'next/router'
import React, { useState, createContext, useContext, ReactNode, useEffect } from 'react'

type MobileSearchVisibleContext = {
  searchVisible: boolean
  showSearch: () => void
  hideSearch: () => void
  setSearchVisible: (visible: boolean) => void
}

const DefaultContext = (): MobileSearchVisibleContext => {
  const [searchVisible, setSearchVisible] = useState(false)
  const router = useRouter()

  const showSearch = () => setSearchVisible(true)
  const hideSearch = () => setSearchVisible(false)

  // Register route change event handlers
  useEffect(() => {
    router.events.on('routeChangeStart', hideSearch)

    return () => {
      router.events.off('routeChangeStart', hideSearch)
    }
  }, [])

  return {
    searchVisible,
    showSearch,
    hideSearch,
    setSearchVisible: (visible) => setSearchVisible(visible),
  }
}

const MobileSearchVisibleContext = createContext(null as any)

export function MobileSearchVisibleProvider({ children }: { children?: ReactNode }) {
  const { Provider } = MobileSearchVisibleContext
  return <Provider value={DefaultContext()}>{children}</Provider>
}

export function useMobileSearchVisible() {
  return useContext<MobileSearchVisibleContext>(MobileSearchVisibleContext)
}
