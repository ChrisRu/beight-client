import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MonacoView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }

  componentDidMount() {
    this.afterViewInit();
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

  render() {
    const { width, height } = this.props;
    const fixedWidth = width.toString().includes('%') ? width : `${width}px`;
    const fixedHeight = height.toString().includes('%') ? height : `${height}px`;
    const style = {
      width: fixedWidth,
      height: fixedHeight
    };
    return (
      <pre ref="container" data-lang="javascript" style={style}>
        {this.state.value}
      </pre>
    );
  }

  getChange(value, changes) {
    changes.forEach(change => {
      const { startLineNumber, endLineNumber, startColumn, endColumn } = change.range;
      value = value
        .split('\n')
        .slice(startLineNumber, endLineNumber)
        .map(line => line.slice(startColumn, endColumn, change.text))
        .join('\n');
    });
    return value;
  }

  colorize() {
    console.log('colorize');
    if (this.context && this.context.monaco) {
      this.context.monaco.editor.colorizeElement(this.refs.container);
    }
  }

  applyEdit(data) {
    console.log('aaaaaaaaaaa');
    console.log(this.getChange(this.editor.getValue(), data));
    this.value = this.getChange(this.value, data);
    this.colorize();
  }

  setValue(data) {
    console.log('bbbbbbb');
    this.value = data;
    this.colorize();
  }
}

MonacoView.propTypes = {
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

MonacoView.defaultProps = {
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

export default MonacoView;
