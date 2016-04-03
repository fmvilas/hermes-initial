const { Exchange, Queue } = require('../../../src/index');
const taskHandler = require('./handlers/task').handler;
const taskExchange = new Exchange('Tasks');
const taskQ = new Queue('tasks');

taskExchange.bind(taskQ);
taskQ.on('message', taskHandler);

module.exports = { taskExchange, taskQ };
