import Router from 'next/router'
import React, { useState, useEffect } from 'react'
import { LinearProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const DONE_DURATION = 250 // On change sync progress-bar styles

const useStyles = makeStyles(() => ({
  routeIndicator: { position: 'absolute', top: 0, left: 0, right: 0 },
}))

export default function RouteIndicator() {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout>>()

  const onLoad = () => setLoading(true)
  const onDone = () => {
    setLoading(false)
    const timeoutId = setTimeout(() => {
      setTimeoutId(undefined)
      setLoading(false)
    }, DONE_DURATION)
    setTimeoutId(timeoutId)
  }

  // Register route change event handlers
  useEffect(() => {
    Router.events.on('routeChangeStart', onLoad)
    Router.events.on('routeChangeComplete', onDone)
    Router.events.on('routeChangeError', onDone)

    return () => {
      Router.events.off('routeChangeStart', onLoad)
      Router.events.off('routeChangeComplete', onDone)
      Router.events.off('routeChangeError', onDone)
    }
  }, [])

  useEffect(() => {
    return () => timeoutId && clearTimeout(timeoutId)
  }, [timeoutId])

  if (!loading) {
    return null
  }

  return (
    <LinearProgress color="secondary" variant="indeterminate" className={classes.routeIndicator} />
  )
}
