import React, { Component } from 'react';
import './NotFound.scss';

class NotFound extends Component {
  componentWillMount() {
    document.querySelector('body').style.background = '#618b8d';
  }

  componentWillUnmount() {
    document.querySelector('body').style.background = '#282828';
  }

  render() {
    return (
      <div class="container">
        <div class="notfound-title">
          <h1 class="title-margin-top">404 - Not Found</h1>
          <p>Oops! Something went wrong :(</p>
        </div>
        <div>
          <div class="dead-bush" />
          <div class="sun" />
          <div class="big-mountain">
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
          <div class="mountain">
            <div />
            <div />
            <div />
          </div>
          <div class="ground">
            <div class="cactus">
              <div />
              <div />
              <div />
            </div>
            <div class="cactus">
              <div />
              <div />
              <div />
            </div>
            <div class="cactus">
              <div />
              <div />
              <div />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;
