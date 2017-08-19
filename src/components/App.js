import React, { Component } from 'react';
import Editor from './Editor';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="navigation">
          <span className="title">DevWars</span>
        </div>
        <div className="editors">
          <Editor uri="ws://localhost:8081" editable={true} height="100%" id="1" />
        </div>
      </div>
    );
  }
}

export default App;
