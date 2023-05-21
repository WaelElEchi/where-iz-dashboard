import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, CloseButton, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import CsLineIcons from 'cs-line-icons/CsLineIcons';

const AddEditModal = ({ tableInstance, addItem, editItem }) => {
  const { selectedFlatRows, data, setIsOpenAddEditModal, isOpenAddEditModal, setIsOpenDeleteConfirmModal } = tableInstance;
  const emptyItem = { id: data.length + 1, label: '', location: '', information: '' };
  const [selectedItem, setSelectedItem] = useState(emptyItem);

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  useEffect(() => {
    if (isOpenAddEditModal && selectedFlatRows.length === 1) {
      setSelectedItem(selectedFlatRows[0].original);
    } else {
      setSelectedItem(emptyItem);
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenAddEditModal, selectedFlatRows]);

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
    if (selectedFlatRows.length === 1) {
      editItem({ item: selectedItem });
    } else {
      addItem({ item: selectedItem });
    }
    if (validated) setIsOpenAddEditModal(false);
    console.log(selectedItem);
  };
  return (
    <>
      <Modal className="modal-center" show={isOpenAddEditModal} onHide={() => setIsOpenAddEditModal(false)} centered>
        <CloseButton className="position-absolute e-2 t-2 z-index-1" onClick={() => setIsOpenAddEditModal(false)} />
        <Modal.Header>
          <Modal.Title>{selectedFlatRows.length === 1 ? 'Update Keyword' : 'Add keyword'}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="d-flex flex-column">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <>
              <div className="mb-3 filled w-100 d-flex flex-column">
                <CsLineIcons icon="key" />
                <Form.Group className="position-relative tooltip-end-top" controlId="validationStandard01">
                  <Form.Control required type="text" placeholder="Keyword" defaultValue={selectedItem ? selectedItem.label : ''} onChange={changeName} />
                  <Form.Control.Feedback type="invalid">Keyword is required.</Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="mb-3 filled w-100 d-flex flex-column">
                <CsLineIcons icon="pin" />
                <Form.Control required type="text" placeholder="Location" defaultValue={selectedItem ? selectedItem.location : ''} onChange={changeLocation} />
                <Form.Control.Feedback type="invalid">Location is required.</Form.Control.Feedback>
              </div>
              <div className="mb-3 filled w-100 d-flex flex-column">
                <CsLineIcons icon="news" />
                <Form.Control type="text" placeholder="Information" defaultValue={selectedItem ? selectedItem.information : ''} onChange={changeInformation} />
              </div>
            </>
            <Modal.Footer className="border-0 flex justify-content-center">
              {selectedFlatRows.length === 1 && (
                <OverlayTrigger delay={{ show: 500, hide: 0 }} overlay={<Tooltip>Delete</Tooltip>} placement="top">
                  <Button variant="outline-primary" className="btn-icon btn-icon-only" onClick={() => setIsOpenDeleteConfirmModal(true)}>
                    <CsLineIcons icon="bin" />
                  </Button>
                </OverlayTrigger>
              )}
              <Button type="submit" className="btn-icon btn-icon-end" onClick={saveItem}>
                {selectedFlatRows.length === 1 ? (
                  <>
                    <span>Submit</span> <CsLineIcons icon="check" />
                  </>
                ) : (
                  <>
                    <span>Add</span> <CsLineIcons icon="plus" />
                  </>
                )}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default AddEditModal;
