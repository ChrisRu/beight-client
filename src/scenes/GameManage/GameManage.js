import React, { Component } from 'react';
import { get } from '@/services/http';

class GameManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      error: false,
      loading: true
    };
    this.getGames();
  }

  async getGames() {
    const games = await get('/games/manage').catch(() => {
      this.setState({ error: true });
    });
    if (games) {
      this.setState({ loading: true, games });
    }
  }

  render() {
    return (
      <div class="container">
        <h1>Manage Games</h1>
        <div class="big-buttons">
          {this.state.games.map(game => (
            <button class="button margin-right margin-bottom">{game.guid}</button>
          ))}
        </div>
        {this.state.error && <div>Failed fetching games...</div>}
      </div>
    );
  }
}

export default GameManage;
