import { Grid, ButtonBase } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import SubmitButton from 'components/common/form/SubmitButton'

const useStyles = makeStyles((theme) => ({
  selectionButton: {
    padding: theme.spacing(1, 5),
    minWidth: '10rem',
  },
  image: {
    height: '11rem',
    width: '11rem',
    [theme.breakpoints.up('sm')]: {
      marginBottom: '2rem',
    },
    '&>img': {
      height: '8rem',
    },
  },
}))

type RoleButtonProps = {
  label: string
  imageSrc: string
  onClick: () => void
}
export default function RoleButton({ label, imageSrc, onClick }: RoleButtonProps) {
  const classes = useStyles()
  return (
    <>
      <ButtonBase type="submit" focusRipple onClick={onClick} className={classes.image}>
        <img src={imageSrc} alt={label} title={label} />
      </ButtonBase>
      <SubmitButton
        name="role"
        onClick={onClick}
        label={label}
        className={classes.selectionButton}
      />
    </>
  )
}
