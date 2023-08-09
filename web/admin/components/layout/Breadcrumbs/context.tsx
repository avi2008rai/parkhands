import React, { ReactNode, createContext, useState, useContext } from 'react'
import { TFunction } from 'i18next'
import { useTranslation } from 'react-i18next'

import appRoutes from 'common/routes'
import { Domain } from 'common/i18n/locale'

type Breadcrumbs = { current: string; parents: ReactNode[] }
type ConfigParams<P> = { routes: typeof appRoutes; props: P; t: TFunction }
type BreadcrumbContext = Breadcrumbs & {
  setCurrent: (current: string) => void
  setParents: (parents: ReactNode[]) => void
  t: TFunction
}

export type BreadcrumbConfig<P> = ({ routes, props, t }: ConfigParams<P>) => Breadcrumbs

const DefaultBreadcrumb: Breadcrumbs = {
  current: 'dashboard',
  parents: [],
}

export function BreadcrumbsFactory<P>(props: P, t: TFunction, breadcrumbs?: BreadcrumbConfig<P>) {
  if (breadcrumbs) {
    return breadcrumbs({ routes: appRoutes, props, t })
  }
  return DefaultBreadcrumb
}

const DefaultContext = (): BreadcrumbContext => {
  const { t } = useTranslation(Domain.Navigation)
  const [current, setCurrent] = useState(t(DefaultBreadcrumb.current) as string)
  const [parents, setParents] = useState(DefaultBreadcrumb.parents)

  return {
    t,
    current,
    setCurrent,
    parents,
    setParents,
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Context = createContext<BreadcrumbContext>(null as any)

export default function BreadcrumbProvider({ children }: { children?: ReactNode }) {
  const { Provider } = Context
  return <Provider value={DefaultContext()}>{children}</Provider>
}

export const useBreadcrumbs = () => {
  return useContext(Context)
}
