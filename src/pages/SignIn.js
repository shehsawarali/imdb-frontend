import { useState } from "react";

import { Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

import "assets/css/Form.css";
import logo from "assets/media/logo.png";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "constant";
import useInput from "hooks/useInput";
import UserService from "services/UserService";
import { validateEmail } from "utils";

const SignIn = () => {
  const email = useInput(validateEmail);
  const password = useInput();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formIsValid = () => {
    if (email.hasError) {
      setMessage(email.hasError);
      return false;
    }

    if (password.hasError) {
      setMessage(password.hasError);
      return false;
    }

    return true;
  };

  const submitForm = (e) => {
    e.preventDefault();
    let form = { email: email.value, password: password.value };
    setMessage(null);

    if (formIsValid()) {
      setIsLoading(true);
      UserService.login(form)
        .then((response) => {
          localStorage.setItem(ACCESS_TOKEN, response.access);
          localStorage.setItem(REFRESH_TOKEN, response.refresh);
          window.location.href = "/timeline";
        })
        .catch((error) => {
          setMessage(error.data.message);
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
        <h3>Sign-In</h3>

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

        <div className={"mt-3"}>
          <div className={"forgot-password"}>
            <label htmlFor={"password"}>Password</label>
            <Link to={"/forgot-password"} className="link">
              Forgot your password?
            </Link>
          </div>
          <input
            id={"password"}
            name={"password"}
            type={"password"}
            placeholder={"Password"}
            onChange={password.handleChange}
            required
          />
        </div>

        {message && <p className="error text-center mt-3 mb-0">{message}</p>}

        <Button className={"mt-4"} style={{ width: "100%" }} type={"submit"}>
          {!isLoading ? "Sign In" : <Spinner size="sm" animation="border" />}
        </Button>

        <div className={"text-center mt-4"}>
          Don't have an account? <Link to={"/signup"}>Sign Up</Link>
        </div>
      </form>
    </>
  );
};

export default SignIn;
