import Primus from '../libs/primus.js';

class WebSocket {
  constructor(uri, options) {
    this.connected = false;
    this._listeners = [];
    this.options = {
      reconnect: {
        max: Infinity,
        min: 300,
        retries: 100
      }
    };

    this.uri = uri;
    this.options = Object.assign(this.options, options || {});
    this._ws = Primus.connect(this.uri, this.options);

    this._ws.on('open', () => this._connectBool(true));
    this._ws.on('close', () => this._connectBool(false));
    this._ws.on('reconnected', () => this._connectBool(true));

    this._ws.on('data', data => {
      this._listeners
        .filter(listener => typeof listener === 'function')
        .forEach(listener => listener(data));
    });
  }

  _connectBool(bool) {
    this.connected = bool;
  }

  post(data) {
    this._ws.write(data);
    return this;
  }

  listen(method) {
    this._listeners.push(method);
    return this;
  }
}

export default WebSocket;
