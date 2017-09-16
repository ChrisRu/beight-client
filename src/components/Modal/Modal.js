import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hideModals } from '@/actions/modals';
import { X } from 'react-feather';
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

  render() {
    if (this.state.active) {
      return (
        <div class={`${this.props.class} ${this.state.class} modal-wrapper`}>
          <div class="modal">
            <X class="icon-button pull-right" onClick={this.props.hideModals} />
            {this.props.children}
          </div>
        </div>
      );
    }
    return null;
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ hideModals }, dispatch);

export default connect(null, mapDispatchToProps)(Modal);
