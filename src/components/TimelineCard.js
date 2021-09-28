import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import defaultTitleImage from "assets/media/default-title-image.png";
import { TextModal } from "components";

const TimelineCard = ({ instance }) => {
  if (!instance) return null;

  let user = instance.user;
  let title = instance.title;
  let review = instance.review?.review;
  let given_rating = instance.rating?.rating;
  let action = instance.action;
  let created_at = instance.created_at;

  return (
    <div className={"timeline-card p-4 flex-column align-items-start"}>
      <div className={"header"}>
        <Link to={`/user/${user.id}`} className={"lead"}>
          <strong>
            {user.first_name} {user.last_name}
          </strong>
        </Link>
        <small className={"text-muted"}>{new Date(created_at).toLocaleString()}</small>
      </div>
      <div>
        <small>{action}</small>
        {given_rating && (
          <span className={"blue"}>
            <FontAwesomeIcon icon={"star"} className={"blue ms-2 me-1 pointer"} />
            <strong className={"blue"}>{given_rating}</strong>
          </span>
        )}
        {review && (
          <>
            &nbsp;&nbsp;
            <TextModal
              text={review}
              modalButton={"Open Review"}
              modalTitle={`${user.first_name}'s Review`}
            />
          </>
        )}
      </div>
      <br />
      <div className={"d-flex"}>
        <img className={"title-image me-4"} src={title.image || defaultTitleImage} />
        <div>
          <Link to={`/title/${title.id}`}>
            <strong>{title.name}</strong>
          </Link>
          <Col>
            {title.rating ? (
              <p className={"primary"}>
                <FontAwesomeIcon icon={"star"} className={"me-1 pointer"} />
                <strong>{title.rating}</strong>
              </p>
            ) : (
              <>
                <small className={"text-muted"}>No rating</small>
              </>
            )}
          </Col>
        </div>
      </div>
    </div>
  );
};

export default TimelineCard;
