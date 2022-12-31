import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const DeleteConfirmModal = ({ tableInstance, deleteItem }) => {
  const { selectedFlatRows, setIsOpenAddEditModal, isOpenDeleteConfirmModal, setIsOpenDeleteConfirmModal } = tableInstance;
  const onDeleteConfirm = () => {
    setIsOpenAddEditModal(false);
    setIsOpenDeleteConfirmModal(false);
    deleteItem(selectedFlatRows.map((x) => x.original));
  };

  return (
    <Modal centered className="modal-close-out" show={isOpenDeleteConfirmModal} onHide={() => setIsOpenDeleteConfirmModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span className="fw-bold">{selectedFlatRows.length === 1 ? selectedFlatRows[0].original.label : `${selectedFlatRows.length} mots clés`}</span>{' '}
        <span>sera supprimé. Vous êtes sûr?</span>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-primary" onClick={() => setIsOpenDeleteConfirmModal(false)}>
          Non
        </Button>
        <Button onClick={onDeleteConfirm}>Oui</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmModal;
