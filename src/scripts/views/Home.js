import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { get } from '../util/http';
import parseHTML from '../util/parseHtml';

const markup = `
<!DOCTYPE html>
<html>
  <head>
    <title>Hello</title>
  </head>
  <body>
    <header>
      <h1 class="color" color="blue red">hey</h1>
      <p>hai</p>
    </header>
    <main>
      <!--hey this is cool-->
      <h1>oh boy</h1>
      <div class="container">
        <img src="./game.jpg" alt="game"/>
      </div>
    </main>
  </body>
</html>`.replace(/\t/gm, ' ');

const Button = ({ row }) => (
  <Link className="button" to={{ pathname: '/game/' + row.guid, state: row }}>
    {row.guid}
  </Link>
);

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
      <div className="big-buttons">
        {this.state.items.length ? this.state.items.map(row => <Button row={row} />) : <p>{this.state.notFoundText}</p>}
      </div>
    );
  }
}

const Home = () => (
  <div className="Dashboard container">
    <div>
      <div className="home-title">
        <h1>Code Game Thingio</h1>
        <p>Code with your Buds</p>
      </div>
      <div className="create">
        <Buttons />
      </div>
    </div>
    <div className="background-code">
      <Code />
    </div>
  </div>
);

class Code extends Component {
  constructor() {
    super();
    this.state = {
      markup: ''
    };
    setInterval(() => {
      this.setState(state => ({
        markup: markup.slice(0, state.markup.length + 1)
      }));
    }, 50);
  }
  render() {
    return (
      <code
        dangerouslySetInnerHTML={{
          __html: parseHTML(this.state.markup)
        }}
      />
    );
  }
}

export default Home;
