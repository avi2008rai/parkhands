# Parkhands Admin

## Stack

- [Next.js](https://nextjs.org/)
- [Material UI](https://material-ui.com/)
- [React Hooks Form](https://react-hook-form.com/)
- [Yup](https://github.com/jquense/yup)
- [Apollo](https://www.apollographql.com/)
- [GraphQL](https://github.com/graphql/graphql-js)

## Create new pages

### Routing

Create new file in `/pages/my-profile.ts` in order to create url `http://localhost/my-profile`

The contents of this file should link to a Page component inside `/components/` folder like:

```js
import page from 'components/login'

export default page
```

With this convention we:

- provide better cognitive names to the components
- do not to expose component files
- avoid short component names for links like `/r/[uid]`
- refactor code easier

### File structure

```js
import createPage from 'common/utils/createPage'
import Layout from 'components/Layout'

export default createPage({
  requireLogin: true,
  breadcrumbs: ({ routes, props, t }) => ({
    parents: [
      <Link key="dashboard" color="inherit" href={routes.dashboard}>
        {t('Dashboard')}
      </Link>,
      <Link key="slots" color="inherit" {...routes.slots.index}>
        {t('Slots')}
      </Link>,
    ],
    current: `Slot ${props.query.id}`,
  }),
  getInitialProps: ({ query }) => {
    console.log({ query })
    return { query }
  },
  component: ({ query }) => (
    <Layout title="Login">
      <Container maxWidth="sm">
        <MyPageComponent query={query} />
      </Container>
    </Layout>
  ),
})
```

### `requireLogin` [optional]

### `requirePermissions` [optional]

### `getInitialProps` [optional]

Special note on [getInitialProps](https://nextjs.org/docs/api-reference/data-fetching/getInitialProps)

The property `getInitialProps` is not mandatory on the `CreatePage` type as not all pages need such method. This method allows us to provide initial params to the page component.

### `component` [mandatory]

Functional component that represents the actual page that we want to render together with it's layout component and data layer.
