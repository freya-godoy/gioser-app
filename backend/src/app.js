const fs = require('fs');
const express = require('express')();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const {middleware} = require('express-openapi-validator');

const spdy = require('spdy');

const mongoose = require('./helpers/mongoose');
const logger = require('./helpers/logger');
const loggerHttp = require('./helpers/loggerHttp');

const Router = require('./routes');
const packageJson = require('../package.json');

const {
    BODY_LIMIT,
    NODE_ENV,
    PORT
} = process.env;

class App {
    constructor() {
        /**
         * @var {express} app
         */
        this.app = express;
    }

    test() {
        express.use(bodyParser.json({limit: BODY_LIMIT}));
        express.use(bodyParser.urlencoded({extended: true}));
        this._routes();
        return express;
    }

    _onListening() {
        if(NODE_ENV !== 'test') {
            logger.info(`Started ${packageJson.name} at port 3502 in ${NODE_ENV} environment`);
        }
    }

    _onError(err) {
        logger.error(`App Crashed, Error: ${err.errorMessage}`);
        process.exit;
    }

    init() {
        if(NODE_ENV !== 'test') {
            this._configure();
            if (NODE_ENV === 'production') {
                express.use(cors({
                    credentials: true,
                    origin: '*'
    
                }));
                if (process.env.CERT_KEY && process.env.CERT_PATH) {
                    const options = {
                        key: fs.readFileSync(process.env.CERT_KEY),
                        cert: fs.readFileSync(process.env.CERT_PATH),
                        spdy: {protocols: ['h2', 'http/1.1', 'http/2']}
                    };
                    spdy.createServer(options, express).listen(3502, err => {
                        if (err) {
                            return this._onError(err);
                        }
                        this._onListening();
                    });
                } else {
                    express.listen(3502, this._onListening);
                    express.on('error', this._onError);
                }
            } else {
                express.listen(3502, this._onListening);
                express.on('error', this._onError);
            }
            return express;
        }
    }

    _configure() {
        mongoose.configure();
        this._middleWares();
        return this._routes();
    }

    _middleWares() {
        express.use(bodyParser.json({limit: BODY_LIMIT}));
        express.use(bodyParser.urlencoded({extended: true}));
        express.use(cookieParser());
        if (NODE_ENV !== 'test') {
            express.use(function (req, res, next) {
                function afterResponse() {
                    res.removeListener('finish', afterResponse);
                    res.removeListener('close', afterResponse);
                    loggerHttp.loggerInstance(res);
                }
                res.on('finish', afterResponse);
                res.on('close', afterResponse);
                next();
            });
        }
        if (NODE_ENV === 'development') {
            express.use(cors({
                credentials: true,
                origin: '*'

            }));
        } else if(NODE_ENV !== 'test') {
            express.disable('x-powered-by');
            express.use(helmet());
            express.use(helmet.noSniff());
            express.use(helmet.referrerPolicy({ policy: 'same-origin' }));
            express.use(helmet.contentSecurityPolicy({
                directives: {
                    defaultSrc: ['\'self\''],
                    styleSrc: ['\'self\'', 'maxcdn.bootstrapcdn.com']
                }
            }));
            const sixtyDaysInSeconds = 15768000;
            express.use(helmet.hsts({maxAge: sixtyDaysInSeconds}));
            express.use(cors({
                credentials: true,
                origin: '*'

            }));
        }
        return;
    }

    _routes() {
        const apiSpec = include('openapi');
        const options = {swaggerOptions: {validatorUrl: null}};
        express.use('/docs', swaggerUi.serve, swaggerUi.setup(apiSpec, options));

        express.use(middleware({
            apiSpec,
            validateRequests: true,
            validateResponses: false
        }));
        Router.configure(express);
        return;
    }
}

module.exports = App;
