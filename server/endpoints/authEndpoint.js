const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const authMiddleware = require('../middleware/authMiddleware')


router.post('/', authController.authenticate);
router.post('/check-login', authMiddleware.jwtDecode, (req, res, next)=> { res.status(200).json({
    "status": "connected"
})})

module.exports = router;
