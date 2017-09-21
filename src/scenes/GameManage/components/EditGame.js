import React from 'react';
import Input from '@/components/Input/Input';
import EditGameLanguage from './EditGameLanguage';

const EditGame = ({ game }) => (
  <div class="edit-game">
    <label class="label" htmlFor="guid">
      URL
    </label>
    <Input
      id="guid"
      name="guid"
      type="text"
      class="uppercase"
      placeholder="url"
      value={game.guid}
      rules={[
        {
          rule: 'URL should be 4 or more characters',
          method: value => value.length >= 4
        }
      ]}
    />
    <div class="language-edits">
      {Object.values(game.streams).map(stream => (
        <EditGameLanguage stream={stream} />
      ))}
    </div>
  </div>
);

export default EditGame;
