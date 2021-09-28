import { useState } from "react";

import { Button, Spinner } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";

import "assets/css/Form.css";
import CountryOptions from "assets/js/CountryOptions";
import logo from "assets/media/logo.png";
import useInput from "hooks/useInput";
import UserService from "services/UserService";
import { validateEmail, validatePassword } from "utils";

const SignUp = () => {
  const firstName = useInput();
  const lastName = useInput();
  const email = useInput(validateEmail);
  const password = useInput(validatePassword);
  const confirmPassword = useInput(validatePassword);
  const country = useInput();
  const age = useInput();

  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const formIsValid = () => {
    if (email.hasError) {
      toast.error(email.hasError, { autoClose: 3000 });
      return false;
    }

    if (password.hasError) {
      toast.error(password.hasError, { autoClose: 3000 });
      return false;
    }

    if (password.value !== confirmPassword.value) {
      toast.error("Passwords do not match", { autoClose: 3000 });
      return false;
    }

    return true;
  };

  const submitForm = (e) => {
    e.preventDefault();

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
          setRedirect(response.message);
        })
        .catch((error) => {
          toast.error(error.data.message);
          setIsLoading(false);
        });
    }
  };

  if (redirect) {
    return <Redirect to={"/signin/?signupSuccess=true"} />;
  }

  return (
    <>
      <img
        style={{ display: "block", margin: "2rem auto" }}
        src={logo}
        alt={"App Logo"}
      />
      <form className={"form-container"} onSubmit={submitForm}>
        <h3>Sign-Up</h3>

        <div className={"mt-3"} style={{ display: "inline-block", width: "50%" }}>
          <label htmlFor={"firstName"}>First Name</label>
          <input
            id={"firstName"}
            placeholder={"First Name"}
            required
            onChange={firstName.handleChange}
          />
        </div>

        <div className={"mt-3"} style={{ display: "inline-block", width: "50%" }}>
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

        <div className={"mt-3"} style={{ display: "inline-block", width: "50%" }}>
          <label htmlFor={"password"}>Password</label>
          <input
            id={"password"}
            type={"password"}
            placeholder={"Password"}
            required
            onChange={password.handleChange}
          />
        </div>

        <div className={"mt-3"} style={{ display: "inline-block", width: "50%" }}>
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

        <Button className={"mt-4"} style={{ width: "100%" }} type={"submit"}>
          {!isLoading ? "Sign Up" : <Spinner size="sm" animation="border" />}
        </Button>

        <div className={"text-center mt-4"}>
          Already have an account? <Link to={"/signin"}>Sign In</Link>
        </div>
      </form>
    </>
  );
};

export default SignUp;
