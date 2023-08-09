import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import Pagination, { PaginationProps } from '@material-ui/lab/Pagination'

export { usePagination } from 'components/common/hooks/usePagination'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      margin: theme.spacing(8, 0),
    },
    ul: {


       justifyContent: 'center',
    },
  }),
)

type ResultSetPaginationProps = {
  totalCount: number
  itemsPerPage: number
} & PaginationProps

export default function ResultSetPagination({
  totalCount,
  itemsPerPage,
  color = 'secondary',
  size = 'large',
  showFirstButton = true,
  showLastButton = true,
  ...props
}: ResultSetPaginationProps) {
  if (itemsPerPage >= totalCount) {
    return null
  }

  const classes = useStyles()
  return (
    <Pagination
      count={Math.ceil(totalCount / itemsPerPage)}
      defaultPage={1}
      color={color}
      size={size}
      showFirstButton={showFirstButton}
      showLastButton={showLastButton}
      classes={classes}
      {...props}
    />
  )
}
