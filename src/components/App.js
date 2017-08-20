import React, { Component } from 'react';
import Editor from './Editor';
import Dashboard from './Dashboard';
import Home from './Home';


class App extends Component {
  constructor() {
    super();
    this.state = {
      stream: null
    };
    this.updateValue = this.updateValue.bind(this);
  }

  getView() {
    return this.state.stream === null
      ? <Home update={guid => this.updateValue(guid)} />
      : <div className="editors">
        <Editor uri="ws://localhost:8081" editable={true} height="100%" stream={this.state.stream} />
      </div>;
  }

  updateValue(guid) {
    console.log(guid);
    this.setState({ stream: guid });
  }

  render() {
    return (
      <div className="App">
        <div className="navigation">
          <span className="title">DevWars</span>
        </div>
        {this.getView()}
      </div>
    );
  }
}

export default App;
