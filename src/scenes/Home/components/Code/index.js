import React, { Component } from 'react';
import parseHTML from '@/services/parseHtml';
import { markup } from './services/markup';

class Code extends Component {
  constructor() {
    super();
    this.state = {
      markup: '',
      completed: false
    };

    const markupLength = markup.length;
    const typeInterval = setInterval(() => {
      if (this.state.markup.length === markupLength) {
        this.setState({ completed: true });
        clearTimeout(typeInterval);
      }

      this.setState(state => ({
        markup: markup.slice(0, state.markup.length + 1)
      }));
    }, 50);
  }
  render() {
    return (
      <code
        class={this.state.completed && 'completed'}
        dangerouslySetInnerHTML={{
          __html: parseHTML(this.state.markup)
        }}
      />
    );
  }
}

export default Code;
