import React, { Component } from 'react';
import Modal from './Modal';
import { post } from '../util/http';
import eventhub from '../util/eventhub';
import { UserPlus } from 'react-feather';

class SignupModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      verifyPassword: '',
      samePassword: false,
      completed: false,
      invalidPassword: false
    };
  }

  handleChange = event => {
    // Seperate calls so event target value is updated before checking requirements
    this.setState({ [event.target.name]: event.target.value });
    this.setState({
      samePassword: this.validateVerifyPassword(),
      invalidPassword: this.validatePassword()
    });
    this.completed();
  };

  validateVerifyPassword() {
    return !this.state.verifyPassword || this.state.password === this.state.verifyPassword;
  }

  validatePassword() {
    return !(this.state.password && this.state.password.length > 5);
  }

  keyDown = event => {
    if (event.keyCode === 13) {
      this.signUp();
    }
  };

  signUp = () => {
    if (this.state.completed) {
      const { username, password } = this.state;
      return post('/signup', { username, password })
        .then(data => {
          if (data.success === true) {
            eventhub.emit('overlay:deactivate');
          } else {
            throw new Error('Signup failed');
          }
        })
        .catch(error => {
          console.warn(error);
        });
    }
  };

  completed = () => {
    const completed = this.state.username && !this.validatePassword() && this.validateVerifyPassword();
    this.setState({ completed });
  };

  render() {
    return (
      <Modal active={this.props.active}>
        <div className="row">
          <h3 className="modal-title">
            <UserPlus class="icon" />
            <span>Sign Up</span>
          </h3>
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
          <div className="col-xs-8 relative">
            <input
              className={
                'input' +
                (this.state.password ? ' password-spacing' : '') +
                (this.state.invalidPassword ? ' error' : '')
              }
              type="password"
              id="password"
              name="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.handleChange}
              keyDown={this.keyDown}
            />
            {this.state.invalidPassword && (
              <div className="input-message error">
                <p>Password should be at least 6 characters</p>
              </div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-xs-4">
            <label className="label" for="username">
              Verify Password
            </label>
          </div>
          <div className="col-xs-8 relative">
            <input
              className={
                'input' +
                (this.state.verifyPassword ? ' password-spacing' : '') +
                (!this.validateVerifyPassword() ? ' error' : '')
              }
              type="password"
              id="verifyPassword"
              name="verifyPassword"
              placeholder="verify password"
              value={this.state.verifyPassword}
              onChange={this.handleChange}
              keyDown={this.keyDown}
            />
            {!this.validateVerifyPassword() && (
              <div className="input-message error">
                <p>Passwords don't match</p>
              </div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="pull-right">
            <button className="button" disabled={!this.state.completed} type="submit" onClick={this.signUp}>
              Sign Up
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

export default SignupModal;