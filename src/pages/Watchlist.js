import { useEffect } from "react";

function Watchlist(props) {
  useEffect(() => {}, []);

  return (
    <div
      style={{
        width: "60%",
        minHeight: "92vh",
        overflow: "auto",
        backgroundColor: "#1f1f1f",
        margin: "0 auto",
        borderRadius: "5px",
        padding: "3rem 1rem",
        color: "white",
      }}
      className={"detail-page-container"}
    >
      <h6 className={"display-6"}>Watchlist</h6>
    </div>
  );
}

export default Watchlist;
