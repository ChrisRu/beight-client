import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
    fetch('http://localhost:8080/games')
      .then(data => data.json())
      .then(items => {
        this.setState({ items });
      })
      .catch(error => {
        this.setState({ notFoundText: 'Can\'t fetch active games...' });
      });
  }

  render() {
    return (
      <div className="Dashboard container">
        <div className="create">
          <div className="create-blocks">
            {this.state.items.length
              ? this.state.items.map(row =>
                  <Link class="block" to={'/game/' + row.guid} className="Dashboard-item">
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
