// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function ()
{  
  const today = new Date();
  const timeRange = [8,9,10,11,12,13,14,15,16,17,18,19,20];
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
    // $(this).siblings('.description').savetoLS(key);
    // console.log($('.saveBtn').siblings());
    // console.log(this.siblings());
    // let text = this.parents('.time-block').children('.description').val();
    // console.log(`text = ${text}`);
  })
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
  // let content = this.val();
  // let label = this.text();
  // let content = this.children('.description').text();
  // console.log(`label = ${label} | content = ${content}`); // debugging

  // save to local storage
  console.log(`stored {"${label}":"${content}"}`);
  localStorage.setItem(label, JSON.stringify(content));
}
// load from localStorage
const loadFromLS = function(key)
{

  // let returnedVal = JSON.parse(localStorage.getItem(key));
  let storedVal = localStorage.getItem(key);
  // if (storedVal)
  // {
  console.log(`value found: {"${key}":${storedVal}}`);
  return JSON.parse(storedVal);
  // }
  // return storedVal;
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

    // console.log(loadFromLS(`hour-${val}`));
    let savedData = loadFromLS(`hour-${val}`);
    console.log(`savedData = ${savedData}`);
    // this.children('.description').text(JSON.stringify(loadFromLS(`hour-${val}`)));
    console.log(`element to apply to: ${this.find('.description')[0]}`);
    this.find(`#textarea-${val}`).val(savedData);
    // console.log(`text area for each: ${this.children('textarea').text()}`);
    // $(this.children(`textarea`)).val(JSON.stringify(loadFromLS(`hour-${val}`)));
    // console.log('this.children(`.description`).val()) = ' + 
    // `${this.children(`.description`).val()}`);
    // console.log(`hour-${val}`); // debugging
  }
}

/*
  saveToDo (callback function)
  adds event listener to el which invokes textToLS plugin
  enter the key that el data should be stored with (hour-${num} for this app)
*/

// const saveToDo = function(key)
// {
//   this.
// }
// $.fn.saveToDo = function(key)
// {
//   this.children('textarea').textToLS(key);
// }
// $('.time-block').textToLS(); // debugging