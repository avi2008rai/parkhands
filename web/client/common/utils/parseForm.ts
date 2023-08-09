import { NextApiRequest } from 'next'
import { IncomingForm, Fields, Files } from 'formidable'

type FormProps<T, F> = {
  fields: T & Fields
  files: F & Files
}
export const parseForm = <T = Fields, F = Files>(req: NextApiRequest): Promise<FormProps<T, F>> => {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm()
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err)
      resolve({
        fields: fields as T & Fields,
        files: files as F & Files,
      })
    })
  })
}
