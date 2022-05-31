// express server
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

// dummy data
let tasks = [{
    id: 1,
    name: 'task1',
    description: 'task1 description',
    status: 'pendding',
    due: '2022-05-24',
    time: '240',
    priorty: 'high',
},
{
    id: 2,
    name: 'task2',
    description: 'task2 description',
    status: 'done',
    due: '2022-05-17',
    time: '240',
    priorty: 'med',
},
{
    id: 3,
    name: 'task3',
    description: 'task3 description',
    status: 'done',
    due: '2022-05-17',
    time: '240',
    priorty: 'low',
}]
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

app.post('/api/tasks', (req, res) => {
    let task = req.body;
    task.id = tasks.length + 1;
    task.status = 'pendding';
    tasks.unshift(task);

    res.json(task);
})

app.get('/api/tasks', (req, res) => {
    let { type, page, date } = req.query;
    let result = tasks;

    if (type) {
        // if type is this week from monday to sunday
        if (type == 1) {
            let today = new Date();
            let day = today.getDay();
            let monday = new Date(today.getTime() - (day - 1) * 86400000);
            let sunday = new Date(today.getTime() + (7 - day) * 86400000);
            result = tasks.filter(task => {
                let taskDate = new Date(task.due);
                return taskDate >= monday && taskDate <= sunday;
            })
        }
        // if type is next week from monday to sunday
        else if (type == 2) {
            let today = new Date();
            let day = today.getDay();
            let monday = new Date(today.getTime() + (7 - day) * 86400000);
            let sunday = new Date(today.getTime() + (14 - day) * 86400000);
            result = tasks.filter(task => {
                let taskDate = new Date(task.due);
                return taskDate >= monday && taskDate <= sunday;
            })
        }
        // if type is date
        else if (type == 3) {

            let thisDate = tasks.filter(task => {
                // if date equal to created at
                return task.due == date;
            })
            result = thisDate;
        }
    }
    let total = result.length;
    page = Number(page);
    if (page) {
        // if page is not null
        // get the tasks of this page
        let start = (page - 1) * 3;
        result = result.slice(start, start + 3);
    } else {
        result = result.slice(0, 3);
    }

    res.json({
        tasks: result, pagination: {
            total,
            perPage: 3,
            page,
        }
    });
})

// start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})