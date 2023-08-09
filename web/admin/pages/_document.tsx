import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { withSSR } from 'react-i18next'
import { ServerStyleSheets } from '@material-ui/core/styles'
import { parseCookies } from 'nookies'

import i18n from 'common/i18n'
import theme from 'common/theme'
import { defaultLocale, cookieName } from 'common/i18n/locale'

export default class ParkDocument extends Document {
  render() {
    return (
      <html lang={i18n.language}>
        <Head>
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Nunito:300,400,500,700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

ParkDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage
  const locale = parseCookies(ctx)[cookieName] || defaultLocale
  i18n.changeLanguage(locale)

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => {
        return (props) => {
          const TranslatedApp = withSSR()(App)
          return sheets.collect(
            <TranslatedApp initialLanguage={i18n.language} initialI18nStore={{}} {...props} />,
          )
        }
      },
    })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  }
}
