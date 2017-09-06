import React from 'react';
import Modal from './Modal';
import eventhub from '../util/eventhub';

const ConfirmModal = props => (
  <Modal active={props.active}>
    <div class="row">
      <h3 class="modal-title">{props.title}</h3>
    </div>
    <div class="row">
      <p>{props.description}</p>
    </div>
    <div class="row">
      <div class="pull-right">
        <button
          class="button"
          onClick={() => {
            props.confirm();
            eventhub.emit('overlay:deactivate');
          }}>
          {props.confirmText}
        </button>
      </div>
    </div>
  </Modal>
);

export default ConfirmModal;
