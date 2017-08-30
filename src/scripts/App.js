import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import eventhub from './util/eventhub';
import Home from './views/Home';
import Editor from './components/Editor';
import GameCreate from './views/GameCreate';
import LoginModal from './modals/LoginModal';
import Overlay from './components/Overlay';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stream: null,
      loginModal: false,
      overlay: false
    };
    eventhub.on('overlay:deactivated', this.hideLoginModal);
  }

  componentWillUnmount() {
    eventhub.remove('overlay:deactivated', this.hideLoginModal);
  }

  updateValue = guid => {
    this.setState({ stream: guid });
  };

  hideLoginModal = () => {
    this.setState({ loginModal: false });
  };

  toggleLoginModal = event => {
    this.setState(prevState => ({ loginModal: !prevState.loginModal }));
    if (event !== undefined) {
      if (this.state.loginModal) {
        eventhub.emit('overlay:activate');
      } else {
        eventhub.emit('overlay:deactivate');
      }
    }
  };

  render() {
    return (
      <div className="app">
        <Overlay />
        <div className="navigation">
          <NavLink exact to="/">
            <span>Games</span>
          </NavLink>
          <NavLink to="/create-game">
            <span>Create Game</span>
          </NavLink>
          <a
            role="button"
            onClick={this.toggleLoginModal}
            className={'pull-right' + (this.state.loginModal ? ' active' : '')}>
            <span>Log In</span>
          </a>
          <LoginModal active={this.state.loginModal} />
        </div>
        <Route exact path="/" render={props => <Home {...props} update={this.updateValue} />} />
        <Route
          exact
          path="/game/:guid"
          render={props => <Editor {...props} uri="ws://localhost:8081" editable={true} height="100%" />}
        />
        <Route exact path="/create-game" render={props => <GameCreate {...props} />} />
      </div>
    );
  }
}

export default App;
