import { Link } from "react-router-dom";

import "assets/css/Cards.css";
import DefaultPersonImage from "assets/media/default-person-image.png";

const PersonCard = ({ person, characters, category }) => {
  return (
    <Link to={`/person/${person.id}`} className={"person-card text-decoration-none"}>
      <img
        src={person.image ? person.image : DefaultPersonImage}
        className={"me-3"}
        alt={"profile"}
      />
      <div className={"text-overflow w-75"}>
        <strong>{person.name}</strong>
        <br />
        {characters && <small>As {characters}</small>}
      </div>
    </Link>
  );
};

export default PersonCard;
