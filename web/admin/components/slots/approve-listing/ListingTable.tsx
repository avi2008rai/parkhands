import _ from 'lodash'
import React, { useMemo, useState } from 'react'
import DataTable, {
  MUIDataTableOptions,
  MUIDataTableColumn,
  MUIDataTableMeta,
} from 'mui-datatables'
import { Box, IconButton } from '@material-ui/core'
import { SlotsListQuery, User } from 'gql/schema'

import routes from 'common/routes'
import Link from 'components/common/Link'
import { Settings } from '@material-ui/icons'

const columns: MUIDataTableColumn[] = [
  {
    name: 'id',
    label: 'ID',
    options: { filter: true, filterType: 'textField', display: 'false' },
  },
  {
    name: 'name',
    label: 'Name',
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
    label: 'Owner',
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
    label: 'Actions',
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
            <Link {...routes.slots.manageById({ id: rowData[0] })}>
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

export default function ListingTable({ slotsList }: SlotsListQuery) {
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
  const tableData = _.map(slotsList, (slot) => _.pick(slot, ['id', 'name', 'owner', 'status']))
  return <DataTable title="Slots" data={tableData} columns={columns} options={options} />
}
