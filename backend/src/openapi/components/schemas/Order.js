module.exports = {
    description: 'order data',
    type: 'object',
    properties: {
      detail: { type: 'string' },
      notes: { type: 'string' },
      products: { type: 'array' },
      status: { type: 'string' },
      basket: { type: 'object' },
      userId: {
        oneOf: [
          { type: 'string' },
          { type: 'number' }
        ],
      },
      numberId: { type: 'number' },
      total: { type: 'number' },
      createdAt: {
        oneOf: [
          { $ref: '#/components/schemas/Date' },
          { $ref: '#/components/schemas/DateTime' },
          { $ref: '#/components/schemas/Nullable' },
        ],
      },
      updatedAt: {
        oneOf: [
          { $ref: '#/components/schemas/Date' },
          { $ref: '#/components/schemas/DateTime' },
          { $ref: '#/components/schemas/Nullable' },
        ],
      },
      deletedAt: {
        oneOf: [
          { $ref: '#/components/schemas/Date' },
          { $ref: '#/components/schemas/DateTime' },
          { $ref: '#/components/schemas/Nullable' },
        ],
      },
      deleted: { type: 'boolean' },
      __v: { type: 'number' },
    },
  };
  