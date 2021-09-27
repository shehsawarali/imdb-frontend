import { useContext, useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";
import { Link, Redirect, useParams } from "react-router-dom";

import "assets/css/Title.css";
import DefaultTitleImage from "assets/media/default-title-image.png";
import {
  FavoriteButton,
  LoadingScreen,
  PersonCard,
  TitleRatingButton,
  WatchlistButton,
  WriteReview,
} from "components";
import { UserContext } from "context/UserContext";
import CoreService from "services/CoreService";

const Title = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);

  const [title, setTitle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    CoreService.title(id)
      .then((response) => {
        setTitle(response);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) return <LoadingScreen />;

  if (!title) return <Redirect to={"/404"} />;

  const renderHeader = () => {
    return (
      <div className={"detail-page-header mb-3"}>
        <div>
          <span className={"me-1"}>
            {title.type.name.charAt(0).toUpperCase() + title.type.name.slice(1)}
          </span>
          {title.runtime_minutes && (
            <span className={"me-1"}>&#183; {title.runtime_minutes}min</span>
          )}
          {title.is_adult && <span>&#183; Adults Only</span>}
        </div>
        <div>
          <Link to={`/title/${id}/reviews`} className={"me-1"}>
            User Reviews
          </Link>
          {user && (
            <>
              &#183;&nbsp;
              <WriteReview title_id={id} />
            </>
          )}
        </div>
      </div>
    );
  };

  const renderGenres = () => {
    return (
      <div className={"title-page-genres mb-3"}>
        {title.genres.map((genre, index) => (
          <Link to={`/search/title/?genre=${genre.name}`} key={index}>
            {genre.name}
          </Link>
        ))}
      </div>
    );
  };

  const renderPicture = () => {
    return (
      <img
        src={title.image ? title.image : DefaultTitleImage}
        alt={"title"}
        className={"detail-page-picture"}
      />
    );
  };

  const renderInfo = () => {
    return (
      <div className={"detail-page-info w-100"}>
        <h2 className={"max-lines-2"}>{title.name}</h2>
        <div className="detail-page-years d-flex justify-content-between">
          <p>
            {title.start_year} {title.end_year ? ` - ${title.end_year}` : null}
          </p>
          {user && (
            <div>
              <WatchlistButton title_id={id} />
              &emsp;
              <FavoriteButton title_id={id} />
            </div>
          )}
        </div>

        <Row className={"mb-3"}>
          <Col className={"title-rating"}>
            <strong>Average Rating</strong>
            {title.rating ? (
              <p>
                <FontAwesomeIcon icon={"star"} className={"primary me-1 pointer"} />
                <strong>{title.rating}</strong>
                /10
              </p>
            ) : (
              <>
                <br />
                <small className={"text-muted"}>None</small>
              </>
            )}
          </Col>

          {user && (
            <Col className={"title-rating"}>
              <strong>Your Rating</strong>
              <br />
              <TitleRatingButton title_id={id} />
            </Col>
          )}
        </Row>

        <div className={"title-description mb-5"}>
          {title.description ? (
            title.description
          ) : (
            <small className="text-muted">There is no description for this title</small>
          )}
        </div>
      </div>
    );
  };

  const renderCrew = () => {
    return (
      <>
        {title.crew?.directors.length > 0 && (
          <div className={"mt-4"}>
            <h5>Directors</h5>
            <Row md={1} xl={2} className="g-4">
              {title.crew?.directors.map((director, index) => (
                <Col key={index}>
                  <PersonCard person={director} />
                </Col>
              ))}
            </Row>
          </div>
        )}

        {title.crew?.writers.length > 0 && (
          <div className={"mt-4"}>
            <h5>Writers</h5>
            <Row md={1} xl={2} className="g-4">
              {title.crew?.writers.map((writer, index) => (
                <Col key={index}>
                  <PersonCard person={writer} />
                </Col>
              ))}
            </Row>
          </div>
        )}
      </>
    );
  };

  const renderCast = () => {
    if (!title.principals.length) return null;

    return (
      <div className={"title-cast mt-5"}>
        <h3>Cast & Other Crew</h3>
        <Row md={1} xl={2} className="g-4">
          {title.principals.map((principal, index) => (
            <Col key={index}>
              <PersonCard
                person={principal.person}
                characters={principal.characters}
                category={principal.category}
              />
            </Col>
          ))}
        </Row>
      </div>
    );
  };

  return (
    <>
      <div className={"detail-page-container"}>
        <div className={"detail-page-padding"}>
          {renderHeader()}

          {renderGenres()}

          <div className={"detail-page-flex"}>
            {renderPicture()}
            {renderInfo()}
          </div>

          {renderCrew()}
          {renderCast()}
        </div>
      </div>
    </>
  );
};

export default Title;
