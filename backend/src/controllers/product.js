const CrudController = require('./crud');

const {ProductServices} = include('services');

class Product extends CrudController {
    constructor() {
        const services = new ProductServices();
        super(services);
    }
}

module.exports = new Product();
