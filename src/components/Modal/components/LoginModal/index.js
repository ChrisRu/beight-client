import React, { Component } from 'react';
import { LogIn } from 'react-feather';
import eventhub from '@/services/eventhub';
import { post } from '@/services/http';
import Modal from '@/components/Modal';
import Checkbox from '@/components/Checkbox';

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      remember: false,
      error: false,
      success: false
    };
  }

  componentWillReceiveProps(props) {
    if (props.active !== this.props.active) {
      this.setState({ error: false, success: false });
    }
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
        this.setState({ success: data.success });
        setTimeout(() => {
          eventhub.emit('authenticate', data.success);
          eventhub.emit('overlay:deactivate');
        }, 100);
      })
      .catch(() => {
        eventhub.emit('authenticate', false);
        this.setState({ error: true });
      });
  };

  render() {
    const statusClass = `${this.state.error ? 'error' : ''} ${this.state.success ? 'success fade-out' : ''}`;

    return (
      <Modal active={this.props.active} class={statusClass}>
        <div class="row">
          <h3 class="modal-title">
            <LogIn class="icon" />
            <span>Log In</span>
          </h3>
        </div>
        <div class="row">
          <div class="col-xs-4">
            <label class="label" htmlFor="username">
              Username
            </label>
          </div>
          <div class="col-xs-8">
            <input
              class="input"
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
        <div class="row">
          <div class="col-xs-4">
            <label class="label" htmlFor="username">
              Password
            </label>
          </div>
          <div class="col-xs-8">
            <input
              class={`input${this.state.password ? ' password-spacing' : ''}`}
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
        <div class="row">
          <div class="col-xs-7">
            <Checkbox
              id="remember-me"
              name="remember"
              checked={this.state.remember}
              onChange={this.handleToggle}
            />
            <label htmlFor="remember-me" class="label">
              Remember me?
            </label>
          </div>
          <div class="col-xs-5">
            <button
              class={`button ${statusClass}`}
              disabled={!this.state.password || !this.state.username}
              type="submit"
              onClick={this.logIn}
            >
              Log In
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

export default LoginModal;
