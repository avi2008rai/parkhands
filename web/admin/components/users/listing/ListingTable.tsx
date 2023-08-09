import _ from 'lodash'
import React, { useMemo, useState } from 'react'
import DataTable, {
  MUIDataTableOptions,
  MUIDataTableColumn,
  MUIDataTableMeta,
} from 'mui-datatables'
import { Box, IconButton } from '@material-ui/core'
import { UsersListQuery, StatusT } from 'gql/schema'
import { systemRoles } from 'common/roles'

import routes from 'common/routes'
import Link from 'components/common/Link'
import StatusSwitch from './StatusSwitch'
import { Settings } from '@material-ui/icons'
import { UserRoleString } from 'gql/utils'

import { Domain } from 'common/i18n/locale'
import { useDomain } from 'common/i18n'

const t = useDomain(Domain.Bookings)
const t1 = useDomain(Domain.General)
const t2 = useDomain(Domain.User)

const columns: MUIDataTableColumn[] = [
  {
    name: 'id',
    label: t('id'),
    options: { filter: true, filterType: 'textField', display: 'false' },
  },
  {
    name: 'email',
    label: t2('Email'),
    options: {
      filter: true,
      filterType: 'textField',
      customBodyRender: (value: string, { rowData }: MUIDataTableMeta) => {
        return <Link {...routes.users.manageById({ id: rowData[0] })}>{value}</Link>
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
        return <Link {...routes.users.manageById({ id: rowData[0] })}>{value}</Link>
      },
    },
  },
  {
    name: 'role',
    label: t2('Role'),
    options: {
      // @ts-ignore
      customBodyRender: (role: UserRoleString) => _.find(systemRoles, { name: role })?.label,
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
      customBodyRender: (value: StatusT, tableMeta: MUIDataTableMeta, updateValue) => (
        <Box display="flex" justifyContent="center">
          <StatusSwitch
            id={tableMeta.rowData[0]}
            status={value}
            onChange={(value) => updateValue(value)}
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
            <Link {...routes.users.manageById({ id: rowData[0] })}>
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

export default function ListingTable({ usersList }: UsersListQuery) {
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

  const tableData = _.map(usersList, (user) =>
    _.pick(user, ['id', 'name', 'email', 'role', 'status']),
  )
  return <DataTable title="Users" data={tableData} columns={columns} options={options} />
}
