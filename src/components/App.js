import React, { Component } from 'react';
import WebSocket from './WebSocket';
import Editor from './Editor';

const socket = new WebSocket('ws://localhost:8081');
socket.listen(data => {
  console.log(data);
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Editor />
      </div>
    );
  }
}

export default App;
