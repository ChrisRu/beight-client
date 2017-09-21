import React from 'react';
import Button from '@/components/Button/Button';

const Languages = ({
  languages,
  toggleLanguage,
  createFileReader,
  removeFile
}) => (
  <div>
    <h2>Languages</h2>
    <div class="create-buttons">
      {Object.keys(languages).map((language, index) => (
        <Button
          onClick={() => toggleLanguage(index)}
          class={languages[language].active ? 'active' : ''}
        >
          <h2>{languages[language].name}</h2>
          <input
            class="file-input"
            id={`${language}-file-input`}
            type="file"
            accept={languages[language].extensions.join(', ')}
            onChange={event => createFileReader(event, language)}
          />
          {languages[language].content.length === 0 ? (
            <label htmlFor={`${language}-file-input`} class="file-input-label">
              Choose File
            </label>
          ) : (
            <Button
              class="file-input-button"
              onClick={() => removeFile(language)}
            >
              Remove <span class="code">{languages[language].filename}</span>
            </Button>
          )}
        </Button>
      ))}
    </div>
  </div>
);

export default Languages;
