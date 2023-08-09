const graphQLRequest = require('lib/graphql-request')
const slotGQL = require('./slot.gql')

/**
 * Get slots from database.
 * @param  {Object} req request object
 * @param  {Object} res response object
 * @param  {Object} next next middleware function
 */
exports.getSlots = async (req, res, next) => {
  const query = slotGQL.getSlots
	try {
		let results = await graphQLRequest(req, query)
    return res.status(200).json(results.slotsList)
  } catch (error) {
    next(error)
	}
}

/**
 * Create slot and save data in database.
 * @param  {Object} req request object
 * @param  {Object} res response object
 * @param  {Object} next next middleware function
 */
exports.createSlot = async (req, res, next) => {
  const query = slotGQL.createSlot

  let variables = {
    payload: {
      slot: req.body
    }
  }

	try {
    let results = await graphQLRequest(req, query, variables)
    return res.status(201).json(results.createSlot.slot)
	} catch (error) {
    next(error)
	}
}

/**
 * Get slot details based on id.
 * @param  {Object} req request object
 * @param  {Object} res response object
 * @param  {Object} next next middleware function
 */
exports.getSlotDetails = async (req, res, next) => {
  const query = slotGQL.getSlotDetails(req.params.id)
	try {
    let results = await graphQLRequest(req, query)
    return res.status(200).json(results.slot)
  } catch (error) {
    next(error)
	}
}

/**
 * Update slot details
 * @param  {Object} req request object
 * @param  {Object} res response object
 * @param  {Object} next next middleware function
 */
exports.updateSlot = async (req, res, next) => {
  const query = slotGQL.updateSlot

  let variables = {
    id: req.params.id,
    patch: req.body
  }

	try {
		let results = await graphQLRequest(req, query, variables)
    return res.status(200).json(results.updateSlot.slot)
  } catch (error) {
    next(error)
	}
}

/**
 * Delete slot information.
 * @param  {Object} req request object
 * @param  {Object} res response object
 * @param  {Object} next next middleware function
 */
exports.deleteSlot = async (req, res, next) => {
  const query = slotGQL.deleteSlot

  let variables = {
    id: req.params.id
  }

	try {
    let results = await graphQLRequest(req, query, variables)
    return res.status(200).json(results.deleteSlot.slot)
  } catch (error) {
    next(error)
	}
}

/**
 * Slot availability.
 * @param  {Object} req request object
 * @param  {Object} res response object
 * @param  {Object} next next middleware function
 */
exports.slotAvailability = async (req, res, next) => {
  const query = slotGQL.slotAvailability(req.params.id)
	try {
    let results = await graphQLRequest(req, query)
    return res.status(200).json(results.slotAvailabilitiesList)
	} catch (error) {
		next(error)
	}
}

/**
 * Slot bookings.
 * @param  {Object} req request object
 * @param  {Object} res response object
 * @param  {Object} next next middleware function
 */
exports.slotBookings = async (req, res, next) => {
  const query = slotGQL.slotBookings(req.params.id)
	try {
    let results = await graphQLRequest(req, query)
    return res.status(200).json(results.slotBookingsList)
	} catch (error) {
		next(error)
	}
}

/**
 * Find Slots.
 * @param  {Object} req request object
 * @param  {Object} res response object
 * @param  {Object} next next middleware function
 */
exports.findSlots = async (req, res, next) => {
  const query = slotGQL.findSlots

  let variables = {
    payload: req.body
  }

	try {
    let results = await graphQLRequest(req, query, variables)
    return res.status(200).json(results.findSlots.nodes)
	} catch (error) {
		next(error)
	}
}

/**
 * Book Slot.
 * @param  {Object} req request object
 * @param  {Object} res response object
 * @param  {Object} next next middleware function
 */
exports.bookSlot = async (req, res, next) => {
  const query = slotGQL.bookSlot

  let variables = {
    payload: req.body
  }

	try {
    let results = await graphQLRequest(req, query, variables)
    return res.status(200).json(results.bookSlot.slotBooking)
	} catch (error) {
		next(error)
	}
}

/**
 * Slot Booking times.
 * @param  {Object} req request object
 * @param  {Object} res response object
 * @param  {Object} next next middleware function
 */
exports.slotBookingTimes = async (req, res, next) => {
  const query = slotGQL.slotBookingTimes

  let variables = {
    payload: req.body
  }

	try {
    let results = await graphQLRequest(req, query, variables)
    return res.status(200).json(results.slotBookingTimesList)
	} catch (error) {
		next(error)
	}
}

/**
 * Slot Timetable.
 * @param  {Object} req request object
 * @param  {Object} res response object
 * @param  {Object} next next middleware function
 */
exports.slotTimetable = async (req, res, next) => {
  const query = slotGQL.slotTimetable

  let variables = req.body
	try {
    let results = await graphQLRequest(req, query, variables)
    return res.status(200).json(results.slotTimetableList)
	} catch (error) {
		next(error)
	}
}
