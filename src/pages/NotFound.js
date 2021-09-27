import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "assets/css/NotFound.css";

const NotFound = () => {
  return (
    <div className={"not-found"}>
      <FontAwesomeIcon icon={"dizzy"} />
      <br />
      <h2>The page you requested does not exist.</h2>
    </div>
  );
};

export default NotFound;
