export type UrlItem = {
  href: string
  as: string
}

const routes = {
  login: '/login',
  logout: '/logout',
  register: '/register',
  welcome: '/welcome',
  activation: '/activation',
  dashboard: '/',
  findLocation: ({ lat, lng }: google.maps.LatLngLiteral, zoom = 15) => ({
    href: '/[location]',
    as: `/@${lat},${lng},${zoom}`,
  }),
  profile: '/profile',
  subscription: '/subscription',
  widget: {
    docs: {
      href: '/widget/docs',
      as: '/widget/docs',
    },
  },
  slots: {
    index: {
      href: '/slots',
      as: '/slots',
    },
    create: {
      href: '/slots/create',
      as: '/slots/create',
    },
    viewById: ({ id }: { id: string }): UrlItem => ({
      href: '/slots/[id]',
      as: `/slots/${id}`,
    }),
    bookById: ({ id }: { id: string }): UrlItem => ({
      href: '/slots/[id]/booking',
      as: `/slots/${id}/booking`,
    }),
    manageById: ({ id }: { id: string }): UrlItem => ({
      href: '/slots/[id]/manage',
      as: `/slots/${id}/manage`,
    }),
  },
  vehicles: {
    index: {
      href: '/vehicles',
      as: '/vehicles',
    },
    create: {
      href: '/vehicles/create',
      as: '/vehicles/create',
    },
    manageById: ({ id }: { id: string }): UrlItem => ({
      href: '/vehicles/[id]/manage',
      as: `/vehicles/${id}/manage`,
    }),
  },
  bookings: {
    index: {
      href: '/bookings',
      as: '/bookings',
    },
    viewById: ({ id }: { id: string }): UrlItem => ({
      href: '/bookings/[id]',
      as: `/bookings/${id}`,
    }),
  },
  terms: '/terms',
  privacy: '/privacy',
  billing: '/billing',
  invoices: '/billing/invoices',
  resetPassword: '/reset-password',
  changePassword: '/change-password',
  forgotPassword: '/forgot-password',
  forgotPasswordSuccess: '/forgot-password/success',
}

export default routes
