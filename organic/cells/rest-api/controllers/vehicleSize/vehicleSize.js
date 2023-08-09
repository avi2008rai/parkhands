const graphQLRequest = require('lib/graphql-request')
const vehicleSizeGQL = require('./vehicleSize.gql')

/**
 * Get vehicleSizes from database.
 * @param  {Object} req request object
 * @param  {Object} res response object
 * @param  {Object} next next middleware function
 */
exports.getVehicleSizes = async (req, res, next) => {
  const query = vehicleSizeGQL.getVehicleSizes
	try {
		let results = await graphQLRequest(req, query)
    return res.status(200).json(results.vehicleSizesList)
  } catch (error) {
    next(error)
	}
}

/**
 * Get vehicleSize details based on id.
 * @param  {Object} req request object
 * @param  {Object} res response object
 * @param  {Object} next next middleware function
 */
exports.getVehicleSizeDetails = async (req, res, next) => {
  const query = vehicleSizeGQL.getVehicleSizeDetails(req.params.id)
	try {
    let results = await graphQLRequest(req, query)
    return res.status(200).json(results.vehicleSize)
  } catch (error) {
    next(error)
	}
}
