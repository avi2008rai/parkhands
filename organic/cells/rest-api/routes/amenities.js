const routes = require('express').Router()
const { validation } = require('swagger-generator-express')
const amenityController = require('../controllers/amenity/amenity')
const requestModel = require('../api-docs/requestModels/amenities')

routes.get('/amenities', validation(requestModel[0]), amenityController.getAmenities)
routes.get('/amenities/:id', validation(requestModel[1]), amenityController.getAmenityDetails)

module.exports = routes
