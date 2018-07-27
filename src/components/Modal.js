import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Modal.css';

const Modal = ({ message, onConfirm }) => (
  message && <div className="modal">
    <div className="modal-content">
      <div className="modal-content_text">
        <p>{message}</p>
      </div>
      <div
        className="modal-content_button"
        onClick={() => { onConfirm (); }}
      >
        <p>OK</p>
      </div>

    </div>
  </div>
);

Modal.propTypes = {
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func,
}

Modal.defaultProps = {
  onConfirm: () => {},
}

export default Modal;
