const jwtConfig = require('../../configs/jwt');
const authService = require('../service/authService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require("http-errors");

/**
 * Verify token
 * */
exports.authenticate = function (req, res, next) {
    const login = {
        key: req.body.key,
        tid: req.body.tid
    }
    console.log(login)
    authService.fetchKey(login.tid).then( (key) => {
        if (key) {
            bcrypt.compare(login.key, key.hash, function(err, result) {
                if (result === true) {
                    let jwtToken = jwt.sign(login, jwtConfig.jwtSecret, {expiresIn: jwtConfig.jwtExpiration});
                    res.status(200).json({
                        token: jwtToken,
                        expiration: jwtConfig.jwtExpiration
                    })
                } else { next(createError(403, "Forbidden")) }
            });
        } else { next(createError(403, "Forbidden")) }
    })
}
