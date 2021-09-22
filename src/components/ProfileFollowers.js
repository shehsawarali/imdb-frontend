import { useEffect, useState } from "react";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { Button, Row, Spinner } from "react-bootstrap";

import { FollowListCard } from "components";
import UserService from "services/UserService";

let list = [];
let page = 0;
let next = null;
let count = null;

const ProfileFollowers = ({ id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    UserService.followers(id, page + 1)
      .then((response) => {
        list = list.concat(response.results);
        next = response.next;
        count = response.count;
        page += 1;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  const fetchMore = () => {
    if (!next) return;

    setIsLoadingMore(true);
    UserService.followers(id, page + 1)
      .then((response) => {
        list = list.concat(response.results);
        next = response.next;
        count = response.count;
        page += 1;
      })
      .finally(() => {
        setIsLoadingMore(false);
      });
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
        <Button className={"btn-inverted"} onClick={fetchMore}>
          View More{" "}
          <Icon icon={"angle-double-down"} size="1x" style={{ marginLeft: "8px" }} />
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

  if (count === 0) {
    return <div className={"text-center"}>The user is not following anyone</div>;
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
