import React, { Component } from 'react';
import { Route, Switch, NavLink, withRouter } from 'react-router-dom';
import eventhub from '@/services/eventhub';
import { post } from '@/services/http';
import { handleEnter } from '@/services/accessibility';
import Home from '@/scenes/Home/Home';
import Game from '@/scenes/GameView/GameView';
import GameCreate from '@/scenes/GameCreate/GameCreate';
import NotFound from '@/scenes/NotFound/NotFound';
import LoginModal from '@/components/Modal/components/LoginModal';
import SignupModal from '@/components/Modal/components/SignupModal';
import ConfirmModal from '@/components/Modal/components/ConfirmModal';
import Overlay from '@/components/Overlay/Overlay';
import { LogIn, LogOut, UserPlus } from 'react-feather';
import './App.scss';

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

  logOut = () =>
    post('/auth/logout').then(data => {
      const { authenticated } = data;
      eventhub.emit('authenticate', authenticated);
      this.setState({ logoutModal: false });
      this.props.history.push('/');
    });

  hideModal = () => {
    this.setState({ loginModal: false, signupModal: false, logoutModal: false });
  };

  toggleModal = name => {
    const modalName = `${name}Modal`;
    this.setState(state => ({ [modalName]: !state[modalName] }));
    if (this.state[modalName]) {
      eventhub.emit('overlay:activate');
    } else {
      eventhub.emit('overlay:deactivate');
    }
  };

  render() {
    if (this.props.authenticated) {
      return (
        <div class="app">
          <Overlay />
          <div class="navigation">
            <NavLink tabIndex={0} role="link" exact to="/">
              <span>Beight</span>
            </NavLink>
            <NavLink tabIndex={0} role="link" to="/games/create">
              <span>Create Game</span>
            </NavLink>
            <div class="pull-right">
              <a
                role="link"
                tabIndex={0}
                onClick={() => this.toggleModal('logout')}
                onKeyPress={handleEnter(() => this.toggleModal('logout'))}
              >
                <LogOut class="icon" />
                <span>Log Out</span>
              </a>
            </div>
          </div>

          <Switch>
            <Route exact path="/" render={props => <Home {...props} update={this.updateValue} />} />
            <Route exact path="/game/:guid/:view?" component={Game} />
            <Route exact path="/games/create" component={GameCreate} />
            <Route component={NotFound} />
          </Switch>

          <ConfirmModal
            icon={<LogOut class="icon" />}
            active={this.state.logoutModal}
            confirm={this.logOut}
            confirmText="Log Out"
            title="Log out"
            description="Are you sure you want to log out?"
          />
        </div>
      );
    }
    return (
      <div class="app">
        <Overlay />
        <div class="navigation">
          <NavLink exact to="/">
            <span>Beight</span>
          </NavLink>
          <div class="pull-right">
            <a
              role="button"
              tabIndex={0}
              onClick={() => this.toggleModal('login')}
              onKeyPress={handleEnter(() => this.toggleModal('login'))}
              class={this.state.loginModal && ' active'}
            >
              <LogIn class="icon" />
              <span>Log In</span>
            </a>
            <a
              role="button"
              tabIndex={0}
              onClick={() => this.toggleModal('signup')}
              onKeyPress={handleEnter(() => this.toggleModal('signup'))}
              class={this.state.signupModal && ' active'}
            >
              <UserPlus class="icon" />
              <span>Sign Up</span>
            </a>
          </div>
        </div>

        <Switch>
          <Route exact path="/" render={props => <Home {...props} update={this.updateValue} />} />
          <Route exact path="/game/:guid/:view?" component={Game} />
          <Route component={NotFound} />
        </Switch>

        <LoginModal active={this.state.loginModal} />
        <SignupModal active={this.state.signupModal} />
      </div>
    );
  }
}

export default withRouter(App);
