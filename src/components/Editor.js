import React, { Component } from 'react';
import MonacoEditor from './MonacoEditor';
import WebSocket from './WebSocket';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: new WebSocket(props.uri),
      editorMounted: false,
      executeOnMount: [],
      connected: false,
      lastChangeId: null
    };

    this.state.socket.listen(data => {
      this.applyEdit(data);
    });
    this.state.socket.onDisconnect(() => {
      this.setState({ connected: false });
    });
    this.state.socket.onConnect(() => {
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
      console.log(this.props.id, 'refresh');
      this.execute(() => {
        this.editor.setValue(data.fullValue);
        this.setState({ lastChangeId: data.changeId });
      });
    } else {
      console.log(data.changeId, this.state.lastChangeId);
      if (data.changeId - 1 !== this.state.lastChangeId) {
        return this.state.socket.post({ type: 'refetch', stream: 1 });
      }
      console.log(this.props.id, 'update');
      this.execute(() => {
        this.editor.applyEdit(data);
        this.setState({ lastChangeId: data.changeId });
      });
    }
  };

  onChange = async (value, data) => {
    console.log(this.props.id, 'change');
    this.state.socket.post({ ...data, type: 'update', 'stream': 1 });
    this.setState(state => ({ lastChangeId: state.lastChangeId + 1 }));
  };

  editorDidMount = (editor, monaco) => {
    this.state.executeOnMount.forEach(item => {
      item.method.apply(this, item.args);
    });
    this.setState({
      executeOnMount: [],
      editorMounted: true
    });
    editor.focus();
  };

  render() {
    const options = {
      selectOnLineNumbers: true,
      tabSize: 2
    };
    if (this.state.connected) {
      return (
        <MonacoEditor
          ref={editor => {
            this.editor = editor;
          }}
          className="monaco-editor"
          language="javascript"
          options={options}
          onChange={this.onChange}
          editorDidMount={this.editorDidMount}
          readOnly={!this.props.editable}
          height={this.props.height}
          width={this.props.width}
        />
      );
    } else {
      return (
        <span className="disconnected">
          <h2>Whoops, you got disconnected :(</h2>
          <span>Trying to reconnect</span>
          <span className="animate-dots">...</span>
        </span>
      );
    }
  }
}

export default Editor;
