// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});

/*
  .setCurrentDate (JQUERY MEMBER FUNCTION)
  > pass today as a global Date object:
  (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
*/

const myWeekDay = function(int)
{
  const days = [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday'
  ];
  return days[int - 1];
}

const myMonth = function(int)
{
  const months = [
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                  'July',
                  'August',
                  'September',
                  'October',
                  'November',
                  'December'
  ];
  return months[int];
}

$.fn.setCurrentDate = function(today)
{
  // const timeSlot = $('#currentDay');
  const weekday = myWeekDay(today.getDay());
  const month = myMonth(today.getMonth());
  const day = today.getDate();
  const year = today.getFullYear();

  this.text(`${weekday}, ${month} ${day}, ${year}`);
}

const today = new Date();
// today.setTime(1699567455);
$('#currentDay').setCurrentDate(today);

