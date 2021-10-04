import { useState } from "react";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

import { UNEXPECTED_ERROR_MESSAGE } from "constant";
import useInput from "hooks/useInput";
import UserService from "services/UserService";
import { validatePassword } from "utils";

const ProfileChangePassword = () => {
  const password = useInput(validatePassword);
  const newPassword = useInput(validatePassword);
  const confirmPassword = useInput();

  const [isLoading, setIsLoading] = useState(false);

  const formIsValid = () => {
    if (newPassword.hasError) {
      toast.error("New password must be 4 characters long or more", { autoClose: 3000 });
      return false;
    }

    if (newPassword.value !== confirmPassword.value) {
      toast.error("Passwords do not match", { autoClose: 3000 });
      return false;
    }

    return true;
  };

  const submitForm = (e) => {
    e.preventDefault();

    let form = {
      password: password.value,
      new_password: newPassword.value,
    };

    if (formIsValid()) {
      setIsLoading(true);
      UserService.changePassword(form)
        .then((response) => {
          toast.success(response.message);
        })
        .catch((error) => {
          toast.error(UNEXPECTED_ERROR_MESSAGE);
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
            <Icon icon={"key"} size="1x" className={"ms-2"} />
          </>
        )}
      </Button>
    );
  };

  return (
    <>
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
