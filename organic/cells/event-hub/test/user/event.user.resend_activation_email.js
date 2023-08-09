describe('Pg Event: user.resend_activation_email', function () {
  let test_super_admin,
    queries = {}

  let pgPromise, plasmaPgPromise, plasmaQueuePromise, queueEvent
  let plasma = test.plasma
  let user_email = 'is_this_real_email@fakiefake.org'

  const event_key = 'e:user.resend_activation_email'
  const handler_key = 'sendgrid_send_email'

  queries['resend_activation_email'] = `
    mutation resendActivationEmail($requested_email: Email!) {
      resendActivationEmail(input: { requestedEmail: $requested_email }) {
        success: boolean
      }
    }
    `

  before('Prepare cell', (done) => {
    test.plasma.once(
      ['pg-ready', 'queue-ready', 'services-ready', 'event-transmitter-ready'],
      ({ pg }, { queue }, { services }, {}) => {
        test.pg = pg
        test.queue = queue
        test.services = services
        done()
      },
    )
  })

  before('Reset DB', async () => {
    await test.pgService.reset()
  })

  before('Prepare User for resend_activation_email', async () => {
    await test.pg.query(`
      INSERT INTO api.user (
        id,
        name,
        email,
        status,
        role
      ) VALUES (
        '57a16572-786b-4c07-a6f2-6dde5a177f55',
        'Is this_real_name',
        '${user_email}',
        'pending',
        'app_single_member'
      )
    `)
  })

  before('Prepare promises', async () => {
    pgPromise = new Promise(function (resolve) {
      test.pg.on('notification', function (data) {
        resolve(data)
      })
    })

    plasmaPgPromise = new Promise(function (resolve) {
      plasma.on([`pg:${event_key}`], ({ event }) => {
        resolve(event)
      })
    })

    plasmaQueuePromise = new Promise(function (resolve) {
      plasma.on([`queue:${handler_key}`], ({ event }) => {
        resolve(event)
      })
    })
  })

  it('Should fire plasma queue event on user.resend_activation_email', async () => {
    await test
      .graphService()
      .send({
        query: queries['resend_activation_email'],
        variables: {
          requested_email: user_email,
        },
      })
      .then((r) => {
        return r.body
      })

    // on pg notify event
    const data = await pgPromise
    data.channel.should.equal(event_key)

    // on plasma pg event
    const pgEvent = await plasmaPgPromise
    pgEvent.channel.should.equal(event_key)

    // on plasma queue event
    queueEvent = await plasmaQueuePromise

    queueEvent.event_key.should.equal(event_key.slice(2))
    queueEvent.handler_key.should.equal(handler_key)
    queueEvent.payload.user.email.should.equal(user_email)
  })

  it('Execute handler: sendgrid_send_email', async () => {
    const service = test.services[queueEvent.service_key]
    const res = await service.request(queueEvent)

    res.to.should.equal(user_email)
    res.subject.should.equal('Confirm your email ✉️')
  })
})
