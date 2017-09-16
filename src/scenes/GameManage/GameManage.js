import React, { Component } from 'react';
import { get, post } from '@/services/http';
import Button from '@/components/Button/Button';

const EditGame = ({ game }) => (
  <div>
    <label class="label" htmlFor="guid">
      URL
    </label>
    <input id="guid" class="input uppercase" value={game.guid} />
    <div>
      {Object.values(game.streams).map(stream => (
        <div class="button">
          <h2>{stream.language.name}</h2>
          <p>{stream.player ? stream.player : 'No player'}</p>
        </div>
      ))}
    </div>
    <pre>{JSON.stringify(game, null, 2)}</pre>
  </div>
);

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

  setActive(gameIndex) {
    this.setState({ active: gameIndex });
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
        <div class="big-buttons">
          {this.state.games.map(({ guid }, index) => (
            <Button onClick={() => this.setActive(index)} class="margin-right margin-bottom">
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
