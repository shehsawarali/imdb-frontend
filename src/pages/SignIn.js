import {useState} from "react";

import {Button, Spinner} from "react-bootstrap";
import {Link} from "react-router-dom";

import "../assets/css/Form.css";
import logo from "../assets/media/logo.png";
import useInput from "../hooks/useInput";
import UserService from "../services/UserService";

const validateEmail = (email) => {
  const EMAIL_TEST =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/;

  if (!EMAIL_TEST.test(email)) return "Enter a valid email address";

  return null;
};

const validatePassword = (password) => {
  if (password.trim() === "") return "Enter your password";

  return null;
};

const SignIn = () => {
  const email = useInput(validateEmail);
  const password = useInput(validatePassword);

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
    let form = {email: email.value, password: password.value};
    setMessage(null);

    if (formIsValid()) {
      setIsLoading(true);
      UserService.login(form)
        .then((response) => {
          localStorage.setItem("access_token", response.access);
          localStorage.setItem("refresh_token", response.refresh);
          window.location.reload();
        })
        .catch((error) => {
          setMessage(error.data.message);
          setIsLoading(false);
        });
    }
  };

  return (
    <>
      <img style={{display: "block", margin: "2rem auto"}} src={logo} alt={"App Logo"} />
      <form className={"form-container"} onSubmit={submitForm}>
        <h3 className={"text-center"}>Sign-In</h3>

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
          <label htmlFor={"password"}>Password</label>
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

        <Button className={"mt-4"} style={{width: "100%"}} type={"submit"}>
          {isLoading && <Spinner size="sm" animation="border" />}
          {!isLoading && "SignIn"}
        </Button>

        <div className={"text-center mt-4"}>
          Don't have an account? <Link to={"/signup"}>Sign Up</Link>
        </div>
      </form>
    </>
  );
};

export default SignIn;