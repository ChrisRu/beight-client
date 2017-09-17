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

  const { active, title, description, confirmText } = props.modals;

  return (
    <Modal active={active} class="error">
      <div class="row">
        <h3 class="modal-title">
          <AlertCircle class="icon" />
          {title}
        </h3>
      </div>
      <div class="row">
        <p>{description}</p>
      </div>
      <div class="row">
        <div class="pull-right">
          <Button class="error" onClick={close}>
            {confirmText || 'Okay'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

const mapStateToProps = ({ modals }) => ({ modals });
const mapDispatchToProps = dispatch => bindActionCreators({ hideModals }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ErrorModal);
