import createPage from 'common/utils/createPage'
import MapLayout from 'components/layout/MapLayout'
import component from 'components/auth/register/WelcomePage'

export { getServerSideProps } from 'common/utils/appParams'

export default createPage({
  component,
  requireLogin: true,
  requirePermissions: true,
  layout: MapLayout,
})
