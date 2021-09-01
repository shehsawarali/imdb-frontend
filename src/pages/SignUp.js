import {useState} from "react";

import {Button, Spinner} from "react-bootstrap";
import {Link} from "react-router-dom";

import "../assets/css/Form.css";
import CountryOptions from "../assets/js/CountryOptions";
import logo from "../assets/media/logo.png";
import {EMAIL_TEST_REGEX} from "../constants";
import useInput from "../hooks/useInput";
import UserService from "../services/UserService";

const validateEmail = (email) => {
  if (!EMAIL_TEST_REGEX.test(email)) return "Enter a valid email address";

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
  const firstName = useInput();
  const lastName = useInput();
  const email = useInput(validateEmail);
  const password = useInput(validatePassword);
  const confirmPassword = useInput(validatePassword);
  const country = useInput();
  const age = useInput();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formIsValid = () => {
    if (email.hasError) {
      setMessage({text: email.hasError, error: true});
      return false;
    }

    if (password.hasError) {
      setMessage({text: password.hasError, error: true});
      return false;
    }

    if (password.value !== confirmPassword.value) {
      setMessage({text: "Passwords do not match", error: true});
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
          setMessage({text: response.message, error: false});
          setIsLoading(false);
        })
        .catch((error) => {
          setMessage({text: error.data.message, error: true});
          setIsLoading(false);
        });
    }
  };

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

        {message && (
          <p className={`text-center mt-3 mb-0 ${message.error ? "error" : "success"}`}>
            {message.text}
          </p>
        )}

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
