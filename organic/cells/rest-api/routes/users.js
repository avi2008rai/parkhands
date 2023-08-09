const routes = require('express').Router()
const { validation } = require('swagger-generator-express')
const userController = require('../controllers/user/user')
const requestModel = require('../api-docs/requestModels/users')

routes.get('/users', validation(requestModel[0]), userController.getUsers)
routes.post('/users', validation(requestModel[1]), userController.createUser)
routes.get('/users/:id', validation(requestModel[2]), userController.getUserDetails)
routes.put('/users/:id', validation(requestModel[3]), userController.updateUser)
routes.delete('/users/:id', validation(requestModel[4]), userController.deleteUser)

module.exports = routes
