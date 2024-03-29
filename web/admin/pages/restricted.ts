import createPage from 'common/utils/createPage'
import component from 'components/auth/restricted/RestrictedPage'

import { getServerSideProps } from 'common/utils/appParams'
export { getServerSideProps }

export default createPage({
  requireLogin: false,
  component,
})
