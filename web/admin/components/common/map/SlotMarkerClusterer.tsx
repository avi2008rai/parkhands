import _ from 'lodash'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { Clusterer } from '@react-google-maps/marker-clusterer'
import { MarkerClusterer } from '@react-google-maps/api'

const clusterIconDimensions = {
  width: 58,
  height: 41,
}

const createIconStyle = (index: number) => {
  // ref: https://github.com/googlemaps/v3-utility-library/blob/f0d57615649fcd35cbb310a6aa3160081187bc70/packages/markerclustererplus/src/cluster-icon.ts#L48
  return {
    url: `/static/map/m${index}.png`,
    width: clusterIconDimensions.width,
    height: clusterIconDimensions.height,
    anchorIcon: [38, 12],
    anchorText: [-3, 7],
    fontFamily: 'Nunito',
    fontWeight: '400',
  }
}

const useStyles = makeStyles(() =>
  createStyles({
    cluster: {
      '&& img': {
        clip: 'none',
        objectFit: 'cover',
        width: `${clusterIconDimensions.width}px`,
      },
    },
  }),
)
type MarkerClustererProps = {
  children: (markerClusterer: Clusterer) => React.ReactNode
}

export default function SlotMarkerClusterer({ children }: MarkerClustererProps) {
  const classes = useStyles()
  return (
    <MarkerClusterer
      options={{
        minimumClusterSize: 5,
        // Achieve the wanted cluster icon style with custom class + custom styles config
        clusterClass: classes.cluster,
        styles: _.map(_.range(1, 6), (index) => {
          return createIconStyle(index)
        }),
      }}>
      {children}
    </MarkerClusterer>
  )
}
