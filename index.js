/* eslint-disable lodash/prefer-lodash-method, global-require, camelcase */
require('dotenv').config({
    path: `${__dirname}/.env`
});
const os = require('os');
const cluster = require('cluster');
const webpack = require('webpack');
// const fetch = require('node-fetch');
const express = require('express');

const forEach = require('lodash/forEach');

const nativeEvent = require('./server/helpers/nativeEvent');
const logger = require('./server/helpers/logger');
const appInit = require('./backend');

const {
    PORT,
    NODE_ENV
    // CLIENT_ID,
    // CLIENT_SECRET,
} = process.env;
// const requestToken = async () => {
//     logger.info('Fetching appToken');
//     const response = await fetch(
//         `${API}public-api/token-app`, {
//             method: 'POST',
//             headers: {
//                 Accept: 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 clientId: CLIENT_ID,
//                 clientSecret: CLIENT_SECRET
//             })
//         }
//     );
//     const {access_token} = await response.json();

//     process.env.TOKEN = access_token;
//     logger.info('appToken obtained');
// };

const publicPath = `${__dirname}/dist`;

const app = express();

app.use(express.static(publicPath));
app.use(express.json({
}));
app.use(express.urlencoded({
    extended: true
}));
appInit.module();

const startApp = () => app.listen(PORT, () => logger.info(`\nApp running on port 3502 in ${NODE_ENV} environment`));

if (NODE_ENV === 'development') {
    (async () => {
        const middleware = require('webpack-dev-middleware');
        const webpackConfig = require('./webpack.config');
        const compiler = webpack(webpackConfig);

        const webpackApp = express();

        webpackApp.use(middleware(compiler, {
        }));

        webpackApp.use(require('webpack-hot-middleware')(compiler));
        app.use(webpackApp);
        startApp();
    })();
}

if (NODE_ENV !== 'development') {
    (async () => {
        app.use((_, res, next) => {
            res.set('Cache-control', 'no-cache');
            res.removeHeader('X-Powered-By');
            next();
        });
        app.use('*', express.static(publicPath));
        if (cluster.isMaster) {
            nativeEvent.process();
            const CPUS = os.cpus();
            forEach(CPUS, () => cluster.fork());
            nativeEvent.cluster(cluster);
        } else {
            startApp();
        }
    })();
}
