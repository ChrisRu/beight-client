import React, { Component } from 'react';
import { UserPlus } from 'react-feather';
import eventhub from '@/services/eventhub';
import { post } from '@/services/http';
import Modal from '@/components/Modal';
import Input from '@/components/Input';

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
        });
    }
    return Promise.reject("Signup hasn't been completed yet");
  };

  completed = () => {
    const completed =
      this.state.username && !this.validatePassword() && this.validateVerifyPassword();
    this.setState({ completed });
  };

  render() {
    return (
      <Modal active={this.props.active}>
        <div class="row">
          <h3 class="modal-title">
            <UserPlus class="icon" />
            <span>Sign Up</span>
          </h3>
        </div>
        <div class="row">
          <div class="col-xs-4">
            <label class="label" htmlFor="username">
              Username
            </label>
          </div>
          <div class="col-xs-8">
            <Input
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
          <div class="col-xs-8 relative">
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.handleChange}
              keyDown={this.keyDown}
              rules={[
                {
                  rule: 'Password should be at least 6 characters',
                  method: value => value && value.length < 6
                }
              ]}
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-4">
            <label class="label" htmlFor="username">
              Verify Password
            </label>
          </div>
          <div class="col-xs-8 relative">
            <Input
              type="password"
              id="verifyPassword"
              name="verifyPassword"
              placeholder="verify password"
              value={this.state.verifyPassword}
              onChange={this.handleChange}
              keyDown={this.keyDown}
              rules={[
                {
                  rule: "Passwords don't match",
                  method: value => value && value !== this.state.password
                }
              ]}
            />
          </div>
        </div>
        <div class="row">
          <div class="pull-right">
            <button
              class="button"
              disabled={!this.state.completed}
              type="submit"
              onClick={this.signUp}
            >
              Sign Up
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

export default SignupModal;
