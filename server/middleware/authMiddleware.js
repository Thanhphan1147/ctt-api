const jwtConfig = require('../../configs/jwt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

exports.jwtDecode = function (req, res, next) {
    try {
        let token = req.get('authorization').split(" ")[1];
        let decoded = jwt.verify(token, jwtConfig.jwtSecret);
        res.locals.decoded = decoded;
        return next();
    } catch (error) {
        throw createError(403, 'Forbidden');
    }
}
