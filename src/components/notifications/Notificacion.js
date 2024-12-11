import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const NotificationToast = ({ show, message, variant, onClose }) => {
  return (
    <ToastContainer position="top-end" className="p-3 rounded me-2 mt-8 custom-toast" >
      <Toast show={show} onClose={onClose} bg={variant} delay={3000} autohide animation={true} >
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default NotificationToast;
