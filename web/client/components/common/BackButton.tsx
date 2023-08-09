import React from 'react'
import { IconButton } from '@material-ui/core'
import { ChevronLeft } from '@material-ui/icons'
import { createStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) =>
  createStyles({
    backButton: ({
      position,
      edge,
      spacing,
    }: Pick<BackButtonProps, 'position' | 'edge'> & { spacing: number[] }) => {
      const distance = spacing ? theme.spacing.apply(null, spacing as any) : 0
      if (position === 'absolute') {
        return {
          position,
          top: distance,
          right: edge === 'end' ? distance : undefined,
          left: edge === 'start' ? distance : undefined,
        }
      }
      return {
        position,
        margin: distance,
      }
    },
  }),
)
type BackButtonProps = {
  onClick: () => void
  edge?: 'start' | 'end'
  spacing?: number | number[]
  fontSize?: 'inherit' | 'default' | 'small' | 'large'
  position?: 'relative' | 'absolute'
}
export default function BackButton({
  edge = 'start',
  spacing = 1,
  position = 'absolute',
  fontSize,
  onClick,
}: BackButtonProps) {
  const classes = useStyles({
    position,
    edge,
    spacing: Array.isArray(spacing) ? spacing : [spacing],
  })
  return (
    <IconButton onClick={onClick} className={classes.backButton}>
      <ChevronLeft fontSize={fontSize} />
    </IconButton>
  )
}
