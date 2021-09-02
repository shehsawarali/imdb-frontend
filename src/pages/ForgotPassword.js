import { useState } from "react";

import { Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

import "assets/css/Form.css";
import logo from "assets/media/logo.png";
import useInput from "hooks/useInput";
import UserService from "services/UserService";
import { validateEmail } from "utils";

const SignIn = () => {
  const email = useInput(validateEmail);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formIsValid = () => {
    if (email.hasError) {
      setMessage({ text: email.hasError, error: true });
      return false;
    }
    return true;
  };

  const submitForm = (e) => {
    e.preventDefault();
    let form = { email: email.value };
    setMessage(null);

    if (formIsValid()) {
      setIsLoading(true);
      UserService.forgotPassword(form)
        .then((response) => {
          setMessage({ text: response.message, error: false });
          setIsLoading(false);
        })
        .catch((error) => {
          setMessage({ text: error.data.message, error: true });
          setIsLoading(false);
        });
    }
  };

  return (
    <>
      <img
        style={{ display: "block", margin: "2rem auto" }}
        src={logo}
        alt={"App Logo"}
      />
      <form className={"form-container"} onSubmit={submitForm}>
        <h3>Forgot Password</h3>

        <div className={"mt-3"}>
          <label htmlFor={"email"}>Email</label>
          <input
            id={"email"}
            name={"email"}
            type={"email"}
            placeholder={"Email"}
            onChange={email.handleChange}
            required
          />
        </div>

        {message && (
          <p className={`text-center mt-3 mb-0 ${message.error ? "error" : "success"}`}>
            {message.text}
          </p>
        )}

        <Button className={"mt-4"} style={{ width: "100%" }} type={"submit"}>
          {!isLoading ? "Submit" : <Spinner size="sm" animation="border" />}
        </Button>

        <div className={"text-center mt-4"}>
          <Link to={"/signin"}>&lt;&lt; Go back</Link>
        </div>
      </form>
    </>
  );
};

export default SignIn;
