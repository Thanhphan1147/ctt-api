module.exports.Day = function (data) {
    // properties
    this.week_id        = data.week_id          || '';
    this.day_of_week    = data.day_of_week      || '';
    this.month          = data.month            || '';
    this.day_of_month   = data.day_of_month     || '';
    this.year           = data.year             || '';
    this.breakfast      = data.breakfast        || '';
    this.lunch          = data.lunch            || '';
    this.dinner         = data.dinner           || '';
    this.combined       = data.combined         || '';
    this.created        = data.created          || '';

    // initialize day_id
    this.day_id         = this.day_of_month + '-' + this.month + '-' + this.year;

    // methods
    this.getWeekId = function () {
        return this.week_id;
    }
    this.getDayOfWeek = function () {
        return this.day_of_week;
    }
    this.getDayOfMonth = function () {
        return this.day_of_month;
    }
    this.getBreakfast = function () {
        return this.breakfast;
    }
    this.getLunch = function () {
        return this.lunch;
    }
    this.getDinner = function () {
        return this.dinner;
    }
    this.getCombined = function () {
        return this.combined;
    }
    this.getCreated = function () {
        return this.created;
    }
    this.getDayID = function() {
        return this.day_id;
    }
}
