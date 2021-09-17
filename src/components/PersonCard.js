import { Link } from "react-router-dom";

import DefaultPersonImage from "assets/media/default-person-image.png";

const PersonCard = ({ person, characters, category }) => {
  return (
    <Link to={`/person/${person.id}`} className={"cast-card text-decoration-none"}>
      <img
        src={person.image ? person.image : DefaultPersonImage}
        className={"me-3"}
        alt={"profile"}
        style={{ height: "70px", width: "70px", borderRadius: "50%" }}
      />
      <div className={"text-overflow w-75"} style={{ color: "white" }}>
        <span style={{ fontWeight: "bold" }}>{person.name}</span>
        <br />
        <small style={{ color: "lightgray" }}>{characters}</small>
        <small style={{ color: "lightgray" }}>{category}</small>
      </div>
    </Link>
  );
};

export default PersonCard;
