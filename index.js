function createEmployeeRecord ([fName, famName, employeeTitle, payRatePerHour]){
    const newEmployeeRecord = {
        firstName :  fName,
        familyName : famName,
        title : employeeTitle,
        payPerHour : payRatePerHour,
        timeInEvents : [],
        timeOutEvents : []
    }
    return newEmployeeRecord;
}

function createEmployeeRecords(arrayOfUserArrays){
    let usersRecords = [];
    arrayOfUserArrays.map(userArray => {
       usersRecords.push(createEmployeeRecord(userArray))
    })
    return usersRecords
}

function createTimeInEvent(employeeRecordObj, dateStamp){
        let dateHour = dateStamp.split(' ')
        employeeRecordObj.timeInEvents.push({
            type : "TimeIn",
            hour: parseInt(dateHour[1], 10),
            date : dateHour[0]
        })
        return employeeRecordObj
    }

    function createTimeOutEvent(employeeRecordObj, dateStamp){
        let dateHour = dateStamp.split(' ')
        employeeRecordObj.timeOutEvents.push({
            type : "TimeOut",
            hour: parseInt(dateHour[1], 10),
            date : dateHour[0]
        })
        return employeeRecordObj
    }

    function hoursWorkedOnDate(employee, findDate){
        let timeInEvent = employee.timeInEvents.find(timeIn => {
            return timeIn.date === findDate
        })
    
        let timeOutEvent = employee.timeOutEvents.find(timeOut =>{
            return timeOut.date === findDate
        })
        return (timeOutEvent.hour - timeInEvent.hour) / 100
    }

    function wagesEarnedOnDate(employee, date){
        let hoursWageable = hoursWorkedOnDate(employee, date)
        return +(hoursWageable * employee.payPerHour)
    }

    function allWagesFor(employee){
        let workedDates = employee.timeInEvents.map(timeIn =>{
            return timeIn.date
        })
        let paid = workedDates.reduce((accumulator, date) => {
            return accumulator + wagesEarnedOnDate(employee, date)
        }, 0)
    
        return paid
    }

    function calculatePayroll(employeeRecordsArray){
        return employeeRecordsArray.reduce((accumulator, employee) => {
            return accumulator + allWagesFor(employee)
        }, 0)
    }