import _ from 'lodash'
import React, { useEffect, useRef } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Box, Grid, Typography, LinearProgress, useMediaQuery } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import { Domain } from 'common/i18n/locale'
import { useMobileSearchVisible } from 'components/hooks/useMobileSearchVisible'
import { useSearchResult } from 'components/hooks/useSearchResult'
import { useSelectedSlot } from 'components/hooks/useSelectedSlot'
import { useSelectedSpace } from 'components/hooks/useSelectedSpace'
import BackButton from 'components/common/BackButton'

import { useDecksHelper } from './useDecksHelper'
import SlotItem from './item/SlotItem'
import ShowMapButton from './ShowMapButton'

const useStyles = makeStyles(() =>
  createStyles({
    addressBox: {
      position: 'relative',
    },
  }),
)

export default function StaticSlotColumnListing() {
  const classes = useStyles()
  const mobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'))
  const isMobile = useRef(mobile)
  const { formattedAddress } = useSearchResult()
  const { showSearch } = useMobileSearchVisible()
  const { showSpaceColumnListing } = useDecksHelper()
  const { selectSlot } = useSelectedSlot()
  const { staticSpace, loading } = useSelectedSpace()
  const { t } = useTranslation([Domain.Pages, Domain.General])

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
      {formattedAddress && (
        <Box py={2} className={classes.addressBox}>
          <Typography variant="subtitle2">{t('park_nearby')}</Typography>
          <Typography color="secondary" variant="h4">
            {formattedAddress}
          </Typography>
          <ShowMapButton />
        </Box>
      )}
      <Box mb={1}>
        <BackButton
          position="relative"
          onClick={() => {
            showSpaceColumnListing()
          }}
        />
        <Typography display="inline">
          {t(`${Domain.General}@${staticSpace?.name} #${staticSpace?.staticId}`)}
        </Typography>
      </Box>
      <Grid container direction="column">
        {loading ? (
          <LinearProgress />
        ) : (
          _.map(_.range(staticSpace?.slotsCount || 0), (index) => {
            const id = `${staticSpace?.id}-${index}`

            return (
              <Grid item key={index}>
                <SlotItem
                  name={id}
                  static
                  pricePerHour={'0'}
                  buttonProps={{
                    onClick: () => {
                      selectSlot({
                        slot: {
                          id,
                          staticSpaceId: staticSpace?.id!,
                          static: true,
                        },
                        skipAnimation: true,
                      })
                    },
                  }}
                />
              </Grid>
            )
          })
        )}
      </Grid>
    </Box>
  )
}
