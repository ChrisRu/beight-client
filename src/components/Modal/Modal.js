import React, { Component } from 'react';
import { X } from 'react-feather';
import eventhub from '@/services/eventhub';
import './Modal.scss';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: props.active,
      class: ''
    };
  }

  componentWillReceiveProps(props) {
    if (props.active === true && this.state.active === false) {
      this.setState({ active: true, class: 'fade-in' });
      setTimeout(() => {
        this.setState({ class: '' });
      }, 100);
    } else if (props.active === false && this.state.active === true) {
      this.setState({ class: 'fade-out' });
      setTimeout(() => {
        this.setState({ active: false, class: '' });
      }, 100);
    }
  }

  hideOverlay = () => {
    eventhub.emit('overlay:deactivate');
  };

  render() {
    if (this.state.active) {
      return (
        <div class={`${this.props.class} ${this.state.class} modal-wrapper`}>
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
