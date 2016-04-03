const { taskExchange } = require('../mq');
const TaskMessages = require('../messages/task');

const form = document.getElementById('taskForm');
const title = document.getElementById('task_title');

form.addEventListener('submit', (ev) => {
  taskExchange.publish(TaskMessages.create(title.value, false));

  form.reset();
  ev.preventDefault();
});
