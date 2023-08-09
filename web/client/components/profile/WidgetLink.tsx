import _ from 'lodash'
import React from 'react'

import routes from 'common/routes'
import Link from 'components/common/Link'

export default function WidgetLink() {
  return (
    <Link
      {...routes.widget.docs}
      display="block"
      color="textPrimary"
      rel="external nofollow noopener">
      Widget Configurator Map
    </Link>
  )
}
