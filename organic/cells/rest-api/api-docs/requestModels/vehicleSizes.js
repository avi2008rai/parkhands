const Joi = require("@hapi/joi")
/**
 * File name for request and response model should be same as router file.
 * Define request model with there order in router js.
 * For example first api in slot router is create slot so we define schema with key 0.
 */
module.exports = {
  // Here 0 is the order of api route file.
  0: {
    query: {},
    path: {}, // Define for api path param here.
    header: {}, // Define if header required.
    group: "VehicleSize",
    model: "getVehicleSizes",
    description: "Get All Vehicle Sizes"
  },
  1: {
    query: {},
    path: {
      id: Joi.string().uuid({ version : 'uuidv4' }).required()
    }, // Define for api path param here.
    header: {}, // Define if header required.
    model: 'getVehicleSizeDetails',
    group: "VehicleSize",
    description: "Get vehicle size details"
  },
}
