import _ from 'lodash'
import React, { useMemo, useState } from 'react'
import DataTable, {
  MUIDataTableOptions,
  MUIDataTableColumn,
  MUIDataTableMeta,
} from 'mui-datatables'
import { Box, IconButton } from '@material-ui/core'
import { User, SpacesListQuery } from 'gql/schema'

import { Domain } from 'common/i18n/locale'
import { useDomain } from 'common/i18n'

import routes from 'common/routes'
import Link from 'components/common/Link'
import { Settings } from '@material-ui/icons'


const t = useDomain(Domain.Bookings)
const t1 = useDomain(Domain.General)

const columns: MUIDataTableColumn[] = [
  {
    name: 'id',
    label: t('id'),
    options: { filter: true, filterType: 'textField', display: 'false' },
  },
  {
    name: 'name',
    label: t1('name'),
    options: {
      filter: true,
      filterType: 'textField',
      customBodyRender: (value: string, { rowData }: MUIDataTableMeta) => {
        return <Link {...routes.slots.manageById({ id: rowData[0] })}>{value}</Link>
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
        <Link {...routes.users.manageById({ id: value?.id })}>{value?.name}</Link>
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
            <Link {...routes.spaces.manageById({ id: rowData[0] })}>
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

export default function ListingTable({ parkingSpacesList }: SpacesListQuery) {
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(0)

  const options = useMemo((): MUIDataTableOptions => {
    return {
      page,
      rowsPerPage,
      selectableRows: 'none',
      filterType: 'checkbox',
      responsive: 'standard',
      onChangePage: (page: number) => setPage(page),
      onChangeRowsPerPage: (numberOfRows: number) => setRowsPerPage(numberOfRows),
    }
  }, [rowsPerPage, page])
  const tableData = _.map(parkingSpacesList, (slot) =>
    _.pick(slot, ['id', 'name', 'owner', 'status']),
  )
  return <DataTable title="Spaces" data={tableData} columns={columns} options={options} />
}
