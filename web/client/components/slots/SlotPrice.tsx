import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Domain } from 'common/i18n'

type SlotPriceProps = {
  pricePerHour: string
}

export default function SlotPrice({ pricePerHour }: SlotPriceProps) {
  const { t } = useTranslation(Domain.General)

  const parsedPricePerHour = useMemo(() => {
    return parseFloat(pricePerHour)
  }, [pricePerHour])

  return <>{parsedPricePerHour > 0 ? t('price_hour', { price: parsedPricePerHour }) : t('free')}</>
}
