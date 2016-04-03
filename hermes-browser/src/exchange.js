const EventEmitter = require('events');
const Message = require('./message');
const Queue = require('./queue');

class Exchange extends EventEmitter {
  constructor (name) {
    super();
    this.name = name;
    this.bindings = new Map();
  }

  bind (target, metadata = {}) {
    if (!(target instanceof Exchange || target instanceof Queue)) throw new Error('Exchange.bind(target, metadata={}): target must be an Exchange or Queue.');
    const binding_name = metadata.name || `${this.name}_${Date.now()}`;
    this.bindings.set(binding_name, {target, metadata});
    this.emit('bind', { exchange: this, binding: { name: binding_name, target, metadata } });
  }

  publish (message) {
    if (!(message instanceof Message)) throw new Error('Exchange.publish(message): message must be a Message.');

    this.emit('publish:before', { message, exchange: this });

    for (const binding of this.bindings.values()) {
      binding.target.publish(message);
      this.emit('publish', { message, exchange: this, target: binding.target });
    }

    this.emit('publish:after', { message, exchange: this });
  }

  get name () {
    return this.name;
  }

  set name (name) {
    this.name = `${name}`;
  }

  get bindings () {
    return this.bindings;
  }
}

module.exports = Exchange;
