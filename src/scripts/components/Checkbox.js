import React from 'react';

const Checkbox = props => (
  <div className="checkbox-wrapper">
    <input
      id={props.id}
      type="checkbox"
      name={props.name}
      className="checkbox"
      checked={props.checked}
      onChange={props.onChange}
    />
    <label for={props.id} className="checkbox-label" />
  </div>
);

export default Checkbox;
