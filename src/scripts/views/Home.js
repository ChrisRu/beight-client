import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { get } from '../util/http';
import parseHTML from '../util/parseHtml';

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
        /*
        document.body.innerHTML = '<pre>' + parseHTML(
          '<h1 class="color" color="blue red">hey</h1><p>hai</p><!--hey this is cool--><h1>oh boy</h1><!--<p color="red">asdfp</p>-->'
        ) + '</pre>';
        */
      })
      .catch(error => {
        this.setState({ notFoundText: "Can't fetch games..." });
      });
  }

  render() {
    return (
      <div className="Dashboard container">
        <div className="create">
          <div className="big-buttons">
            {this.state.items.length ? (
              this.state.items.map(row => (
                <Link className="button" to={{ pathname: '/game/' + row.guid, state: row }}>
                  {row.guid}
                </Link>
              ))
            ) : (
              <p>{this.state.notFoundText}</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
