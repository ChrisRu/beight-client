import React from 'react';
import { handleEnter } from '@/services/accessibility';
import './Buttons.scss';

const Button = props => (
  <button
    tabIndex={0}
    onKeyPress={handleEnter(props.onClick)}
    {...props}
    class={`button ${props.class}`}
  >
    <span tabIndex={-1}>{props.children}</span>
  </button>
);

export default Button;
