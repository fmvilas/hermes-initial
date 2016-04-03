const EventEmitter = require('events');
const Message = require('./message');
const ESQueue = require('es-collections/Queue');

class Queue extends EventEmitter {
  constructor (name) {
    super();
    this.name = name;
    this.queue = new ESQueue();
  }

  publish (message) {
    if (!(message instanceof Message)) throw new Error('Queue.publish(message): message must be a Message.');
    this.queue.enqueue(message);
    this.emit('message', { message, queue: this });
  }

  consume (consumer) {
    if (typeof consumer !== 'function') throw new Error('Queue.consume(consumer): consumer must be a function.');

    this.emit('consume:before', { queue: this });
    const message = this.queue.dequeue();
    consumer({ message, queue: this });
    this.emit('consume', { message, queue: this });
  }

  get name () {
    return this.name;
  }

  set name (name) {
    this.name = `${name}`;
  }
}

module.exports = Queue;
