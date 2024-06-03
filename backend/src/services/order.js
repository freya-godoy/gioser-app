const { Order } = include('models');
const camelCase = require('lodash/camelCase');
const isEmpty = require('lodash/isEmpty');

const CrudService = require('./crud');

class OrderService extends CrudService {
    constructor() {
        super(Order);
        this.fetch = this.fetch.bind(this);
    }
}

module.exports = OrderService;
