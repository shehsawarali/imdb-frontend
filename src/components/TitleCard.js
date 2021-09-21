import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import DefaultTitleImage from "assets/media/default-title-image.png";

const TitleCard = ({ title }) => (
  <Col>
    <Link to={`/title/${title.id}`} className={"cast-card text-decoration-none"}>
      <img
        src={title.image ? title.image : DefaultTitleImage}
        className={"me-3"}
        alt={"profile"}
        style={{ height: "70px", width: "50px" }}
      />
      <div className={"text-overflow w-75"} style={{ color: "white" }}>
        <span style={{ fontWeight: "bold" }}>{title.name}</span>
        <br />
        <small style={{ color: "lightgray" }}>{title.start_year}</small>
      </div>
    </Link>
  </Col>
);

export default TitleCard;
