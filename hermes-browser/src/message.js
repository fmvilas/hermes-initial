class Message {
  constructor (payload = new Map(), headers = new Map()) {
    this.payload = payload;
    this.headers = headers;
  }

  get payload () {
    return this.payload;
  }

  set payload (payload) {
    this.payload = payload;
  }

  get headers () {
    return this.headers;
  }

  set headers (headers) {
    this.headers = headers;
  }

  toJSON () {
    return {
      headers: this.headers,
      payload: this.payload
    };
  }
}

module.exports = Message;
