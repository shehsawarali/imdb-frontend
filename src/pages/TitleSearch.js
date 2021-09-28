import { useEffect, useState } from "react";

import QueryString from "query-string";
import { Button, Col, Collapse, Row } from "react-bootstrap";
import { Redirect, useHistory } from "react-router-dom";

import "assets/css/Search.css";
import { LoadingScreen, TitleCard } from "components";
import CoreService from "services/CoreService";
import { genresList, genreStates, mergeObjects } from "utils";

let filter = genreStates;
let base_url = "/search/title/";

const TitleSearch = (props) => {
  let history = useHistory();
  let queryParams = QueryString.parse(props.location.search);
  let page = queryParams.page || 1;
  let sort = queryParams.sort || "-rating";

  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const queryFilters = parseQueryFilters();
    filter = mergeObjects(filter, queryFilters);

    CoreService.titleSearch(QueryString.stringify(queryParams))
      .then((response) => {
        setResponse(response);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [props?.location?.search]);

  const parseQueryFilters = () => {
    let queryFilters = {};
    const genres = queryParams.genre;
    const min_rating = queryParams.min_rating;
    const max_rating = queryParams.max_rating;
    const min_year = queryParams.min_year;
    const max_year = queryParams.max_year;

    if (genres && Array.isArray(genres)) {
      for (const genre of genres) queryFilters[genre] = true;
    } else if (genres) {
      queryFilters[genres] = true;
    }

    if (min_rating) {
      queryFilters["min_rating"] = min_rating;
    }
    if (max_rating) {
      queryFilters["max_rating"] = max_rating;
    }
    if (min_year) {
      queryFilters["min_year"] = min_year;
    }
    if (max_year) {
      queryFilters["max_year"] = max_year;
    }

    return queryFilters;
  };

  const changeGenre = (e) => {
    filter[e.target.name] = e.target.checked;
  };

  const changeInput = (e) => {
    filter[e.target.name] = e.target.value;
  };

  const applyFilters = (e) => {
    e.preventDefault();
    let filterParams = "";

    if (queryParams.name) {
      filterParams += `name=${queryParams.name}`;
    }
    if (filter.max_rating) {
      filterParams += `&max_rating=${filter.max_rating}`;
    }
    if (filter.min_rating) {
      filterParams += `&min_rating=${filter.min_rating}`;
    }
    if (filter.max_year) {
      filterParams += `&max_year=${filter.max_year}`;
    }
    if (filter.min_year) {
      filterParams += `&min_year=${filter.min_year}`;
    }
    for (let genre of genresList) {
      if (filter[genre]) filterParams += `&genre=${genre}`;
    }

    let url = `${base_url}?type=title&${filterParams}`;
    history.push(url);
  };

  const changeSort = (e) => {
    sort = e.target.value;
    let searchParams = mergeObjects(queryParams, { sort: sort });
    searchParams = QueryString.stringify(searchParams);
    history.push(`/search/title/?${searchParams}`);
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

  const renderHeader = () => {
    return (
      <div className={"search-header mb-3"}>
        <span>
          Found <strong className={"primary"}>{response.count}</strong> result(s){" "}
          {queryParams.name && <>for "{queryParams.name}"</>}
        </span>

        <div className={"search-filter-buttons"}>
          <Button
            onClick={() => setShow(!show)}
            aria-controls="filter-collapse"
            aria-expanded={show}
          >
            {show ? "Hide Filters" : "Show Filters"}
          </Button>

          <div className="filter-sort">
            <label htmlFor={"sort"}>Sort By: </label>
            <select id={"sort"} required onChange={changeSort} defaultValue={sort}>
              <option value={"-rating"}>Highest Rated</option>
              <option value={"rating"}>Lowest Rated</option>
              <option value={"-start_year"}>Latest</option>
              <option value={"start_year"}>Oldest</option>
            </select>
          </div>
        </div>
      </div>
    );
  };

  const renderFilters = () => {
    return (
      <Collapse in={show}>
        <div>
          <div id="filter-collapse" className={"filter-collapse p-4 mb-2"}>
            <form onSubmit={applyFilters}>
              <h6>Genre</h6>
              <div className={"d-flex flex-wrap mb-3"}>
                {genresList.map((genre, index) => (
                  <Col xs={6} md={3} key={index} className={"filter-genre"}>
                    <label className={"me-4"}>
                      <input
                        type="checkbox"
                        defaultChecked={filter[genre]}
                        name={genre}
                        onChange={changeGenre}
                      />
                      {genre}
                    </label>
                  </Col>
                ))}
              </div>

              <h6>Rating</h6>
              <div className={"d-flex w-25 mb-3 align-items-center"}>
                <input
                  type="number"
                  min="1"
                  max="10"
                  step="0.1"
                  defaultValue={filter["min_rating"]}
                  name={"min_rating"}
                  onChange={changeInput}
                  className={"filter-number-input"}
                />
                <span className={"mx-2"}>to</span>
                <input
                  type="number"
                  min="1"
                  max="10"
                  step="0.1"
                  defaultValue={filter["max_rating"]}
                  name={"max_rating"}
                  onChange={changeInput}
                  className={"filter-number-input"}
                />
              </div>

              <h6>Release Year</h6>
              <div className={"d-flex w-25 align-items-center"}>
                <input
                  type="number"
                  min="1800"
                  max={new Date().getFullYear() + 1}
                  step="1"
                  defaultValue={filter["min_year"]}
                  name={"min_year"}
                  onChange={changeInput}
                  className={"filter-number-input"}
                />
                <span className={"mx-2"}>to</span>
                <input
                  type="number"
                  min="1800"
                  max={new Date().getFullYear() + 1}
                  step="1"
                  defaultValue={filter["max_year"]}
                  name={"max_year"}
                  onChange={changeInput}
                  className={"filter-number-input"}
                />
              </div>

              <div className={"text-center mt-4"}>
                <Button className={"btn-inverted"} type={"submit"}>
                  Apply Filters
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Collapse>
    );
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

  const renderResults = () => {
    return (
      <>
        <div className={"text-center my-4"}>
          Page <strong className={"primary"}>{page}</strong> of{" "}
          {Math.ceil(response.count / 20)}
        </div>
        <Row md={2} xl={2} className="g-4">
          {response.results.map((item, index) => (
            <TitleCard key={index} title={item} />
          ))}
        </Row>
        {renderPagination()}
      </>
    );
  };

  if (isLoading) return <LoadingScreen />;

  if (!response?.results) return <Redirect to="/" />;

  return (
    <div className={"detail-page-container"}>
      <h6 className={"display-6"}>Search Results</h6>
      {renderHeader()}
      {renderFilters()}
      {response.results.length ? (
        renderResults()
      ) : (
        <p className={"text-center"}>No results</p>
      )}
    </div>
  );
};

export default TitleSearch;
