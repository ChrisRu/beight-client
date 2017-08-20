import React, { Component } from 'react';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      items: []
    };
    this.openGame = this.openGame.bind(this);
    this.getGames();
  }

  getGames() {
    fetch('http://localhost:8080/games').then(data => data.json()).then(items => {
      this.setState({ items });
    });
  }

  openGame(guid) {
    console.log(guid);
    this.props.update(guid);
  }


  render() {
    return (
      <div className="Dashboard">
        {this.state.items.map(row =>
          <button onClick={() => this.openGame(row.guid)} className="Dashboard-item">{row.guid}</button>
        )
        }
      </div>
    );
  }
}

export default Home;
