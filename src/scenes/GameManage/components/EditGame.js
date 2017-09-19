import React, { Component } from 'react';
import LanguageEdit from './LanguageEdit';

class EditGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: props.game
    };
  }

  render() {
    const { game } = this.state;
    return (
      <div>
        <label class="label" htmlFor="guid">
          URL
        </label>
        <input id="guid" class="input uppercase" value={game.guid} />
        <div>{Object.values(game.streams).map(stream => <LanguageEdit stream={stream} />)}</div>
      </div>
    );
  }
}

export default EditGame;
