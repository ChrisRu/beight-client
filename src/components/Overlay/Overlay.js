import React, { Component } from 'react';
import eventhub from '@/services/eventhub';
import './Overlay.scss';

class Overlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  componentDidMount() {
    eventhub.on('overlay:deactivate', this.hideOverlay);
    eventhub.on('overlay:activate', this.showOverlay);
    window.addEventListener('keydown', this.keyDown);
  }

  componentWillUnmount() {
    eventhub.remove('overlay:deactivate', this.hideOverlay);
    eventhub.remove('overlay:activate', this.showOverlay);
    window.removeEventListener('keydown', this.keyDown);
  }

  keyDown = event => {
    if (event.keyCode === 27) {
      this.hideOverlay();
    }
  };

  hideOverlay = () => {
    this.setState({ visible: false });
    eventhub.emit('overlay:deactivated');
  };

  showOverlay = () => {
    this.setState({ visible: true });
    eventhub.emit('overlay:activated');
  };

  render() {
    const className = `overlay ${this.state.visible ? '' : 'hidden'}`;
    return <div role="button" tabIndex={-1} class={className} onClick={this.hideOverlay} />;
  }
}

export default Overlay;
