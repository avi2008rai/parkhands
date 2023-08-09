import createPage from 'common/utils/createPage'
import component from 'components/bookings/list/BookingPage'

export { getServerSideProps } from 'common/utils/appParams'

export default createPage({
  component,
  requireLogin: true,
  requirePermissions: true,
})
