import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import Editor from './Editor';
import Create from './Create';
import Home from './Home';

class App extends Component {
  constructor() {
    super();
    this.state = {
      stream: null
    };
    this.updateValue = this.updateValue.bind(this);
  }

  updateValue(guid) {
    this.setState({ stream: guid });
  }

  render() {
    return (
      <div className="app">
        <div className="navigation">
          <NavLink exact to="/" activeClassName="active">
            <span className="title">DevWars</span>
          </NavLink>
          <NavLink to="/create" activeClassName="active">
            <span>Create</span>
          </NavLink>
        </div>
        <Route exact path="/" render={props => <Home {...props} update={this.updateValue} />} />
        <Route exact path="/create" render={props => <Create {...props} />} />
        <Route
          exact
          path="/game/:guid"
          render={props =>
            <Editor {...props} uri="ws://localhost:8081" editable={true} height="100%" />}
        />
      </div>
    );
  }
}

export default App;
