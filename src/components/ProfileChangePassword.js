import { useState } from "react";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { Button, Spinner } from "react-bootstrap";

import useInput from "hooks/useInput";
import UserService from "services/UserService";
import { validatePassword } from "utils";

const ProfileChangePassword = () => {
  const password = useInput(validatePassword);
  const newPassword = useInput(validatePassword);
  const confirmPassword = useInput();

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const formIsValid = () => {
    if (newPassword.hasError) {
      setMessage({ text: "New password must be 4 characters long or more", error: true });
      return false;
    }

    if (newPassword.value !== confirmPassword.value) {
      setMessage({ text: "Passwords do not match", error: true });
      return false;
    }

    return true;
  };

  const submitForm = (e) => {
    e.preventDefault();
    setMessage(null);

    let form = {
      password: password.value,
      new_password: newPassword.value,
    };

    if (formIsValid()) {
      setIsLoading(true);
      UserService.changePassword(form)
        .then((response) => {
          setMessage({ text: response.message, error: false });
        })
        .catch((error) => {
          setMessage({ text: error.data.message, error: true });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const formButton = () => {
    return (
      <Button type={"submit"} className={"w-100"}>
        {isLoading ? (
          <Spinner size="sm" animation="border" />
        ) : (
          <>
            Change Password
            <Icon icon={"key"} size="1x" style={{ marginLeft: "8px" }} />
          </>
        )}
      </Button>
    );
  };

  return (
    <>
      {message && (
        <p className={`text-center mt-3 mb-3 ${message.error ? "error" : "success"}`}>
          {message.text}
        </p>
      )}

      <div className={"w-100 d-flex flex-column"}>
        <form onSubmit={submitForm} className={"mx-auto"}>
          <div>
            <label htmlFor="email">Current Password</label>
            <input
              name="currentPassword"
              type="password"
              placeholder="Current Password"
              defaultValue={""}
              onChange={password.handleChange}
              required
            />
          </div>

          <div className={"mt-3"}>
            <label htmlFor="email">New Password</label>
            <input
              name="newPassword"
              type="password"
              placeholder="New Password"
              defaultValue={""}
              onChange={newPassword.handleChange}
              required
            />
          </div>

          <div className={"mt-3"}>
            <label htmlFor="email">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              defaultValue={""}
              onChange={confirmPassword.handleChange}
              required
            />
          </div>

          <br />
          {formButton()}
        </form>
      </div>
    </>
  );
};

export default ProfileChangePassword;
