const head = require('lodash/head');
const split = require('lodash/split');

const { validateToken } = include('helpers/jsonWebToken');
const Error = include('helpers/error');

module.exports = async (req, res, next) => {
    const header = req.get('Authorization');
    if (!header) {
        console.log("aca entro el hrp")
        return res.sendStatus(Error.UNAUTHORIZED);
    }
    const token = head(split(header, ' ').slice(1));
    try {
        console.log("aca entro el hrp 22222")
        const user = await validateToken(token);
        req.user = user;
        return next();
    } catch (err) {
        return res.sendStatus(Error.UNAUTHORIZED);
    }

};
