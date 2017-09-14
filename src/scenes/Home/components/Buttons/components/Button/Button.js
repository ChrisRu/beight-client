import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ row }) => (
  <Link class="button" to={{ pathname: `/game/${row.guid}`, state: row }}>
    {row.guid}
  </Link>
);

export default Button;
