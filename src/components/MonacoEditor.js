import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MonacoEditor extends Component {
  constructor(props) {
    super(props);

    this.currentValue = props.value;
    this.editor = null;
    this.state = {
      preventTriggerChange: false
    };
  }

  componentDidMount() {
    this.afterViewInit();
  }

  componentWillUnmount() {
    this.destroyMonaco();
  }

  componentDidUpdate(prevProps) {
    const { language, context, value } = this.props;

    if (value !== this.currentValue) {
      this.currentValue = value;
      if (this.editor !== null) {
        this.setState({ preventTriggerChange: true });
        this.editor.setValue(this.currentValue);
        this.setState({ preventTriggerChange: false });
      }
    }
    if (prevProps.language !== language) {
      context.monaco.editor.setModelLanguage(this.editor.getModel(), language);
    }
  }

  editorWillMount(monaco) {
    const { editorWillMount } = this.props;

    if (editorWillMount) {
      editorWillMount(monaco);
    }
  }

  editorDidMount(editor, monaco) {
    const { editorDidMount } = this.props;

    if (editorDidMount !== null) {
      editorDidMount(editor, monaco);
    }

    editor.onDidChangeModelContent(event => {
      const { onChange, readOnly } = this.props;
      const value = editor.getValue();

      // Only invoking when user input changed
      if (this.state.preventTriggerChange === false && onChange !== null && readOnly === false) {
        onChange(value, event);
      }
    });
  }

  afterViewInit() {
    const { requireConfig, context } = this.props;
    const loaderUrl = requireConfig.url || 'vs/loader.js';
    const onGotAmdLoader = () => {
      // Load monaco
      context.require(['vs/editor/editor.main'], () => {
        this.initMonaco();
      });

      // Call the delayed callbacks when AMD loader has been loaded
      if (context.__REACT_MONACO_EDITOR_LOADER_ISPENDING__) {
        context.__REACT_MONACO_EDITOR_LOADER_ISPENDING__ = false;
        let loaderCallbacks = context.__REACT_MONACO_EDITOR_LOADER_CALLBACKS__;
        if (loaderCallbacks !== undefined && loaderCallbacks.length > 0) {
          let currentCallback = loaderCallbacks.shift();
          while (currentCallback !== undefined) {
            currentCallback.fn.call(currentCallback.context);
            currentCallback = loaderCallbacks.shift();
          }
        }
      }
    };

    if (typeof context.require === 'undefined') {
      var loaderScript = context.document.createElement('script');
      loaderScript.type = 'text/javascript';
      loaderScript.src = loaderUrl;
      loaderScript.addEventListener('load', onGotAmdLoader);
      context.document.body.appendChild(loaderScript);
      context.__REACT_MONACO_EDITOR_LOADER_ISPENDING__ = true;
    } else {
      onGotAmdLoader();
    }
  }

  initMonaco() {
    const { value, defaultValue, language, theme, options, context, readOnly } = this.props;
    const newValue = value !== null ? value : defaultValue;
    const containerElement = this.refs.container;
    if (typeof context.monaco !== 'undefined') {
      this.editorWillMount(context.monaco);
      this.editor = context.monaco.editor.create(containerElement, {
        value: newValue,
        readOnly,
        language,
        ...options
      });
      context.monaco.editor.setTheme(theme);
      this.editorDidMount(this.editor, context.monaco);
    }
  }

  destroyMonaco() {
    if (this.editor) {
      this.editor.dispose();
      this.editor = null;
    }
  }

  render() {
    const { width, height } = this.props;
    const fixedWidth = width.toString().includes('%') ? width : `${width}px`;
    const fixedHeight = height.toString().includes('%') ? height : `${height}px`;
    const style = {
      width: fixedWidth,
      height: fixedHeight
    };
    return <div ref="container" style={style} className="react-monaco-editor-container" />;
  }

  applyEdit(data) {
    console.log(data.changes);
    this.setState({ preventTriggerChange: true });
    this.editor.executeEdits(data.sparkOrigin, data.changes);
    this.setState({ preventTriggerChange: false });
  }

  setValue(data) {
    this.setState({ preventTriggerChange: true });
    this.editor.setValue(data);
    this.setState({ preventTriggerChange: false });
  }
}

MonacoEditor.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  language: PropTypes.string,
  theme: PropTypes.string,
  options: PropTypes.object,
  editorDidMount: PropTypes.func,
  editorWillMount: PropTypes.func,
  onChange: PropTypes.func,
  requireConfig: PropTypes.object
};

MonacoEditor.defaultProps = {
  width: '100%',
  height: '100%',
  value: null,
  defaultValue: '',
  language: 'javascript',
  theme: 'vs-dark',
  options: {},
  editorDidMount: null,
  editorWillMount: null,
  onChange: null,
  requireConfig: {},
  context: window
};

export default MonacoEditor;
