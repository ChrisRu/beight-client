import React, { Component } from 'react';
import MonacoEditor from 'react-monaco-editor';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '// Type your code!'
    };
  }

  editorDidMount(editor, monaco) {
    editor.focus();
  }

  onchange(newValue, e) {
    console.log('Change', newValue, e);
  }

  render() {
    const requireConfig = {
      url: 'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.1/require.min.js',
      paths: {
        vs: 'https://www.mycdn.com/monaco-editor/0.6.1/min/vs'
      }
    };
    const code = this.state.code;
    const options = {
      selectOnLineNumbers: true
    };
    return (
      <MonacoEditor
        width="800"
        height="800"
        language="javascript"
        value={code}
        options={options}
        requireConfig={requireConfig}
      />
    );
  }
}

export default Editor;
