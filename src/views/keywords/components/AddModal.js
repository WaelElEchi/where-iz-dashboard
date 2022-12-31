import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, CloseButton, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { valid } from 'overlayscrollbars';

const AddModal = ({ tableInstance, addItem }) => {
  const { selectedFlatRows, data, setIsOpenAddModal, isOpenAddModal, setIsOpenDeleteConfirmModal } = tableInstance;
  const emptyItem = { id: data.length + 1, label: '', location: '', information: '' };
  const [selectedItem, setSelectedItem] = useState(emptyItem);

  const [validated, setValidated] = useState(false);

  const onSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      console.log('here three');
      setValidated(true);
      addItem({ item: selectedItem });
      setIsOpenAddModal(false);
    }
    setValidated(true);
  };

  useEffect(() => {
    setSelectedItem(emptyItem);
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenAddModal, selectedFlatRows]);

  const changeName = (event) => {
    setSelectedItem({ ...selectedItem, label: event.target.value });
  };
  const changeLocation = (event) => {
    setSelectedItem({ ...selectedItem, location: event.target.value });
  };
  const changeInformation = (event) => {
    setSelectedItem({ ...selectedItem, information: event.target.value });
  };

  const saveItem = () => {
    console.log('yo');
  };

  return (
    <>
      <Modal className="modal-center" show={isOpenAddModal} onHide={() => setIsOpenAddModal(false)} centered>
        <CloseButton className="position-absolute e-2 t-2 z-index-1" onClick={() => setIsOpenAddModal(false)} />
        <Modal.Header>
          <Modal.Title>Ajouter un mot clé</Modal.Title>
        </Modal.Header>

        <Modal.Body className="d-flex flex-column">
          <Form noValidate validated={validated} onSubmit={onSubmit}>
            <>
              <div className="mb-3 filled w-100 d-flex flex-column">
                <CsLineIcons icon="key" />
                <Form.Group className="position-relative tooltip-end-top" controlId="validationStandard01">
                  <Form.Control required type="text" placeholder="Mot clé" defaultValue={selectedItem ? selectedItem.label : ''} onChange={changeName} />
                  <Form.Control.Feedback type="invalid">Veuillez définir le label du mot clé.</Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="mb-3 filled w-100 d-flex flex-column">
                <CsLineIcons icon="pin" />
                <Form.Control
                  required
                  type="text"
                  placeholder="Localisation"
                  defaultValue={selectedItem ? selectedItem.location : ''}
                  onChange={changeLocation}
                />
                <Form.Control.Feedback type="invalid">Veuillez définir la localisation relative au mot clé.</Form.Control.Feedback>
              </div>
              <div className="mb-3 filled w-100 d-flex flex-column">
                <CsLineIcons icon="news" />
                <Form.Control type="text" placeholder="Information" defaultValue={selectedItem ? selectedItem.information : ''} onChange={changeInformation} />
              </div>
            </>
            <Modal.Footer className="border-0 flex justify-content-center">
              <Button type="submit" className="btn-icon btn-icon-end" onClick={saveItem}>
                <span>Ajouter</span> <CsLineIcons icon="plus" />
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default AddModal;
