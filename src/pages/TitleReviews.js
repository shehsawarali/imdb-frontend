import { useContext, useEffect, useState } from "react";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { Button, Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

import { LoadingScreen, Review, WriteReview } from "components";
import { UserContext } from "context/UserContext";
import CoreService from "services/CoreService";

const TitleReviews = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [title, setTitle] = useState(null);
  const [list, setList] = useState([]);
  const [next, setNext] = useState(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    CoreService.title(id)
      .then((response) => {
        setTitle(response);
      })
      .finally(() => {
        fetch().then(setIsLoading(false));
      });
  }, [id]);

  const fetch = async () => {
    CoreService.getReviews(id, page + 1)
      .then((response) => {
        setList([...list, ...response.results]);
        setNext(response.next);

        setPage((page) => page + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchMore = () => {
    if (!next) return;

    setIsLoadingMore(true);
    fetch().then(() => setIsLoadingMore(false));
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

  if (isLoading) return <LoadingScreen />;

  return (
    <>
      <div className={"detail-page-container"}>
        <p className={"text-center"}>
          Showing reviews for <Link to={`/title/${id}`}>{title.name}</Link>
        </p>
        {user && (
          <div className={"detail-page-header mb-3"}>
            <WriteReview title_id={id} />
          </div>
        )}
        {list.length > 0 ? (
          <>
            {list.map((review, index) => {
              return (
                <Review
                  key={index}
                  review={review}
                  color={index % 2 ? "lightgray" : "var(--primary)"}
                />
              );
            })}

            {next && loadMoreButton()}
          </>
        ) : (
          <p className={"text-center"}>There are no reviews for this title.</p>
        )}
      </div>
    </>
  );
};

export default TitleReviews;
