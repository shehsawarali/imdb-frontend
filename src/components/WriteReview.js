import { useEffect, useState } from "react";

import { Button, CloseButton, Modal, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

import { Rate } from "components";
import CoreService from "services/CoreService";

const WriteReview = ({ title_id }) => {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [rating, setRating] = useState(null);
  const [review, setReview] = useState("");

  useEffect(() => {
    CoreService.isRated(title_id)
      .then((isRated) => {
        setRating(isRated.rating);

        CoreService.isReviewed(title_id).then((isReviewed) => {
          if (isReviewed.review) setReview(isReviewed.review);
        });
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const changeReview = (e) => {
    setReview(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!rating) {
      toast.error("Please rate the title before submitting your review");
      return;
    }

    setIsSaving(true);
    CoreService.review({ id: title_id, review })
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        toast.error("An error occurred. Please try again.");
      });
  };

  return (
    <>
      <span className={"link"} onClick={handleShow}>
        Your Review
      </span>

      <Modal show={show} onHide={handleClose} backdrop={"static"} centered size="lg">
        <Modal.Header className={"lightgray"}>
          <Modal.Title>Your Review</Modal.Title>
          <CloseButton variant={"white"} onClick={handleClose} />
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            {!isLoading ? (
              <>
                <Rate rating={rating} setRating={setRating} title_id={title_id} />
                <br />
                <textarea
                  name={"review"}
                  required
                  placeholder={"Write your review"}
                  rows={10}
                  value={review}
                  onChange={changeReview}
                  maxLength={2000}
                />
              </>
            ) : (
              <div className={"text-center"}>
                <Spinner animation={"border"} className={"lightgray"} />
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button type={"submit"}>
              {isSaving ? <Spinner animation={"border"} size={"sm"} /> : "Submit"}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default WriteReview;
