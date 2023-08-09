import _ from 'lodash'
import React, { useMemo, useState } from 'react'
import DataTable, {
  MUIDataTableOptions,
  MUIDataTableColumn,
  MUIDataTableMeta,
} from 'mui-datatables'
import { Box, IconButton } from '@material-ui/core'
import { SpacesListQuery, User, ParkingSpaceStatus } from 'gql/schema'
import SlotPreview from './../SlotPreview'
import { RequestBody } from 'pages/api/spaces/bulk-delete'
import routes from 'common/routes'
import { useFetch } from 'components/hooks/useFetch'
import Link from 'components/common/Link'
import StatusSwitch from './StatusSwitch'
import { Edit } from '@material-ui/icons'
import { Domain } from 'common/i18n/locale'
import { useDomain } from 'common/i18n'

const t = useDomain(Domain.Bookings)
const t1 = useDomain(Domain.General)

const columns: MUIDataTableColumn[] = [
  {
    name: 'photoUrl',
    label: t1('logo'),
    options: {
      filter: false,
      display: 'true',
      setCellHeaderProps: () => ({
        style: {
          color: '#00FFF1',
        },
      }),
      customBodyRender: (photoUrl: string) => {
        return <SlotPreview photoUrl={photoUrl} thumbnail={true} />
      },
    },
  },
  {
    name: 'id',
    label: t('id'),
    options: {
      filter: true,
      filterType: 'textField',
      display: 'true',
      setCellHeaderProps: () => ({
        style: {
          color: '#00FFF1',
        },
      }),
    },
  },
  {
    name: 'name',
    label: t1('name'),
    options: {
      filter: true,
      filterType: 'textField',
      customBodyRender: (value: string, { rowData }: MUIDataTableMeta) => {
        return (
          <Link color="textPrimary" {...routes.spaces.manageById({ id: rowData[1] })}>
            {value}
          </Link>
        )
      },
      setCellHeaderProps: () => ({
        style: {
          color: '#00FFF1',
        },
      }),
    },
  },
  {
    name: 'address',
    label: t1('org_address'),
    options: {
      filter: false,
      setCellHeaderProps: () => ({
        style: {
          color: '#00FFF1',
        },
      }),
    },
  },
  {
    name: 'owner',
    label: t1('owner'),
    options: {
      filter: false,
      filterType: 'textField',
      display: 'false',
      customBodyRender: (value) => {
        const user = (value as unknown) as User
        return (
          <Link color="textPrimary" {...routes.users.manageById({ id: user?.id })}>
            {user?.name}
          </Link>
        )
      },
      setCellHeaderProps: () => ({
        style: {
          color: '#00FFF1',
        },
      }),
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
          color: '#00FFF1',
        },
      }),
      customBodyRender: (
        value,
        { rowData, rowIndex, columnIndex }: MUIDataTableMeta,
        updateValue,
      ) => (
        <Box display="flex" justifyContent="center">
          <StatusSwitch
            id={rowData[1]}
            status={value as ParkingSpaceStatus}
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
          color: '#00FFF1',
        },
      }),
      customBodyRender: (_value: string, { rowData }: MUIDataTableMeta) => {
        return (
          <Box display="flex" justifyContent="flex-end">
            <Link {...routes.spaces.manageById({ id: rowData[1] })}>
              <IconButton color="secondary">
                <Edit />
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
  const [sendRequest] = useFetch<Response, RequestBody>({
    method: 'POST',
    baseUrl: routes.spaces.api.bulkDeleteSpaces,
  })

  const tableData = useMemo(() => {
    return _.map(parkingSpacesList, (space) =>
      _.pick({ ...space, address: space?.address?.formatted_address }, [
        'id',
        'name',
        'address',
        'owner',
        'status',
        'photoUrl',
      ]),
    )
  }, [parkingSpacesList])
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
        sendRequest({ body: { spaceIds: idsToDelete } })
      },
    }
  }, [rowsPerPage, page, sendRequest])

  return <DataTable title="Spaces" data={tableData} columns={columns} options={options} />
}
