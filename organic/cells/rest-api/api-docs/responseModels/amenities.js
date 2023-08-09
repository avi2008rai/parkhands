// The name of each response payload should be  model name defined in Request model schema and should sufix with ResponseModel.

module.exports = {
  getAmenities: {
    200: [{
      id: {
        type: 'string',
        format: 'uuid'
      },
      name: {
        type: 'string',
      },
      status: {
        type: 'string',
        enum: ['PUBLISHED', 'DRAFT']
      },
      description: {
        type: 'string',
      },
      weight: {
        type: 'integer',
      },
      createdAt: {
        type: 'string',
        format: 'date-time'
      },
      updatedAt: {
        type: 'string',
        format: 'date-time'
      },
    }],
    500: {
      error: "string"
    }
  },
  getAmenityDetails: {
    200: {
      id: {
        type: 'string',
        format: 'uuid'
      },
      name: {
        type: 'string',
      },
      status: {
        type: 'string',
        enum: ['PUBLISHED', 'DRAFT']
      },
      description: {
        type: 'string',
      },
      weight: {
        type: 'integer',
      },
      createdAt: {
        type: 'string',
        format: 'date-time'
      },
      updatedAt: {
        type: 'string',
        format: 'date-time'
      },
    },
    500: {
      error: {
        type: 'string'
      }
    }
  },
}
