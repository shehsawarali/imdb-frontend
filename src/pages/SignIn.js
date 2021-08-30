import {useContext, useState} from "react";

import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

import "../assets/css/Form.css";
import logo from "../assets/media/logo.png";
import useInput from "../hooks/useInput";
import UserService from "../services/UserService";

const validateEmail = (email) => {
  if (email.trim() === "") return "Enter a correct email address";

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
      UserService.login(form)
        .then((response) => {
          localStorage.setItem("access_token", response.access);
          localStorage.setItem("refresh_token", response.refresh);
          window.location.reload();
        })
        .catch((error) => {
          setMessage(error.data.message);
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
            autoFocus={true}
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
          />
        </div>

        {message && <p className="error text-center mt-3 mb-0">{message}</p>}

        <Button className={"mt-4"} style={{width: "100%"}} type={"submit"}>
          Sign In
        </Button>

        <div className={"text-center mt-4"}>
          Don't have an account? <Link to={"/signup"}>Sign Up</Link>
        </div>
      </form>
    </>
  );
};

export default SignIn;
