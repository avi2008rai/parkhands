const graphQLRequest = require('lib/graphql-request')
const amenityGQL = require('./amenity.gql')

/**
 * Get amenities from database.
 * @param  {Object} req request object
 * @param  {Object} res response object
 * @param  {Object} next next middleware function
 */
exports.getAmenities = async (req, res, next) => {
  const query = amenityGQL.getAmenities
	try {
		let results = await graphQLRequest(req, query)
    return res.status(200).json(results.amenitiesList)
  } catch (error) {
    next(error)
	}
}

/**
 * Get amenity details based on id.
 * @param  {Object} req request object
 * @param  {Object} res response object
 * @param  {Object} next next middleware function
 */
exports.getAmenityDetails = async (req, res, next) => {
  const query = amenityGQL.getAmenityDetails(req.params.id)
	try {
    let results = await graphQLRequest(req, query)
    return res.status(200).json(results.amenity)
  } catch (error) {
    next(error)
	}
}
