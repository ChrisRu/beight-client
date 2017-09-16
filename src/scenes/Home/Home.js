import React from 'react';
import Code from './components/Code/Code';
import Buttons from './components/LinkButtons/LinkButtons';
import './Home.scss';

const Home = () => (
  <div class="home container">
    <div class="home-inner">
      <div class="home-title">
        <h1>DevWars Beight</h1>
        <p>Code with your Buds</p>
      </div>
      <div class="create">
        <Buttons />
      </div>
    </div>
    <div class="background-code">
      <Code />
    </div>
  </div>
);

export default Home;
