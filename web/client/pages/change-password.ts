import component from 'components/auth/password/ChangePasswordPage'
import createPage from 'common/utils/createPage'
import MapLayout from 'components/layout/MapLayout'

export { getServerSideProps } from 'common/utils/appParams'

export default createPage({
  requireLogin: true,
  requirePermissions: false,
  layout: MapLayout,
  component,
})
