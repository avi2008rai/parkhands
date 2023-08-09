// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore TS7016
import ComponentTestSetup from 'cypress-react-unit-test/plugins/react-scripts'

/**
 * @type {Cypress.PluginConfig}
 * @param `on` is used to hook into various events Cypress emits
 * @param `config` is the resolved Cypress config
 */
const plugins: Cypress.PluginConfig = (on, config) => {
  config.env = config.env || {}

  // https://github.com/bahmutov/cypress-react-unit-test
  ComponentTestSetup(on, config)

  // config.env.ADMIN_URL = process.env.ADMIN_URL
  return config
}
export default plugins
