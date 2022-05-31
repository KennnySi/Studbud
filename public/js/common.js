
let playButton = document.getElementById("playButton");
let pauseButton = document.getElementById("pauseButton");
let resetButton = document.getElementById("resetButton");
let dropdownMenu = document.getElementById("dropdownMenu");
playButton.addEventListener("click", start);
pauseButton.addEventListener("click", pause);
resetButton.addEventListener("click", reset);
dropdownMenu.addEventListener("click", function(e) {
    if (document.getElementById('dropdownContent').style.display == 'block') {
        document.getElementById('dropdownContent').style.display = "none";
    } else {
        document.getElementById('dropdownContent').style.display = "block";
    }
})
function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    let formattedMS = ms.toString().padStart(2, "0");

    return `${formattedMM}:${formattedSS}:${formattedMS}`;
}

// Declare variables to use in our functions below

let startTime;
let elapsedTime = 0;
let timerInterval;

// Create function to modify innerHTML

function print(txt) {
    document.getElementById("display").innerHTML = txt;
}

// Create "start", "pause" and "reset" functions

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        print(timeToString(elapsedTime));
    }, 10);
    showButton("PAUSE");
}

function pause() {
    clearInterval(timerInterval);
    showButton("PLAY");
}

function reset() {
    clearInterval(timerInterval);
    print("00:00:00");
    elapsedTime = 0;
    showButton("PLAY");
}

// Create function to display buttons

function showButton(buttonKey) {
    const buttonToShow = buttonKey === "PLAY" ? playButton : pauseButton;
    const buttonToHide = buttonKey === "PLAY" ? pauseButton : playButton;
    buttonToShow.style.display = "block";
    buttonToHide.style.display = "none";
}
// Create event listeners

let step = 0
function renderCalendar(inc) {
    // calendar
    // get dates of this week
    step += inc
    let week = [];
    var curr = new Date; // get current date
    curr.setDate(curr.getDate() + step * 7);
    var first = curr.getDate() - ((curr.getDay() + 6) % 7);
    for (var i = 0; i < 7; i++) {
        var next = new Date(curr.getTime());
        next.setDate(first + i);
        week.push(next.getDate());
    }

    let weekText = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    let MonthText = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    // build the calendar html string
    document.getElementById("calendar-days").innerHTML = week.map((day, index) => {
        return `<div class="day ${day == (new Date().getDate()) && curr.getMonth() == (new Date().getMonth()) ? 'active-day' : ''}">
        <div class="text-muted">${weekText[index]}</div>
        <div class="d">${day}</div>
        <div class="dots">
        ${day == 22 ? `<div class="dot dot-red"></div><div class="dot dot-green"></div><div class="dot dot-yellow"></div>` : ''}
        </div>
      </div>`;
    }).join("");
    document.getElementById("month").innerHTML = MonthText[curr.getMonth()];
}
document.getElementById("preWeek").addEventListener("click", function() {
    renderCalendar(-1);
});
document.getElementById("nextWeek").addEventListener("click", function() {
    renderCalendar(1);
});
renderCalendar(0)