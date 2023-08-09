import { setCookie, destroyCookie } from 'nookies'
import { NextPageContext } from 'next'

export const jwtCookieName = 'ph_jwt'

export function redirectToPathname(url: string): void {
  const absoluteUrl = /\/\//g
  const nextUrl = !url || (url && url.match(absoluteUrl)) ? '/' : url
  window.location.href = nextUrl
}

export function destroyJwtCookie(ctx?: NextPageContext) {
  destroyCookie(ctx, jwtCookieName)
}

// Works in the browser only.
export default (jwtToken: string) => {
  setCookie(undefined, jwtCookieName, jwtToken, {
    maxAge: 24 * 60 * 60,
    path: '/',
  })
}
