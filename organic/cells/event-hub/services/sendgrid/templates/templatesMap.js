import filter from 'lib/filter'

const siteUrl = process.env.CLIENT_URL
const logoUrl =
  'http://cdn.mcauto-images-production.sendgrid.net/ca9361e622127f38/a4f2c915-b128-42a9-bfc9-813628f12f75/512x77.png'

const commonVars = { logoUrl, siteUrl }

export default {
  'user.insert': {
    subject: 'Welcome to Parkhands 👋',
    transformData: (payload) => ({
      ...commonVars,
      name: filter.extractFirstName(payload.user.name),
      activationLink: `${siteUrl}/activation?token=${payload.activation_token}`,
    }),
  },
  'user.forgot_password': {
    subject: 'Parkhands Account Password Reset 🔑',
    transformData: (payload) => ({
      ...commonVars,
      name: filter.extractFirstName(payload.user.name),
      resetPasswordLink: `${siteUrl}/reset-password?token=${payload.forgot_password_token}`,
    }),
  },
  'user.resend_activation_email': {
    subject: 'Confirm your email ✉️',
    transformData: (payload) => ({
      ...commonVars,
      name: filter.extractFirstName(payload.user.name),
      activationLink: `${siteUrl}/activation?token=${payload.activation_token}`,
    }),
  },
}
