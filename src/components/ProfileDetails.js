import { useState } from "react";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { Button, Col, Row, Spinner } from "react-bootstrap";

import CountryOptions from "assets/js/CountryOptions";
import UserService from "services/UserService";

const ProfileDetails = ({ id, profile }) => {
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({
    first_name: profile.first_name,
    last_name: profile.last_name,
    country: profile.country.code,
    age: profile.age,
  });

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const submitForm = (e) => {
    e.preventDefault();
    setMessage(null);
    setIsLoading(true);

    UserService.update(id, form)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        setMessage({ text: error.data.message, error: true });
        setIsLoading(false);
      });
  };

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form onSubmit={submitForm}>
        <div style={{ textAlign: "right", marginBottom: "1rem" }}>
          {isLoading && (
            <Button type={"submit"}>
              Saving
              <Spinner size="sm" animation="border" style={{ marginLeft: "10px" }} />
            </Button>
          )}

          {!isLoading && edit && (
            <Button type={"submit"}>
              Save
              <Icon icon={"save"} size="1x" style={{ marginLeft: "8px" }} />
            </Button>
          )}

          {!isLoading && !edit && (
            <Button onClick={() => setEdit(true)}>
              Edit Details
              <Icon icon={"edit"} size="1x" style={{ marginLeft: "8px" }} />
            </Button>
          )}
        </div>

        {message && (
          <p className={`text-center mt-3 mb-0 ${message.error ? "error" : "success"}`}>
            {message.text}
          </p>
        )}

        <Row style={{ marginTop: "1rem" }}>
          <Col sm>
            <label htmlFor="first_name">First Name</label>
            <input
              id="first_name"
              name="first_name"
              placeholder="First Name"
              disabled={!edit}
              defaultValue={profile.first_name}
              onChange={handleForm}
              required
            />
          </Col>
          <Col sm>
            <label htmlFor="last_name">Last Name</label>
            <input
              id="last_name"
              name="last_name"
              placeholder="Last Name"
              disabled={!edit}
              defaultValue={profile.last_name}
              onChange={handleForm}
              required
            />
          </Col>
        </Row>

        <Row style={{ marginTop: "1rem" }}>
          <Col sm>
            <label htmlFor="country">Country</label>
            <select
              id="country"
              name="country"
              disabled={!edit}
              defaultValue={profile.country.code}
              onChange={handleForm}
              required
            >
              <option value={""} disabled>
                Country
              </option>
              <CountryOptions />
            </select>
          </Col>

          <Col sm>
            <label htmlFor="age">Age</label>
            <input
              id="age"
              name="age"
              type="number"
              placeholder="Age"
              required
              min={18}
              max={100}
              disabled={!edit}
              defaultValue={profile.age}
              onChange={handleForm}
            />
          </Col>
        </Row>
      </form>
    </>
  );
};

export default ProfileDetails;
