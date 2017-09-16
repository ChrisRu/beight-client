import React, { Component } from 'react';
import { get } from '@/services/http';
import LinkButton from './components/LinkButton';

class Buttons extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      notFoundText: 'No active games found...',
      markup: ''
    };
    this.getGames();
  }

  getGames() {
    get('/games')
      .then(items => {
        this.setState({ items });
      })
      .catch(() => {
        this.setState({ notFoundText: "Can't fetch games..." });
      });
  }

  render() {
    return (
      <div>
        {this.state.items.length ? (
          this.state.items.map(row => <LinkButton class="big" row={row} />)
        ) : (
          <p>{this.state.notFoundText}</p>
        )}
      </div>
    );
  }
}

export default Buttons;
