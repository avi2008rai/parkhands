const graphQLRequest = require('lib/graphql-request')
const userGQL = require('./user.gql')

/**
 * Get users from database.
 * @param  {Object} req request object
 * @param  {Object} res response object
 * @param  {Object} next next middleware function
 */
exports.getUsers = async (req, res, next) => {
  const query = userGQL.getUsers
	try {
		let results = await graphQLRequest(req, query)
    return res.status(200).json(results.usersList)
	} catch (error) {
		next(error)
	}
}

/**
 * Create user and save data in database.
 * @param  {Object} req request object
 * @param  {Object} res response object
 * @param  {Object} next next middleware function
 */
exports.createUser = async (req, res, next) => {
  const query = userGQL.createUser

  let variables = {
    payload: req.body
  }

	try {
    let results = await graphQLRequest(req, query, variables)
    return res.status(201).json(results.createUser.user)
	} catch (error) {
		next(error)
	}
}

/**
 * Get user details based on id.
 * @param  {Object} req request object
 * @param  {Object} res response object
 * @param  {Object} next next middleware function
 */
exports.getUserDetails = async (req, res, next) => {
  const query = userGQL.getUserDetails(req.params.id)
	try {
    let results = await graphQLRequest(req, query)
    return res.status(200).json(results.user)
	} catch (error) {
		next(error)
	}
}

/**
 * Update user details
 * @param  {Object} req request object
 * @param  {Object} res response object
 * @param  {Object} next next middleware function
 */
exports.updateUser = async (req, res, next) => {
  const query = userGQL.updateUser

  let variables = {
    payload: req.body
  }
  // attach id from params
  variables.payload.id = req.params.id

	try {
		let results = await graphQLRequest(req, query, variables)
    return res.status(200).json(results.updateUser.user)
	} catch (error) {
		next(error)
	}
}

/**
 * Delete user information.
 * @param  {Object} req request object
 * @param  {Object} res response object
 * @param  {Object} next next middleware function
 */
exports.deleteUser = async (req, res, next) => {
  const query = userGQL.deleteUser

  let variables = {
    id: req.params.id
  }

	try {
    let results = await graphQLRequest(req, query, variables)
    return res.status(200).json(results)
	} catch (error) {
		next(error)
	}
}
