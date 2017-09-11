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
      focus: false,
      rules
    };
  }

  handleChange = event => {
    const { value } = event.target;
    this.setState({ value });

    if (this.props.onChange) {
      const newEvent = event;
      newEvent.isValid = this.state.isValid;
      this.props.onChange.call(null, newEvent);
    }
  };

  verify = event => {
    const { value } = event.target;

    const isValid = !this.state.rules.every(rule => rule.method(value));
    this.setState({ isValid, focus: false });
  };

  render() {
    const inputClass = `input ${!this.state.focus && this.state.isValid ? '' : ' error'}`;
    return (
      <div>
        <input
          {...this.props}
          class={inputClass}
          type={this.props.type || 'text'}
          value={this.state.value}
          onChange={this.handleChange}
          onBlur={this.verify}
          onFocus={() => this.setState({ focus: true })}
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
}

export default Input;
