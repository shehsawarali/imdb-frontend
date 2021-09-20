import { useEffect, useState } from "react";

import QueryString from "query-string";
import { Col, Row, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import "assets/css/Search.css";
import DefaultTitleImage from "assets/media/default-title-image.png";
import { LoadingScreen } from "components";
import CoreService from "services/CoreService";

const Search = (props) => {
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    let queryObject = QueryString.parse(props.location.search);
    let emptyParamsCase = JSON.stringify(queryObject) === JSON.stringify({});

    if (emptyParamsCase) {
      history.push("/");
    }

    const searchParams = QueryString.stringify({
      name: queryObject.name,
      genre: queryObject.genre,
    });

    CoreService.titleSearch(searchParams)
      .then((response) => {
        setResponse(response);
      })
      .finally(() => setIsLoading(false));
  }, [props?.location?.search]);

  if (isLoading) return <LoadingScreen />;

  return (
    <div className={"detail-page-container"}>
      <div className={"search-header mb-5"}>
        <span>Found {response.count} result(s) for this query...</span>
        <div className="select-wrap">
          <label htmlFor={"sort"}>Sort By: </label>
          <select
            id={"sort"}
            required
            defaultValue={"rating"}
            style={{ height: "30px", width: "75%" }}
          >
            <option value={"rating"}>IMDb Rating</option>
            <option value={"date"}>Release Year</option>
          </select>
        </div>
      </div>
      <div className={"px-5"}>
        <Row md={2} xl={2} className="g-4">
          {response.results.map((item, index) => (
            <Col key={index}>
              <Link to={`/title/${item.id}`} className={"cast-card text-decoration-none"}>
                <img
                  src={item.image ? item.image : DefaultTitleImage}
                  className={"me-3"}
                  alt={"profile"}
                  style={{ height: "70px", width: "50px" }}
                />
                <div className={"text-overflow w-75"} style={{ color: "white" }}>
                  <span style={{ fontWeight: "bold" }}>{item.name}</span>
                  <br />
                  <small style={{ color: "lightgray" }}>{item.start_year}</small>
                </div>
              </Link>
            </Col>
          ))}
        </Row>

        <div className={"mt-5 text-center"}>
          {response.next && <Button>Load More</Button>}
        </div>
      </div>
    </div>
  );
};

export default Search;
