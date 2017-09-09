class Eventhub {
  constructor() {
    this.listeners = [];
  }

  on(string, handler) {
    Eventhub.testHandler(handler);
    this.listeners = this.listeners.concat({ string, handler });
    return this;
  }

  onAll(handler) {
    Eventhub.testHandler(handler);
    this.listeners = this.listeners.concat({ string: -1, handler });
    return this;
  }

  once(string, handler) {
    Eventhub.testHandler(handler);
    this.on(string, () => {
      Eventhub.exec(handler);
      this.remove(string);
    });
    return this;
  }

  remove(string, handler) {
    const noHandler = handler === undefined;
    this.listeners = this.listeners.filter(listener => {
      const sameString = listener.string === string || listener.string === -1;
      const sameHandler = handler === listener.handler;
      return !((sameString && noHandler) || sameHandler);
    });
    return this;
  }

  emit(string, ...args) {
    this.listeners
      .filter(listener => listener.string === string || listener.string === -1)
      .forEach(listener => Eventhub.exec(listener.handler, args));
    return this;
  }

  static exec(handler, args) {
    handler(...args);
  }

  static testHandler(handler) {
    if (typeof handler !== 'function') {
      throw new Error(`Event handler can't be of type '${typeof handler}'`);
    }
  }

  get isListening() {
    return this.listeners.length > 0;
  }
}

export default new Eventhub();
