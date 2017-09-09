import React, { Component } from 'react';
import { X } from 'react-feather';
import eventhub from '@/services/eventhub';
import './styles.scss';

class Modal extends Component {
  hideOverlay = () => {
    eventhub.emit('overlay:deactivate');
  };

  render() {
    if (this.props.active) {
      return (
        <div class={`${this.props.class} modal-wrapper`}>
          <div class="modal">
            <X class="icon-button pull-right" onClick={this.hideOverlay} />
            {this.props.children}
          </div>
        </div>
      );
    }
    return null;
  }
}

export default Modal;
