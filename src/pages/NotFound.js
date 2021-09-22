import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NotFound = () => {
  return (
    <div
      className={"not-found"}
      style={{
        minHeight: "92vh",
        color: "white",
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "1rem",
      }}
    >
      <FontAwesomeIcon
        icon={"dizzy"}
        style={{ color: "var(--error)", fontSize: "10rem" }}
      />
      <br />
      <h2>The page you requested does not exist.</h2>
    </div>
  );
};

export default NotFound;
