import React from 'react';
import './Checkbox.scss';

const Checkbox = props => (
  <div class="checkbox-wrapper">
    <input
      id={props.id}
      type="checkbox"
      name={props.name}
      class="checkbox"
      checked={props.checked}
      onChange={props.onChange}
    />
    <label htmlFor={props.id} class="checkbox-label" />
  </div>
);

export default Checkbox;
