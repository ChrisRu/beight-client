import React from 'react';
import { handleEnter } from '@/services/accessibility';

const Presets = ({ setType, type, hasSetType }) => (
  <div>
    <h2>Presets</h2>
    <div class="create-buttons">
      <button
        tabIndex={0}
        onKeyPress={handleEnter(() => setType('111'))}
        onClick={() => setType('111')}
        class={`button ${type === '111' ? 'active' : ''}`}
      >
        <h2>Classic</h2>
        <p>
          Play an intense 3v3, build an entire website with HTML, CSS and JavaScript. Communication
          is key.
        </p>
      </button>
      <button
        tabIndex={0}
        onKeyPress={handleEnter(() => setType('010'))}
        onClick={() => setType('010')}
        class={`button ${type === '010' ? 'active' : ''}`}
      >
        <h2>Zen Garden</h2>
        <p>Play a 1v1 CSS battle, who is the better designer?</p>
      </button>
      <button
        tabIndex={0}
        onKeyPress={handleEnter(() => setType('000'))}
        onClick={() => setType('000')}
        class={`button ${['010', '111'].includes(type) === false && hasSetType ? 'active' : ''}`}
      >
        <h2>Custom</h2>
        <p>Create your own new gamemode!</p>
      </button>
    </div>
  </div>
);

export default Presets;
