import _ from 'lodash'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { ClustererProps } from '@react-google-maps/api/dist/components/addons/MarkerClusterer'
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

export default function SlotMarkerClusterer({
  minimumClusterSize = 5,
  averageCenter = false,
  children,
  ...props
}: ClustererProps) {
  const classes = useStyles()
  return (
    <MarkerClusterer
      {...props}
      options={{
        averageCenter,
        minimumClusterSize,
        // Achieve the wanted cluster icon style with custom class + custom styles config
        clusterClass: classes.cluster,
        styles: _.map(_.range(1, 6), (index) => {
          return createIconStyle(index)
        }),
        ...props.options,
      }}>
      {children}
    </MarkerClusterer>
  )
}
