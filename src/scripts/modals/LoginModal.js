import React, { Component } from 'react';
import Modal from './Modal';
import Checkbox from '../components/Checkbox';
import queryString from 'query-string';

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      remember: false
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
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
    return fetch('http://localhost:8080/login', {
      method: 'POST',
      body: queryString.stringify({ username, password, remember })
    })
      .then(data => console.log(data))
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <Modal active={this.props.active}>
        <div className="row">
          <h3 className="modal-title">Log In</h3>
        </div>
        <div className="row">
          <div className="col-xs-4">
            <label className="label" for="username">
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
            <label className="label" for="username">
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
            <label for="remember-me" className="label">
              Remember me?
            </label>
          </div>
          <div className="col-xs-5">
            <button
              className="button"
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
