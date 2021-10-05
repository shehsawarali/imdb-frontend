import { useEffect, useState } from "react";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { Button, Spinner } from "react-bootstrap";

import { LoadingScreen, TimelineCard } from "components";
import CoreService from "services/CoreService";

const Timeline = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const [next, setNext] = useState(null);

  useEffect(() => {
    fetch(setIsLoading);
  }, []);

  const fetch = (callback) => {
    CoreService.timeline(page + 1)
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

  if (isLoading) return <LoadingScreen />;

  return (
    <div className={"detail-page-container"}>
      <h6 className={"display-6 text-center"}>
        <Icon icon={"history"} className={"me-3"} size={"sm"} />
        Timeline
      </h6>
      <hr />
      {list.length > 0 ? (
        list.map((activity, index) => {
          return <TimelineCard instance={activity} key={index} />;
        })
      ) : (
        <p className={"text-muted text-center"}>No activity</p>
      )}

      {next && loadMoreButton()}
    </div>
  );
};

export default Timeline;
