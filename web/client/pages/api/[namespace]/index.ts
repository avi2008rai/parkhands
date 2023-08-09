import _ from 'lodash'
import { ResourceKey } from 'i18next'
import { NextApiRequest, NextApiResponse } from 'next'

import { resources } from 'common/i18n/locale/resources'
import { apolloClientFromCtx } from 'common/utils/apolloClient'
import { TranslationsListDocument, TranslationsListQuery } from 'gql/schema'

type LocaleResponse =
  | ({
      __metadata: {
        lang: string | string[]
        namespace: string | string[]
        onlyLocal: boolean
      }
    } & ResourceKey)
  | {
      error: Error
    }

export default async (req: NextApiRequest, res: NextApiResponse<LocaleResponse>) => {
  const {
    query: { lang, namespace },
  } = req
  const localResources = _.get(resources, [lang as string, namespace as string])

  try {
    const client = apolloClientFromCtx({ req })
    const { data } = await client.query<TranslationsListQuery>({
      query: TranslationsListDocument,
      variables: { lang },
    })
    const remoteResources = _.reduce(
      data?.translations,
      // We need only `[key:string]:any` type
      (result: Exclude<ResourceKey, string>, record) => {
        result[record.key] = record.translation
        return result
      },
      {},
    )
    res.status(200).json({
      __metadata: { lang, namespace, onlyLocal: false },
      ...(localResources as object),
      ...(remoteResources as object),
    })
  } catch (error) {
    console.error({ error })
  }
  res.status(200).json({
    __metadata: { lang, namespace, onlyLocal: true },
    ...(localResources as object),
  })
}
