import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hideModals } from '@/actions/modals';
import Modal from '@/components/Modal/Modal';
import Button from '@/components/Button/Button';

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
    <Modal active={props.modals.logoutModal}>
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
          <Button onClick={confirm}>{props.confirmText}</Button>
          <Button class="outline margin-right" onClick={cancel}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

const mapStateToProps = ({ modals }) => ({ modals });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ hideModals }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmModal);
