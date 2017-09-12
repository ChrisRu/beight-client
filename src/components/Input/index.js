import React, { Component } from 'react';
import eventhub from '@/services/eventhub';
import './styles.scss';

class Input extends Component {
  constructor(props) {
    super(props);
    const rules = this.props.rules || [];

    this.state = {
      isPassword: props.type && props.type.type === 'password',
      isValid: true,
      value: '',
      focus: false,
      rules
    };

    eventhub.on('input:verify', this.verify);
  }

  componentWillUnmount() {
    eventhub.remove('input:verify', this.verify);
  }

  handleChange = event => {
    const { value } = event.target;
    this.setState({ value, isValid: true });

    if (this.props.onChange) {
      this.props.onChange(event);
    }
  };

  verify = () => {
    const isValid = this.state.rules.every(rule => rule.method(this.state.value));
    this.setState({ isValid, focus: false });

    if (this.props.onVerify) {
      this.props.onVerify(isValid);
    }
  };

  render() {
    const inputClass = `input ${this.state.isValid ? '' : ' error'}`;
    return (
      <div class="input-wrapper">
        <input
          {...this.props}
          class={inputClass}
          type={this.props.type || 'text'}
          value={this.state.value}
          onKeyDown={this.props.onKeyDown}
          onChange={this.handleChange}
          onBlur={this.verify}
          onFocus={() => this.setState({ focus: true })}
        />
        {!this.state.isValid && this.state.rules.map(
            rule =>
              !rule.method(this.state.value) && (
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
