const Topics = require('../topics/task');

export function handler (ev) {
  const message = ev.message.payload;

  if (message.topic === Topics.CREATE_TASK) {
    return addTask(ev);
  }

  if (message.topic === Topics.COMPLETE_TASK) {
    console.dir(message);
    return;
  }
}
