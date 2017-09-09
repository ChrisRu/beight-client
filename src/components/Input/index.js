import React, { Component } from 'react';
import './styles.scss';

class Input extends Component {
  constructor(props) {
    super(props);
    const rules = this.props.rules || [];

    this.state = {
      isPassword: props.type && props.type.type === 'password',
      isValid: false,
      value: '',
      rules
    };
  }

  handleChange = event => {
    const { value } = event.target;

    this.setState({
      value,
      isValid: this.state.rules.every(rule => rule.method(value))
    });

    if (this.props.onChange) {
      const newEvent = event;
      newEvent.isValid = this.state.isValid;
      this.props.onChange.call(null, newEvent);
    }
  };

  render = () => (
    <div>
      <input
        {...this.props}
        class={`input ${!this.state.isValid ? '' : ' error'}`}
        type={this.props.type || 'text'}
        value={this.state.value}
        onChange={this.handleChange}
      />
      {this.state.rules.map(
        rule =>
          rule.method(this.state.value) && (
            <label htmlFor={this.props.id} class="input-message error">
              <p>{rule.rule}</p>
            </label>
          )
      )}
    </div>
  );
}

export default Input;
