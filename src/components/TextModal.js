import { useState } from "react";

import { CloseButton, Modal } from "react-bootstrap";

const TextModal = ({ text, modalButton, modalTitle }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const renderModal = () => {
    return (
      <Modal show={show} scrollable onHide={handleClose} size={"lg"} centered>
        <Modal.Header className={"lightgray"}>
          <Modal.Title>{modalTitle}</Modal.Title>
          <CloseButton variant={"white"} onClick={handleClose} />
        </Modal.Header>
        <Modal.Body className={"text-start"}>
          <p className={"lightgray"}>{text}</p>
          <br />
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <>
      <small className={"link"} onClick={handleShow}>
        {modalButton}
      </small>

      {renderModal()}
    </>
  );
};

export default TextModal;
