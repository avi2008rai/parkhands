import component from 'components/privacy/PrivacyPage'
import createPage from 'common/utils/createPage'

export { getServerSideProps } from 'common/utils/appParams'

export default createPage({
  requireLogin: false,
  requirePermissions: false,
  component,
})
