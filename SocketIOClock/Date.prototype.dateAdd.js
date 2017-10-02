if(!Date.prototype.dateAdd) {
    Date.prototype.dateAdd = function(size,value) {
        value = parseInt(value);
        var incr = 0;
        switch (size) {
            case 'day':
                incr = value * 24;
                this.dateAdd('hour',incr);
                break;
            case 'hour':
                incr = value * 60;
                this.dateAdd('minute',incr);
                break;
            case 'week':
                incr = value * 7;
                this.dateAdd('day',incr);
                break;
            case 'minute':
                incr = value * 60;
                this.dateAdd('second',incr);
                break;
            case 'second':
                incr = value * 1000;
                this.dateAdd('millisecond',incr);
                break;
            case 'month':
                value = value + this.getUTCMonth();
                if (value/12>0) {
                    this.dateAdd('year',value/12);
                    value = value % 12;
                }
                this.setUTCMonth(value);
                break;
            case 'millisecond':
                this.setTime(this.getTime() + value);
                break;
            case 'year':
                this.setFullYear(this.getUTCFullYear()+value);
                break;
            default:
                throw new Error('Invalid date increment passed');
                break;
        }
    }
}
