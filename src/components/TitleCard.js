import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import "assets/css/Cards.css";
import DefaultTitleImage from "assets/media/default-title-image.png";

const TitleCard = ({ title }) => (
  <Col>
    <Link to={`/title/${title.id}`} className={"title-card text-decoration-none"}>
      <img
        src={title.image ? title.image : DefaultTitleImage}
        className={"me-3"}
        alt={"profile"}
      />
      <div className={"text-overflow w-75"}>
        <strong className={"font-weight-bold"}>{title.name}</strong>
        <br />
        <small>{title.start_year}</small>
        <br />
        <small>
          {title.rating ? (
            <>
              {title.rating}&nbsp;
              <FontAwesomeIcon icon={"star"} className={"primary"} />
            </>
          ) : (
            <small>No ratings</small>
          )}
        </small>
      </div>
    </Link>
  </Col>
);

export default TitleCard;
