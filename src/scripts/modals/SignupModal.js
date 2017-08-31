import React, { Component } from 'react';
import Modal from './Modal';
import { post } from '../util/http';

class SignupModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      verifyPassword: '',
      samePassword: false,
      completed: false
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ samePassword: this.state.password === this.state.verifyPassword });
    this.completed();
  };

  keyDown = event => {
    if (event.keyCode === 13) {
      this.signUp();
    }
  };

  signUp = () => {
    if (this.completed()) {
      const { username, password } = this.state;
      return post('/signup', { username, password })
        .then(data => console.log(data))
        .catch(error => {
          console.warn(error);
        });
    }
  };

  completed = () => {
    const completed = this.state.username && this.state.password && this.state.samePassword;
    this.setState({ completed });
  };

  render() {
    return (
      <Modal active={this.props.active}>
        <div className="row">
          <h3 className="modal-title">Sign Up</h3>
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
          <div className="col-xs-4">
            <label className="label" for="username">
              Verify Password
            </label>
          </div>
          <div className="col-xs-8">
            <input
              className={
                'input' +
                (this.state.verifyPassword ? ' password-spacing' : '') +
                (!this.state.samePassword ? ' error' : '')
              }
              type="password"
              id="verifyPassword"
              name="verifyPassword"
              placeholder="verify password"
              value={this.state.verifyPassword}
              onChange={this.handleChange}
              keyDown={this.keyDown}
            />
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
