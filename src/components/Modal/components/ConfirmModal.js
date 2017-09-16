import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hideModals } from '@/actions/modals';
import Modal from '@/components/Modal/Modal';
import { handleEnter } from '@/services/accessibility';

const ConfirmModal = props => {
  const confirm = () => {
    if (props.confirm) {
      props.confirm();
    }
    props.hideModals();
  };

  const cancel = () => {
    if (props.cancel) {
      props.cancel();
    }
    props.hideModals();
  };

  return (
    <Modal active={props.active}>
      <div class="row">
        <h3 class="modal-title">
          {props.icon}
          {props.title}
        </h3>
      </div>
      <div class="row">
        <p>{props.description}</p>
      </div>
      <div class="row">
        <div class="pull-right">
          <button class="button" onKeyPress={handleEnter(confirm)} onClick={confirm}>
            {props.confirmText}
          </button>
          <button
            class="button outline margin-right"
            onKeyPress={handleEnter(cancel)}
            onClick={cancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

const mapDispatchToProps = dispatch => bindActionCreators({ hideModals }, dispatch);

export default connect(null, mapDispatchToProps)(ConfirmModal);
