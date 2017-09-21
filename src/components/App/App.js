import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authenticate } from '@/actions/auth';
import { post, get } from '@/services/http';
import Home from '@/scenes/Home/Home';
import GameView from '@/scenes/GameView/GameView';
import GameCreate from '@/scenes/GameCreate/GameCreate';
import GameManage from '@/scenes/GameManage/GameManage';
import NotFound from '@/scenes/NotFound/NotFound';
import LoginModal from '@/components/Modal/components/LoginModal';
import SignupModal from '@/components/Modal/components/SignupModal';
import ConfirmModal from '@/components/Modal/components/ConfirmModal';
import ErrorModal from '@/components/Modal/components/ErrorModal';
import Overlay from '@/components/Overlay/Overlay';
import { LogOut } from 'react-feather';
import LoggedInLinks from './components/LoggedInLinks';
import LoggedOutLinks from './components/LoggedOutLinks';
import './App.scss';

class App extends Component {
  componentWillMount() {
    return get('/auth/loggedin')
      .then(({ success, authenticated, username }) => {
        if (success) {
          this.props.authenticate(authenticated, username);
        }
      })
      .catch(() => this.props.authenticate(false));
  }

  logOut = () =>
    post('/auth/logout').then(({ success, authenticated }) => {
      if (success) {
        this.props.authenticate(authenticated);
        this.props.history.push('/');
      }
    });

  render() {
    return (
      <div class="app">
        <Overlay />

        {this.props.auth.authenticated ? <LoggedInLinks /> : <LoggedOutLinks />}

        <Switch>
          <Route
            exact
            path="/"
            render={props => <Home {...props} update={this.updateValue} />}
          />
          <Route exact path="/game/:guid/:view?" component={GameView} />
          <Route
            exact
            path="/games/manage"
            render={() =>
              this.props.auth.authenticated ? <GameManage /> : null}
          />,
          <Route
            exact
            path="/games/create"
            render={() =>
              this.props.auth.authenticated ? <GameCreate /> : null}
          />
          <Route component={NotFound} />
        </Switch>

        {this.props.auth.authenticated ? (
          <ConfirmModal
            icon={<LogOut class="icon" />}
            confirm={this.logOut}
            confirmText="Log Out"
            title="Log out"
            description="Are you sure you want to log out?"
          />
        ) : (
          [<LoginModal />, <SignupModal />]
        )}

        <ErrorModal />
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ authenticate }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
