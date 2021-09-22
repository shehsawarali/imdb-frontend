import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

import defaultImage from "assets/media/default-person.png";

const ProfileHeader = ({ profile }) => {
  return (
    <div className={"profile-header"}>
      <img src={defaultImage} className={"profile-picture"} alt={"profile"} />

      <div>
        <h1>
          {profile.first_name} {profile.last_name}
        </h1>
        <div>
          <Icon icon={"envelope"} className={"me-2"} />
          {profile.email}
        </div>
        <div>
          <span className={"me-3 d-inline"}>
            <Icon icon={"birthday-cake"} className={"me-2"} />
            {profile.age} years
          </span>
          <span className={"d-inline"}>
            <Icon icon={"location-arrow"} className={"me-2"} />
            {profile.country.name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
