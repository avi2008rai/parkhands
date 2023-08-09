const routes = require('express').Router()
const { validation } = require('swagger-generator-express')
const vehicleSizeController = require('../controllers/vehicleSize/vehicleSize')
const requestModel = require('../api-docs/requestModels/vehicleSizes')

routes.get('/vehicleSizes', validation(requestModel[0]), vehicleSizeController.getVehicleSizes)
routes.get('/vehicleSizes/:id', validation(requestModel[1]), vehicleSizeController.getVehicleSizeDetails)

module.exports = routes
