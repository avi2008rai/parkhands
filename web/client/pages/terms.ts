import component from 'components/privacy/TermsPage'
import createPage from 'common/utils/createPage'

export { getServerSideProps } from 'common/utils/appParams'

export default createPage({
  requireLogin: false,
  requirePermissions: false,
  component,
})
