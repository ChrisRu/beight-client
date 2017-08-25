import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      items: []
    };
    this.getGames();
  }

  getGames() {
    fetch('http://localhost:8080/games').then(data => data.json()).then(items => {
      this.setState({ items });
    });
  }

  render() {
    return (
      <div className="Dashboard container">
        <div className="create">
          <div className="create-blocks">
            {this.state.items.map(row =>
              <Link class="block" to={'/game/' + row.guid} className="Dashboard-item">
                {row.guid}
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
