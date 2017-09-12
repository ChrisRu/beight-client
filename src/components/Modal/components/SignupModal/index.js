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
      error: false,
      success: false,
      completed: false
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value, error: false });
  };

  keyDown = event => {
    if (event.keyCode === 13) {
      this.signUp();
    }
  };

  signUp = () => {
    this.setState({ completed: true });
    eventhub.emit('input:verify');
    if (this.state.completed === false) {
      this.setState({ error: true });
      return;
    }

    const { username, password } = this.state;
    post('/signup', { username, password })
      .then(data => {
        if (data.success === true) {
          this.setState({ success: true });
          eventhub.emit('overlay:deactivate');
        } else {
          throw new Error('Create account failed');
        }
      })
      .catch(() => {
        this.setState({ error: true });
      });
  };

  verify = bool => {
    if (bool === false) {
      this.setState({ completed: false });
    }
  };

  render() {
    const { error, success } = this.state;
    const statusClass = `${error ? 'error' : ''} ${success ? 'success fade-out' : ''}`;

    return (
      <Modal active={this.props.active} class={statusClass}>
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
              onKeyDown={this.keyDown}
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
              onVerify={this.verify}
              onKeyDown={this.keyDown}
              rules={[
                {
                  rule: 'Password should be at least 6 characters',
                  method: value => value && value.length > 5
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
              onVerify={this.verify}
              onKeyDown={this.keyDown}
              rules={[
                {
                  rule: 'Verify password can\'t be empty',
                  method: value => value
                },
                {
                  rule: "Passwords don't match",
                  method: value => value === this.state.password
                }
              ]}
            />
          </div>
        </div>
        <div class="row modal-bottom">
          <div class="pull-right">
            <button class="button" type="submit" onClick={this.signUp}>
              Sign Up
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

export default SignupModal;
