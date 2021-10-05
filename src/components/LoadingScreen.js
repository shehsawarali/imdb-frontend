import { Spinner } from "react-bootstrap";

import "assets/css/LoadingScreen.css";

const LoadingScreen = () => {
  return (
    <div className={"loading-screen"}>
      <Spinner animation={"border"} />
    </div>
  );
};

export default LoadingScreen;
