import React from 'react'
import { Typography, Box, CardContent, Link } from '@material-ui/core'
import { Trans, useTranslation } from 'react-i18next'

import { Domain } from 'common/i18n'
import { ReducedStaticSlot } from 'components/hooks/useSelectedSlot'

import WishToParkButton from '../wish-to-park/WishToParkButton'
import useStyles from './styles'

type SlotCardProps = {
  slot: ReducedStaticSlot
  onClick?: () => void
}

export default function StaticSlotCardContent({ slot, onClick }: SlotCardProps) {
  const { t } = useTranslation([Domain.Forms, Domain.Email])
  const classes = useStyles()

  return (
    <>
      <CardContent className={classes.cardContent} onClick={onClick}>
        <Box>
          <Typography variant="h6" className={classes.name} color="primary">
            <Box fontWeight={600}>{slot.id}</Box>
          </Typography>
        </Box>
        <Box pt={1}>
          <Typography variant="body2" color="primary">
            <Trans
              ns={Domain.General}
              i18nKey="contact_claim_space"
              components={{
                mailto: (
                  <Link
                    color="secondary"
                    underline="none"
                    target="_blank"
                    href={`mailto:sales@parkhands.com?subject=${t(
                      `${Domain.Email}@claimSlotSubject`,
                      {
                        id: slot.staticSpaceId,
                      },
                    )}`}
                  />
                ),
              }}
            />
          </Typography>
        </Box>
      </CardContent>
      <Box className={classes.buttonContainer}>
        <WishToParkButton classes={{ root: classes.cta }} color="primary" variant="contained" />
      </Box>
    </>
  )
}
