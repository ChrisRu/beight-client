import React, { Component } from 'react';
import { get, post } from '@/services/http';
import Button from '@/components/Button/Button';
import EditGame from './components/EditGame';

class GameManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      error: false,
      loading: true,
      active: -1
    };
    this.getGames();
  }

  setActive(game) {
    this.setState({ active: game });
  }

  async getGames() {
    const games = await get('/games/manage').catch(() => {
      this.setState({ error: 'Failed fetching games...' });
    });
    if (games) {
      this.setState({ loading: true, games, active: 0 });
    }
  }

  async editGame(guid) {
    post(`/games/${guid}/edit`, {}).catch(() => {
      this.setState({ error: 'Failed updating game...' });
    });
  }

  render() {
    return (
      <div class="container">
        <h1>Manage Games</h1>
        <div>
          {this.state.games.map(({ guid }, index) => (
            <Button
              onClick={() => this.setActive(index)}
              class={`big margin-right margin-bottom ${this.state.active === index
                ? 'active'
                : ''}`}
            >
              {guid}
            </Button>
          ))}
        </div>
        {this.state.error && <div>{this.state.error}</div>}

        <div>
          {this.state.active > -1 && <EditGame game={this.state.games[this.state.active]} />}
        </div>
      </div>
    );
  }
}

export default GameManage;
