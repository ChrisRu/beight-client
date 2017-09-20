import React, { Component } from 'react';
import Button from '@/components/Button/Button';
import { Edit } from 'react-feather';

class EditGameLanguage extends Component {
  toggleCheck = () => {
    this.setState(state => ({ checked: !state.checked }));
  };

  render() {
    const { stream } = this.props;
    const code = (stream.value || '')
      .split('\n')
      .slice(0, 4)
      .join('\n');
    const cutCode = code !== stream.value;

    return (
      <div class="language-edit">
        <h2>{stream.language.name}</h2>
        <p class="row">
          <span class="col-xs-10">{stream.player ? stream.player : 'No player'}</span>
          <span class="col-xs-2">
            <Button class="button-icon"><Edit class="icon" /></Button>
          </span>
        </p>
        <p>
          Value: <pre>{code + (cutCode ? '...' : '')}</pre>
        </p>
      </div>
    );
  }
}

export default EditGameLanguage;
