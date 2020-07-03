export const fillDays = (attendance) => {
    const timeSpent = {}
    // fill timeSpent object where key is date and value is number of hours spent
    let checkin = null
    let checkinDate = null
    for (let i = 0; i < attendance.length; i++) {
        if (attendance[i].status == 1) {
            // checkin
            // get last check in moment
            while (i + 1 < attendance.length && attendance[i + 1].status == 1)
                i++
            // save checkin value
            const datetime = `${attendance[i].date}T${attendance[i].time}`;
            checkin = new Date(datetime);
            checkinDate = attendance[i].date;
        } else if (attendance[i].status == 2) {
            // checkout
            // get last checkout moment
            while (i + 1 < attendance.length && attendance[i + 1].status == 2)
                i++
            const datetime = `${attendance[i].date}T${attendance[i].time}`
            if (checkin != null) {
                const checkout = new Date(datetime);
                const days = diffDays(checkout, checkin);
                if (days > 0) {
                    // if difference between checkin and checkout is > than 1 day
                    // get next day after checkin with 00:00:00
                    const tomorrow = new Date(`${checkinDate.split("T")[0]}T00:00:00`)
                    tomorrow.setDate(tomorrow.getDate() + 1);

                    // get current day of checkout with 00:00:00
                    const current = new Date(`${attendance[i].date}T00:00:00`);

                    if (!(checkinDate in timeSpent))
                        timeSpent[checkinDate] = 0
                    if (!(attendance[i].date in timeSpent))
                        timeSpent[attendance[i].date] = 0
                    // add time difference to checkin date and checkout date
                    timeSpent[checkinDate] += diffMins(checkin, tomorrow)
                    timeSpent[attendance[i].date] += diffMins(current, checkout)
                } else {
                    if (!(checkinDate in timeSpent))
                        timeSpent[checkinDate] = 0
                    // add time difference between checkin and checkout
                    timeSpent[checkinDate] += diffMins(checkin, checkout);
                }
            }
        }
    }
    if (attendance.length > 0) {
        const lastIndex = attendance.length - 1;
        if (attendance[lastIndex].status == 1) {
            const now = new Date();
            const days = diffDays(now, checkin);
            if (days == 0) {
                const last = new Date(
                    `${attendance[lastIndex].date}T${attendance[lastIndex].time}`
                )
                if (!(attendance[lastIndex].date in timeSpent))
                    timeSpent[attendance[lastIndex].date] = 0
                timeSpent[attendance[lastIndex].date] += diffMins(last, now);
                inBuilding = true;
            }
        }
    }
    return timeSpent
}

export const diffMins = (dt2, dt1) => {
    const diff = (dt2.getTime() - dt1.getTime()) / (1000 * 60)
    return Math.abs(Math.round(diff))
}

export const diffDays = (dt2, dt1) => {
    return Math.abs(
      Math.floor(
        (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
          Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
          (1000 * 60 * 60 * 24)
      )
    )
}

export const showTip = (minutes) => {
    if (minutes == null)
      return ""
    const hours = parseInt(minutes / 60)
    const min = minutes % 60
    return `<span class="tooltiptext">${hours}h${min}m</span>`
}

export const Calendar = function (divId, calendarTable, timeSpent) {
    //Store div id
    this.divId = divId;
    this.calendarTable = calendarTable
    this.timeSpent = timeSpent
    // Days of week, starting on Sunday
    this.DaysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    // Months, stating on January
    this.Months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    // Set the current month, year
    var d = new Date();
    this.currMonth = d.getMonth();
    this.currYear = d.getFullYear();
    this.currDay = d.getDate();
};

Calendar.prototype.nextMonth = function () {
    if (this.currMonth == 11) {
        this.currMonth = 0;
        this.currYear = this.currYear + 1;
    } else {
        this.currMonth = this.currMonth + 1;
    }
    this.showcurr();
};

// Goes to previous month
Calendar.prototype.previousMonth = function () {
    if (this.currMonth == 0) {
        this.currMonth = 11;
        this.currYear = this.currYear - 1;
    } else {
        this.currMonth = this.currMonth - 1;
    }
    this.showcurr();
};

// Show current month
Calendar.prototype.showcurr = function () {
    this.showMonth(this.currYear, this.currMonth);
};

// Show month (year, month)
Calendar.prototype.showMonth = function (y, m) {
    var d = new Date(),
        // First day of the week in the selected month
        firstDayOfMonth = new Date(y, m, 1).getDay(),
        // Last day of the selected month
        lastDateOfMonth = new Date(y, m + 1, 0).getDate(),
        // Last day of the previous month
        lastDayOfLastMonth =
            m == 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate();
    var html = '<table class="calendar">';
    // Write selected month and year
    html += "<thead><tr>";
    html += '<td colspan="7">' + this.Months[m] + " " + y + "</td>";
    html += "</tr></thead>";
    // Write the header of the days of the week
    html += '<tr class="days">';
    for (var i = 0; i < this.DaysOfWeek.length; i++) {
        html += "<td>" + this.DaysOfWeek[i] + "</td>";
    }
    html += "</tr>";
    // Write the days
    var i = 1;
    do {
        var dow = new Date(y, m, i).getDay();

        var chk = new Date();
        var chkY = chk.getFullYear();
        var chkM = chk.getMonth();

        const dateStr = `${y}-${(m + 1)
            .toString()
            .padStart(2, "0")}-${i.toString().padStart(2, "0")}`;
        var opacity = 0;
        if (dateStr in this.timeSpent) {
            opacity = this.timeSpent[dateStr] / (24 * 60) + 0.1;
        }
        // If Sunday, start new row
        if (dow == 0) {
            html += "<tr>";
        }
        // If not Sunday but first day of the month
        // it will write the last days from the previous month
        else if (i == 1) {
            html += "<tr>";
            var k = lastDayOfLastMonth - firstDayOfMonth + 1;
            var month = this.currMonth - 1;
            var year = this.currYear;
            if (this.currMonth == 0) {
                month = 11;
                year--;
            }
            for (var j = 0; j < firstDayOfMonth; j++) {
                const dateStr = `${year}-${(month + 1)
                    .toString()
                    .padStart(2, "0")}-${k.toString().padStart(2, "0")}`;
                var opacity = 0;
                if (dateStr in this.timeSpent) {
                    opacity = this.timeSpent[dateStr] / (24 * 60) + 0.1;
                }
                html += `<td style="background-color: rgba(0, 0, 255, ${opacity});" class="not-current tooltip">${k}${showTip(
                    this.timeSpent[dateStr]
                )}</td>`;
                k++;
            }
        }
        // Write the current day in the loop

        if (
            chkY == this.currYear &&
            chkM == this.currMonth &&
            i == this.currDay
        ) {
            html += `<td style="background-color: rgba(0, 0, 255, ${opacity});" class="today tooltip">${i}${showTip(
                this.timeSpent[dateStr]
            )}</td>`;
        } else {
            html += `<td style="background-color: rgba(0, 0, 255, ${opacity});" class="normal tooltip">${i}${showTip(
                this.timeSpent[dateStr]
            )}</td>`;
        }
        // If Saturday, closes the row
        if (dow == 6) {
            html += "</tr>";
        }
        // If not Saturday, but last day of the selected month
        // it will write the next few days from the next month
        else if (i == lastDateOfMonth) {
            var k = 1;
            var month = this.currMonth + 1;
            var year = this.currYear;
            if (this.currMonth == 11) {
                month = 0;
                year++;
            }
            for (dow; dow < 6; dow++) {
                const dateStr = `${year}-${(month + 1)
                    .toString()
                    .padStart(2, "0")}-${k.toString().padStart(2, "0")}`;
                var opacity = 0;
                if (dateStr in this.timeSpent) {
                    opacity = this.timeSpent[dateStr] / (24 * 60) + 0.1;
                }
                html += `<td style="background-color: rgba(0, 0, 255, ${opacity});" class="not-current tooltip">${k}${showTip(
                    this.timeSpent[dateStr]
                )}</td>`;
                k++;
            }
        }
        i++;
    } while (i <= lastDateOfMonth);
    // Closes table
    html += "</table>";
    // Write HTML to the div
    this.calendarTable.innerHTML = html;
};