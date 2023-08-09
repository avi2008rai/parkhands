import _ from 'lodash'
import React, { useMemo, useState } from 'react'
import DataTable, {
  MUIDataTableOptions,
  MUIDataTableColumn,
  MUIDataTableMeta,
} from 'mui-datatables'
import { Box, IconButton } from '@material-ui/core'
import { StatusT, User, VehiclesListQuery } from 'gql/schema'

import routes from 'common/routes'
import Link from 'components/common/Link'
import StatusSwitch from './StatusSwitch'
import { Settings } from '@material-ui/icons'
import { Domain } from 'common/i18n/locale'
import { useDomain } from 'common/i18n'

const t = useDomain(Domain.Bookings)
const t1 = useDomain(Domain.General)

const columns: MUIDataTableColumn[] = [
  {
    name: 'id',
    label: t('id'),
    options: { filter: true, filterType: 'textField', display: 'false' },
  },
  {
    name: 'licensePlate',
    label: t('license_plate'), 
    options: {
      filter: true,
      filterType: 'textField',
      setCellProps: () => ({ 'aria-label': 'licensePlate' }),
      customBodyRender: (value: string, { rowData }: MUIDataTableMeta) => {
        return <Link {...routes.vehicles.manageById({ id: rowData[0] })}>{value}</Link>
      },
    },
  },
  {
    name: 'name',
    label: t1('name'),
    options: {
      filter: true,
      filterType: 'textField',
      customBodyRender: (value: string, { rowData }: MUIDataTableMeta) => {
        return <Link {...routes.vehicles.manageById({ id: rowData[0] })}>{value}</Link>
      },
    },
  },
  {
    name: 'owner',
    label: t1('owner'),
    options: {
      filter: true,
      filterType: 'textField',
      // @ts-ignore
      customBodyRender: (value: User) => (
        <Link {...routes.users.manageById({ id: value.id })}>{value.name}</Link>
      ),
    },
  },
  {
    name: 'status', 
   label: t1('Status'),
    options: {
      sort: false,
      setCellHeaderProps: () => ({
        style: {
          textAlign: 'center',
        },
      }),
      // @ts-ignore
      customBodyRender: (
        value: StatusT,
        { rowData, rowIndex, columnIndex }: MUIDataTableMeta,
        updateValue,
      ) => (
        <Box display="flex" justifyContent="center">
          <StatusSwitch
            id={rowData[0]}
            status={value}
            onChange={(newValue: string) => updateValue(newValue)}
          />
        </Box>
      ),
    },
  },
  {
    name: 'actions',
    label: t1('actions'),
    options: {
      sort: false,
      filter: false,
      setCellHeaderProps: () => ({
        style: {
          textAlign: 'right',
        },
      }),
      customBodyRender: (_value: string, { rowData }: MUIDataTableMeta) => {
        return (
          <Box display="flex" justifyContent="flex-end">
            <Link {...routes.vehicles.manageById({ id: rowData[0] })}>
              <IconButton color="primary">
                <Settings />
              </IconButton>
            </Link>
          </Box>
        )
      },
    },
  },
]

export default function ListingTable({ vehiclesList }: VehiclesListQuery) {
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(0)

  const options = useMemo((): MUIDataTableOptions => {
    return {
      page,
      rowsPerPage,
      filterType: 'checkbox',
      responsive: 'standard',
      selectableRows: 'none',
      onChangePage: (page: number) => setPage(page),
      onChangeRowsPerPage: (numberOfRows: number) => setRowsPerPage(numberOfRows),
    }
  }, [rowsPerPage, page])

  const tableData = _.map(vehiclesList, (slot) =>
    _.pick(slot, ['id', 'name', 'licensePlate', 'owner', 'status']),
  )
  return <DataTable title="Vehicles" data={tableData} columns={columns} options={options} />
}
