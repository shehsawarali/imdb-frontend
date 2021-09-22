import { useState, useEffect } from "react";

import queryString from "query-string";
import { Button, Spinner } from "react-bootstrap";

import LoadingScreen from "components/LoadingScreen";
import useInput from "hooks/useInput";
import UserService from "services/UserService";
import "assets/css/PageMessage.css";
import { validatePassword } from "utils";

const VerifyAccount = (props) => {
  const password = useInput(validatePassword);
  const confirmPassword = useInput();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingAPI, setIsLoadingAPI] = useState(false);
  const [errorResponse, setErrorResponse] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const params = queryString.parse(props?.location?.hash);
    let token = params?.link;
    let id = params?.id;

    UserService.checkPasswordResetLink({ id: id, token: token })
      .catch((error) => {
        setErrorResponse(error.data?.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [props.location.hash]);

  const formIsValid = () => {
    if (password.hasError) {
      setMessage({ text: password.hasError, error: true });
      return false;
    }

    if (password.value !== confirmPassword.value) {
      setMessage({ text: "Passwords do not match", error: true });
      return false;
    }

    return true;
  };

  const submitForm = (e) => {
    e.preventDefault();
    setMessage(null);

    const params = queryString.parse(props?.location?.hash);
    let token = params?.link;
    let id = params?.id;

    let form = {
      password: password.value,
      confirm_password: confirmPassword.value,
      token,
      id,
    };

    if (formIsValid()) {
      setIsLoadingAPI(true);
      UserService.resetPassword(form)
        .then((response) => {
          setMessage({ text: response.message, error: false });
          setIsLoadingAPI(false);
        })
        .catch((error) => {
          setMessage({ text: error.data.message, error: true });
          setIsLoadingAPI(false);
        });
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (errorResponse) {
    return (
      <div className={"page-message page-error"}>
        {errorResponse ? errorResponse : "Activation link is invalid"}
      </div>
    );
  }

  return (
    <>
      <div className={"page-message page-success"}>
        <strong>Reset Password</strong>
        <hr />
        Please enter your new password
      </div>

      <form className={"form-container"} onSubmit={submitForm}>
        <h3>Reset Password</h3>

        <div className={"mt-3"}>
          <label htmlFor={"password"}>New Password</label>
          <input
            id={"password"}
            name={"password"}
            type={"password"}
            placeholder={"New Password"}
            onChange={password.handleChange}
            required
          />
        </div>

        <div className={"mt-3"}>
          <label htmlFor={"confirmPassword"}>Confirm Password</label>
          <input
            id={"confirmPassword"}
            name={"confirmPassword"}
            type={"password"}
            placeholder={"Confirm Password"}
            onChange={confirmPassword.handleChange}
            required
          />
        </div>

        {message && (
          <p className={`text-center mt-3 mb-0 ${message.error ? "error" : "success"}`}>
            {message.text}
          </p>
        )}

        <Button className={"mt-4"} style={{ width: "100%" }} type={"submit"}>
          {!isLoadingAPI ? "Submit" : <Spinner size="sm" animation="border" />}
        </Button>
      </form>
    </>
  );
};

export default VerifyAccount;
