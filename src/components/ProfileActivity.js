import React, { useContext, useEffect, useState } from "react";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { Button, Col, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

import defaultTitleImage from "assets/media/default-title-image.png";
import { TextModal } from "components";
import { UserContext } from "context/UserContext";
import UserService from "services/UserService";
import { getDatetime } from "utils";

const ProfileActivity = ({ id }) => {
  const { user } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const [next, setNext] = useState(null);

  useEffect(() => {
    fetch(setIsLoading);
  }, []);

  const fetch = (callback) => {
    UserService.activity(id, page + 1)
      .then((response) => {
        setList([...list, ...response.results]);
        setNext(response.next);
        setPage((page) => page + 1);
      })
      .finally(() => {
        callback(false);
      });
  };

  const fetchMore = () => {
    if (!next) return;

    setIsLoadingMore(true);
    fetch(setIsLoadingMore);
  };

  const loadMoreButton = () => {
    if (isLoadingMore) {
      return (
        <div className={"text-center mt-5"}>
          <Button className={"btn-inverted"} onClick={fetchMore}>
            <Spinner animation={"border"} size={"sm"} />
          </Button>
        </div>
      );
    }

    return (
      <div className={"text-center mt-5"}>
        <Button onClick={fetchMore}>
          View More <Icon icon={"angle-double-down"} size="1x" className={"ms-1"} />
        </Button>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className={"text-center"}>
        <Spinner animation={"border"} />
      </div>
    );
  }

  if (!list.length > 0) {
    return <div className={"text-center"}>This user has no activity</div>;
  }

  const activityCard = (instance, key) => {
    if (!instance) return null;

    let activityUser = instance.user;
    let title = instance.title;
    let review = instance.review?.review;
    let given_rating = instance.rating?.rating;
    let action = instance.action;
    let created_at = instance.created_at;

    return (
      <div className={"activity-card p-4"} key={key}>
        <div className={"header"}>
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
                  modalButton={"See Review"}
                  modalTitle={`${activityUser.first_name}'s Review`}
                />
              </>
            )}
          </div>
          {user?.timezone ? (
            <small>{getDatetime(created_at, user.timezone)}</small>
          ) : (
            <small>{getDatetime(created_at)}</small>
          )}
        </div>

        <br />
        <div className={"d-flex"}>
          <img
            className={"title-image me-4"}
            src={title.image || defaultTitleImage}
            alt={"title"}
          />
          <div>
            <Link to={`/title/${title.id}`} className={"link lightgray"}>
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

  return (
    <>
      {list.length > 0 &&
        list.map((activity, index) => {
          return activityCard(activity, index);
        })}

      {next && loadMoreButton()}
    </>
  );
};

export default ProfileActivity;
