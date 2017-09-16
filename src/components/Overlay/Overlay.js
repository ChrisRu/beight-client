import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hideModals } from '@/actions/modals';
import './Overlay.scss';

class Overlay extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.keyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDown);
  }

  keyDown = event => {
    if (event.keyCode === 27) {
      this.props.hideModals();
    }
  };

  render() {
    const className = `overlay ${this.props.modals.overlay ? '' : 'hidden'}`;
    return <div role="button" tabIndex={-1} class={className} onClick={this.props.hideModals} />;
  }
}

const mapStateToProps = ({ modals }) => ({ modals });
const mapDispatchToProps = dispatch => bindActionCreators({ hideModals }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Overlay);
