import React from 'react';
import Code from './components/Code';
import Buttons from './components/Buttons';
import './styles.scss';

const Home = () => (
  <div class="Dashboard container">
    <div>
      <div class="home-title">
        <h1>Code Game Thingio</h1>
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
