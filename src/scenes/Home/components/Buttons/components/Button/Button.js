import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ row }) => (
  <Link tabIndex={0} class="button margin-right margin-bottom" to={{ pathname: `/game/${row.guid}`, state: row }}>
    {row.guid}
  </Link>
);

export default Button;
