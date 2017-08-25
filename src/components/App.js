import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
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
          <NavLink to="/dashboard" activeClassName="active">
            <span>Dashboard</span>
          </NavLink>
        </div>
        <Route exact path="/" render={props => <Home {...props} update={this.updateValue} />} />
        <Route path="/dashboard/:type?" render={props => <Dashboard {...props} />} />
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
