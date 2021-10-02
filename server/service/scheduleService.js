const mongoConnection = require('../../mongo/connect');

(function () {

	const _db = mongoConnection.getDb();
    const weeks = _db.collection('weeks');
    const days = _db.collection('days');
    const plannings = _db.collection('hyperplanning');
    const ctt_plannings = _db.collection('ctt-planning');
    //Configs
    /**
     * Schema : {key:, value:}
     * */

    exports.CountByWeekId = async function(wid) {
        let query = {week_id: wid}
        return weeks.countDocuments(query);
    }

    exports.GetSchedule = async function() {
        let wid = this.getCurrentWeekId()
        const query = {week_id: wid}
        const options = {
            projection: { _id: 0}
        }
        await this.CountByWeekId(wid).then( (r) => {
            console.log(r)
            if (r === 0) {
                this.CreateWeek(this.InitWeek())
            }
        })
        return weeks.findOne(query, options)
    }

    exports.CreateWeek = async function(nw) {
    	let newWeek = {
    		week_id	    : nw.week_id,
    		year		: nw.year,
    		month		: nw.month,
    		number		: nw.number,
    		monday		: nw.monday,
		    tuesday		: nw.tuesday,
		    wednesday  	: nw.wednesday,   
		    thursday   	: nw.thursday,  
		    friday     	: nw.friday,      
		    saturay    	: nw.saturay,      
		    sunday     	: nw.sunday,      
		    week_start 	: nw.week_start,
		    week_end   	: nw.week_end,
		    created		: Date.now(),
		    updated		: Date.now(),
            createdBy	: 'system',
            updatedBy	: 'system'

		}
    	weeks.insertOne(newWeek).then((result) => {
            // console.log(result)
    		if (result) {
    			var ds = []
                let wds = this.generateWeekdays(newWeek.number, newWeek.year)
                var wd
                // console.log(wds[1].toDateString())
    			for (let i = 0; i < 7; i++) {
                    wd = wds[i]
                    // console.log(`--- ${wd}, ${ds}`)
                    ds.push({
    					day_id: wd.getDate() + '-' + wd.getNumericMonth() + '-' + wd.getFullYear(),
    					week_id: newWeek.week_id,
					    day_of_week: wd.getDay(),
					    month: wd.getNumericMonth(),
					    day_of_month: wd.getDate(),
					    year: wd.getFullYear(),
					    breakfast: "No schedule",
					    lunch: "No schedule",
					    dinner: "No schedule",
					    combined: 0,
		    		    created: Date.now(),
					    updated: Date.now(),
			            createdBy: 'system',
			            updatedBy: 'system'
    				})
                    // console.log(ds)
    			}
    			days.insertMany(ds).then((result) => {
    				console.log(`Wrote: ${result.insertedCount} documents`)
    			})
    		}
    	})
        return newWeek
    }

    exports.FindAllWithWid = async function(wid) {
        let query = {week_id: wid}
        let options = {
            projection: { _id: 0}
        }
        return days.find(query, options).toArray();
    }

    exports.getPlanning = async function() {
        let ps = await plannings.find().toArray()
        let nps = []
        ps.map( (p) => {
            var date = ''
            if (typeof p.dtstart === 'string' || p.dtstart instanceof String) {
                date = p.dtstart.split('T')[0]
            }
            else {
                date = p.dtstart[0]
                console.log(p.dtstart[0])
            }

            let y = parseInt(date.substring(0, 4))
            let m = parseInt(date.substring(4, 6))
            let d = parseInt(date.substring(6))
            let day_id = `${d}-${m}-${y}`
            p.day_id = day_id
            nps.push(p)
            // console.log(` --- ${p.dtstart.split('T')[0]} --- ${d} - ${m} - ${y}`)
        })

        return ctt_plannings.insertMany(nps)
    }

    exports.UpdateSchedule = async function(did, schedule) {
        let query = {day_id: did}
        let update = {
            $set: {
                breakfast: schedule.breakfast || "No schedule",
                lunch: schedule.lunch || "No schedule",
                dinner: schedule.dinner || "No schedule",
                updated: Date.now()
            }
        }
        console.log(`${schedule.breakfast}, ${update.breakfast}`)
        return days.updateOne(query, update)
    }

    exports.GetPlanningsForOneDay = async function(did) {
        let query = {day_id: did}
        let options = {projection: {summary: 1, dtstart: 1, dtend: 1}}
        let sort = { dtend: 1 };
        return ctt_plannings.find(query, options).sort(sort).toArray()
    }

    exports.InitWeek = function() {
        const date = new Date();
        const year = date.getFullYear();
        const week = date.getWeekNumber();
        const fnl = date.getFirstAndLastDay(week, year);

        return {
            week_id: week + '-' + year,
            year: year,
            month: date.getNumericMonth(),
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
    }

    exports.generateWeekdays = function(week, year) {
        let d = new Date()
        let fnl = d.getFirstAndLastDay(week, year);
        return [
            fnl.f, 
            fnl.f.addDays(1), 
            fnl.f.addDays(2), 
            fnl.f.addDays(3), 
            fnl.f.addDays(4), 
            fnl.f.addDays(5),
            fnl.l
        ]
    }

    exports.getCurrentWeekId = function() {
        let d = new Date()
        return d.getWeekNumber() + '-' + d.getFullYear()
    }

})()
