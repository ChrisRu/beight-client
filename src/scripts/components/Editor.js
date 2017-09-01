import React, { Component } from 'react';
import MonacoEditor from 'react-monaco-editor';
import eventhub from '../util/eventhub';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorMounted: false,
      executeOnMount: [],
      connected: false,
      lastChangeId: null,
      failed: false
    };

    props.socket.listen(data => {
      this.applyEdit(data);
    });
    props.socket.onDisconnect(() => {
      this.setState({ connected: false });
    });
    props.socket.onConnect(() => {
      this.setState({ connected: true });
    });

    eventhub.on('editor-resize', this.resize);
  }

  componentWillUnmount() {
    eventhub.remove('editor-resize', this.resize);
  }

  resize = () => {
    console.log('RESIZE');
    if (this.monaco && this.monaco.editor) {
      this.monaco.editor.layout();
    }
  };

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
        return this.props.socket.post({ type: 'refetch' });
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
    this.props.socket.post({
      ...data,
      type: 'update',
      stream: this.props.stream,
      game: this.props.game
    });
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
    return (
      <div className="editor">
        {!this.state.connected && <p>Connecting...</p>}
        <MonacoEditor
          ref={this.assignRef}
          value={this.state.value}
          className="monaco-editor"
          language="javascript"
          options={{
            selectOnLineNumbers: true,
            tabSize: 2,
            lineNumbers: 'on',
            parameterHints: true
          }}
          height={this.props.height}
          width={this.props.width}
          onChange={this.onChange}
          editorDidMount={this.monacoDidMount}
          theme="vs"
        />
      </div>
    );
  }
}

export default Editor;
