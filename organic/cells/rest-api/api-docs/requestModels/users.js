const Joi = require("@hapi/joi")
/**
 * File name for request and response model should be same as router file.
 * Define request model with there order in router js.
 * For example first api in user router is create user so we define schema with key 0.
 */
module.exports = {
  // Here 0 is the order of api route file.
  0: {
    query: {},
    path: {}, // Define for api path param here.
    header: {}, // Define if header required.
    group: "User",
    model: "getUsers",
    description: "Get All Users"
  },
  1: {
    body: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string(),
      phone: Joi.string(),
      licensePlate: Joi.string()
    },
    model: "createUser",
    group: "User",
    description: "Create user and save details in database"
  },
  2: {
    query: {},
    path: {
      id: Joi.string().uuid({ version : 'uuidv4' }).required()
    }, // Define for api path param here.
    header: {}, // Define if header required.
    model: 'getUserDetails',
    group: "User",
    description: "Get user details"
  },
  3: {
    body: {
      name: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string(),
      phone: Joi.string(),
      licensePlate: Joi.string()
    },
    model: "updateUser",
    group: "User",
    description: "Update User"
  },
  4: {
    excludeFromSwagger: false,
    query: {},
    path: {
      id: Joi.string().uuid({ version : 'uuidv4' }).required()
    }, // Define for api path param here.
    model: 'deleteUser',
    group: "User",
    description: "Delete User"
  },
}
