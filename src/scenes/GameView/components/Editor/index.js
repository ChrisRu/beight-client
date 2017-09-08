import React, { Component } from 'react';
import MonacoEditor from 'react-monaco-editor';
import eventhub from '@/services/eventhub';
import './styles.scss';

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
    if (data.full !== undefined) {
      console.log('data is full refresh');
      if (this.props.stream === data.streams[0]) {
        this.execute(() => {
          this.setState({ lastChangeId: data.number, noUpdate: true });
          this.monaco.editor.setValue(data.full);
        });
      }
    } else {
      if (data.number != null && data.number - 1 !== this.state.lastChangeId) {
        return this.props.socket.post({
          type: 'fetch',
          game: this.props.game,
          streams: [this.props.stream]
        });
      }
      this.execute(() => {
        this.setState({ lastChangeId: data.number, noUpdate: true });
        this.monaco.editor.executeEdits(data.origin, data.change.changes);
      });
    }
  };

  onChange = async (value, data) => {
    console.log('editor value changed');
    if (this.state.noUpdate === false) {
      this.props.socket.post({
        change: data,
        type: 'change',
        streams: [this.props.stream],
        game: this.props.game
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
      <div class="editor">
        {!this.props.connected && <p>Connecting...</p>}
        <MonacoEditor
          ref={this.assignRef}
          value={this.state.value}
          class="monaco-editor"
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
