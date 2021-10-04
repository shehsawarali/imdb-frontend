import { useContext, useState } from "react";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

import { UNEXPECTED_ERROR_MESSAGE } from "constant";
import { UserContext } from "context/UserContext";
import UserService from "services/UserService";

const FollowButton = ({ id, name }) => {
  const { user, updateContext } = useContext(UserContext);
  const [follows, setFollows] = useState(user?.follows.includes(Number(id)));
  const [isLoading, setIsLoading] = useState(false);

  const follow = () => {
    setIsLoading(true);

    UserService.follow(id)
      .then(() => {
        setFollows(true);
        updateContext();
        toast.success(`You are now following ${name}`);
      })
      .catch(() => {
        toast.error(UNEXPECTED_ERROR_MESSAGE);
        updateContext();
        setFollows(null);
      })
      .finally(() => setIsLoading(false));
  };

  const unfollow = () => {
    setIsLoading(true);

    UserService.unfollow(id)
      .then(() => {
        setFollows(false);
        updateContext();
        toast.warning(`You have unfollowed ${name}`);
      })
      .catch(() => {
        toast.error(UNEXPECTED_ERROR_MESSAGE);
        setFollows(null);
      })
      .finally(() => setIsLoading(false));
  };

  const unfollowedState = () => {
    return (
      <Button className={"profile-follow-button"} onClick={follow}>
        Follow
        <Icon icon={"user-plus"} size="1x" className={"ms-2"} />
      </Button>
    );
  };

  const followedState = () => {
    return (
      <Button className={"profile-follow-button btn-inverted"} onClick={unfollow}>
        Unfollow
        <Icon icon={"user-minus"} size="1x" className={"ms-2"} />
      </Button>
    );
  };

  const loadingState = () => {
    return (
      <Button className={"profile-follow-button btn-inverted"}>
        <Spinner animation={"border"} size="sm" />
      </Button>
    );
  };

  const errorState = () => {
    return (
      <Button className={"profile-follow-button btn-inverted"}>
        <Icon icon={"exclamation-triangle"} size="1x" />
      </Button>
    );
  };

  const invisibleState = () => {
    return (
      <Button className={"profile-follow-button invisible"}>
        <Icon icon={"user"} size="1x" className={"ms-2"} />
      </Button>
    );
  };

  if (!user) return null;
  if (Number(id) === user?.id) return invisibleState();
  if (isLoading) return loadingState();
  if (follows === null) return errorState();
  if (follows) return followedState();
  else return unfollowedState();
};

export default FollowButton;
