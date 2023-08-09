import fs from 'fs'
import handlebars from 'handlebars'

export default function renderHbs(templateString, data) {
  try {
    const template = handlebars.compile(templateString, { noEscape: true })
    return template(data)
  } catch (err) {
    console.log(err)
  }
}
