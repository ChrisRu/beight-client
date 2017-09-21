import React from 'react';
import Button from '@/components/Button/Button';

const Presets = ({ setType, type, hasSetType }) => (
  <div>
    <h2>Presets</h2>
    <div class="create-buttons">
      <Button
        onClick={() => setType('111')}
        class={type === '111' ? 'active' : ''}
      >
        <h2>Classic</h2>
        <p>
          Play an intense 3v3, build an entire website with HTML, CSS and
          JavaScript. Communication is key.
        </p>
      </Button>
      <Button
        onClick={() => setType('010')}
        class={type === '010' ? 'active' : ''}
      >
        <h2>Zen Garden</h2>
        <p>Play a 1v1 CSS battle, who is the better designer?</p>
      </Button>
      <Button
        onClick={() => setType('000')}
        class={
          ['010', '111'].includes(type) === false && hasSetType ? 'active' : ''
        }
      >
        <h2>Custom</h2>
        <p>Create your own new gamemode!</p>
      </Button>
    </div>
  </div>
);

export default Presets;
