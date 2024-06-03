const product = require('./product');
const order = require('./order');



module.exports = {
    ...product,
    ...order,
};
