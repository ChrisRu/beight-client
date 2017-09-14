import React from 'react';

const Languages = ({ languages, toggleLanguage, createFileReader, removeFile }) => (
  <div>
    <h2>Languages</h2>
    <div class="create-buttons">
      {Object.keys(languages).map((language, index) => (
        <button
          onClick={() => toggleLanguage(index)}
          class={`button ${languages[language].active ? 'active' : ''}`}
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
            <button class="file-input-button" onClick={() => removeFile(language)}>
              Remove <span class="code">{languages[language].filename}</span>
            </button>
          )}
        </button>
      ))}
    </div>
  </div>
);

export default Languages;
