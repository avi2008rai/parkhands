import _ from 'lodash'
import React, { useMemo, useState, createContext, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, LinearProgress, Tabs, Tab, Container, Divider, Box } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import { Domain } from 'common/i18n/locale'
import { useSlotBookingsByUserIdQuery, SlotBookingFilter, BookingStatusT } from 'gql/schema'
import { useUser } from 'components/hooks/useUser'

import BookingList from './BookingList'
import { BookingStatus } from './BookingItem'

const useStyles = makeStyles((theme) =>
  createStyles({
    indicator: {
      display: 'none', // Hide the indicator. Different colors are used to indicate which is the selected tab.
    },
    tab: {
      textTransform: 'capitalize',
      color: '#FFFFFF',
      fontWeight: 600,
      opacity: 1,
      [theme.breakpoints.only('xs')]: {
        minWidth: 'unset',
        fontSize: theme.typography.pxToRem(10),
        padding: theme.spacing(0.75),
      },
    },
    tabWrapper: {
      [theme.breakpoints.only('xs')]: {
        padding: theme.spacing(0.25),
      },
    },
    selected: {
      color: theme.palette.secondary.main,
    },
  }),
)

type BookingFilter = BookingStatus | 'All'
const BookingFilterValues = [
  'All',
  BookingStatus.Ongoing,
  BookingStatus.Planned,
  BookingStatus.Expired,
  BookingStatus.Canceled,
]

function getBookingFilter(bookingFilter: BookingFilter): SlotBookingFilter | undefined {
  const now = new Date()
  switch (bookingFilter) {
    case BookingStatus.Canceled:
      return { status: { equalTo: BookingStatusT.Canceled } }
    case BookingStatus.Expired:
      return {
        and: [{ status: { notEqualTo: BookingStatusT.Canceled } }, { endTime: { lessThan: now } }],
      }
    case BookingStatus.Planned:
      return {
        and: [
          { status: { notEqualTo: BookingStatusT.Canceled } },
          { startTime: { greaterThan: now } },
        ],
      }
    case BookingStatus.Ongoing:
      return {
        and: [
          { status: { notEqualTo: BookingStatusT.Canceled } },
          { startTime: { lessThanOrEqualTo: now } },
          { endTime: { greaterThan: now } },
        ],
      }
    default:
      // 'all'
      return undefined
  }
}

type BookingPageContext = {
  refetch: () => void
}
const bookingPageContext = createContext<BookingPageContext>(null as any)
export function useBookingPageContext() {
  return useContext(bookingPageContext)
}

export default function BookingPage() {
  const { t } = useTranslation([Domain.Pages, Domain.Bookings])
  const classes = useStyles()
  const { userId } = useUser()
  const [selectedBookingStatus, setSelectedBookingStatus] = useState<BookingFilter>('All')
  const bookingsFilter = useMemo(() => {
    return getBookingFilter(selectedBookingStatus)
  }, [selectedBookingStatus])
  const { data, loading, refetch } = useSlotBookingsByUserIdQuery({
    variables: { userId, filter: bookingsFilter },
  })

  return (
    <bookingPageContext.Provider value={{ refetch }}>
      <Container maxWidth="lg">
        <Typography variant="h3" align="center">
          {t('bookings')}
        </Typography>
        <Tabs
          value={selectedBookingStatus}
          onChange={(event: React.ChangeEvent<{}>, value: BookingFilter) => {
            setSelectedBookingStatus(value)
          }}
          centered
          classes={{
            indicator: classes.indicator,
          }}>
          {_.map(BookingFilterValues, (filterValue) => {
            return (
              <Tab
                key={filterValue}
                label={t(`${Domain.Bookings}@${filterValue}`)}
                value={filterValue}
                classes={{
                  root: classes.tab,
                  selected: classes.selected,
                  wrapper: classes.tabWrapper,
                }}
              />
            )
          })}
        </Tabs>
        <Box pb={1}>
          <Divider />
        </Box>
        {loading ? (
          <LinearProgress color="secondary" />
        ) : (
          <BookingList bookings={data?.slotBookingsList || []} />
        )}
      </Container>
    </bookingPageContext.Provider>
  )
}
