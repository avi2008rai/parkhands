import React from 'react'
import { Typography, Grid, Link, Box } from '@material-ui/core'
import { useTranslation, Trans } from 'react-i18next'

import { Domain } from 'common/i18n/locale'
import { ReducedStaticSlot } from 'components/hooks/useSelectedSlot'

import SlotImage from '../SlotImage'
import SlotDetailsSection from './SlotDetailsSection'
import StaticSlotCallToAction from './call-to-action/StaticSlotCallToAction'

type StaticSlotDetailsProps = {
  slot: ReducedStaticSlot
  showCta?: boolean
}
export default function StaticSlotDetails({ slot, showCta }: StaticSlotDetailsProps) {
  const { t } = useTranslation([Domain.General, Domain.Email])

  return (
    <>
      <SlotImage size="large" imageGradient="vertical" />
      <Box p={2} px={3}>
        <Grid container direction="column">
          <SlotDetailsSection label="parking_description">
            <Typography variant="subtitle2">
              <Trans
                ns={Domain.General}
                i18nKey="contact_us_claim_space"
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
          </SlotDetailsSection>
          {showCta && (
            <Grid item>
              <StaticSlotCallToAction />
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  )
}
