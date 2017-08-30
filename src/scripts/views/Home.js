import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { get } from '../util/http';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      notFoundText: 'No active games found...'
    };
    this.getGames();
  }

  getGames() {
    get('/games')
      .then(items => {
        this.setState({ items });
      })
      .catch(error => {
        this.setState({ notFoundText: 'Can\'t fetch games...' });
      });
  }

  render() {
    return (
      <div className="Dashboard container">
        <div className="create">
          <div className="big-buttons">
            {this.state.items.length
              ? this.state.items.map(row =>
                  <Link className="button" to={'/game/' + row.guid}>
                    {row.guid}
                  </Link>
                )
              : <p>{this.state.notFoundText}</p>}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
