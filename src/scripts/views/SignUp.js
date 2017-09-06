import React, { Component } from 'react';
import { post } from '../util/http';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      username: '',
      success: false,
      fail: false
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  signUp = () => {
    const body = {
      username: this.state.username,
      password: this.state.password
    };

    return post('/signup', body)
      .then(data => {
        console.log('success', data);

      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <div>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor="username">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </div>
        <button disabled={!this.state.password || !this.state.username} type="submit" onClick={this.signUp}>
          Sign Up
        </button>
      </div>
    );
  }
}

export default Login;
