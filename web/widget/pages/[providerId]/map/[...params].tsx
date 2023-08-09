import MapPage from 'components/map/MapPage'

import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: { query },
  }
}

export default MapPage
