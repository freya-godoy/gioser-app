const fs = require('fs');
const path = require('path');

const logger = require('./server/helpers/logger');

const publicPath = path.resolve(__dirname, 'dist');
const removeDist =  () => {
    if (fs.existsSync(publicPath)) {
        logger.info('clearing previous dist folder');
        fs.rmdirSync(publicPath, {recursive: true});
    }
}

module.exports = removeDist();
