// require('../utils/dateUtils')

const { Day } = require('../model/day');
const { Week } = require('../model/week');

const createError = require("http-errors");
const scheduleService = require('../service/scheduleService');

exports.test_day = function(req, res, next) {
    const data = {
    	week_id: "testing: 2021-9-2",
    	day_of_week: 4,
    	day_of_month: 29,
    	year: 2021,
    	breakfast: "Ngũ cốc + sữa",
    	lunch: "Thịt kho + canh rong biển",
    	dinner: "Thịt kho + canh rong biển",
    	combined: 1,
    	created: Date.now()
    }
    const day = new Day(data)
    res.status(200).json({
    	message: "test",
    	test: day
    })
}

exports.test_week = function(req, res, next) {
	const date = new Date();
	const year = date.getFullYear();
	const week = date.getWeekNumber();
	const fnl = date.getFirstAndLastDay(week, year);

    const data = {
    	year: year,
    	month: date.getMonth(),
    	number: week,
    	monday: fnl.f.cttFormat(),
    	tuesday: fnl.f.addDays(1).cttFormat(),
    	wednesday: fnl.f.addDays(2).cttFormat(),
    	thursday: fnl.f.addDays(3).cttFormat(),
    	friday: fnl.f.addDays(4).cttFormat(),
    	saturay: fnl.f.addDays(5).cttFormat(),
    	sunday: fnl.l.cttFormat(),
    	week_start: fnl.f.getDate(),
    	week_end: fnl.l.getDate()
    }
    const r = new Week(data)
    res.status(200).json({
    	message: "test",
    	currentDate: date,
    	test: r
    }) 
}

exports.getSchedule = function(req, res, next) {
	scheduleService.GetSchedule().then( (response) => {
        // console.log(response)
		res.status(200).json({
			message: "get current week",
            week: response,
		})
	}, (error) => {
		next(createError(400, error))
	})
}

exports.updateSchedule = function(req, res, next) {
    let params = req.params || {};
    if (!params.did) {
        next(createError(400, "Bad request"))
    }
    let did = params.did

    if (!req.body) {
        next(createError(400, "Bad request"))
    }
    let schedule = req.body;

    scheduleService.UpdateSchedule(did, schedule).then( (response) => {
        console.log(`--- updated: ${response}`)
        res.status(200).json({
            message: "Updated schedule",
            updated: response,
        })
    }, (error) => {
        next(createError(400, error))
    })
}

exports.getWeekDays = function(req, res, next) {
    let params = req.params || {};
    if (!params.wid) {
        next(createError(400, "Bad request"))
    }
    let wid = params.wid

    scheduleService.FindAllWithWid(wid).then( (response) => {
        // console.log(response)
        res.status(200).json({
            message: "get current week",
            days: response,
        })
    }, (error) => {
        next(createError(400, error))
    })
}

exports.getPlanning = function(req, res, next) {
    scheduleService.getPlanning().then( (response) => {
        res.status(200).json({
            message: `Inserted: ${response.insertedCount} documents`,
        })
    },(error) => {
        next(createError(400, error))
    })
}

exports.getPlanningByDayId = function(req, res, next) {
    let params = req.params || {};
    if (!params.did) {
        next(createError(400, "Bad request"))
    }
    let did = params.did

    scheduleService.GetPlanningsForOneDay(did).then( (response) => {
        res.status(200).json({
            plannings: response,
        })
    }, (error) => {
        next(createError(400, error))
    })
}