import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { post } from '@/util/http';
import './styles.scss';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: {
        HTML: {
          name: 'HTML',
          extensions: ['html', 'jade', 'pug'],
          active: false,
          content: '',
          filename: ''
        },
        CSS: {
          name: 'CSS',
          extensions: ['css', 'scss', 'sass', 'less', 'styl'],
          active: false,
          content: '',
          filename: ''
        },
        JS: {
          name: 'JavaScript',
          extensions: ['js', 'ts', 'coffee', 'es6'],
          active: false,
          content: '',
          filename: ''
        }
      },
      type: '000',
      hasSetType: false
    };
  }

  setType = type => {
    const booleans = type.split('');
    return this.setState(state => ({
      languages: {
        HTML: {
          ...state.languages.HTML,
          active: booleans[0] === '1'
        },
        CSS: {
          ...state.languages.CSS,
          active: booleans[1] === '1'
        },
        JS: {
          ...state.languages.JS,
          active: booleans[2] === '1'
        }
      },
      type,
      hasSetType: true
    }));
  };

  getAllExtensions = () => {
    return Object.values(this.state.languages)
      .reduce((prev, language) => prev.concat(language.extensions), [])
      .join(', ');
  };

  toggleLanguage = index => {
    const { type } = this.state;
    const newValue = type.charAt(index) === '1' ? '0' : '1';
    this.setType(type.substr(0, index) + newValue + type.substr(index + 1));
  };

  createFileReader = (input, language) => {
    if (!window.FileReader) {
      console.error('Browser does not support the FileReader API');
      return;
    }

    const reader = new FileReader();
    reader.onload = event => {
      if (event.target.readyState !== 2) {
        return;
      }
      if (event.target.error) {
        console.error('Error while reading file');
      }

      this.setState(state => ({
        languages: {
          ...state.languages,
          [language]: {
            ...state.languages[language],
            content: event.target.result,
            filename: input.target.files[0].name
          }
        }
      }));
    };

    const extensions = ['html', 'css', 'scss', 'js', 'sass'];
    const extension = input.target.files[0].name
      .split('.')
      .pop()
      .toLowerCase();
    if (extensions.includes(extension) === false) {
      console.error('Not a valid file format');
      return;
    }

    reader.readAsDataURL(input.target.files[0]);
  };

  removeFile = language => {
    this.setState(state => ({
      languages: {
        ...state.languages,
        [language]: {
          ...state.languages[language],
          content: '',
          filename: ''
        }
      }
    }));
  };

  save = () => {
    const body = Object.values(this.state.languages).map(item => ({
      content: item.content,
      active: item.active,
      // TODO: fix this
      language: 3,
      name: item.name
    }));

    return post('/create', body)
      .then(data => {
        this.props.history.push('/game/' + data.guid);
      })
      .catch(error => {
        console.error(`Can't create game: ${error}`);
      });
  };

  render() {
    return (
      <div class="container">
        <div>
          <h1>Create new game</h1>
          <div class="container">
            <h2>Presets</h2>
            <div class="big-buttons">
              <button
                onClick={() => this.setType('111')}
                class={'button ' + (this.state.type === '111' ? 'active' : '')}>
                <h2>Classic</h2>
                <p>Play an intense 3v3, build an entire website with HTML, CSS and JavaScript. Communication is key.</p>
              </button>
              <button
                onClick={() => this.setType('010')}
                class={'button ' + (this.state.type === '010' ? 'active' : '')}>
                <h2>Zen Garden</h2>
                <p>Play a 1v1 CSS battle, who's the better designer?</p>
              </button>
              <button
                onClick={() => this.setType('000')}
                class={
                  'button ' +
                  (['010', '111'].includes(this.state.type) === false && this.state.hasSetType ? 'active' : '')
                }>
                <h2>Custom</h2>
                <p>Create your own new gamemode!</p>
              </button>
            </div>
            {this.state.hasSetType && (
              <div>
                <h2>Languages</h2>
                <div class="big-buttons">
                  {Object.keys(this.state.languages).map((language, index) => (
                    <button
                      onClick={() => this.toggleLanguage(index)}
                      class={'button ' + (this.state.languages[language].active ? 'active' : '')}>
                      <h2>{this.state.languages[language].name}</h2>
                      <input
                        class="file-input"
                        id={language + '-file-input'}
                        type="file"
                        accept={this.state.languages[language].extensions.join(', ')}
                        onchange={event => this.createFileReader(event, language)}
                      />
                      {this.state.languages[language].content.length === 0 ? (
                        <label for={language + '-file-input'} class="file-input-label">
                          Choose File
                        </label>
                      ) : (
                        <button class="file-input-button" onClick={() => this.removeFile(language)}>
                          Remove <span class="code">{this.state.languages[language].filename}</span>
                        </button>
                      )}
                    </button>
                  ))}
                </div>
                <button class="button pull-right margin-vertical" onClick={this.save}>
                  Create Game
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Dashboard);
