import React, { Component } from 'react';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: null,
      type: null
    };
  }

  setType = type => {
    const booleans = type.split('');
    return this.setState({
      languages: { HTML: booleans[0] === '1', CSS: booleans[1] === '1', JavaScript: booleans[2] === '1' },
      type
    });
  };

  toggleLanguage = index => {
    const { type } = this.state;
    const newValue = type.charAt(index) === '1' ? '0' : '1';
    this.setType(type.substr(0, index) + newValue + type.substr(index + 1));
  };

  save = () => {};

  render() {
    return (
      <div className="container">
        <div>
          <h1>Create new game</h1>
          <div className="container">
            <h2>Presets</h2>
            <div className="big-buttons">
              <button
                onClick={() => this.setType('111')}
                className={'button ' + (this.state.type === '111' ? 'active' : '')}>
                <h2>Classic</h2>
                <p>Play an intense 3v3, build an entire website with HTML, CSS and JavaScript. Communication is key.</p>
              </button>
              <button
                onClick={() => this.setType('010')}
                className={'button ' + (this.state.type === '010' ? 'active' : '')}>
                <h2>Zen Garden</h2>
                <p>Play a 1v1 CSS battle, who's the better designer?</p>
              </button>
              <button
                onClick={() => this.setType('000')}
                className={'button ' + (this.state.type !== '010' && this.state.type !== '111' ? 'active' : '')}>
                <h2>Custom</h2>
                <p>Create your own new gamemode!</p>
              </button>
            </div>
            <h2>Languages</h2>
            {this.state.languages &&
              <div>
                <div className="big-buttons">
                  {Object.keys(this.state.languages).map((language, index) =>
                    <button
                      onClick={() => this.toggleLanguage(index)}
                      className={'button ' + (this.state.languages[language] ? 'active' : '')}>
                      <h2>
                        {language}
                      </h2>
                    </button>
                  )}
                </div>
                <button class="button pull-right margin-vertical" onClick={this.save}>
                  Next
                </button>
              </div>}
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
