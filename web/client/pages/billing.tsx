import component from 'components/billing/BillingPage'
import createPage from 'common/utils/createPage'

export { getServerSideProps } from 'common/utils/appParams'

export default createPage({
  component,
  requireLogin: true,
  requirePermissions: true,
})
