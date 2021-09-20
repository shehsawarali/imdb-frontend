import QueryString from "query-string";
import { Button } from "react-bootstrap";
import { useHistory, withRouter } from "react-router-dom";

import useInput from "hooks/useInput";

const NavSearch = () => {
  const query = useInput();
  const type = useInput();
  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) return;

    let queryType = type.value ? type.value : "all";
    const string = QueryString.stringify({ name: query.value, type: queryType });
    let url = "/search/?" + string;
    history.push(url);
  };

  return (
    <form className={"nav-search"} onSubmit={handleSubmit}>
      <select required defaultValue={"title"} onChange={type.handleChange}>
        <option value={"title"}>Title</option>
        <option value={"person"}>Person</option>
        <option value={"genre"}>Genre</option>
      </select>
      &nbsp;
      <input onChange={query.handleChange} />
      &nbsp;
      <Button type={"submit"}>Search</Button>
    </form>
  );
};

export default withRouter(NavSearch);
