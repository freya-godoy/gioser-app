require('dotenv').config({});
const crypto = require('./src/helpers/bcrypt');

const newPass = 'asd978132hukazjnk';

//eslint-disable-next-line
console.log(crypto.encrypt(
    newPass
));
