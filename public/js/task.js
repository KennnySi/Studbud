let type = 1;
let date = '';
// default date for date picker
function defaultDate() {
    var local = new Date();
    local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
};
document.getElementById('datePicker').value = defaultDate();
document.getElementById('datePicker').addEventListener('change', function() {
    type = 3
    date = this.value
    console.log(date)
    getTasks(type, 1, date);
})

document.getElementById('plus').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'block';
});

document.getElementById('cancel').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'none';
});

document.getElementById('week').addEventListener('change', function() {
    type = this.value;
    getTasks(type, 1);
});


document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = document.getElementById('form');
    const formData = new FormData(form);
    const object = {};
    formData.forEach(function(value, key) {
        object[key] = value;
    });
    // submit the form by using ajax
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/tasks', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(object));
    xhr.onload = function() {
        if (this.status === 200) {
            console.log(this.responseText);
            document.getElementById('modal').style.display = 'none';
            document.getElementById('form').reset();
            getTasks(type, 1, date);
        }
    }

})

function getTasks(type, page = 1, date = '') {
    // get tasks from server with ajax
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const data = JSON.parse(this.responseText);
            // update tasks and pagination
            displayTasks(data.tasks);
            displayPagination(data.pagination)
        }
    };
    // send the request
    xhr.open('GET', `/api/tasks?page=${page}&type=${type}&date=${date}`, true);
    xhr.send();
}


function displayPagination({ page, total }) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    for (let i = 1; i <= Math.ceil(total / 3); i++) {
        const li = document.createElement('div');
        li.className = 'page-item';
        const a = document.createElement('a');
        a.className = 'page-link';
        a.innerHTML = i;
        if (i == page) {
            li.className += ' active-page ';
        }
        a.addEventListener('click', function() {
            getTasks(type, i, date);
        })
        li.appendChild(a);
        pagination.appendChild(li);
    }
}
// show the tasks
function displayTasks(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach(function(task) {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        // build the html string
        taskItem.innerHTML = `
        <div class="task flex justify-bewteen">
            <div class="task-body">
                <div class="task-title flex">
                    <img width="30" src="icons/dictionary-b.svg" alt="Book">
                    <h3>${task.name}</h3>
                </div>
                <div class="task-content flex">
                    <img width="20" src="icons/warnning.svg" alt="warnning">
                    <span>Due ${task.due}</span>
                </div>
                <div class="task-footer">
                    Estimated completion time: ${task.time}mins
                </div>
            </div>
            <div class="badges">
                <div class="task-priorty ${task.priorty == 'high' ? 'bg-red' : (task.priorty == 'med' ? 'bd-yellow' : 'bg-green')}">
                    <span>${task.priorty}</span>
                </div >
                <div class="task-status bg-blue ">
                   ${task.status}
                </div>
                <button class="task-start">
                    Start
                </button>
            </div >
        </div >
        `;
        taskList.appendChild(taskItem);
    })
}

getTasks(1)