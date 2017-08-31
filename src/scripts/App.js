import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import eventhub from './util/eventhub';
import { post } from './util/http';
import Home from './views/Home';
import Editor from './components/Editor';
import GameCreate from './views/GameCreate';
import LoginModal from './modals/LoginModal';
import SignupModal from './modals/SignupModal';
import ConfirmModal from './modals/ConfirmModal';
import Overlay from './components/Overlay';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stream: null,
      loginModal: false,
      signupModal: false,
      logoutModal: false,
      overlay: false
    };
    eventhub.on('overlay:deactivated', this.hideModal);
  }

  componentWillUnmount() {
    eventhub.remove('overlay:deactivated', this.hideModal);
  }

  logOut = () => {
    return post('/logout').then(data => {
      const { authenticated } = data;
      eventhub.emit('authenticate', authenticated);
      this.setState({ logoutModal: false });
    });
  };

  updateValue = guid => {
    this.setState({ stream: guid });
  };

  hideModal = () => {
    this.setState({ loginModal: false, signupModal: false, logoutModal: false });
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

  toggleSignupModal = event => {
    this.setState(prevState => ({ signupModal: !prevState.signupModal }));
    if (event !== undefined) {
      if (this.state.signupModal) {
        eventhub.emit('overlay:activate');
      } else {
        eventhub.emit('overlay:deactivate');
      }
    }
  };

  toggleLogoutModal = event => {
    this.setState(prevState => ({ logoutModal: !prevState.logoutModal }));
    if (event !== undefined) {
      if (this.state.logoutModal) {
        eventhub.emit('overlay:activate');
      } else {
        eventhub.emit('overlay:deactivate');
      }
    }
  };

  render() {
    if (this.props.authenticated) {
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
            <div class="pull-right">
              <a role="button" onClick={this.toggleLogoutModal}>
                <span>Log Out</span>
              </a>
            </div>
          </div>
          <Route exact path="/" render={props => <Home {...props} update={this.updateValue} />} />
          <Route
            exact
            path="/game/:guid"
            render={props => <Editor {...props} uri="ws://localhost:8081" editable={true} height="100%" />}
          />
          <Route exact path="/create-game" render={props => <GameCreate {...props} />} />
          <ConfirmModal
            active={this.state.logoutModal}
            confirm={this.logOut}
            confirmText="Log Out"
            title="Log out"
            description="Are you sure you want to log out?"
          />
        </div>
      );
    } else {
      return (
        <div className="app">
          <Overlay />
          <div className="navigation">
            <NavLink exact to="/">
              <span>Games</span>
            </NavLink>
            <div class="pull-right">
              <a role="button" onClick={this.toggleLoginModal} className={this.state.loginModal ? ' active' : ''}>
                <span>Log In</span>
              </a>
              <a role="button" onClick={this.toggleSignupModal} className={this.state.signupModal ? ' active' : ''}>
                <span>Sign Up</span>
              </a>
            </div>
            <LoginModal active={this.state.loginModal} />
            <SignupModal active={this.state.signupModal} />
          </div>
          <Route exact path="/" render={props => <Home {...props} update={this.updateValue} />} />
          <Route
            exact
            path="/game/:guid"
            render={props => <Editor {...props} uri="ws://localhost:8081" editable={true} height="100%" />}
          />
        </div>
      );
    }
  }
}

export default App;
