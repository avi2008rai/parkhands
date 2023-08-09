import { useRouter } from 'next/router'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'

type UsePaginationProps = {
  itemsPerPage?: number
}
export function usePagination({ itemsPerPage = 20 }: UsePaginationProps = {}) {
  const router = useRouter()
  const currentPage = useMemo(
    (): number =>
      typeof router.query.page === 'string'
        ? parseInt(router.query.page, 10) // Parse from query
        : 1, // Initial page
    [router],
  )
  const [page, setPage] = useState(currentPage)
  const [offset, setOffset] = useState(0)

  const changePage = useCallback(
    (event: ChangeEvent<unknown>, selectedPage: number) => {
      setOffset(Math.ceil((selectedPage - 1) * itemsPerPage))
      setPage(selectedPage)

      // Update page in query
      router.push({
        pathname: router.route,
        query: { page: selectedPage },
      })
    },
    [itemsPerPage, setPage, setOffset, router],
  )
  return {
    page,
    offset,
    itemsPerPage,
    changePage,
  }
}
