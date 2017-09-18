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
      current: 0,
      intervals: []
    };
  }

  componentDidMount() {
    const markup = parseHTML(rawHTML.replace(/\t/gm, ' '));

    const intervals = [];
    let pause = false;
    for (let i = 0; i < markup.length; i++) {
      if (markup[i] === '<' || markup[i] === '&') {
        pause = true;
      } else if (markup[i] === '>' || markup[i] === ';') {
        pause = false;
      }

      if (pause === false) {
        intervals.push(i);
      }
    }

    this.setState({ markup, intervals });

    this.loop();
  }

  loop = (current = 0) => {
    setTimeout(() => {
      const next = current + 1;
      this.setState({ current: next });
      if (next < this.state.intervals.length) {
        this.loop(next);
      }
    }, (Math.random() * 80) + 20);
  };

  render() {
    const { completed, markup, intervals, current } = this.state;
    const html = markup.slice(0, intervals[current]);
    return (
      <div>
        <div class="code-overlay" />
        <code
          class={completed ? 'completed' : ''}
          dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
            __html: html
          }}
        />
      </div>
    );
  }
}

export default Code;
