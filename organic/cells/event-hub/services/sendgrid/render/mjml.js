import mjml2html from 'mjml'

export default function renderMjml(templateString) {
  try {
    const result = mjml2html(templateString, { beautify: true })
    return result.html
  } catch (err) {
    console.log(err)
    return ''
  }
}
