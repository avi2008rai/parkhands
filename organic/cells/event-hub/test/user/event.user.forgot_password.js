describe('Pg Event: user.forgot_password', function () {
  let test_super_admin,
    mutations = {}

  let pgPromise, plasmaPgPromise, plasmaQueuePromise, queueEvent
  let plasma = test.plasma

  const event_key = 'e:user.forgot_password'
  const handler_key = 'sendgrid_send_email'

  mutations['forgot-password'] = `mutation forgotPassword($payload: ForgotPasswordInputRecordInput!) {
      forgotPassword(input: { payload: $payload }) {
        boolean
      }
    }`

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

  before('Login Users', async () => {
    test_super_admin = await test.loginAs(test.credentials.test_super_admin)
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

  it('Should fire plasma queue event on user.forgot_password', async () => {
    await test
      .graphService()
      .send({
        query: mutations['forgot-password'],
        variables: {
          payload: {
            email: 'test_super_admin@parkhands.de',
          },
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
    queueEvent.payload.user.id.should.equal(test_super_admin.me.id)
    queueEvent.payload.user.email.should.equal(test_super_admin.me.email)
  })

  it('Execute handler: sendgrid_send_email', async () => {
    const service = test.services[queueEvent.service_key]
    const res = await service.request(queueEvent)
    res.to.should.equal(test_super_admin.me.email)
    res.subject.should.equal('Parkhands Account Password Reset 🔑')
  })
})
