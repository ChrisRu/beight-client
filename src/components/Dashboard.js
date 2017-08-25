import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const createBlocks = props =>
  <div>
    <h1>Create new game</h1>
    <div className="big-buttons">
      <NavLink to="/dashboard/zengarden" className="button">
        <h2>Zen Garden</h2>
        <p>Play a 1v1 CSS battle, who's the better designer?</p>
      </NavLink>
      <NavLink to="/dashboard/classic" className="button">
        <h2>Classic</h2>
        <p>Play an intense 3v3, build an entire website with HTML, CSS and JavaScript. Communication is key.</p>
      </NavLink>
    </div>
  </div>;

const createZengarden = props => (
  <div>
    <h1>Create new Zen Garden game</h1>
    <div className="">
      <input className="text-input" />
    </div>
  </div>
);

const createClassic = props => (
  <div>
    <h1>Create new Classic game</h1>
    <div className="">
      <input className="text-input" />
    </div>
  </div>
);

const getElement = name => {
  switch (name) {
    case 'classic':
      return createClassic();
    case 'zengarden':
      return createZengarden();
    default:
      return createBlocks();
  }
};

class Dashboard extends Component {
  render() {
    return (
      <div className="container">
        {getElement(this.props.match.params.type)}
      </div>
    );
  }
}

export default Dashboard;
