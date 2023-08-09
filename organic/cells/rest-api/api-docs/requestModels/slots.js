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
    group: "Slot",
    model: "getSlots",
    description: "Get All Slots"
  },
  1: {
    body: {
      name: Joi.string().required(),
      ownerId: Joi.string().uuid({ version : 'uuidv4' }),
      vehicleSizeId: Joi.string().uuid({ version : 'uuidv4' }).required(),
      location: Joi.object()
                    .keys({
                      type: Joi.string()
                        .required()
                        .valid("Point"),
                      coordinates: Joi.array().ordered(
                        Joi.number()
                          .min(-180)
                          .max(180)
                          .required(),
                        Joi.number()
                          .min(-90)
                          .max(90)
                          .required()
                      )
                    })
                    .description("Please use this format [ longitude, latitude]")
    },
    model: "createSlot",
    group: "Slot",
    description: "Create slot and save details in database"
  },
  2: {
    query: {},
    path: {
      id: Joi.string().uuid({ version : 'uuidv4' }).required()
    }, // Define for api path param here.
    header: {}, // Define if header required.
    model: 'getSlotDetails',
    group: "Slot",
    description: "Get slot details"
  },
  3: {
    body: {
      name: Joi.string(),
      ownerId: Joi.string().uuid({ version : 'uuidv4' }),
      vehicleSizeId: Joi.string().uuid({ version : 'uuidv4' }),
      location: Joi.object()
                    .keys({
                      type: Joi.string()
                        .valid("Point"),
                      coordinates: Joi.array().ordered(
                        Joi.number()
                          .min(-180)
                          .max(180),
                        Joi.number()
                          .min(-90)
                          .max(90)
                      )
                    })
                    .description("Please use this format [ longitude, latitude]")
    },
    model: "updateSlot",
    group: "Slot",
    description: "Update Slot"
  },
  4: {
    excludeFromSwagger: false,
    query: {},
    path: {
      id: Joi.string().uuid({ version : 'uuidv4' }).required()
    }, // Define for api path param here.
    model: 'deleteSlot',
    group: "Slot",
    description: "Delete Slot"
  },
  5: {
    query: {},
    path: {
      id: Joi.string().uuid({ version : 'uuidv4' }).required()
    }, // Define for api path param here.
    header: {}, // Define if header required.
    model: 'slotAvailability',
    group: "Slot",
    description: "Get slot availability"
  },
  6: {
    query: {},
    path: {
      id: Joi.string().uuid({ version : 'uuidv4' }).required()
    }, // Define for api path param here.
    header: {}, // Define if header required.
    model: 'slotBookings',
    group: "Slot",
    description: "Get slot bookings"
  },
  7: {
    body: {
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      distance: Joi.number().integer().default(1000),
      nearest: Joi.boolean().default(false),
      startTime: Joi.date().greater('now').description("Please provide date-time rounded to 5 min intervals "),
      endTime: Joi.date().greater('now').description("Please provide date-time rounded to 5 min intervals "),
      includeBooked: Joi.boolean().default(false),
      totalLimit: Joi.number().integer().default(100),
      slotAmenities: Joi.array().items(Joi.string().uuid({ version : 'uuidv4' })),
      vehicleSizes: Joi.array().items(Joi.string().uuid({ version : 'uuidv4' })),
    },
    model: 'findSlots',
    group: "Slot",
    description: "Find Slots"
  },
  8: {
    body: {
      userId: Joi.string().uuid({ version : 'uuidv4' }),
      slotId: Joi.string().uuid({ version : 'uuidv4' }).required(),
      startTime: Joi.date().greater('now').required().description("Please provide date-time rounded to 5 min intervals "),
      endTime: Joi.date().greater('now').required().description("Please provide date-time rounded to 5 min intervals "),
      licensePlate: Joi.string(),
    },
    model: 'bookSlot',
    group: "Slot",
    description: "Book Slot"
  },
  9: {
    body: {
      slotIds: Joi.array().items(Joi.string().uuid({ version : 'uuidv4' })),
      startTime: Joi.date().description("Please provide date-time rounded to 5 min intervals "),
      endTime: Joi.date().description("Please provide date-time rounded to 5 min intervals "),
    },
    model: 'slotBookingTimes',
    group: "Slot",
    description: "Slot Booking times"
  },
  10: {
    body: {
      slotIds: Joi.array().items(Joi.string().uuid({ version : 'uuidv4' })),
      timetableStartTime: Joi.date().description("Please provide date-time rounded to 5 min intervals "),
      timetableendTime: Joi.date().description("Please provide date-time rounded to 5 min intervals "),
    },
    model: 'slotTimetable',
    group: "Slot",
    description: "Slot Timetable"
  },
}
