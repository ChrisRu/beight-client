class Ws {
  constructor(uri, options = {}) {
    this.connected = false;
    this.listeners = [];
    this.disconnectListeners = [];
    this.connectListeners = [];
    this.ws = null;
    this.uri = uri;
    this.options = {
      reconnect: {
        max: Infinity,
        min: 300,
        retries: 100
      }
    };
    this.options = Object.assign(this.options, options);

    this.createWebSocket();
  }

  static log(message) {
    console.log(`[WS]: ${message}`); // eslint-disable-line no-console
  }

  createWebSocket() {
    this.ws = new WebSocket(this.uri);

    this.ws.addEventListener('open', () => {
      Ws.log('Connected to WebSocket');
      this.connectBool(true);
    });
    this.ws.addEventListener('close', event => {
      switch (event) {
        case 1000: {
          break;
        }
        default: {
          setTimeout(() => {
            Ws.log('Trying to reconnect...');
            this.createWebSocket();
          }, 3000);
        }
      }
      Ws.log('WebSocket connection closed');
      this.connectBool(true);
    });
    this.ws.addEventListener('reconnected', () => {
      Ws.log('Reconnected to WebSocket');
      this.connectBool(true);
    });
    this.ws.addEventListener('end', () => {
      Ws.log('WebSocket connection ended');
      this.connectBool(false);
    });

    this.ws.addEventListener('message', message => {
      const data = JSON.parse(message.data);
      if (data) {
        this.listeners.forEach(listener => listener.call(null, data));
      }
    });
  }

  connectBool(bool) {
    this.connected = bool;
    if (bool) {
      this.connectListeners.forEach(listener => listener());
    } else {
      this.disconnectListeners.forEach(listener => listener());
    }
  }

  post(data) {
    this.ws.send(JSON.stringify(data, null, 0));
    return this;
  }

  listen(method) {
    this.listeners.push(method);
    return this;
  }

  onConnect(method) {
    this.connectListeners.push(method);
    return this;
  }

  onDisconnect(method) {
    this.disconnectListeners.push(method);
    return this;
  }

  close() {
    this.ws.close();
  }

  get id() {
    return new Promise((resolve, reject) => {
      if (!this.connected) {
        reject('No connection yet');
      }
      this.ws.id(id => {
        if (id) {
          resolve(id);
        }
      });
    });
  }
}

export default Ws;
