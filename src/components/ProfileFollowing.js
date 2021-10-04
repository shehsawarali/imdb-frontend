import { useEffect, useState } from "react";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { Button, Row, Spinner } from "react-bootstrap";

import { FollowListCard } from "components";
import UserService from "services/UserService";

const ProfileFollowers = ({ id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const [next, setNext] = useState(null);

  useEffect(() => {
    fetch(setIsLoading);
  }, [id]);

  const fetch = (callback) => {
    UserService.following(id, page + 1)
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
          <Button className={"btn-inverted"}>
            <Spinner animation={"border"} size={"sm"} />
          </Button>
        </div>
      );
    }

    return (
      <div className={"text-center mt-5"}>
        <Button className={"btn-inverted"} onClick={fetchMore}>
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

  if (!list.length) {
    return <div className={"text-center"}>This user is not following anyone</div>;
  }

  return (
    <>
      <Row md={1} xl={2} className="g-4">
        {list.map((user_instance, index) => (
          <FollowListCard key={index} user={user_instance} />
        ))}
      </Row>

      {next && loadMoreButton()}
    </>
  );
};

export default ProfileFollowers;
