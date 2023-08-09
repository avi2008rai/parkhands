import * as Yup from 'yup'

import { name, email, phone } from 'common/validators'

export default Yup.object().shape({ name, email, phone })
