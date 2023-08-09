import createPage from 'common/utils/createPage'
import component from 'components/auth/login/LoginPage'

import { getServerSideProps } from 'common/utils/appParams'
export { getServerSideProps }

export default createPage({
  component,
})
