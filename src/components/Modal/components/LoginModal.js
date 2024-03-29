import React, { Component } from 'react';
import { LogIn } from 'react-feather';
import eventhub from '@/services/eventhub';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { authenticate } from '@/actions/auth';
import { hideModals } from '@/actions/modals';
import { post } from '@/services/http';
import Modal from '@/components/Modal/Modal';
import Checkbox from '@/components/Checkbox/Checkbox';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      remember: false,
      error: false,
      success: false,
      completed: false
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

  handleVerify = bool => {
    if (bool === false) {
      this.setState({ completed: false });
    }
  };

  keyDown = event => {
    if (event.keyCode === 13) {
      this.logIn();
    }
  };

  logIn = () => {
    this.setState({ completed: true });
    eventhub.emit('input:verify');
    if (this.state.completed === false) {
      this.setState({ error: true });
      return;
    }

    const { username, password, remember } = this.state;
    post('/auth/login', { username, password, remember })
      .then(data => {
        if (data.success === true) {
          this.setState({ success: true });
          this.props.authenticate(true, username);
          this.props.hideModals();
        } else {
          throw new Error('Login failed');
        }
      })
      .catch(() => {
        this.setState({ error: true });
      });
  };

  render() {
    const { error, success } = this.state;
    const statusClass = `${error ? 'error' : ''} ${success
      ? 'success fade-out'
      : ''}`;

    return (
      <Modal active={this.props.modals.loginModal} class={statusClass}>
        <div class="row">
          <h3 class="modal-title">
            <LogIn class="icon" />
            <span>Log In</span>
          </h3>
        </div>
        <div class="row">
          <div class="col-xs-3">
            <label class="label" htmlFor="username">
              Username
            </label>
          </div>
          <div class="col-xs-9">
            <Input
              class="input"
              type="text"
              id="username"
              name="username"
              placeholder="username"
              value={this.state.username}
              onChange={this.handleChange}
              onVerify={this.handleVerify}
              onKeyDown={this.keyDown}
              rules={[
                {
                  rule: "Username field can't be empty",
                  method: value => value && value.length > 0
                }
              ]}
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-3">
            <label class="label" htmlFor="username">
              Password
            </label>
          </div>
          <div class="col-xs-9">
            <Input
              class={`input${this.state.password ? ' password-spacing' : ''}`}
              type="password"
              id="password"
              name="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.handleChange}
              onVerify={this.handleVerify}
              onKeyDown={this.keyDown}
              rules={[
                {
                  rule: "Password field can't be empty",
                  method: value => value && value.length > 0
                }
              ]}
            />
          </div>
        </div>
        <div class="row modal-bottom">
          <div class="col-xs-9">
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
          <div class="pull-right">
            <Button class={statusClass} type="submit" onClick={this.logIn}>
              Log In
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}
const mapStateToProps = ({ modals }) => ({ modals });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ hideModals, authenticate }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
