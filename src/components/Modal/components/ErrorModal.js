import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hideModals } from '@/actions/modals';
import Modal from '@/components/Modal/Modal';
import Button from '@/components/Button/Button';
import { AlertCircle } from 'react-feather';

const ErrorModal = props => {
  const close = () => {
    if (props.onClose) {
      props.onClose();
    }
    props.hideModals();
  };

  return (
    <Modal active={props.active} class="error">
      <div class="row">
        <h3 class="modal-title">
          <AlertCircle class="icon" />
          {props.title}
        </h3>
      </div>
      <div class="row">
        <p>{props.description}</p>
      </div>
      <div class="row">
        <div class="pull-right">
          <Button class="error" onClick={close}>
            {props.confirmText || 'Okay'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

const mapDispatchToProps = dispatch => bindActionCreators({ hideModals }, dispatch);

export default connect(null, mapDispatchToProps)(ErrorModal);
