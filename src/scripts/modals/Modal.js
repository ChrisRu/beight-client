import React, { Component } from 'react';
import { X } from 'react-feather';
import eventhub from '../util/eventhub';

class Modal extends Component {
  hideOverlay = () => {
    eventhub.emit('overlay:deactivate');
  };

  render() {
    if (this.props.active) {
      return (
        <div className="modal-wrapper">
          <div className="modal">
            <X className="icon-button pull-right" onClick={this.hideOverlay} />
            {this.props.children}
          </div>
        </div>
      );
    }
  }
}

export default Modal;
