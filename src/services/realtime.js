import * as auth from './auth';

class RealTime {
  constructor() {
    this.endpoint = 'wss://stage.bitcoinbot.pro/echo?access_token=' + auth.getToken();
    this.listeners = {};
    this.sendQueue = [];
    this.connected = false;
    this.connection = null;
    this.subscribtions = {};

    this.__connect();
  }

  __connect = () => {
    this.connected = false;
    this.connection = new WebSocket(this.endpoint);

    this.connection.onopen = () => {
      this.connected = true;
      console.log('[WS] Connected');

      // resolve queue
      for (let event of this.sendQueue) {
        this.connection.send(JSON.stringify(event));
      }

      this.__restoreSubscriptions();
    };

    this.connection.onerror = (error) => {
      console.log('[WS] Error: ', error.message);
    };

    this.connection.onclose = () => {
      this.connected = false;
      this.triggerListeners('close_connection');
      console.log('[WS] Disconnected, reconnection..');
      setTimeout(this.__connect, 5000);
    };

    this.connection.onmessage = this.__messageDidReceive;
  };

  __messageDidReceive = ({ data }) => {
    let messages = data.split('\n');
    for (let message of messages) {
      let json;
      try {
        json = JSON.parse(message);
      } catch (e) {
        console.log('[WS] Error:', e.message, message);
        continue;
      }

      //console.log('[WS]', json);
      if (this.listeners[json.type]) {
        for (let listener of this.listeners[json.type]) {
          console.log("json:", json);
          listener(json.body);
        }
      }
    }
  };

  __send(action, params = {}) {
    const event = {action, params};

    if (!this.connected) {
      this.sendQueue.push(event);
    } else {
      this.connection.send(JSON.stringify(event));
    }
  };

  addListener(name, callback) {
    if (!this.listeners[name]) {
      this.listeners[name] = [];
    }
    this.listeners[name].push(callback);
  }

  removeListener(name, callback) {
    if (!this.listeners[name]) {
      return;
    }

    for (let i = 0; i < this.listeners[name].length; i++) {
      if (this.listeners[name][i] === callback) {
        this.listeners[name].slice(i, 1);
      }
    }
  }

  triggerListeners(name, data = {}) {
    console.log('triggerListeners');
    if (!this.listeners[name]) {
      return;
    }

    for (let listener of this.listeners[name]) {
      listener(data);
    }
  }

  subscribe(channel) {
    this.subscribtions[channel] = true;
    this.__send('subscribe', { channel });
  }

  unsubscribe(channel) {
    delete this.subscribtions[channel];
    this.__send('unsubscribe', { channel });
  }

  __restoreSubscriptions() {
    for (let channel in this.subscribtions) {
      this.subscribe(channel);
    }
  }
}

export let shared;

export default function init() {
  shared = new RealTime();
}
