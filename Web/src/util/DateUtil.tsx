import * as datefns from "date-fns"

export default class DateUtil {
    public static getNow() : Date {
        return new Date();
    }
    
    public static getTodayCalendarDate() {
        var now = this.getNow();
        return this.getCalendarDate(now);
    }

    public static getCalendarDate(date : Date) : string {
        return `${date.getFullYear()}${this.numberWith1LeadingZero(date.getMonth()+1)}${this.numberWith1LeadingZero(date.getDate())}`
    }

    public static getYear(calendarDate : string) : number {
        return parseInt(calendarDate.substr(0, 4));
    }

    public static getMonth(calendarDate : string) : number {
        return parseInt(calendarDate.substr(4, 2));
    }

    public static getDay(calendarDate : string) : number {
        return parseInt(calendarDate.substr(6, 2));
    }

    public static getHour(hourMin : string) : number {
        if (hourMin.length == 3) {
            return parseInt(hourMin[0]);
        }
        else {
            return parseInt(hourMin.substr(0,2));
        }
    }

    public static getMin(hourMin : string) : number {
        return parseInt(hourMin.substr(hourMin.length - 2, 2));
    }

    public static numberWith1LeadingZero(num : number) : string {
        var numString = num < 10 ? "0" : "";
        numString += `${num}`;
        return numString;
    }

    public static numberWith3LeadingZero(num : number) : string {
        var numString = "";
        numString += num < 1000 ? "0" : "";
        numString += num < 100 ? "0" : "";
        numString += num < 10 ? "0" : "";
        numString += `${num}`;
        return numString;
    }    

    public static getMoment(calendarDate: string, hourMin: string) : Date {
        var date = this.getMomentNoTime(calendarDate);
        var hourMinNum = parseInt(hourMin);
        date.setHours(Math.floor(hourMinNum/100));
        date.setMinutes(hourMinNum - date.getHours()*100);
        return date;
    }

    public static getMomentNoTime(calendarDate: string) : Date {
        var date = new Date();
        date.setFullYear(parseInt(calendarDate.substr(0, 4)), parseInt(calendarDate.substr(4, 2)) - 1, parseInt(calendarDate.substr(6, 2)));
        return date;
    }    

    public static getDate(calendarDate: string, hourMin: string) : Date {
        var date = new Date(DateUtil.getYear(calendarDate), DateUtil.getMonth(calendarDate) - 1, DateUtil.getDay(calendarDate),
                            DateUtil.getHour(hourMin), DateUtil.getMin(hourMin), 0, 0);
        date.setDate(DateUtil.getDay(calendarDate));
        return date;
    }
}