import React, { Component } from 'react';
import { UserPlus } from 'react-feather';
import eventhub from '@/services/eventhub';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hideModals } from '@/actions/modals';
import { post, get } from '@/services/http';
import Modal from '@/components/Modal/Modal';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';

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
    post('/auth/signup', { username, password })
      .then(data => {
        if (data.success === true) {
          this.setState({ success: true });
          this.props.hideModals();
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
    const statusClass = `${error ? 'error' : ''} ${success
      ? 'success fade-out'
      : ''}`;

    return (
      <Modal active={this.props.modals.signupModal} class={statusClass}>
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
              onVerify={this.verify}
              onKeyDown={this.keyDown}
              rules={[
                {
                  rule: 'Username should be at least 4 characters',
                  method: value => value && value.length > 3
                },
                {
                  rule: 'Username is already taken',
                  method: async value => {
                    if (value) {
                      const user = await get(`/exists/username/${value}`);
                      return user.exists === false;
                    }
                    return false;
                  }
                }
              ]}
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
                  rule: "Verify password can't be empty",
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
            <Button type="submit" onClick={this.signUp}>
              Sign Up
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = ({ modals }) => ({ modals });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ hideModals }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignupModal);
