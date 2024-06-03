module.exports = {
  '/api/order/{_id}': {
    get: {
      security: [{ bearerAuth: [] }],
      operationId: 'getOrder',
      description: 'Returns a order',
      parameters: [
        {
          in: 'header',
          name: 'appToken',
          schema: { type: 'string' },
          required: true
        },
        {
          in: 'header',
          name: 'accessing',
          schema: { type: 'string' },
          required: true
        },
        {
          in: 'path',
          name: '_id',
          description: 'Id that refers to one order',
          schema: { type: 'string' },
          required: true
        }
      ],
      responses: {
        200: {
          description: 'Get order',
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Order' } } }
        },
        404: {
          description: 'Order not found',
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } }
        },
        default: {
          description: 'Error',
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } }
        }
      }
    },
    put: {
      security: [{ bearerAuth: [] }],
      operationId: 'updateOrder',
      description: 'Updates a order',
      parameters: [
        {
          in: 'header',
          name: 'appToken',
          schema: { type: 'string' },
          required: true
        },
        {
          in: 'header',
          name: 'accessing',
          schema: { type: 'string' },
          required: true
        },
        {
          in: 'path',
          name: '_id',
          description: 'Id which refers to one order',
          schema: { type: 'string' },
          required: true
        }
      ],
      requestBody: {
        description: 'Current order update',
        required: true,
        content: { 'application/json': { schema: { $ref: '#/components/schemas/Order' } } }
      },
      responses: {
        200: {
          description: 'Order updated',
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Order' } } }
        },
        404: {
          description: 'Order not found',
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } }
        },
        default: {
          description: 'Error',
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } }
        }
      }
    },
    delete: {
      security: [{ bearerAuth: [] }],
      operationId: 'deleteOrder',
      description: 'Deletes a order',
      parameters: [
        {
          in: 'header',
          name: 'appToken',
          schema: { type: 'string' },
          required: true
        },
        {
          in: 'header',
          name: 'accessing',
          schema: { type: 'string' },
          required: true
        },
        {
          in: 'path',
          name: '_id',
          description: 'Id which refers to one order',
          schema: { type: 'string' },
          required: true
        }
      ],
      responses: {
        204: {
          description: 'Delete succeeded',
          content: {}
        },
        404: {
          description: 'Order not found',
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } }
        },
        default: {
          description: 'Error',
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } }
        }
      }
    }
  },
  '/api/order': {
    get: {
      security: [{ bearerAuth: [] }],
      operationId: 'fetchOrders',
      description: 'Return list of orders',
      parameters: [
        {
          in: 'header',
          name: 'appToken',
          schema: { type: 'string' },
          required: true
        },
        {
          in: 'header',
          name: 'accessing',
          schema: { type: 'string' },
          required: true
        },
        {
          in: 'query',
          name: 'term',
          schema: { type: 'string' }
        },
        {
          in: 'query',
          name: 'name',
          schema: { type: 'string' }
        },
        {
          in: 'query',
          name: 'deleted',
          schema: {
            type: 'boolean',
            default: false
          }
        }
      ],
      responses: {
        200: {
          description: 'Success',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  documents: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Order' }
                  },
                  total: { type: 'integer' }
                }
              }
            }
          }
        },
        404: {
          description: 'Orders not found',
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } }
        },
        default: {
          description: 'Error',
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } }
        }
      }
    },
    post: {
      security: [{ bearerAuth: [] }],
      operationId: 'createOrder',
      description: 'Creates a order',
      parameters: [
        {
          in: 'header',
          name: 'appToken',
          schema: { type: 'string' },
          required: true
        },
        {
          in: 'header',
          name: 'accessing',
          schema: { type: 'string' },
          required: true
        }
      ],
      requestBody: {
        description: 'Order data',
        required: true,
        content: { 'application/json': { schema: { $ref: '#/components/schemas/Order' } } }
      },
      responses: {
        201: {
          description: 'Order created',
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Order' } } }
        },
        default: {
          description: 'Error',
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } }
        }
      }
    }
  }
};
