import React, { useState } from 'react'
import { Marker, InfoWindow } from '@react-google-maps/api'
import { PickArrayType, FindBusinessQuery } from 'gql/schema'
import { createStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  createStyles({
    businessInfo: {
      fontSize: 12,
      color: 'black',
      backgroundColor: 'white',
      textAlign: 'center',
    },
  }),
)

type Business = PickArrayType<FindBusinessQuery['findBusinessList']>
export type BusinessMarkerProps = {
  business: Business
}
export default function BusinessMarker({ business }: BusinessMarkerProps) {
  const classes = useStyles()
  const [infoOpen, setInfoOpen] = useState(true)
  const position = {
    lat: business.location.latitude,
    lng: business.location.longitude,
  }
  return (
    <Marker
      icon={{
        url: business.markerUrl || '/static/default-business-marker.png',
        size: new google.maps.Size(32, 32),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(16, 0),
      }}
      position={position}
      onClick={() => setInfoOpen(!infoOpen)}>
      {infoOpen && (
        <InfoWindow position={position} onCloseClick={() => setInfoOpen(false)}>
          <div className={classes.businessInfo}>
            {business.photoUrl && (
              <div>
                <img src={business.photoUrl} />
              </div>
            )}
            <div style={{ marginTop: 5 }}>{business.name}</div>
            {business.description && <div style={{ marginTop: 5 }}>{business.description}</div>}
          </div>
        </InfoWindow>
      )}
    </Marker>
  )
}
