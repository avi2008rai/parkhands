import { NextApiRequest, NextApiResponse } from 'next'
import { apolloClientFromCtx } from 'common/utils/apolloClient'
import { CreateTranslationDocument, CreateTranslationMutation } from 'gql/schema'

type CreateTranslationResponse =
  | {
      lang: string | string[]
      namespace: string | string[]
    }
  | {
      error: Error
    }

export default async (req: NextApiRequest, res: NextApiResponse<CreateTranslationResponse>) => {
  const {
    query: { lang, namespace },
    body,
  } = req

  console.log('Received', { lang, namespace }, req.body)

  try {
    const client = apolloClientFromCtx({ req })
    const input = JSON.parse(body)
    const { data } = await client.mutate<CreateTranslationMutation>({
      mutation: CreateTranslationDocument,
      variables: {
        payload: {
          translation: {
            lang,
            namespace,
            key: Object.keys(input)[0],
            translation: Object.values(input)[0],
          },
        },
      },
    })
    const response = data && data.createTranslation?.translation
    console.log(response)
    res.status(200).json({ lang, namespace })
  } catch (error) {
    console.error({ error })
    res.status(400).json({ error })
  }
}
