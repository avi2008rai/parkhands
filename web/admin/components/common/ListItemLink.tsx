import React, { ReactElement, SyntheticEvent, useEffect, useState } from 'react'
import {
  ListItem,
  ListItemProps as MuiListItemProps,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/dist/client/router'

import { UrlItem } from 'common/routes'
import { Domain } from 'common/i18n/locale'

export type ListItemProps = Partial<MuiListItemProps> & {
  icon: ReactElement
  url: string | UrlItem
  primary?: string
  secondaryAction?: ReactElement
}

function currentUrl(url: string | UrlItem): string {
  if (typeof url === 'string') {
    return url
  }
  return url.as
}

const ListItemLink = ({ icon, primary, url, secondaryAction }: ListItemProps) => {
  const router = useRouter()
  const { t } = useTranslation(Domain.Navigation)
  const [selected, setSelected] = useState(false)

  useEffect(() => {
    // Router is not initially loaded during SSR
    setSelected(router.asPath === currentUrl(url))
  }, [router])

  return (
    <ListItem
      button
      component="a"
      selected={selected}
      onClick={(event: SyntheticEvent) => {
        event.preventDefault()
        if (typeof url === 'string') {
          return router.push(url)
        }
        return router.push(url.href, url.as)
      }}>
      <ListItemIcon>{icon}</ListItemIcon>
      {primary && <ListItemText primary={t(primary)} />}
      {secondaryAction && <ListItemSecondaryAction>{secondaryAction}</ListItemSecondaryAction>}
    </ListItem>
  )
}
export default ListItemLink
