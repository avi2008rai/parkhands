import React, { useState } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import {
  Box,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core'

type DocumentationTableProps = {
  lat: number
  lng: number
  zoom: number
  userId: string
  setLat: (lat: number) => void
  setLng: (lng: number) => void
  setZoom: (zoom: number) => void
}
export default function DocumentationTable({
  lat,
  lng,
  setLng,
  setLat,
  setZoom,
  zoom,
  userId,
}: DocumentationTableProps) {
  return (
    <TableContainer component={Box}>
      <Table aria-label="configuration-parameters">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography noWrap>Parameter</Typography>
            </TableCell>
            <TableCell>
              <Typography>Description</Typography>
            </TableCell>
            <TableCell>
              <Typography>Value</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography component="pre" variant="inherit">
                providerId
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="inherit">
                The user id of the provider user. Should be prefilled from your link.
              </Typography>
            </TableCell>
            <TableCell>
              <TextField disabled value={userId} variant="outlined" label="userId" fullWidth />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography component="pre" variant="inherit">
                lat
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="inherit">
                The latitude of the starting map center. From -90 to 90.
              </Typography>
            </TableCell>
            <TableCell>
              <TextField
                fullWidth
                value={lat}
                type="number"
                label="Latitude"
                variant="outlined"
                inputProps={{ min: -90, max: 90 }}
                onChange={(e) => setLat(parseFloat(e.target.value))}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography component="pre" variant="inherit">
                lng
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="inherit">
                The longitude of the starting map center. From -180 to 180.
              </Typography>
            </TableCell>
            <TableCell>
              <TextField
                fullWidth
                value={lng}
                type="number"
                label="Longitude"
                variant="outlined"
                inputProps={{ min: -180, max: 180 }}
                onChange={(e) => setLng(parseFloat(e.target.value))}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography component="pre" variant="inherit">
                zoom
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="inherit">
                The starting zoom level of the map. From 0 - whole world to 21 - street level.
              </Typography>
            </TableCell>
            <TableCell>
              <TextField
                fullWidth
                value={zoom}
                label="Zoom"
                type="number"
                variant="outlined"
                inputProps={{ min: 0, max: 21 }}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
