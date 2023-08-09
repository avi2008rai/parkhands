import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import React, { useEffect, useRef, useMemo } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Box, Grid, Typography, useMediaQuery, Theme, LinearProgress } from '@material-ui/core'

import { Dataset } from 'gql/utils'
import { Domain } from 'common/i18n/locale'
import { useFetch } from 'components/hooks/useFetch'
import { useParkingSpacesByIdsLazyQuery } from 'gql/schema'
import { useSlots, isCluster, isStaticSlot, isSlot } from 'components/hooks/useSlots'
import { useSearchResult } from 'components/hooks/useSearchResult'
import { useSelectedSpace } from 'components/hooks/useSelectedSpace'
import { useMobileSearchVisible } from 'components/hooks/useMobileSearchVisible'
import { FindStaticSpacesResponse, FindStaticSpacesVariables } from 'pages/api/spaces/find'

import SpaceItem from './item/SpaceItem'
import ShowMapButton from './ShowMapButton'
import { useDecksHelper } from './useDecksHelper'

const individualListMaxItems = 30

const useStyles = makeStyles(() =>
  createStyles({
    addressBox: { position: 'relative' },
  }),
)

export default function SpaceColumnListing() {
  const classes = useStyles()
  const { slots } = useSlots()
  const mobile = useMediaQuery((theme: Theme) => theme.breakpoints.only('xs'))
  const isMobile = useRef(mobile)
  const { formattedAddress } = useSearchResult()
  const { showSearch } = useMobileSearchVisible()
  const { selectSpace, selectStaticSpace } = useSelectedSpace()
  const { showSlotColumnListing, showStaticSlotColumnListing } = useDecksHelper()
  const { t } = useTranslation(Domain.Pages)
  const parkingSpacesIds = useMemo(() => {
    let spaceIds: string[] = []
    _.forEach(slots, (slot) => {
      if (isCluster(slot)) {
        spaceIds = Object.keys(slot.properties.paSp)
      } else if (isSlot(slot)) {
        spaceIds = _.union(
          spaceIds,
          slot.properties.parkingSpaceId ? [slot.properties.parkingSpaceId] : [],
        )
      }
    })
    return spaceIds
  }, [slots])

  const staticSpacesIds = useMemo(() => {
    let staticSpaceIds: string[] = []
    _.forEach(slots, (slot) => {
      if (isCluster(slot)) {
        staticSpaceIds = Object.keys(slot.properties.stSp)
      } else if (isStaticSlot(slot)) {
        staticSpaceIds = _.union(staticSpaceIds, [slot.properties.staticSpaceId] || [])
      }
    })
    return staticSpaceIds
  }, [slots])

  const hasMore = useMemo(() => {
    return (
      parkingSpacesIds.length > individualListMaxItems ||
      staticSpacesIds.length > individualListMaxItems
    )
  }, [parkingSpacesIds, staticSpacesIds])

  const [fetchSpaces, { data, loading }] = useParkingSpacesByIdsLazyQuery()
  const [fetchStaticSpaces, { data: staticData, loading: staticLoading }] = useFetch<
    FindStaticSpacesResponse,
    FindStaticSpacesVariables
  >({ method: 'POST', baseUrl: '/api/spaces/find' })

  // Fetch real spaces
  useEffect(() => {
    fetchSpaces({ variables: { ids: parkingSpacesIds.slice(0, individualListMaxItems) } })
  }, [parkingSpacesIds])

  // Fetch static spaces
  useEffect(() => {
    fetchStaticSpaces({ body: { spaceIds: staticSpacesIds.slice(0, individualListMaxItems) } })
  }, [staticSpacesIds])

  // Use intermediate isMobile ref so result clearing is only on "unmount".
  // The ref allows having the latest value of mobile while not triggering
  // the cleanup effect of the useEffect hook. - https://reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often
  useEffect(() => {
    isMobile.current = mobile
  }, [mobile])

  useEffect(() => {
    // Should happen only on component "unmount"
    return () => {
      if (isMobile.current) {
        showSearch()
      }
    }
  }, [])

  return (
    <Box mb="5rem" mx={2}>
      {/* A bit more space when there no formattedAddress, so it doesn't look cramped */}
      <Box py={formattedAddress ? 2 : 3} className={classes.addressBox}>
        {formattedAddress && (
          <>
            <Typography variant="subtitle2">{t('park_nearby')}</Typography>
            <Typography color="secondary" variant="h4">
              {formattedAddress}
            </Typography>
          </>
        )}
        <ShowMapButton />
      </Box>
      <Box mb={1}>
        <Typography>{t('parking_space')}</Typography>
      </Box>
      <Grid container direction="column">
        {!loading &&
          !staticLoading &&
          _.isEmpty(data?.parkingSpacesList) &&
          _.isEmpty(staticData?.spaces) && (
            <Grid item>
              <Box py={4} px={2}>
                <Typography align="center">{t('no_result_found')}</Typography>
              </Box>
            </Grid>
          )}
        {loading ? (
          <LinearProgress />
        ) : (
          _.map(data?.parkingSpacesList, (space) => {
            return (
              <Grid item key={space.id}>
                <SpaceItem
                  {...space}
                  buttonProps={{
                    onClick: () => {
                      selectSpace({ space })
                      showSlotColumnListing()
                    },
                  }}
                />
              </Grid>
            )
          })
        )}
        {staticLoading ? (
          <LinearProgress />
        ) : (
          _.map(staticData?.spaces, (staticSpace: Dataset.StaticSpace) => {
            return (
              <Grid item key={staticSpace.id}>
                <SpaceItem
                  {...staticSpace}
                  buttonProps={{
                    onClick: () => {
                      selectStaticSpace({ staticSpace })
                      showStaticSlotColumnListing()
                    },
                  }}
                />
              </Grid>
            )
          })
        )}
      </Grid>
      {hasMore && (
        <Grid item>
          <Box py={2}>
            <Typography align="center">{t('show_more')}</Typography>
          </Box>
        </Grid>
      )}
    </Box>
  )
}
