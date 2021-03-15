import moment, { Moment } from "moment";

export function formatDate(date: Date) {
    const momentDate = moment(date);
    if (isToday(momentDate)) return "TODAY";
    if (isYesterday(momentDate)) return "YESTERDAY";

    return moment(date).format("dddd, DD MMM");
};

var REFERENCE = moment();
var TODAY = REFERENCE.clone().startOf('day');
var YESTERDAY = REFERENCE.clone().subtract(1, 'days').startOf('day');
var A_WEEK_OLD = REFERENCE.clone().subtract(7, 'days').startOf('day');

function isToday(momentDate: Moment) {
    return momentDate.isSame(TODAY, 'd');
}
function isYesterday(momentDate: Moment) {
    return momentDate.isSame(YESTERDAY, 'd');
}
function isWithinAWeek(momentDate: Moment) {
    return momentDate.isAfter(A_WEEK_OLD);
}
function isTwoWeeksOrMore(momentDate: Moment) {
    return !isWithinAWeek(momentDate);
}

const getCurrentMonth = new Date().getMonth() + 1;
const getCurrentYear = new Date().getFullYear();

export const startOfMonth = (month: number = getCurrentMonth, year: number = getCurrentYear) => {
    const startDate = moment([year, month - 1]).toDate();
    return startDate;
}
export const endOfMonth = (month: number = getCurrentMonth, year: number = getCurrentYear) => {
    const startDate = moment([year, month - 1]);
    const endDate = moment(startDate).endOf('month').toDate();
    return endDate;
}

export const buildNextValidDate = (date:Date):Date =>{
    let dayIncrement = 1;
  
    if (moment(date).day() === 5) {
      // set to monday
      dayIncrement = 3;
    } else if (moment(date).day() === 6) {
      // set to monday
      dayIncrement = 2;
    }
  
    return moment(date).add(dayIncrement, 'd').toDate();
  }

