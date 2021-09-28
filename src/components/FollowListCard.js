import { Col } from "react-bootstrap";

import ProfileImage from "assets/media/default-person.png";
import { FollowButton } from "components";

const FollowListCard = ({ user }) => {
  return (
    <Col>
      <div className={"profile-follow-card mb-1"}>
        <a
          href={`/user/${user.id}`}
          className={"d-flex align-items-center text-decoration-none"}
        >
          <img
            src={ProfileImage}
            className={"profile-picture me-3"}
            alt={"profile"}
            style={{ height: "70px", width: "70px" }}
          />
          <div className={"text-overflow w-50"} style={{ color: "white" }}>
            {user.first_name} {user.last_name}
            <br />
            {user.email}
          </div>
        </a>
        <div className={"text-center"}>
          <FollowButton id={user.id} />
        </div>
      </div>
    </Col>
  );
};

export default FollowListCard;
