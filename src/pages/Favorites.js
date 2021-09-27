import { useEffect, useState } from "react";

import { FontAwesomeIcon as Icon, FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Row, Spinner } from "react-bootstrap";

import { LoadingScreen, TitleCard } from "components";
import CoreService from "services/CoreService";

function Favorites() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [list, setList] = useState([]);
  const [next, setNext] = useState(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetch(setIsLoading);
  }, []);

  async function fetch(callback) {
    CoreService.favorites(page + 1)
      .then((response) => {
        setList([...list, ...response.results]);
        setNext(response.next);
        setPage((page) => page + 1);
      })
      .finally(() => callback(false));
  }

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
          View More{" "}
          <Icon icon={"angle-double-down"} size="1x" style={{ marginLeft: "8px" }} />
        </Button>
      </div>
    );
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <div className={"detail-page-container"}>
      <h6 className={"display-6 text-center"}>
        <FontAwesomeIcon icon={"heart"} className={"me-3"} size={"sm"} />
        Favorites
      </h6>
      <hr />
      {list.length ? (
        <Row md={2} xl={2} className="g-4">
          {list.map((title, index) => (
            <TitleCard key={index} title={title} />
          ))}
        </Row>
      ) : (
        <p className={"text-muted text-center"}>Your watchlist is empty</p>
      )}

      {next && loadMoreButton()}
    </div>
  );
}

export default Favorites;
