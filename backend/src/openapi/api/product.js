module.exports = {
    '/api/product/{_id}': {
      get: {
        security: [{ bearerAuth: [] }],
        operationId: 'getProduct',
        description: 'Returns an product',
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
            description: 'Id that refers to one product',
            schema: { type: 'string' },
            required: true
          }
        ],
        responses: {
          200: {
            description: 'Get product',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Product' } } }
          },
          404: {
            description: 'Product not found',
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
        operationId: 'updateProduct',
        description: 'Updates an product',
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
            description: 'Id which refers to one product',
            schema: { type: 'string' },
            required: true
          }
        ],
        requestBody: {
          description: 'Current product update',
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Product' } } }
        },
        responses: {
          200: {
            description: 'Product updated',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Product' } } }
          },
          404: {
            description: 'Product not found',
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
        operationId: 'deleteProduct',
        description: 'Deletes an product',
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
            description: 'Id which refers to one product',
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
            description: 'Product not found',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } }
          },
          default: {
            description: 'Error',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } }
          }
        }
      }
    },
    '/api/product': {
      get: {
        security: [{ bearerAuth: [] }],
        operationId: 'fetchProducts',
        description: 'Return list of products',
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
                      items: { $ref: '#/components/schemas/Product' }
                    },
                    total: { type: 'integer' }
                  }
                }
              }
            }
          },
          404: {
            description: 'Products not found',
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
        operationId: 'createProduct',
        description: 'Creates an product',
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
          description: 'Product data',
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Product' } } }
        },
        responses: {
          201: {
            description: 'Product created',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Product' } } }
          },
          default: {
            description: 'Error',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } }
          }
        }
      }
    }
  };
  