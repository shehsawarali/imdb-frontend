import {useState} from "react";

import {Button, Spinner} from "react-bootstrap";
import {Link, Redirect} from "react-router-dom";

import "../assets/css/Form.css";
import CountryOptions from "../assets/js/CountryOptions";
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
  if (password.trim() === "") {
    return "Enter your password";
  } else if (password.trim().length < 4) {
    return "Password length must be atleast 4 characters";
  }

  return null;
};

const SignUp = () => {
  const firstName = useInput((value) => true);
  const lastName = useInput((value) => true);
  const email = useInput(validateEmail);
  const password = useInput(validatePassword);
  const confirmPassword = useInput(validatePassword);
  const country = useInput((value) => true);
  const age = useInput((value) => true);

  const [message, setMessage] = useState(null);
  const [redirect, setRedirect] = useState(false);
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

    if (password.value !== confirmPassword.value) {
      setMessage("Passwords do not match");
      return false;
    }

    return true;
  };

  const submitForm = (e) => {
    e.preventDefault();
    setMessage(null);

    let form = {
      email: email.value,
      password: password.value,
      first_name: firstName.value,
      last_name: lastName.value,
      country: country.value,
      age: age.value,
    };

    if (formIsValid()) {
      setIsLoading(true);
      UserService.register(form)
        .then((response) => {
          setRedirect("/signin");
        })
        .catch((error) => {
          console.log(error);
          setMessage(error.data.message);
          setIsLoading(false);
        });
    }
  };

  if (redirect) return <Redirect to={redirect} />;

  return (
    <>
      <img style={{display: "block", margin: "2rem auto"}} src={logo} alt={"App Logo"} />
      <form className={"form-container"} onSubmit={submitForm}>
        <h3 className={"text-center"}>Sign-Up</h3>

        <div className={"mt-3"} style={{display: "inline-block", width: "50%"}}>
          <label htmlFor={"firstName"}>First Name</label>
          <input
            id={"firstName"}
            placeholder={"First Name"}
            required
            onChange={firstName.handleChange}
          />
        </div>

        <div className={"mt-3"} style={{display: "inline-block", width: "50%"}}>
          <label htmlFor={"lastName"}>Last Name</label>
          <input
            id={"lastName"}
            placeholder={"Last Name"}
            required
            onChange={lastName.handleChange}
          />
        </div>

        <div className={"mt-3"}>
          <label htmlFor={"email"}>Email</label>
          <input
            id={"email"}
            type={"email"}
            placeholder={"Email"}
            required
            onChange={email.handleChange}
          />
        </div>

        <div className={"mt-3"} style={{display: "inline-block", width: "50%"}}>
          <label htmlFor={"password"}>Password</label>
          <input
            id={"password"}
            type={"password"}
            placeholder={"Password"}
            required
            onChange={password.handleChange}
          />
        </div>

        <div className={"mt-3"} style={{display: "inline-block", width: "50%"}}>
          <label htmlFor={"confirmPassword"}>Confirm Password</label>
          <input
            id={"confirmPassword"}
            type={"password"}
            placeholder={"Confirm Password"}
            required
            onChange={confirmPassword.handleChange}
          />
        </div>

        <div className={"mt-3"}>
          <label htmlFor={"country"}>Country</label>
          <select
            id={"country"}
            required
            defaultValue={""}
            onChange={country.handleChange}
          >
            <option value={""} disabled>
              Country
            </option>
            <CountryOptions />
          </select>
        </div>

        <div className={"mt-3"}>
          <label htmlFor={"age"}>Age</label>
          <input
            id={"age"}
            type={"number"}
            placeholder={"Age"}
            required
            min={18}
            max={100}
            onChange={age.handleChange}
          />
        </div>

        {message && <p className="error text-center mt-3 mb-0">{message}</p>}

        <Button className={"mt-4"} style={{width: "100%"}} type={"submit"}>
          {isLoading && <Spinner size="sm" animation="border" />}
          {!isLoading && "SignUp"}
        </Button>

        <div className={"text-center mt-4"}>
          Already have an account? <Link to={"/signin"}>Sign In</Link>
        </div>
      </form>
    </>
  );
};

export default SignUp;
