import React, { useContext } from "react";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import defaultTitleImage from "assets/media/default-title-image.png";
import defaultUserImage from "assets/media/default-user-image.png";
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
    <div className={"timeline-card flex-row"}>
      <img
        className={"title-image"}
        src={title.image || defaultTitleImage}
        alt={"title"}
      />
      <div className={"flex-column w-100"}>
        <div className={"header"}>
          <Link to={`/user/${activity_user.id}`}>
            <img
              src={activity_user.image || defaultUserImage}
              className={"user-image"}
              alt={"user"}
            />
            <strong className={"lead"}>
              {activity_user.first_name} {activity_user.last_name}
            </strong>
          </Link>
          <small>
            {user?.timezone
              ? getDatetime(created_at, user.timezone)
              : getDatetime(created_at)}
          </small>
        </div>
        <div className={"mt-1"}>
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
                modalButton={"See Review"}
                modalTitle={`${activity_user.first_name}'s Review`}
              />
            </>
          )}
        </div>
        <br />
        <div className={"d-flex"}>
          <div>
            <Link to={`/title/${title.id}`}>
              <strong>{title.name}</strong>
            </Link>
            <Col>
              {title.rating ? (
                <>
                  <Icon icon={"star"} className={"me-1 pointer primary"} />
                  <strong className={"lightgray"}>{title.rating}</strong>
                </>
              ) : (
                <>
                  <small className={"text-muted"}>No rating</small>
                </>
              )}
            </Col>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineCard;
