export type UrlItem = {
  href: string
  as: string
}

const routes = {
  login: '/login',
  logout: '/logout',
  register: '/register',
  dashboard: '/',
  approveSlots: '/approve-slots',
  approveSpaces: '/approve-spaces',
  slots: {
    api: {
      uploadDataset: '/api/slots/upload-dataset',
      bulkDeleteSlots: 'api/slots/bulk-delete',
    },
    index: {
      href: '/slots',
      as: '/slots',
    },
    create: {
      href: '/slots/create',
      as: '/slots/create',
    },
    upload: {
      href: '/slots/upload',
      as: '/slots/upload',
    },
    viewById: ({ id }: { id: string }): UrlItem => ({
      href: '/slots/[id]',
      as: `/slots/${id}`,
    }),
    manageById: ({ id }: { id: string }): UrlItem => ({
      href: '/slots/[id]/manage',
      as: `/slots/${id}/manage`,
    }),
  },
  spaces: {
    api: {
      uploadDataset: '/api/spaces/upload-dataset',
      bulkDeleteSpaces: 'api/spaces/bulk-delete',
    },
    index: {
      href: '/spaces',
      as: '/spaces',
    },
    create: {
      href: '/spaces/create',
      as: '/spaces/create',
    },
    upload: {
      href: '/spaces/upload',
      as: '/spaces/upload',
    },
    viewById: ({ id }: { id: string }): UrlItem => ({
      href: '/spaces/[id]',
      as: `/spaces/${id}`,
    }),
    manageById: ({ id }: { id: string }): UrlItem => ({
      href: '/spaces/[id]/manage',
      as: `/spaces/${id}/manage`,
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
    create: {
      href: '/bookings/create',
      as: '/bookings/create',
    },
    manageById: ({ id }: { id: string }): UrlItem => ({
      href: '/bookings/[id]/manage',
      as: `/bookings/${id}/manage`,
    }),
  },
  users: {
    index: {
      href: '/users',
      as: '/users',
    },
    create: {
      href: '/users/create',
      as: '/users/create',
    },
    manageById: ({ id }: { id: string }): UrlItem => ({
      href: '/users/[id]/manage',
      as: `/users/${id}/manage`,
    }),
  },
  billing: '/billing',
  partners: '/partners',
}

export default routes
