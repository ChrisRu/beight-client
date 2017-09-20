import React, { Component } from 'react';
import Checkbox from '@/components/Checkbox/Checkbox';

class LanguageEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.stream.active
    };
  }

  componentWillReceiveProps(props) {
    const { checked } = props;
    if (this.state.checked !== checked) {
      this.setState({ checked });
    }
  }

  toggleCheck = () => {
    this.setState(state => ({ checked: !state.checked }));
  };

  render() {
    const { stream } = this.props;
    const { checked } = this.state;
    return (
      <div class="language-edit">
        <h2>{stream.language.name}</h2>
        <p>{stream.player ? stream.player : 'No player'}</p>
        <p>
          Active:
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
