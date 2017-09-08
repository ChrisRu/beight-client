import React, { Component } from 'react';
import { get } from '@/services/http';
import Button from './components/Button';

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
      .catch(error => {
        this.setState({ notFoundText: "Can't fetch games..." });
      });
  }

  render() {
    return (
      <div class="big-buttons">
        {this.state.items.length ? (
          this.state.items.map(row => <Button row={row} />)
        ) : (
          <p>{this.state.notFoundText}</p>
        )}
      </div>
    );
  }
}

export default Buttons;
