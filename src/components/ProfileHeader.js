import { useRef, useContext } from "react";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

import defaultImage from "assets/media/default-person.png";
import { UserContext } from "context/UserContext";
import UserService from "services/UserService";

const ProfileHeader = ({ profile }) => {
  const { user } = useContext(UserContext);
  const fileInputRef = useRef();

  const handleUpload = (e) => {
    let form = new FormData();
    form.append("image", e.target.files[0]);

    UserService.uploadImage(form)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        fileInputRef.current.value = "";
        // ADD TOAST HERE
      });
  };

  const fileUpload = () => {
    if (user?.id === profile.id)
      return (
        <input
          onChange={handleUpload}
          accept={"image/*"}
          name={"image"}
          multiple={false}
          ref={fileInputRef}
          type="file"
          hidden
        />
      );
  };

  return (
    <div className={"profile-header"}>
      {fileUpload()}

      <div className={"avatar"}>
        <img
          src={profile.image ? profile.image : defaultImage}
          className={"profile-picture"}
          alt={"profile"}
        />
        <div
          className={`avatar-edit ${user?.id != profile.id && "invisible"}`}
          onClick={() => fileInputRef.current.click()}
        >
          <small className={"me-1"}>Change</small>
          <Icon icon={"edit"} size={"sm"} />
        </div>
      </div>

      <div id="info">
        <span className={"h3"}>
          {profile.first_name} {profile.last_name}
        </span>
        <div className={"mt-2"}>
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
