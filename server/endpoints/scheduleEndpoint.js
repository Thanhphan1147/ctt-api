const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware')
const scheduleController = require('../controller/scheduleController')

// Test routes
router.get('/test_day', scheduleController.test_day)
router.get('/test_week', scheduleController.test_week)
router.get('/planning', scheduleController.getPlanning)

// Main routes
// router.post('/schedule', scheduleController.getSchedule)
router.post('/view', authMiddleware.jwtDecode, scheduleController.getSchedule)
router.get('/days/planning/:did', authMiddleware.jwtDecode, scheduleController.getPlanningByDayId)
router.get('/days/:wid', authMiddleware.jwtDecode, scheduleController.getWeekDays)
router.put('/days/:did', authMiddleware.jwtDecode, scheduleController.updateSchedule)
module.exports = router;