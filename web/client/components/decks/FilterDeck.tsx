import _ from 'lodash'
import React, { useRef, useEffect } from 'react'
import { Box, Button, Grid, Popover } from '@material-ui/core'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'

import { useDomain, Domain } from 'common/i18n'
import { useFilters } from 'components/hooks/useFilters'

// @Disabled
// import VehicleSizeSelect from 'components/vehicle/form/VehicleSizeSelect'
import AmenityFilter from 'components/amenity/AmenityFilter'
import { useGoogleMapsLoading } from 'components/hooks/useGoogleMapsLoading'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    deck: {
      padding: theme.spacing(3),
      [theme.breakpoints.only('xs')]: {
        width: '100vw',
      },
      [theme.breakpoints.only('sm')]: {
        width: '45vw',
      },
      [theme.breakpoints.up('md')]: {
        width: '30vw',
      },
      [theme.breakpoints.up('lg')]: {
        width: '25vw',
      },
    },
    btn: {
      height: theme.spacing(4),
      minWidth: theme.spacing(10),
    },
  }),
)

export default function FilterDeck({ xs = false }: { xs?: boolean }) {
  const t = useDomain(Domain.Forms)
  const { loaded } = useGoogleMapsLoading()
  const classes = useStyles()
  const anchorEl = useRef<HTMLButtonElement>(null)
  const {
    popOver,
    openPopOver,
    closePopOver,
    // @Disabled
    // filterVehicleSize,
    // setFilterVehicleSize,
  } = useFilters()

  useEffect(() => {
    !anchorEl && openPopOver()
    return () => closePopOver()
  }, [anchorEl])

  if (!loaded) {
    return null
  }

  const id = popOver ? 'filter-menu' : undefined
  return (
    <Box>
      <Button
        ref={anchorEl}
        color="primary"
        variant="contained"
        aria-describedby={id}
        onClick={openPopOver}
        className={classes.btn}>
        {t('Filter')}
      </Button>
      <Popover
        id={id}
        open={popOver}
        onClose={closePopOver}
        anchorEl={anchorEl.current}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Box className={classes.deck}>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <AmenityFilter />
            </Grid>
            {/* @Disabled */}
            {/* <Grid item xs={12}>
              <VehicleSizeSelect
                value={filterVehicleSize}
                onChange={(event) => setFilterVehicleSize(event.target.value)}
              />
            </Grid> */}
          </Grid>
        </Box>
      </Popover>
    </Box>
  )
}
