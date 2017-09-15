import React, { Component } from 'react';
import { Route, Switch, NavLink, withRouter } from 'react-router-dom';
import eventhub from '@/services/eventhub';
import { post } from '@/services/http';
import { handleEnter } from '@/services/accessibility';
import Home from '@/scenes/Home/Home';
import GameView from '@/scenes/GameView/GameView';
import GameCreate from '@/scenes/GameCreate/GameCreate';
import GameManage from '@/scenes/GameManage/GameManage';
import NotFound from '@/scenes/NotFound/NotFound';
import LoginModal from '@/components/Modal/components/LoginModal';
import SignupModal from '@/components/Modal/components/SignupModal';
import ConfirmModal from '@/components/Modal/components/ConfirmModal';
import Overlay from '@/components/Overlay/Overlay';
import { LogIn, LogOut, UserPlus } from 'react-feather';
import './App.scss';

const LoggedInLinks = ({ toggleModal }) => (
  <div class="navigation">
    <NavLink tabIndex={0} role="link" exact to="/">
      <span tabIndex={-1}>Beight</span>
    </NavLink>
    <NavLink tabIndex={0} role="link" to="/games/manage">
      <span tabIndex={-1}>Manage Games</span>
    </NavLink>
    <NavLink tabIndex={0} role="link" to="/games/create">
      <span tabIndex={-1}>Create Game</span>
    </NavLink>
    <div class="pull-right">
      <a
        role="link"
        tabIndex={0}
        onClick={() => toggleModal('logout')}
        onKeyPress={handleEnter(() => toggleModal('logout'))}
      >
        <span tabIndex={-1}>
          <LogOut class="icon" />
          <span>Log Out</span>
        </span>
      </a>
    </div>
  </div>
);

const LoggedOutLinks = ({ toggleModal, loginModal, signupModal }) => (
  <div class="navigation">
    <NavLink exact to="/">
      <span tabIndex={-1}>Beight</span>
    </NavLink>
    <div class="pull-right">
      <a
        role="button"
        tabIndex={0}
        onClick={() => toggleModal('login')}
        onKeyPress={handleEnter(() => toggleModal('login'))}
        class={loginModal && ' active'}
      >
        <span tabIndex={-1}>
          <LogIn class="icon" />
          <span>Log In</span>
        </span>
      </a>
      <a
        role="button"
        tabIndex={0}
        onClick={() => toggleModal('signup')}
        onKeyPress={handleEnter(() => toggleModal('signup'))}
        class={signupModal && ' active'}
      >
        <span tabIndex={-1}>
          <UserPlus class="icon" />
          <span>Sign Up</span>
        </span>
      </a>
    </div>
  </div>
);

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
    return (
      <div class="app">
        <Overlay />

        {this.props.authenticated ? (
          <LoggedInLinks toggleModal={this.toggleModal} />
        ) : (
          <LoggedOutLinks
            toggleModal={this.toggleModal}
            loginModal={this.state.loginModal}
            signupModal={this.state.signupModal}
          />
        )}

        <Switch>
          <Route exact path="/" render={props => <Home {...props} update={this.updateValue} />} />
          <Route exact path="/game/:guid/:view?" component={GameView} />
          {this.props.authenticated && [
            <Route exact path="/games/manage" component={GameManage} />,
            <Route exact path="/games/create" component={GameCreate} />
          ]}
          <Route component={NotFound} />
        </Switch>

        {this.props.authenticated ? (
          <ConfirmModal
            icon={<LogOut class="icon" />}
            active={this.state.logoutModal}
            confirm={this.logOut}
            confirmText="Log Out"
            title="Log out"
            description="Are you sure you want to log out?"
          />
        ) : (
        [
          <LoginModal active={this.state.loginModal} />,
          <SignupModal active={this.state.signupModal} />
        ]
        )}
      </div>
    );
  }
}

export default withRouter(App);
