import path from 'path'
import dna from 'config'
import nodemailer from 'nodemailer'
import nodemailerSendgrid from 'nodemailer-sendgrid'

import loader from 'lib/loader'

const moduleHolder = {}

class SendGridApi {
  constructor({ plasma }) {
    this.transport = {}
    loader(path.join(__dirname, 'handlers'), moduleHolder)
  }

  connect() {
    // create Nodemailer SendGrid transport
    this.transport = nodemailer.createTransport(
      nodemailerSendgrid({
        apiKey: dna.get('sendgrid.api_key'),
      }),
    )
  }

  async request(event) {
    // dynamically invoke event
    const eventHandler = moduleHolder[event.handler_key]
    return await eventHandler(this.transport, event)
  }
}

export default ({ plasma }) => {
  const sendgrid = new SendGridApi({ plasma })
  sendgrid.connect()
  plasma.store({ type: 'sendgrid-ready', sendgrid })
  return sendgrid
}
