import React, { Component } from 'react';
import Checkbox from '@/components/Checkbox/Checkbox';

class LanguageEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stream: props.stream,
      checked: props.stream.active
    };
  }

  toggleCheck = () => {
    console.log('ah');
    this.setState(state => ({ checked: !state.checked }));
  };

  render() {
    const { stream, checked } = this.state;
    return (
      <div>
        <h2>{stream.language.name}</h2>
        <p>{stream.player ? stream.player : 'No player'}</p>
        <p>
          Active:{' '}
          <Checkbox
            id={`checkbox-${stream.id}`}
            name={`active-${stream.id}`}
            onChange={this.toggleCheck}
            checked={checked}
          />
        </p>
        <p>
          Value: <pre>{stream.value}</pre>
        </p>
      </div>
    );
  }
}

export default LanguageEdit;
