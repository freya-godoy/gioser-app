const mongoose = require('mongoose');

module.exports = {
  development: {
    client: 'mongoose',
    connection: mongoose.connect('mongodb://localhost:27017/triviasWord', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
  },
};
