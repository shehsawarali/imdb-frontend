import { useEffect, useState } from "react";

import QueryString from "query-string";
import { Button, Col, Row } from "react-bootstrap";
import { Redirect, useHistory } from "react-router-dom";

import "assets/css/Search.css";
import { LoadingScreen, PersonCard } from "components";
import CoreService from "services/CoreService";
import { mergeObjects } from "utils";

let base_url = "/search/person/";

const PersonSearch = (props) => {
  let history = useHistory();
  let queryParams = QueryString.parse(props.location.search);
  let page = queryParams.page || 1;
  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    const searchParams = QueryString.stringify({
      search: queryParams.name,
      page: queryParams.page,
    });

    CoreService.personSearch(searchParams)
      .then((response) => {
        setResponse(response);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [props?.location?.search]);

  const renderHeader = () => {
    return (
      <div className={"search-header mb-3"}>
        <span>
          Found <strong className={"primary"}>{response.count}</strong> result(s){" "}
          {queryParams.name && <>for "{queryParams.name}"</>}
        </span>
      </div>
    );
  };

  const next = () => {
    let searchParams = mergeObjects(queryParams, { page: Number(page) + 1 });
    searchParams = QueryString.stringify(searchParams);
    history.push(`${base_url}?${searchParams}`);
  };

  const prev = () => {
    let searchParams = mergeObjects(queryParams, { page: Number(page) - 1 });
    searchParams = QueryString.stringify(searchParams);
    history.push(`${base_url}?${searchParams}`);
  };

  const renderPagination = () => {
    return (
      <div className={"mt-5 text-center"}>
        {response.previous && <Button onClick={prev}>&lt;&lt; Prev</Button>}
        {response.previous && response.next && <>&emsp;&emsp;</>}
        {response.next && <Button onClick={next}>Next &gt;&gt;</Button>}
      </div>
    );
  };

  if (isLoading) return <LoadingScreen />;

  if (!response?.results) {
    return <Redirect to="/" />;
  }

  return (
    <div className={"detail-page-container"}>
      <h6 className={"display-6"}>Search Results</h6>
      {renderHeader()}
      <div className={"text-center my-4"}>
        Page <strong className={"primary"}>{page}</strong> of{" "}
        {Math.ceil(response.count / 20)}
      </div>
      <Row md={2} xl={2} className="g-4">
        {response.results.map((item, index) => (
          <Col key={index}>
            <PersonCard person={item} />
          </Col>
        ))}
      </Row>

      {renderPagination()}
    </div>
  );
};

export default PersonSearch;
