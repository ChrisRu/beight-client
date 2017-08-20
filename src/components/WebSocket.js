import Promise from 'bluebird';

class Ws {
  constructor(uri, options = {}) {
    this.connected = false;
    this._listeners = [];
    this._disconnectListeners = [];
    this._connectListeners = [];
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

  createWebSocket() {
    this.ws = new WebSocket(this.uri);

    this.ws.addEventListener('open', () => {
      this._connectBool(true);
    });
    this.ws.addEventListener('close', event => {
      switch (event) {
        case 1000: {
          console.log('Regular close');
          break;
        }
        default: {
          setTimeout(() => {
            console.log('Trying to reconnect...');
            // this.createWebSocket();
            return;
          }, 3000);
        }
      }
      this._connectBool(true);
    });
    this.ws.addEventListener('reconnected', () => this._connectBool(true));
    this.ws.addEventListener('end', () => this._connectBool(false));

    this.ws.addEventListener('message', message => {
      const data = JSON.parse(message.data);
      if (data) {
        this._listeners.forEach(listener => listener.call(null, data));
      }
    });
  }

  _connectBool(bool) {
    this.connected = bool;
    if (bool) {
      this._connectListeners.forEach(listener => listener());
    } else {
      this._disconnectListeners.forEach(listener => listener());
    }
  }

  post(data) {
    this.ws.send(JSON.stringify(data));
    return this;
  }

  listen(method) {
    this._listeners.push(method);
    return this;
  }

  onConnect(method) {
    this._connectListeners.push(method);
    return this;
  }

  onDisconnect(method) {
    this._disconnectListeners.push(method);
    return this;
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
