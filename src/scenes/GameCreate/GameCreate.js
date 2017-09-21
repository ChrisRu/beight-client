import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { showErrorModal, hideModals } from '@/actions/modals';
import { post } from '@/services/http';
import Button from '@/components/Button/Button';
import Languages from './components/Languages/Languages';
import Presets from './components/Presets/Presets';
import './GameCreate.scss';

/*
This component works by using a string '110' to show what language is being played.
  '010' for example means:
  0 : no html
  1 : yes css
  0 : no js
Honestly not sure why I chose to do it like this, but it works.
Rewrite might be nice but is unnecessary for now.
*/

class GameCreate extends Component {
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
      hasSetType: false,
      error: false
    };
  }

  setType = type => {
    const booleans = type.split('');
    this.setState(state => ({
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

    if (document.activeElement) {
      document.activeElement.blur();
    }
  };

  getAllExtensions = () =>
    Object.values(this.state.languages)
      .reduce((prev, language) => prev.concat(language.extensions), [])
      .join(', ');

  toggleLanguage = index => {
    const { type } = this.state;
    const newValue = type.charAt(index) === '1' ? '0' : '1';
    this.setType(type.substr(0, index) + newValue + type.substr(index + 1));
  };

  createFileReader = (input, language) => {
    if (!window.FileReader) {
      return;
    }

    const reader = new FileReader();
    reader.onload = event => {
      if (event.target.readyState !== 2 || event.target.error) {
        return;
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
      name: item.name
    }));

    return post('/games/create', body)
      .then(data => {
        this.props.history.push(`/game/${data.guid}`);
      })
      .catch(() => {
        this.props.showErrorModal(
          'Failed creating game',
          'Try again in a few seconds.'
        );
      });
  };

  render() {
    return (
      <div class="container">
        <div>
          <h1>Create new game</h1>
          <div class="container">
            <Presets
              setType={this.setType}
              type={this.state.type}
              hasSetType={this.state.hasSetType}
            />
            {this.state.hasSetType && (
              <div>
                <Languages
                  languages={this.state.languages}
                  toggleLanguage={this.toggleLanguage}
                  createFileReader={this.createFileReader}
                  removeFile={this.removeFile}
                />
                <Button class="save pull-right no-border" onClick={this.save}>
                  Create Game
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ modals }) => ({ modals });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ hideModals, showErrorModal }, dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GameCreate)
);
