import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const createBlocks = props =>
  <div className="create-blocks">
    <NavLink to="/dashboard/zengarden" className="block">
      <h2>Zen Garden</h2>
      <p>Play a 1v1 CSS battle, who's the better designer?</p>
    </NavLink>
    <NavLink to="/dashboard/classic" className="block">
      <h2>Classic</h2>
      <p>Play an intense 3v3, build an entire website with HTML, CSS and JavaScript. Communication is key.</p>
    </NavLink>
  </div>;

const getElement = name => {
  if (!name) {
    return createBlocks();
  } else if (name === 'classic') {
    return <div>classic</div>;
  } else if (name === 'zengarden') {
    return <div>zen garden</div>;
  }
};

class Dashboard extends Component {
  render() {
    return (
      <div className="Dashboard container">
        <div className="create">
          <h1>Create new Game</h1>
          {getElement(this.props.match.params.type)}
        </div>
      </div>
    );
  }
}

export default Dashboard;
