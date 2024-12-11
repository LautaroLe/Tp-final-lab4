import React from "react";
import { Modal, Button } from "react-bootstrap";

function ConfirmDialog({ show, Confirmation, Cancelation, message }) {
  return (
    <Modal show={show} onHide={Cancelation} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar acción</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={Cancelation}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={Confirmation}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmDialog;
