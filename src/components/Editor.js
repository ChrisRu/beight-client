import React, { Component } from 'react';
import MonacoEditor from 'react-monaco-editor';
import WebSocket from './WebSocket';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: new WebSocket(props.uri),
      editorMounted: false,
      executeOnMount: [],
      connected: false,
      lastChangeId: null,
      stream: props.match.params.guid
    };

    this.state.socket.listen(data => {
      this.applyEdit(data);
    });
    this.state.socket.onDisconnect(() => {
      this.setState({ connected: false });
    });
    this.state.socket.onConnect(() => {
      if (this.state.stream) {
        this.state.socket.post({ type: 'info', streams: [this.state.stream] });
      }
      this.setState({ connected: true });
    });
  }

  execute = (method, ...args) => {
    if (this.state.editorMounted) {
      method.apply(this, args);
    } else {
      this.setState(state => ({
        executeOnMount: state.executeOnMount.concat({ method, args })
      }));
    }
  };

  applyEdit = async data => {
    if (data.fullValue !== undefined) {
      console.log('data is full refresh');
      this.execute(() => {
        this.monaco.editor.setValue(data.fullValue);
        this.setState({ lastChangeId: data.changeId });
      });
    } else {
      console.log(data.changeId, this.state.lastChangeId);
      if (data.changeId - 1 !== this.state.lastChangeId) {
        return this.state.socket.post({ type: 'refetch', stream: this.state.stream });
      }
      console.log('data is update');
      this.execute(() => {
        this.monaco.editor.executeEdits('a', data.changes);
        this.setState({ lastChangeId: data.changeId });
      });
    }
  };

  onChange = async (value, data) => {
    console.log('editor value changed');
    this.state.socket.post({ ...data, type: 'update', stream: this.state.stream });
    this.setState(state => ({ lastChangeId: state.lastChangeId + 1 }));
  };

  editorDidMount = editor => {
    this.state.executeOnMount.forEach(item => {
      item.method.apply(this, item.args);
    });
    this.setState({
      executeOnMount: [],
      editorMounted: true
    });
    editor.focus();
  };

  assignRef = component => {
    this.monaco = component;
  };

  render() {
    const options = {
      selectOnLineNumbers: true,
      tabSize: 2
    };
    return (
      <MonacoEditor
        ref={this.assignRef}
        value={this.state.value}
        className="monaco-editor"
        language="javascript"
        options={options}
        onChange={this.onChange}
        editorDidMount={this.monacoDidMount}
        readOnly={!this.props.editable}
        theme="vs-dark"
      />
    );
  }
}

export default Editor;
