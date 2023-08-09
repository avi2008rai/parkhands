import * as Yup from 'yup'

import { email, password } from 'common/validators'

export default Yup.object().shape({ email, password })
