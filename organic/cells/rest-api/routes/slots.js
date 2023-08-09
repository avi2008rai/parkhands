const routes = require('express').Router()
const { validation } = require('swagger-generator-express')
const slotController = require('../controllers/slot/slot')
const requestModel = require('../api-docs/requestModels/slots')

routes.get('/slots', validation(requestModel[0]), slotController.getSlots)
routes.post('/slots', validation(requestModel[1]), slotController.createSlot)
routes.get('/slots/:id', validation(requestModel[2]), slotController.getSlotDetails)
routes.put('/slots/:id', validation(requestModel[3]), slotController.updateSlot)
routes.delete('/slots/:id', validation(requestModel[4]), slotController.deleteSlot)

routes.get('/slots/:id/availability', validation(requestModel[5]), slotController.slotAvailability)
routes.get('/slots/:id/bookings', validation(requestModel[6]), slotController.slotBookings)

routes.post('/slots/find', validation(requestModel[7]), slotController.findSlots)
routes.post('/slots/book', validation(requestModel[8]), slotController.bookSlot)
routes.post('/slots/bookingTimes', validation(requestModel[9]), slotController.slotBookingTimes)
routes.post('/slots/timetable', validation(requestModel[10]), slotController.slotTimetable)

module.exports = routes
