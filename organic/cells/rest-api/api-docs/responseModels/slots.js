// The name of each response payload should be  model name defined in Request model schema and should sufix with ResponseModel.

module.exports = {
  getSlots: {
    200: [{
      id: {
        type: 'string',
        format: 'uuid'
      },
      name: {
        type: 'string',
      },
      ownerId: {
        type: 'string',
        format: 'uuid'
      },
      vehicleSizeId: {
        type: 'string',
        format: 'uuid'
      },
      address: {
        type: 'object',
      },
      pricePerHour: {
        type: 'number',
      },
      status: {
        type: 'string',
        enum: ['ENABLED', 'DISABLED']
      },
      photoUrl: {
        type: 'string',
      },
      description: {
        type: 'string',
      },
      notes: {
        type: 'string',
      },
      location: {
        type: 'object',
        properties: {
          geojson: {
            type: 'object',
            properties: {
              type: {
                type: 'string',
                enum: ['Point']
              },
              coordinates: {
                type: 'array',
                items: {
                  type: 'number'
                },
                minItems: 2,
                maxItems: 2,
              },
            }
          }
        }
      },
      slotAmenitiesList: {
        type: 'array',
        items: {
          type: 'object'
        },
      },
      slug: {
        type: 'string'
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
  createSlot: {
    201: {
      id: {
        type: 'string',
        format: 'uuid'
      },
      name: {
        type: 'string',
      },
      ownerId: {
        type: 'string',
        format: 'uuid'
      },
      vehicleSizeId: {
        type: 'string',
        format: 'uuid'
      },
      address: {
        type: 'object',
      },
      pricePerHour: {
        type: 'number',
      },
      status: {
        type: 'string',
        enum: ['ENABLED', 'DISABLED']
      },
      photoUrl: {
        type: 'string',
      },
      description: {
        type: 'string',
      },
      notes: {
        type: 'string',
      },
      location: {
        type: 'object',
        properties: {
          geojson: {
            type: 'object',
            properties: {
              type: {
                type: 'string',
                enum: ['Point']
              },
              coordinates: {
                type: 'array',
                items: {
                  type: 'number'
                },
                minItems: 2,
                maxItems: 2,
              },
            }
          }
        }
      },
      slotAmenitiesList: {
        type: 'array',
        items: {
          type: 'object'
        },
      },
      slug: {
        type: 'string'
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
    401: {
      error: {
        type: 'string'
      }
    },
    500: {
      error: {
        type: 'string'
      }
    }
  },
  getSlotDetails: {
    200: {
      id: {
        type: 'string',
        format: 'uuid'
      },
      name: {
        type: 'string',
      },
      ownerId: {
        type: 'string',
        format: 'uuid'
      },
      vehicleSizeId: {
        type: 'string',
        format: 'uuid'
      },
      address: {
        type: 'object',
      },
      pricePerHour: {
        type: 'number',
      },
      status: {
        type: 'string',
        enum: ['ENABLED', 'DISABLED']
      },
      photoUrl: {
        type: 'string',
      },
      description: {
        type: 'string',
      },
      notes: {
        type: 'string',
      },
      location: {
        type: 'object',
        properties: {
          geojson: {
            type: 'object',
            properties: {
              type: {
                type: 'string',
                enum: ['Point']
              },
              coordinates: {
                type: 'array',
                items: {
                  type: 'number'
                },
                minItems: 2,
                maxItems: 2,
              },
            }
          }
        }
      },
      slotAmenitiesList: {
        type: 'array',
        items: {
          type: 'object'
        },
      },
      slug: {
        type: 'string'
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
  updateSlot: {
    200: {
      id: {
        type: 'string',
        format: 'uuid'
      },
      name: {
        type: 'string',
      },
      ownerId: {
        type: 'string',
        format: 'uuid'
      },
      vehicleSizeId: {
        type: 'string',
        format: 'uuid'
      },
      address: {
        type: 'object',
      },
      pricePerHour: {
        type: 'number',
      },
      status: {
        type: 'string',
        enum: ['ENABLED', 'DISABLED']
      },
      photoUrl: {
        type: 'string',
      },
      description: {
        type: 'string',
      },
      notes: {
        type: 'string',
      },
      location: {
        type: 'object',
        properties: {
          geojson: {
            type: 'object',
            properties: {
              type: {
                type: 'string',
                enum: ['Point']
              },
              coordinates: {
                type: 'array',
                items: {
                  type: 'number'
                },
                minItems: 2,
                maxItems: 2,
              },
            }
          }
        }
      },
      slotAmenitiesList: {
        type: 'array',
        items: {
          type: 'object'
        },
      },
      slug: {
        type: 'string'
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
    401: {
      error: {
        type: 'string'
      }
    },
    500: {
      error: {
        type: 'string'
      }
    }
  },
  deleteSlot: {
    200: {
      id: {
        type: 'string',
        format: 'uuid'
      },
    },
    401: {
      error: {
        type: 'string'
      }
    },
    500: {
      error: {
        type: 'string'
      }
    }
  },
  slotAvailability: {
    200: [{
      id: {
        type: 'string',
        format: 'uuid'
      },
      slotId: {
        type: 'string',
        format: 'uuid'
      },
      dayOfWeek: {
        type: 'number',
      },
      startHour: {
        type: 'string',
        format: 'date-time'
      },
      endHour: {
        type: 'string',
        format: 'date-time'
      },
      createdAt: {
        type: 'string',
        format: 'date-time'
      },
    }],
    500: {
      error: "string"
    }
  },
  slotBookings: {
    200: [{
      id: {
        type: 'string',
        format: 'uuid'
      },
      slotId: {
        type: 'string',
        format: 'uuid'
      },
      userId: {
        type: 'string',
        format: 'uuid'
      },
      status: {
        type: 'string',
        enum: ['PENDING', 'RESERVED', 'CANCELED']
      },
      licensePlate: {
        type: 'string',
      },
      startTime: {
        type: 'string',
        format: 'date-time'
      },
      endTime: {
        type: 'string',
        format: 'date-time'
      },
      createdAt: {
        type: 'string',
        format: 'date-time'
      },
    }],
    500: {
      error: "string"
    }
  },
  findSlots: {
    200: [{
      id: {
        type: 'string',
        format: 'uuid'
      },
      name: {
        type: 'string',
      },
      ownerId: {
        type: 'string',
        format: 'uuid'
      },
      vehicleSizeId: {
        type: 'string',
        format: 'uuid'
      },
      address: {
        type: 'object',
      },
      pricePerHour: {
        type: 'number',
      },
      status: {
        type: 'string',
        enum: ['ENABLED', 'DISABLED']
      },
      photoUrl: {
        type: 'string',
      },
      description: {
        type: 'string',
      },
      notes: {
        type: 'string',
      },
      location: {
        type: 'object',
        properties: {
          geojson: {
            type: 'object',
            properties: {
              type: {
                type: 'string',
                enum: ['Point']
              },
              coordinates: {
                type: 'array',
                items: {
                  type: 'number'
                },
                minItems: 2,
                maxItems: 2,
              },
            }
          }
        }
      },
      slug: {
        type: 'string'
      },
      distance: {
        type: 'integer'
      },
      booked: {
        type: 'boolean'
      },
      amenities: {
        type: 'array',
        items: {
          type: 'object'
        },
      },
      vehicleSize: {
        type: 'array',
        items: {
          type: 'object'
        },
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
  bookSlot: {
    200: {
      id: {
        type: 'string',
        format: 'uuid'
      },
      slotId: {
        type: 'string',
        format: 'uuid'
      },
      userId: {
        type: 'string',
        format: 'uuid'
      },
      status: {
        type: 'string',
        enum: ['PENDING', 'RESERVED', 'CANCELED']
      },
      licensePlate: {
        type: 'string',
      },
      startTime: {
        type: 'string',
        format: 'date-time'
      },
      endTime: {
        type: 'string',
        format: 'date-time'
      },
      createdAt: {
        type: 'string',
        format: 'date-time'
      },
    },
    500: {
      error: "string"
    }
  },
  slotBookingTimes: {
    200: [{
      slotId: {
        type: 'string',
        format: 'uuid'
      },
      startTime: {
        type: 'string',
        format: 'date-time'
      },
      endTime: {
        type: 'string',
        format: 'date-time'
      },
    }],
    500: {
      error: "string"
    }
  },
  slotTimetable: {
    200: [{
      slotId: {
        type: 'string',
        format: 'uuid'
      },
      startTime: {
        type: 'string',
        format: 'date-time'
      },
      endTime: {
        type: 'string',
        format: 'date-time'
      },
      timetableDate: {
        type: 'string',
        format: 'date'
      },
      dayOfWeek: {
        type: 'number',
      },
      booked: {
        type: 'boolean'
      },
    }],
    500: {
      error: "string"
    }
  },
}
