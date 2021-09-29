import React, { useContext } from "react";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import defaultTitleImage from "assets/media/default-title-image.png";
import { TextModal } from "components";
import { UserContext } from "context/UserContext";
import { getDatetime } from "utils";

const TimelineCard = ({ instance }) => {
  const { user } = useContext(UserContext);

  if (!instance) return null;

  let activity_user = instance.user;
  let title = instance.title;
  let review = instance.review?.review;
  let given_rating = instance.rating?.rating;
  let action = instance.action;
  let created_at = instance.created_at;

  return (
    <div className={"timeline-card p-4 flex-column align-items-start"}>
      <div className={"header"}>
        <Link to={`/user/${activity_user.id}`} className={"lead"}>
          <strong>
            {activity_user.first_name} {activity_user.last_name}
          </strong>
        </Link>
        {user?.timezone ? (
          <small className={"text-muted"}>{getDatetime(created_at, user.timezone)}</small>
        ) : (
          <small className={"text-muted"}>{getDatetime(created_at)}</small>
        )}
      </div>
      <div>
        <small>{action}</small>
        {given_rating && (
          <span className={"blue"}>
            <Icon icon={"star"} className={"blue ms-2 me-1 pointer"} />
            <strong className={"blue"}>{given_rating}</strong>
          </span>
        )}
        {review && (
          <>
            &nbsp;&nbsp;
            <TextModal
              text={review}
              modalButton={"Open Review"}
              modalTitle={`${activity_user.first_name}'s Review`}
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
                <Icon icon={"star"} className={"me-1 pointer"} />
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
