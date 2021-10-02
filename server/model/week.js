module.exports.Week = function (data) {
    // properties
    this.year       = data.year         || 1998;
    this.month      = data.month        || 0;
    this.number     = data.number       || 0;
    this.monday     = data.monday       || '';
    this.tuesday    = data.tuesday      || '';
    this.wednesday  = data.wednesday    || '';
    this.thursday   = data.thursday     || '';
    this.friday     = data.friday       || '';
    this.saturay    = data.saturay      || '';
    this.sunday     = data.sunday       || '';
    this.week_start = data.week_start   || 0 ;
    this.week_end   = data.week_end     || 0 ;

    // Initialize id
    this.week_id    = this.year + '-' + this.number;
    
    // methods
    this.getYear = function () {
        return this.year;
    }
    this.getMonth = function () {
        return this.month;
    }
    this.getNumber = function () {
        return this.number;
    }
    this.getWeekStart = function () {
        return this.week_start;
    }
    this.getWeekEnd = function () {
        return this.week_end;
    }
}
