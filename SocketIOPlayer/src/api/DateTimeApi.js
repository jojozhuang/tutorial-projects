class DateTimeApi {
  static getReadableTimeText(totalseconds) {
    let hours, minutes, seconds = 0;
    seconds = totalseconds % 60;
    hours = Math.floor(totalseconds / (60 * 60));
    minutes = Math.floor((totalseconds - hours * 60 * 60) / 60);

    let outh, outm, outs = "";
    outh = hours < 10 ? "0" + hours : hours;
    outm = minutes < 10 ? "0" + minutes : minutes;
    outs = seconds < 10 ? "0" + seconds : seconds;

    return outh + ":" + outm + ":" + outs;
  }

  static dateAdd(dt, size, value) {
    value = parseInt(value);
    let incr = 0;
    switch (size) {
      case 'year':
        dt.setFullYear(dt.getUTCFullYear()+value);
        break;
      case 'month':
        value = value + dt.getUTCMonth();
        if (value/12>0) {
          this.dateAdd(dt, 'year',value/12);
          value = value % 12;
        }
        dt.setUTCMonth(value);
        break;
      case 'week':
        incr = value * 7;
        this.dateAdd(dt, 'day',incr);
        break;
      case 'day':
        incr = value * 24;
        this.dateAdd(dt, 'hour',incr);
        break;
      case 'hour':
        incr = value * 60;
        this.dateAdd(dt, 'minute',incr);
        break;
      case 'minute':
        incr = value * 60;
        this.dateAdd(dt, 'second',incr);
        break;
      case 'second':
        incr = value * 1000;
        this.dateAdd(dt, 'millisecond',incr);
        break;
      case 'millisecond':
        dt.setTime(dt.getTime() + value);
        break;
      default:
        console.log("default"+size);
        break;
    }
    return dt;
  }
}

export default DateTimeApi;