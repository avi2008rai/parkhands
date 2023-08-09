import component from 'components/home'
import createPage from 'common/utils/createPage'
import MapLayout from 'components/layout/MapLayout'

export { getServerSideProps } from 'common/utils/appParams'

export default createPage({
  requireLogin: false,
  layout: MapLayout,
  component
})
