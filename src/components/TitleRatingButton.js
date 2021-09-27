import { useEffect, useState } from "react";

import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CloseButton, Modal, Spinner } from "react-bootstrap";

import { Rate } from "components";
import CoreService from "services/CoreService";

const TitleRatingButton = ({ title_id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState(null);

  useEffect(() => {
    CoreService.isRated(title_id)
      .then((response) => {
        setRating(response.rating);
      })
      .finally(() => setIsLoading(false));
  }, [title_id]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const ratingModal = () => {
    return (
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header className={"lightgray"}>
          <Modal.Title>Rate</Modal.Title>
          <CloseButton variant={"white"} onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          <Rate rating={rating} setRating={setRating} title_id={title_id} refreshOnSave />
          <br />
        </Modal.Body>
      </Modal>
    );
  };

  if (isLoading) return <Spinner animation={"border"} />;

  if (rating) {
    return (
      <>
        <p onClick={handleShow}>
          <FontAwesomeIcon icon={"star"} className={"lightcoral me-1 pointer"} />
          <strong className={"lightcoral pointer"}>{rating}</strong>
          /10
        </p>

        {ratingModal()}
      </>
    );
  }

  return (
    <>
      <p onClick={handleShow} className={"text-muted"}>
        <FontAwesomeIcon icon={faStar} className={"me-1 pointer"} />
        <span className={"text-muted"}>Rate</span>
      </p>

      {ratingModal()}
    </>
  );
};

export default TitleRatingButton;
