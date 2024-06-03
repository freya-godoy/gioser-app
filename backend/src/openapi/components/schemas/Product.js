module.exports = {
    description: 'product data',
    type: 'object',
    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
      coverImage: { type: 'string' },
      type: { type: 'string' },
      category: { type: 'string' },
      status: { type: 'string' },
      price: { type: 'number' },
      shortDescription: { type: 'string' },
      extraData: { type: 'string' },
      additionalData: { type: 'object' },
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
  