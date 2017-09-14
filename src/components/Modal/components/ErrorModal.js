import React from 'react';
import eventhub from '@/services/eventhub';
import Modal from '@/components/Modal/Modal';
import { handleEnter } from '@/services/accessibility';
import { AlertCircle } from 'react-feather';

const ErrorModal = props => {
  const close = () => {
    if (props.onClose) {
      props.onClose();
    }
    eventhub.emit('overlay:deactivate');
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
          <button class="button error" onKeyPress={handleEnter(close)} onClick={close}>
            {props.confirmText || 'Okay'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ErrorModal;
