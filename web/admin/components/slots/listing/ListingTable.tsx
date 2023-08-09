import _ from 'lodash'
import React, { useMemo, useState } from 'react'
import DataTable, {
  MUIDataTableOptions,
  MUIDataTableColumn,
  MUIDataTableMeta,
} from 'mui-datatables'
import { Box, IconButton } from '@material-ui/core'
import { SlotsListQuery, User, SlotStatusT } from 'gql/schema'

import { RequestBody } from 'pages/api/slots/bulk-delete'
import routes from 'common/routes'
import { useFetch } from 'components/hooks/useFetch'
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
    name: 'name',
    label: t1('name'),
    options: {
      filter: true,
      filterType: 'textField',
      customBodyRender: (value: string, { rowData }: MUIDataTableMeta) => {
        return (
          <Link color="secondary" {...routes.slots.manageById({ id: rowData[0] })}>
            {value}
          </Link>
        )
      },
    },
  },
  {
    name: 'owner',
    label: t1('owner'),
    options: {
      filter: true,
      filterType: 'textField',
      customBodyRender: (value) => {
        const user = (value as unknown) as User
        return (
          <Link color="secondary" {...routes.users.manageById({ id: user?.id })}>
            {user?.name}
          </Link>
        )
      },
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
      customBodyRender: (
        value,
        { rowData, rowIndex, columnIndex }: MUIDataTableMeta,
        updateValue,
      ) => (
        <Box display="flex" justifyContent="center">
          <StatusSwitch
            id={rowData[0]}
            status={value as SlotStatusT}
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
            <Link {...routes.slots.manageById({ id: rowData[0] })}>
              <IconButton color="secondary">
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
  const [sendRequest] = useFetch<Response, RequestBody>({
    method: 'POST',
    baseUrl: routes.slots.api.bulkDeleteSlots,
  })

  const tableData = useMemo(() => {
    return _.map(slotsList, (slot) => _.pick(slot, ['id', 'name', 'owner', 'status']))
  }, [slotsList])

  const options = useMemo((): MUIDataTableOptions => {
    return {
      page,
      rowsPerPage,
      filterType: 'checkbox',
      responsive: 'standard',
      selectableRowsOnClick: false,
      onChangePage: (page: number) => setPage(page),
      onChangeRowsPerPage: (numberOfRows: number) => setRowsPerPage(numberOfRows),
      onRowsDelete: (rowsDeleted: any) => {
        const idsToDelete = rowsDeleted.data.map(
          (item: { dataIndex: number }) => tableData[item.dataIndex].id,
        )
        sendRequest({ body: { slotIds: idsToDelete } })
      },
    }
  }, [rowsPerPage, page, sendRequest])

  return <DataTable title="Slots" data={tableData} columns={columns} options={options} />
}
