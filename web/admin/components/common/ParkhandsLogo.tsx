import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) =>
  createStyles({
    icon: { fill: theme.palette.secondary.main },
    letters: { fill: theme.palette.getContrastText(theme.palette.primary.main) },
    managerLetters: { fill: theme.palette.secondary.main },
  }),
)

type ParkhandsLogoProps = {
  variant?: 'fixed' | 'adaptive'
  size?: 'small' | 'medium' | 'large'
  className?: string
}
const sizes = {
  small: [120, 18],
  medium: [180, 27],
  large: [240, 36],
}
export default function ParkhandsLogo({
  variant = 'fixed',
  size = 'small',
  className,
}: ParkhandsLogoProps) {
  const classes = useStyles()
  const [width, height] = variant === 'fixed' ? sizes[size] : ['100%', '100%']
  return (
    <>
      <svg width={width} height={height} viewBox="0 0 120 18" className={className}>
        <g>
          <path
            className={classes.icon}
            d="M3.954,18h0a1.636,1.636,0,0,1-.237-.018,2.558,2.558,0,0,1-1.681-1.274A10.151,10.151,0,0,1,.831,13.782a24.737,24.737,0,0,1-.665-3.725A20.938,20.938,0,0,1,.322,3.586a4.206,4.206,0,0,1,.993-1.839A4.711,4.711,0,0,1,2.916.657,7.863,7.863,0,0,1,4.845.134,13.478,13.478,0,0,1,6.819,0c.939,0,1.793.076,2.358.127a6.809,6.809,0,0,1,2.511.732,7.4,7.4,0,0,1,3.46,3.795,7.024,7.024,0,0,1,.514,2.637,6.572,6.572,0,0,1-2.1,4.688,7.678,7.678,0,0,1-4.582,2.175c-1.523.133-2.316,1.253-3.016,2.242a7.261,7.261,0,0,1-.9,1.119A1.581,1.581,0,0,1,3.954,18ZM3.717,9.862a.851.851,0,0,0-.85.851v3.4a.85.85,0,1,0,1.7,0V11.563H8.909c2.2,0,3.845-2.256,3.845-4.272S11.109,3.017,8.909,3.017H3.717a.85.85,0,1,0,0,1.7H8.909c1.188,0,2.144,1.407,2.144,2.573S10.1,9.862,8.909,9.862Z"
            transform="translate(0 0)"
          />
          <g className={classes.letters}>
            <path
              d="M9.744,10.484,7.2,7.263A3.732,3.732,0,0,0,5.936,0H.85a.85.85,0,1,0,0,1.7H5.936a2.021,2.021,0,1,1,0,4.039H.85a.817.817,0,0,0-.761.893v4.379a.85.85,0,1,0,1.7,0V7.441H5.2l3.209,4.078a.859.859,0,0,0,.667.334.842.842,0,0,0,.666-1.367"
              transform="translate(29.529 3.1)"
            />
            <path
              d="M9.991,10.488,4.976,5.567,9.644,1.491A.85.85,0,0,0,8.526.21L3.16,4.889,1.7,6.152V.85A.85.85,0,0,0,0,.85V11.095a.85.85,0,0,0,1.7,0V8.406L3.683,6.688,8.8,11.7a.852.852,0,0,0,1.195-1.214"
              transform="translate(42.161 3.017)"
            />
            <path
              d="M10.417.027a.85.85,0,0,0-.85.85V5.424H1.7V.85A.85.85,0,0,0,0,.85V11.095a.85.85,0,0,0,1.7,0V7.125H9.566v4a.85.85,0,0,0,1.7,0V.877a.85.85,0,0,0-.85-.85"
              transform="translate(54.916 2.99)"
            />
            <path
              d="M11.2,11.945a.85.85,0,0,1-.76-.467L6.025,2.736,1.61,11.478a.85.85,0,0,1-1.518-.767L5.266.467a.85.85,0,0,1,1.518,0l5.175,10.244a.851.851,0,0,1-.758,1.234"
              transform="translate(15.316 3.017)"
            />
            <path
              d="M11.2,11.945a.85.85,0,0,1-.76-.467L6.025,2.736,1.61,11.478a.85.85,0,0,1-1.518-.767L5.266.467a.85.85,0,0,1,1.518,0l5.175,10.244a.851.851,0,0,1-.758,1.234"
              transform="translate(68.463 3.017)"
            />
            <path
              d="M10.417,0a.85.85,0,0,0-.85.85V8.963L1.466.371A.849.849,0,0,0,0,.957V11.2a.85.85,0,0,0,1.7,0V3.088L9.878,11.68a.788.788,0,0,0,.893.2.816.816,0,0,0,.5-.79V.85a.85.85,0,0,0-.85-.85"
              transform="translate(82.552 2.911)"
            />
            <path
              d="M5.144,0H.85a.85.85,0,1,0,0,1.7H5.144a4.252,4.252,0,1,1,0,8.5H1.763V6.142a.85.85,0,0,0-1.7,0v4.87A.837.837,0,0,0,.85,11.9H5.144a5.953,5.953,0,1,0,0-11.9"
              transform="translate(96.946 3.1)"
            />
            <path
              d="M6.09,5.1H3.411a1.7,1.7,0,1,1,0-3.4H8.226a.85.85,0,1,0,0-1.7H3.411a3.4,3.4,0,1,0,0,6.8H6.09a1.7,1.7,0,1,1,0,3.4H1.276a.85.85,0,1,0,0,1.7H6.09a3.4,3.4,0,1,0,0-6.8"
              transform="translate(110.186 3.1)"
            />
          </g>
        </g>
      </svg>
      <svg width={width} height={height} viewBox="-10 0 120 18" className={className}>
        <text y="15" fontSize="18px" className={classes.managerLetters}>
          MANAGER
        </text>
      </svg>
    </>
  )
}
