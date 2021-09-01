import {Spinner} from "react-bootstrap";

const LoadingScreen = () => {
  return (
    <div style={{display: "flex", justifyContent: "center", padding: "5rem"}}>
      <Spinner
        animation={"border"}
        style={{
          color: "var(--primary)",
          height: "5rem",
          width: "5rem",
        }}
      />
    </div>
  );
};

export default LoadingScreen;
