const CrudController = require('./crud');

const {OrderServices} = include('services');

class Order extends CrudController {
    constructor() {
        const services = new OrderServices();
        super(services);
    }

}

module.exports = new Order();
