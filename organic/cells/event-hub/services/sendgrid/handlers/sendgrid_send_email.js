import fs from 'fs'
import dna from 'config'
import h2p from 'html2plaintext'
import renderMjml from '../render/mjml'
import renderHbs from '../render/hbs'
import templatesMap from '../templates/templatesMap'

async function handler(transporter, event) {
  const { payload, event_key } = event
  const template = templatesMap[event_key]

  const templateString = fs.readFileSync(`./services/sendgrid/templates/${event_key}.mjml`, 'utf8')
  const emailTemplate = renderHbs(templateString, template.transformData(payload))
  const emailResult = renderMjml(emailTemplate)

  const email = {
    from: `Parkhands <${dna.get('sendgrid.from_addr')}>`,
    to: payload.user.email,
    subject: template.subject,
    text: h2p(emailResult),
    html: emailResult,
  }

  if (process.env.NODE_ENV === 'development') {
    // console.log(email) // For debug purposes
    // in develop it should log the activation token/link/email:body
    if (dna.get('sendgrid.send_from_dev')) {
      console.log('Send email in dev mode')
      await transporter.sendMail(email)
    } else {
      console.log('Skip email sending in dev mode')
    }
    return email.subject
  } else if (process.env.NODE_ENV === 'test') {
    return email
  } else {
    console.log('Sending email')
    return await transporter.sendMail(email)
  }
}

export default function (moduleHolder) {
  moduleHolder['sendgrid_send_email'] = handler
}
