import { useTranslation } from 'react-i18next'
import { Clear, GpsFixed, GpsOff } from '@material-ui/icons'
import { InputBase, IconButton, Grow, Grid } from '@material-ui/core'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import React, { useState, ChangeEvent, useRef, useEffect, useCallback, useMemo } from 'react'

import { Domain } from 'common/i18n'
import { colors } from 'common/theme'
import { useFilters } from 'components/hooks/useFilters'
import { PeriodProvider } from 'components/calendar/usePeriod'
import { useSearchResult } from 'components/hooks/useSearchResult'
import { useCurrentPosition } from 'components/hooks/useCurrentPosition'

import DateFilter from './DateFilter'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchRoot: {
      position: 'relative',
      borderRadius: 18,
      [theme.breakpoints.only('xs')]: {
        borderRadius: 8,
      },
      color: colors.dark,
      backgroundColor: theme.palette.common.white,
      '& > .MuiGrid-item': {
        padding: theme.spacing(0.5),
      },
    },

    inputRoot: {
      color: 'inherit',
      width: '100%',
      padding: theme.spacing(0.25, 1),
      fontSize: theme.typography.pxToRem(18),
      height: '100%',
      position: 'relative',
      [theme.breakpoints.between('xs', 'sm')]: {
        '&:after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          right: theme.spacing(2),
          left: theme.spacing(2),
          borderBottom: '1px solid #D9D9D9',
        },
      },
    },
    inputInput: {
      paddingLeft: theme.spacing(1),
      textOverflow: 'ellipsis',
    },
    inputIcon: {
      color: colors.dark,
    },
  }),
)

export default function SearchInput({ onClear }: { onClear: () => void }) {
  const classes = useStyles()
  const {
    time: { start, end },
  } = useFilters()
  const [currentPosition] = useCurrentPosition()
  const { setResult } = useSearchResult()
  const { t } = useTranslation([Domain.Forms, Domain.General])
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [address, setAddress] = useState('')

  const clearIcon = useMemo(() => address.length >= 3, [address])
  const clearAddress = useCallback(() => {
    setAddress('')
    onClear()
  }, [setAddress, onClear])

  const searchGpsLocation = useCallback(() => {
    if (currentPosition) {
      setResult({
        mapView: {
          lat: currentPosition.coords.latitude,
          lng: currentPosition.coords.longitude,
          zoom: 15,
        },
        formattedAddress: t('near_you'),
      })
    }
  }, [currentPosition, setResult])

  useEffect(() => {
    if (address === '' && searchInputRef.current) {
      searchInputRef.current.value = ''
    }
  }, [address])

  const adornment = useMemo(() => {
    if (clearIcon) {
      return (
        <Grow in>
          <IconButton size="small" className={classes.inputIcon} onClick={clearAddress}>
            <Clear fontSize="small" />
          </IconButton>
        </Grow>
      )
    }
    return (
      <Grow in>
        <IconButton size="small" onClick={searchGpsLocation} className={classes.inputIcon}>
          {currentPosition ? <GpsFixed fontSize="small" /> : <GpsOff fontSize="small" />}
        </IconButton>
      </Grow>
    )
  }, [clearIcon, currentPosition, clearAddress, searchGpsLocation])

  return (
    <Grid container direction="row" classes={{ root: classes.searchRoot }}>
      <Grid item xs={12} md={7}>
        <InputBase
          inputRef={searchInputRef}
          placeholder={t(`${Domain.General}@where_like_to_park`)}
          fullWidth
          color="primary"
          classes={{ root: classes.inputRoot, input: classes.inputInput }}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
          inputProps={{ 'aria-label': 'search' }}
          endAdornment={adornment}
        />
      </Grid>
      <Grid item xs={12} md={5}>
        <PeriodProvider initialStart={start} initialEnd={end} minTime={new Date()}>
          <DateFilter />
        </PeriodProvider>
      </Grid>
    </Grid>
  )
}
