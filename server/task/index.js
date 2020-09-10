const Task = require("./task"),
  moment = require('moment');

function getAllTasks(req, res) {
  Task.find({}, (err, taskList) => {
    if (err) { return res.status(400).send("Error Fetching tasks") }
    return res.status(200).send(taskList);
  });
}

function createTask(req, res) {
  let task = {
    name: req.body.name,
    description: req.body.description,
    startsFrom: req.body.startsFrom ? moment(req.body.startsFrom).format('YYYY-MM-DD') : null,
    endsAt: (req.body.startsFrom && req.body.endsAt) ? req.bod.endsAt : null,
    status: (req.body.startsFrom && req.body.endsAt) ? 'scheduled' : 'running',
    taskBy: req.session.user._id
  }

  Task.create(task, (err, newTask) => {
    if (err) { return res.status(400).send("Error creating tasks") }
    return res.status(200).send(newTask);
  })
}

function getTaskByUser(req, res) {
  let user = req.session.user._id;
  Task.find({taskBy: user}, (err, taskList) => {
    if (err) { return res.status(400).send("Error fetching tasks") }
    return res.status(200).send(taskList);
  })
}

module.exports = {
  getAllTasks,
  createTask,
  getTaskByUser
}