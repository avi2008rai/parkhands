import React, { useState } from 'react'
import { Close } from '@material-ui/icons'
import { Drawer, Box, Typography, IconButton, Grid } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      padding: theme.spacing(2),
      minWidth: '25rem',
    },
  }),
)

export default function useFormDrawer() {
  const classes = useStyles()
  const [drawerOpen, setDrawerOpen] = useState(false)
  return {
    drawerOpen,
    open: () => setDrawerOpen(true),
    close: () => setDrawerOpen(false),
    FormDrawer: ({ label, children }: React.PropsWithChildren<{ label?: string }>) => (
      <Drawer
        anchor="right"
        variant="temporary"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}>
        <Grid container direction="column" className={classes.root}>
          <Grid item>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h4" gutterBottom>
                {label}
              </Typography>
              <IconButton onClick={() => setDrawerOpen(false)} title="Close (ESC)">
                <Close />
              </IconButton>
            </Box>
          </Grid>
          <Grid item>
            <Box m={3}>{children}</Box>
          </Grid>
        </Grid>
      </Drawer>
    ),
  }
}
