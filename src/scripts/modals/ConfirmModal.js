import React from 'react';
import Modal from './Modal';
import eventhub from '../util/eventhub';

const ConfirmModal = props => (
  <Modal active={props.active}>
    <div className="row">
      <h3 className="modal-title">{props.title}</h3>
    </div>
    <div className="row">
      <p>{props.description}</p>
    </div>
    <div class="row">
      <div className="pull-right">
        <button
          className="button"
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
