Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

Date.prototype.getWeekNumber = function(){
  var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
  var dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
};

Date.prototype.getFirstAndLastDay = function(week_number, year) {
	const jan4 = new Date(year, 0, 4);
	// console.log(jan4.toDateString(), jan4.getDay());
	const offset = (week_number - 1)*7;
	const day = jan4.addDays(offset);
	// console.log(day.toDateString(), day.getDay());
	const dayOfWeek = day.getDay() || 7;

	return {
		f: day.addDays(-dayOfWeek + 1),
		l: day.addDays(7 - dayOfWeek)
	}
}

Date.prototype.cttFormat = function() {
	return this.getDate() + '-' + this.getNumericMonth() + '-' + this.getFullYear()
}

Date.prototype.getNumericMonth = function() {
	return this.getMonth() + 1
}
