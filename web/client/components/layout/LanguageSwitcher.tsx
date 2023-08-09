import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core/styles'
import { Menu, MenuItem, Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: { margin: theme.spacing(0, 1) },
}))

export default function LanguageSwitcher() {
  const classes = useStyles()
  const { i18n } = useTranslation()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => setAnchorEl(null)
  const handleSelect = async (lang: string) => {
    await i18n.changeLanguage(lang)
    handleClose()
  }

  return (
    <>
      <Button
        aria-haspopup="true"
        aria-controls="language-menu"
        onClick={handleClick}
        className={classes.root}>
        {i18n.language.toUpperCase()}
      </Button>
      <Menu
        id="language-menu"
        keepMounted
        onClose={handleClose}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <MenuItem dense onClick={() => handleSelect('de')}>
          DE
        </MenuItem>
        <MenuItem dense onClick={() => handleSelect('en')}>
          EN
        </MenuItem>
      </Menu>
    </>
  )
}
