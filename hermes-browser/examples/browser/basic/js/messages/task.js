const { Message } = require('../../../../../src/index');
const Topics = require('../topics/task');

export function create (title, complete) {
  return new Message({ topic: Topics.CREATE_TASK, id: `task_${Date.now()}`, title, complete });
}

export function complete (id, complete) {
  return new Message({ topic: Topics.COMPLETE_TASK, id, complete });
}
