// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function ()
{  
  const today = new Date();
  const timeRange = [9,10,11,12,13,14,15,16,17];
  // today.setTime(1699567455);

  // set current date
  $('#currentDay').setCurrentDate(today);


  $('.container-fluid').generateDates(timeRange, today.getHours());

  $('.saveBtn').on('click', function()
  {
    console.log(this); // debugging

    const text = $(this).siblings('.description').val();
    console.log(`text = ${text}`);

    const key = $(this).parent().attr('id');
    console.log(`key = ${key}`);

    textToLS(key, text);
  })
});

/*
  .setCurrentDate (JQUERY MEMBER FUNCTION)
  > pass today as a global Date object:
  (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
*/

const myWeekDay = function(int)
{
  // console.log(int); // debugging
  const days = [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday'
  ];
  return days[int % 7];
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
/*
  setCurrentDate (jQuery element plugin)
  updates this.text (element invoked on) with formatted day of the week,
  month, date, and year
*/
$.fn.setCurrentDate = function(today)
{
  // const timeSlot = $('#currentDay');
  const weekday = myWeekDay(today.getDay());
  const month = myMonth(today.getMonth());
  const day = today.getDate();
  const year = today.getFullYear();

  this.text(`${weekday}, ${month} ${day}, ${year}`);
}

// save to localStorage
const textToLS = function(label, content)
{ 
  console.log(`stored {"${label}":"${content}"}`);
  // save to local storage
  localStorage.setItem(label, JSON.stringify(content));
}
// load from localStorage
const loadFromLS = function(key)
{
  let storedVal = localStorage.getItem(key);
  
  console.log(`value found: {"${key}":${storedVal}}`);
  return JSON.parse(storedVal);
}

$.fn.generateDates = function(range, hour)
{
  for (let i = 0; i < range.length; i++)
  {
    let val = range[i];
    // set past, present, future colors
    if (hour > val)
    {
      this.append(`<div id="hour-${val}" class="row time-block past">`);
    }
    else if (hour === val)
    {
      this.append(`<div id="hour-${val}" class="row time-block present">`);
    }
    else if (hour < val)
    {
      this.append(`<div id="hour-${val}" class="row time-block future">`);
    }
    // this.append(`<div id="hour-${val}" class="row time-block">`)
    this.children(`#hour-${val}`)
      .append(`<div class="col-2 col-md-1 hour text-center py-3">${val}:00`)
      .append(`<textarea class="col-8 col-md-10 description" id="textarea-${val}" rows="3"></textarea>`)
      .append(`<button class="btn saveBtn col-2 col-md-1" aria-label="save">`)
        .children('.btn')
        .append(`<i class="fas fa-save" aria-hidden="true"></i>`);

    let savedData = loadFromLS(`hour-${val}`);
    console.log(`savedData = ${savedData}`);
   
    console.log(`element to apply to: ${this.find('.description')[0]}`);
    this.find(`#textarea-${val}`).val(savedData);
    
  }
}
