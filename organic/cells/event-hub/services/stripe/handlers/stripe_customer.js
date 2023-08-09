import dna from 'config'

async function handler(stripe, event, pg) {
  const { payload, event_key } = event
  const { user } = payload
  const { rows } = await pg.query(
    `
      SELECT customer_id FROM api.billing_profile
      WHERE user_id = $1;
    `,
    [user.id],
  )
  const customerId = rows[0].customer_id
  console.log(`User ID - ${user.id} already has billing_profile.customer_id - ${customerId}. Skipping customer creation.`)
  if (!customerId) {
    const customer = await stripe.customers.create(
      {
        name: user.name,
        email: user.email,
        phone: user.phone,
        metadata: {
          userId: user.id,
          role: user.role,
          createdBy: `event-hub: ${event_key}`,
        },
      },
      async (err, customer) => {
        console.log({ err, customer })
        if (err) {
          console.error(err)
          return
        }

        const { id } = customer
        try {
          console.log('Store Stripe Customer ID for User ID', {
            userId: user.id,
            customerId: customer.id,
          })

          // Store `customer.id` in `api.user.billing_profile.customer_id`
          const { err: pgError } = await pg.query(
            `
              UPDATE api.billing_profile
                SET customer_id = $1, customer_obj = $3
              WHERE user_id = $2;
            `,
            [customer.id, user.id, customer],
          )
          if (pgError) {
            throw pgError
          }
        } catch (error) {
          console.error(error)
        }
      },
    )
  }
}

export default function (moduleHolder) {
  moduleHolder['stripe_customer'] = handler
}
