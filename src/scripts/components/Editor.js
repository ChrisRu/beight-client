import React, { Component } from 'react';
import MonacoEditor from 'react-monaco-editor';
import eventhub from '../util/eventhub';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorMounted: false,
      executeOnMount: [],
      lastChangeId: null,
      failed: false
    };

    eventhub.on('editor-resize', this.resize);
  }

  componentWillUnmount() {
    eventhub.remove('editor-resize', this.resize);
  }

  resize = () => {
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
    if (data.f !== undefined) {
      console.log('data is full refresh');
      if (this.props.stream === data.s[0]) {
        this.execute(() => {
          this.monaco.editor.setValue(data.f);
          this.setState({ lastChangeId: data.n, noUpdate: true });
        });
      }
    } else {
      if (data.n != null && data.n - 1 !== this.state.lastChangeId) {
        return this.props.socket.post({
          t: 'r',
          g: this.props.game,
          s: [this.props.stream]
        });
      }
      this.execute(() => {
        this.monaco.editor.executeEdits(data.o, data.c.changes);
        this.setState({ lastChangeId: data.n, noUpdate: true });
      });
    }
  };

  onChange = async (value, data) => {
    console.log('editor value changed');
    if (this.state.noUpdate === false) {
      this.props.socket.post({
        c: data,
        t: 'u',
        s: [this.props.stream],
        g: this.props.game
      });
      this.setState(state => ({ lastChangeId: state.lastChangeId + 1 }));
    } else {
      this.setState({ noUpdate: false });
    }
  };

  editorDidMount = editor => {
    console.log('MOUNT');
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
        {!this.props.connected && <p>Connecting...</p>}
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
          editorDidMount={this.editorDidMount}
          theme="vs-dark"
        />
      </div>
    );
  }
}

export default Editor;