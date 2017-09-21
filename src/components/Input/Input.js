import React, { Component } from 'react';
import eventhub from '@/services/eventhub';
import './Input.scss';

class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPassword: props.type && props.type.type === 'password',
      isValid: true,
      value: this.props.value || '',
      focus: false,
      unmetRules: [],
      debounceVerify: null
    };

    eventhub.on('input:verify', this.verify);
  }

  componentWillReceiveProps(props) {
    const { value } = props;
    if (value && this.state.value !== value) {
      this.setState({ value });
    }
  }

  componentWillUnmount() {
    eventhub.remove('input:verify', this.verify);
  }

  getRules = () =>
    Promise.all(
      (this.props.rules || [])
        .map(rule => Promise.resolve(rule.method(this.state.value)))
    );

  handleChange = event => {
    const { value } = event.target;

    if (this.state.debounceVerify !== null) {
      clearTimeout(this.state.debounceVerify);
    }

    const debounceVerify = setTimeout(() => {
      if (this.state.value) {
        this.verify();
      }
      this.setState({ debounceVerify: null });
    }, 500);

    this.setState({
      value,
      isValid: true,
      debounceVerify
    });

    if (this.props.onChange) {
      this.props.onChange(event);
    }
  };

  verify = async () => {
    const results = await this.getRules();

    const isValid = results.every(result => !!result);
    this.setState({
      isValid,
      focus: false,
      unmetRules: results
        .map((result, index) => (!result ? index : -1))
        .filter(index => index > -1)
        .map(index => this.props.rules[index])
    });

    if (this.props.onVerify) {
      this.props.onVerify(isValid);
    }
  };

  render() {
    const inputClass = `input ${this.state.isValid ? '' : ' error'} ${this.props
      .class}`;
    return (
      <div class="input-wrapper">
        <input
          {...this.props}
          class={inputClass}
          type={this.props.type || 'text'}
          value={this.state.value}
          onKeyDown={this.props.onKeyDown}
          onChange={this.handleChange}
          onFocus={() => this.setState({ focus: true })}
        />
        <div class="input-messages">
          {!this.state.isValid &&
            this.state.unmetRules.map(rule => (
              <label htmlFor={this.props.id} class="input-message error">
                <p>{rule.rule}</p>
              </label>
            ))}
        </div>
      </div>
    );
  }
}

export default Input;
