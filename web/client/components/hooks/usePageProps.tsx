import React, { useState, createContext, useContext, ReactNode } from 'react'

type PagePropsContext<T> = {
  props: T
  setInitialProps: (props: T) => void
}

const DefaultContext = (): PagePropsContext<{}> => {
  const [props, setProps] = useState({})
  return {
    props,
    setInitialProps: (props) => setProps(props),
  }
}

const PagePropsContext = createContext(null as any)

export function PagePropsProvider({ children }: { children?: ReactNode }) {
  const { Provider } = PagePropsContext
  return <Provider value={DefaultContext()}>{children}</Provider>
}

export function usePageProps<T>() {
  return useContext<PagePropsContext<T>>(PagePropsContext)
}
