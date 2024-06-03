const { Product } = include('models');
const camelCase = require('lodash/camelCase');
const isEmpty = require('lodash/isEmpty');

const CrudService = require('./crud');

class ProductService extends CrudService {
    constructor() {
        super(Product);
    }
}

module.exports = ProductService;
