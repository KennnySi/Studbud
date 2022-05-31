let work = document.getElementById('25');
let shortBreak = document.getElementById('5');
let longBreak = document.getElementById('30');
let interval = document.getElementById('interval');

let startBtn = document.getElementById('startBtn');
let pauseBtn = document.getElementById('pauseBtn');
let restartBtn = document.getElementById('restartBtn');
let breakBtn = document.getElementById('breakBtn');

let queue = []
let timer = null;
let secs = 0;

breakBtn.addEventListener('click', () => {
    secs = 0;
    clearInterval(timer);
    timer = null;
    handleStart();
})

function handleStart() {
    // if queue is empty then add times to the queue base on the switches
    if (queue.length == 0) {
        for (let i = 0; i < 4; i++) {
            // if work switch is on
            if (work.checked) {
                queue.push(25);
            }
            // if short break switch is on
            if (shortBreak.checked) {
                queue.push(5);
            }
            // if long break switch is on and interval is on
            if (longBreak.checked && interval.checked) {
                queue.push(30);
            }
            // if long break switch is on and interval is not on
            else if (longBreak.checked && !interval.checked) {
                if (i == 3) {
                    queue.push(30);
                }
            }
        }

    }
    // start the timer if the queue is not empty and timer is not running
    if (queue.length && timer == null) {
        startTimer();
    }
}

// start the timer
startBtn.addEventListener('click', handleStart);
// pause the timer
pauseBtn.addEventListener('click', () => {
    clearInterval(timer);
    timer = null;
});

// restart the timer
restartBtn.addEventListener('click', () => {
    clearInterval(timer);
    queue = [];
    timer = null;
    secs = 0;
    startBtn.click();
});


function startTimer() {
    // if queue not empty
    if (queue.length > 0) {
        if (secs == 0) {
            let time = queue.shift();
            secs = time * 60;
        }
        let mins = Math.floor(secs / 60);
        let sec = secs % 60;
        if (mins < 10) {
            mins = '0' + mins;
        }
        if (sec < 10) {
            sec = '0' + sec;
        }
        // update the timer in html
        document.getElementById('pomodoro-timer').innerHTML = '00:' + mins + ':' + sec;
        timer = setInterval(() => {
            secs--;
            let mins = Math.floor(secs / 60);
            let sec = secs % 60;
            if (mins < 10) {
                mins = '0' + mins;
            }
            if (sec < 10) {
                sec = '0' + sec;
            }
            document.getElementById('pomodoro-timer').innerHTML = '00:' + mins + ':' + sec;
            if (secs == 0) {
                clearInterval(timer);
                timer = null
                startTimer();
            }
        }, 1000);

    }
}

