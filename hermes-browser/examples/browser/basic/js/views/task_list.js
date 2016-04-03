function addTask (ev) {
  const item = document.createElement('tr');
  const column1 = document.createElement('td');
  const column2 = document.createElement('td');
  const checkbox = document.createElement('input');
  const message = ev.message.payload;

  checkbox.setAttribute('id', message.id);
  checkbox.setAttribute('type', 'checkbox');
  checkbox.checked = !!message.complete;
  checkbox.addEventListener('click', (ev) => {
    taskExchange.publish(TaskMessages.complete(ev.target.id, ev.target.checked));
  });
  column1.appendChild(checkbox);
  item.appendChild(column1);
  column2.innerHTML = message.title;
  item.appendChild(column2);
  document.getElementById('tasks').appendChild(item);
}
