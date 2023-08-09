import _ from 'lodash'
import React from 'react'
import { format } from 'date-fns'
import { Box } from '@material-ui/core'
import DataTable, { MUIDataTableOptions, MUIDataTableColumn } from 'mui-datatables'

import { Domain } from 'common/i18n/locale'

import { useDomain } from 'common/i18n'

const t = useDomain(Domain.Bookings)

import routes from 'common/routes'
import Link from 'components/common/Link'
import { BookingStatusT, BookingsListQuery, PickArrayType } from 'gql/schema'

type Booking = PickArrayType<BookingsListQuery['slotBookingsList']>

const columns: MUIDataTableColumn[] = [
  {
    name: 'id',
    label: t('id'),
    options: { filter: true, filterType: 'textField', display: 'false' },
  },
  {
    name: 'status',
    label: t('booking_status'),
    options: {
      sort: false,
      setCellHeaderProps: () => ({
        style: {
          textAlign: 'center',
        },
      }),
      // @ts-ignore
      customBodyRender: (value: BookingStatusT) => (
        <Box display="flex" justifyContent="center">
          {value}
        </Box>
      ),
    },
  },
  {
    name: 'slot',
    label: t('slot'),
    options: {
      filter: true,
      filterType: 'textField',
      // @ts-ignore
      customBodyRender: (slot: Booking['slot']) =>
        slot?.id && <Link {...routes.slots.manageById({ id: slot.id })}>{slot?.name}</Link>,
    },
  },
  {
    name: 'user',
    label: t('driver'),
    options: {
      filter: true,
      filterType: 'textField',
      // @ts-ignore
      customBodyRender: (user: Booking['user']) =>
        user?.id && <Link {...routes.users.manageById({ id: user.id })}>{user?.name}</Link>,
    },
  },
  {
    name: 'licensePlate',
    label: t('license_plate'),
  },
  {
    name: 'phone',
    label: t('phone'),
    options: {
      filter: true,
      filterType: 'textField',
    },
  },
  {
    name: 'startTime',
    label: t('start'),
    options: {
      customBodyRender: (value: string) => format(new Date(value), 'PPpp'),
    },
  },
  {
    name: 'endTime',
    label: t('End'),
    options: {
      customBodyRender: (value: string) => format(new Date(value), 'PPpp'),
    },
  },
  {
    name: 'createdAt',
    label: t('booking_created'),
    options: {
      customBodyRender: (value: string) => format(new Date(value), 'PPpp'),
    },
  },
]

const options: MUIDataTableOptions = {
  filterType: 'checkbox',
  responsive: 'standard',
  selectableRows: 'none',
}

export default function ListingTable({ slotBookingsList }: BookingsListQuery) {
  const tableData = _.map(slotBookingsList, (slot) =>
    _.pick(slot, [
      'id',
      'name',
      'licensePlate',
      'slot',
      'user',
      'phone',
      'status',
      'startTime',
      'endTime',
      'createdAt',
    ]),
  )
  return <DataTable title="Bookings" data={tableData} columns={columns} options={options} />
}
