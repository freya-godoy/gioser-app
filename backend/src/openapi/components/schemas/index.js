const Product = require('./Product');
const Order = require('./Order');




module.exports = {
    ArrayString: {
        type: 'array',
        uniqueItems: true,
        items: {type: 'string'}
    },
    ArrayNumber: {
        type: 'array',
        uniqueItems: true,
        items: {type: 'integer'}
    },
    ids: {
        type: 'array',
        uniqueItems: true,
        items: {
            type: 'string',
            format: 'uuid'
        }
    },
    Error: {
        type: 'object',
        required: [
            'code',
            'message'
        ],
        properties: {
            code: {
                type: 'integer',
                format: 'int32'
            },
            message: {type: 'string'}
        }
    },
    Date: {
        type: 'string',
        format: 'date'
    },
    DateTime: {
        type: 'string',
        format: 'date-time'
    },
    Nullable: {
        nullable: true,
        not: {
            anyOf: [
                {type: 'string'},
                {type: 'number'},
                {type: 'boolean'},
                {type: 'object'},
                {
                    type: 'array',
                    items: {}
                }

            ]
        }
    },
    Product,
    Order
};
