import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Domain } from 'common/i18n/locale'
import { Box, Menu, MenuItem, Button } from '@material-ui/core'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const { t } = useTranslation(Domain.Pages)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleSelect = (lang: string) => {
    i18n.changeLanguage(lang)
    handleClose()
  }
  return (
    <Box m={2}>
      <Button aria-controls="language-menu" aria-haspopup="true" onClick={handleClick}>
        {i18n.language !== 'de' ?
          t('en') : t(i18n.language)
        }
      </Button>
      <Menu
        id="language-menu"
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        <MenuItem dense onClick={() => handleSelect('en')}>
          {t('en')}
        </MenuItem>
        <MenuItem dense onClick={() => handleSelect('de')}>
          {t('de')}
        </MenuItem>
      </Menu>
    </Box>
  )
}
