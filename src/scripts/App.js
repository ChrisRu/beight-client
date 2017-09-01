import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import eventhub from './util/eventhub';
import { post } from './util/http';
import Home from './views/Home';
import Game from './views/Game';
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

  hideModal = () => {
    this.setState({ loginModal: false, signupModal: false, logoutModal: false });
  };

  toggleModal = name => {
    name = name + 'Modal';
    this.setState(prevState => ({ [name]: !prevState[name] }));
    if (this.state[name]) {
      eventhub.emit('overlay:activate');
    } else {
      eventhub.emit('overlay:deactivate');
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
            <div className="pull-right">
              <a role="button" onClick={() => this.toggleModal('logout')}>
                <span>Log Out</span>
              </a>
            </div>
          </div>
          <Route exact path="/" render={props => <Home {...props} update={this.updateValue} />} />
          <Route exact path="/game/:guid/:view?" component={Game} />
          <Route exact path="/create-game" component={GameCreate} />

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
            <div className="pull-right">
              <a
                role="button"
                onClick={() => this.toggleModal('login')}
                className={this.state.loginModal ? ' active' : ''}>
                <span>Log In</span>
              </a>
              <a
                role="button"
                onClick={() => this.toggleModal('signup')}
                className={this.state.signupModal ? ' active' : ''}>
                <span>Sign Up</span>
              </a>
            </div>
            <LoginModal active={this.state.loginModal} />
            <SignupModal active={this.state.signupModal} />
          </div>
          <Route exact path="/" render={props => <Home {...props} update={this.updateValue} />} />
          <Route exact path="/game/:guid/:view?" component={Game} />
        </div>
      );
    }
  }
}

export default App;
