import QueryString from "query-string";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

import usePresetInput from "hooks/usePresetInput";

const NavSearch = (props) => {
  let queryParams = QueryString.parse(props.location.search);
  const query = usePresetInput(queryParams.name);
  const type = usePresetInput(queryParams.type);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) return;

    let queryType = type.value ? type.value : "title";
    const queryString = QueryString.stringify({ name: query.value, type: queryType });

    let url = `/search/${queryType}/?${queryString}`;
    window.location = url;
  };

  return (
    <form className={"nav-search"} onSubmit={handleSubmit}>
      <select
        required
        defaultValue={queryParams.type || "title"}
        onChange={type.handleChange}
      >
        <option value={"title"}>Title</option>
        <option value={"person"}>Person</option>
      </select>
      &nbsp;
      <input onChange={query.handleChange} defaultValue={queryParams.name || ""} />
      &nbsp;
      <Button type={"submit"}>Search</Button>
    </form>
  );
};

export default withRouter(NavSearch);
