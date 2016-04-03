const MQ = require('./mq');
const TaskMessages = require('./messages/task');

MQ.taskExchange.publish(TaskMessages.create('Initial task', true));
