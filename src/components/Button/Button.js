import React from 'react';
import { handleEnter } from '@/services/accessibility';

const Button = props => (
  <button
    tabIndex={0}
    onKeyPress={handleEnter(props.onClick)}
    {...props}
    class={`button ${props.class}`}
  >
    {props.children}
  </button>
);

export default Button;
