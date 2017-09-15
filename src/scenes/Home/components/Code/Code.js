import React, { Component } from 'react';
import parseHTML from '@/services/parseHtml';
import rawHTML from './services/markup';
import './Code.scss';

class Code extends Component {
  constructor() {
    super();
    this.state = {
      markup: '',
      completed: false,
      interval: null
    };
  }

  async componentDidMount() {
    const markup = rawHTML.replace(/\t/gm, ' ');

    const markupLength = markup.length;
    this.setState({
      interval: setInterval(() => {
        if (this.state.markup.length === markupLength) {
          clearTimeout(this.state.interval);
          this.setState({ completed: true, interval: null });
        }

        this.setState(state => ({
          markup: markup.slice(0, state.markup.length + 1)
        }));
      }, 50)
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    return (
      <code
        class={this.state.completed ? 'completed' : ''}
        dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
          __html: parseHTML(this.state.markup)
        }}
      />
    );
  }
}

export default Code;
