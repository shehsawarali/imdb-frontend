import { useState } from "react";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

import CountryOptions from "assets/js/CountryOptions";
import UserService from "services/UserService";

const ProfileChangeDetails = ({ id, profile }) => {
  const [form, setForm] = useState({
    first_name: profile.first_name,
    last_name: profile.last_name,
    country: profile.country.code,
    age: profile.age,
  });

  const [isLoading, setIsLoading] = useState(false);

  const submitForm = (e) => {
    e.preventDefault();
    setIsLoading(true);

    UserService.update(id, form)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error.data.message);
        setIsLoading(false);
      });
  };

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const formButton = () => (
    <>
      <div className={"mt-3"}>
        <Button type={"submit"} className={"w-100"}>
          {isLoading ? (
            <Spinner size="sm" animation="border" />
          ) : (
            <>
              Edit Profile
              <Icon icon={"edit"} size="1x" style={{ marginLeft: "8px" }} />
            </>
          )}
        </Button>
      </div>
    </>
  );

  return (
    <>
      <div className={"w-100 d-flex flex-column"}>
        <form onSubmit={submitForm} className={"mx-auto"}>
          <div className={"mt-3"}>
            <label htmlFor="first_name">First Name</label>
            <input
              id="first_name"
              name="first_name"
              placeholder="First Name"
              defaultValue={profile.first_name}
              onChange={handleForm}
              required
            />
          </div>

          <div className={"mt-3"}>
            <label htmlFor="last_name">Last Name</label>
            <input
              id="last_name"
              name="last_name"
              placeholder="Last Name"
              defaultValue={profile.last_name}
              onChange={handleForm}
              required
            />
          </div>

          <div className={"mt-3"}>
            <label htmlFor="country">Country</label>
            <select
              id="country"
              name="country"
              defaultValue={profile.country.code}
              onChange={handleForm}
              required
            >
              <option value={""} disabled>
                Country
              </option>
              <CountryOptions />
            </select>
          </div>

          <div className={"mt-3"}>
            <label htmlFor="age">Age</label>
            <input
              id="age"
              name="age"
              type="number"
              placeholder="Age"
              required
              min={18}
              max={100}
              defaultValue={profile.age}
              onChange={handleForm}
            />
          </div>

          <br />
          {formButton()}
        </form>
      </div>
    </>
  );
};

export default ProfileChangeDetails;
