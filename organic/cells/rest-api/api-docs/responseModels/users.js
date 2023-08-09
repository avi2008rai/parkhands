// The name of each response payload should be  model name defined in Request model schema and should sufix with ResponseModel.

module.exports = {
  getUsers: {
    200: [{
      id: {
        type: 'string',
        format: 'uuid'
      },
      name: {
        type: 'string',
      },
      email: {
        type: 'string',
        format: 'email'
      },
      status: {
        type: 'string',
      },
      role: {
        type: 'string',
      },
      photoUrl: {
        type: 'string',
      },
      phone: {
        type: 'string'
      },
      address: {
        type: 'string'
      },
      createdAt: {
        type: 'string',
        format: 'date-time'
      },
      updatedAt: {
        type: 'string',
        format: 'date-time'
      }
    }],
    500: {
      error: "string"
    }
  },
  createUser: {
    201: {
      id: {
        type: 'string',
        format: 'uuid'
      },
      name: {
        type: 'string',
      },
      email: {
        type: 'string',
        format: 'email'
      },
      status: {
        type: 'string',
      },
      role: {
        type: 'string',
      },
      photoUrl: {
        type: 'string',
      },
      phone: {
        type: 'string'
      },
      address: {
        type: 'string'
      },
      createdAt: {
        type: 'string',
        format: 'date-time'
      },
      updatedAt: {
        type: 'string',
        format: 'date-time'
      }
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
  getUserDetails: {
    200: {
      id: {
        type: 'string',
        format: 'uuid'
      },
      name: {
        type: 'string',
      },
      email: {
        type: 'string',
        format: 'email'
      },
      status: {
        type: 'string',
      },
      role: {
        type: 'string',
      },
      photoUrl: {
        type: 'string',
      },
      phone: {
        type: 'string'
      },
      address: {
        type: 'string'
      },
      createdAt: {
        type: 'string',
        format: 'date-time'
      },
      updatedAt: {
        type: 'string',
        format: 'date-time'
      }
    },
    500: {
      error: {
        type: 'string'
      }
    }
  },
  updateUser: {
    200: {
      id: {
        type: 'string',
        format: 'uuid'
      },
      name: {
        type: 'string',
      },
      email: {
        type: 'string',
        format: 'email'
      },
      status: {
        type: 'string',
      },
      role: {
        type: 'string',
      },
      photoUrl: {
        type: 'string',
      },
      phone: {
        type: 'string'
      },
      address: {
        type: 'string'
      },
      createdAt: {
        type: 'string',
        format: 'date-time'
      },
      updatedAt: {
        type: 'string',
        format: 'date-time'
      }
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
  deleteUser: {
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
}
