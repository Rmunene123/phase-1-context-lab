// Function to create an employee record from an array
function createEmployeeRecord(array) {
    if (array.length < 4) {
      console.error("Array must have at least 4 elements.");
      return null;
    }
  
    return {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  // Function to create an array of employee records from an array of arrays
  function createEmployeeRecords(array) {
    return array.map(createEmployeeRecord);
  }
  
  // Function to create a timeIn event
  function createTimeInEvent(dateTime) {
    const [date, hour] = dateTime.split(' ');
  
    if (!date || !hour) {
      console.error("Date and hour must be provided.");
      return this;
    }
  
    this.timeInEvents.push({
      type: "TimeIn",
      date: date,
      hour: parseInt(hour, 10)
    });
  
    return this;
  }
  
  // Function to create a timeOut event
  function createTimeOutEvent(dateTime) {
    const [date, hour] = dateTime.split(' ');
  
    if (!date || !hour) {
      console.error("Date and hour must be provided.");
      return this;
    }
  
    this.timeOutEvents.push({
      type: "TimeOut",
      date: date,
      hour: parseInt(hour, 10)
    });
  
    return this;
  }
  
  // Function to calculate hours worked on a given date
  function hoursWorkedOnDate(date) {
    const timeInEvent = this.timeInEvents.find(event => event.date === date);
    const timeOutEvent = this.timeOutEvents.find(event => event.date === date);
  
    if (!timeInEvent || !timeOutEvent) {
      console.error("Missing timeIn or timeOut event for this date.");
      return 0;
    }
  
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
    return hoursWorked;
  }
  
  // Function to calculate wages earned on a given date
  function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    return this.payPerHour * hoursWorked;
  }
  
  // Function to calculate all wages for an employee
  function allWagesFor() {
    const dates = this.timeInEvents.map(event => event.date);
    return dates.reduce((total, date) => total + wagesEarnedOnDate.call(this, date), 0);
  }
  
  // Function to find an employee by their first name
  function findEmployeeByFirstName(collection, firstName) {
    return collection.find(record => record.firstName === firstName) || null;
  }
  
  // Function to calculate total payroll for an array of employees
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, record) => total + allWagesFor.call(record), 0);
  }
  