import createPage from 'common/utils/createPage'
import MapLayout from 'components/layout/MapLayout'
import component from 'components/auth/register/RegisterPage'

export default createPage({
  requireLogin: false,
  requirePermissions: false,
  layout: MapLayout,
  component,
})
