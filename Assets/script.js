// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// Create an array with empty strings for each hour, 9-17
let entries = [];


$(function () {

  // ADD CLICK EVENT LISTENER TO BUTTONS
  // Get all the buttons (array) in an array use the getElementsByTagName("button") command
  let buttonsArray = document.getElementsByTagName("button");
  
  // Loop through the array of buttons (foreach)
  for (let b of buttonsArray) {
    b.addEventListener("click", getText);
  }

  loadEntries();
  updatePage();

});


// Pulls the text from the textarea, then passes it to be saved to localstage
function getText() {
  let index = parseInt(this.id); // Convert index from string to int so we can use it to access our array of textarea
  console.log(`Attempting to get info from row ${index}.`);
  textAreaArray = document.getElementsByTagName("textarea"); // get all textarea items
  let entry = textAreaArray[index].value; // get the text from the target textarea
  entry = entry.trim(); // Remove extra spaces from end of entry
  entries[index] = entry; // Store the new text entry in our entries array
  localStorage.setItem("entries",JSON.stringify(entries)); // Save entries array to localStorage as JSON
  console.log("Saved to index " + index);
}


function updatePage() {

  // UPDATE DISPLAY OF DATE
  // Determine the current time
  // Update the day/time display in the header are of the page
  // EXAMPLE:
  //let dateInfo = "Today is Monday, July 17: It's a wonderful day.";
  //let dayOfWeek = dayjs().day(); // Gives the daynumber of the week.
  // Convert daynumber to day name.
  let dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let dayOfWeek = dayNames[dayjs().day()];
  let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let month = monthNames[dayjs().month()];
  let dateOfMonth = dayjs().date();
  document.getElementById("currentDay").innerHTML = `Today is ${dayOfWeek}, ${month} ${dateOfMonth} ${dayjs().year()}`;

  // Get current hour. For determining which display hours have class past, present, future.
  let currentHour = dayjs().hour();

  // UPDATE ROW COLORS
  // Set past, present, future class for main div rows
  // They start with id hour-9 and go to hour-17
  // <div id="hour-11" class="row time-block">
  // Loop from n= 9 through 17
  // for (starting condition; continue condition; step) { stuff }
  for (let n = 9; n <= 17; n++) { // == > < >= <= === common boolean comparisons

    // get control of the related div (getElementById) "hour-" + n
    let elem = document.getElementById("hour-" + n)
    elem.className = "row time-block";

    // if n < currentHour, add "past" to class
    // if n == currentHour, "row time-block preset"
    // else ... future
    if (n < currentHour) elem.className += " past";
    if (n > currentHour) elem.className += " future";
    if (n === currentHour) elem.className += " present";
  }

}


function loadEntries() {

  try {
    // Get entries object from localstorage
    let temp = localStorage.getItem("entries");

    // Use JSON parse to convert it to the entries array here
    // ["dog","cat",1] -> an array object in JS
    entries = JSON.parse(temp); // An array of 8 text entries

    if (entries == null) {
      entries = [];
      for (let i=9; i<=17; i++) {
        entries.push("");
      }
    }

    // Update the text areas in the web page with the entries
    let textAreaArray = document.getElementsByTagName("textarea");
    
    // Loop through the array
    for (let i=0; i<textAreaArray.length; i++) {
      textAreaArray[i].value = entries[i];
    }
  } catch (error) {
    // Something went wrong during the localstorage read.
    // Do nothing.
    console.log("Unable to read from localstorage.");
    console.log(error);
    entries = [];
    for (let i=9; i<=17; i++) {
      entries.push("");
    }
  }

}


// //GIVEN I am using a daily planner to create a schedule
// WHEN I open the planner
// THEN the current day is displayed at the top of the calendar
// WHEN I scroll down
// THEN I am presented with time blocks for standard business hours of 9am to 5pm
// WHEN I view the time blocks for that day
// THEN each time block is color-coded to indicate whether it is in the past, present, or future
// WHEN I click into a time block
// THEN I can enter an event
// WHEN I click the save button for that time block
// THEN the text for that event is saved in local storage
// WHEN I refresh the page
// THEN the saved events persist

