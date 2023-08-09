import React from 'react'
import Head from 'next/head'
import { Container } from '@material-ui/core'

import useStyles from './layoutStyles'
import Footer from './Footer'

type Props = {
  title?: string
}

export default function AnonymousLayout({
  children,
  title = 'Parkhands Admin',
}: React.PropsWithChildren<Props>) {
  const layoutClasses = useStyles()

  return (
    <div className="layout">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={layoutClasses.container}>
        <main className={`${layoutClasses.content} ${layoutClasses.loginContainer}`}>
          {children && <Container>{children}</Container>}
        </main>
        <Footer />
      </div>
    </div>
  )
}
