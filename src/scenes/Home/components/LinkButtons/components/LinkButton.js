import React from 'react';
import { Link } from 'react-router-dom';

const Button = props => (
  <Link
    tabIndex={0}
    {...props}
    class={`button margin-right margin-bottom ${props.class}`}
    to={{ pathname: `/game/${props.row.guid}`, state: props.row }}
  >
    <span tabIndex={-1}>{props.row.guid}</span>
  </Link>
);

export default Button;
