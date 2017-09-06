import React, { Component } from 'react';
import Modal from './Modal';
import Checkbox from '../components/Checkbox';
import { post } from '../util/http';
import eventhub from '../util/eventhub';
import { LogIn } from 'react-feather';

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      remember: false,
      error: false
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value, error: false });
  };

  handleToggle = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  keyDown = event => {
    if (event.keyCode === 13) {
      this.logIn();
    }
  };

  logIn = () => {
    const { username, password, remember } = this.state;
    return post('/login', { username, password, remember })
      .then(data => {
        eventhub.emit('authenticate', data.authenticated);
        eventhub.emit('overlay:deactivate');
      })
      .catch(error => {
        this.setState({ error: true });
      });
  };

  render() {
    return (
      <Modal active={this.props.active} className={this.state.error ? 'error' : ''}>
        <div className="row">
          <h3 className="modal-title">
            <LogIn class="icon" />
            <span>Log In</span>
          </h3>
        </div>
        <div className="row">
          <div className="col-xs-4">
            <label className="label" htmlFor="username">
              Username
            </label>
          </div>
          <div className="col-xs-8">
            <input
              className="input"
              type="text"
              id="username"
              name="username"
              placeholder="username"
              value={this.state.username}
              onChange={this.handleChange}
              keyDown={this.keyDown}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-4">
            <label className="label" htmlFor="username">
              Password
            </label>
          </div>
          <div className="col-xs-8">
            <input
              className={'input' + (this.state.password ? ' password-spacing' : '')}
              type="password"
              id="password"
              name="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.handleChange}
              keyDown={this.keyDown}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-7">
            <Checkbox id="remember-me" name="remember" checked={this.state.remember} onChange={this.handleToggle} />
            <label htmlFor="remember-me" className="label">
              Remember me?
            </label>
          </div>
          <div className="col-xs-5">
            <button
              className={'button' + (this.state.error ? ' error' : '')}
              disabled={!this.state.password || !this.state.username}
              type="submit"
              onClick={this.logIn}>
              Log In
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

export default LoginModal;
