import { useEffect, useState } from "react";

import query from "query-string";
import { Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { ACCESS_TOKEN, REFRESH_TOKEN } from "constant";
import useInput from "hooks/useInput";
import UserService from "services/UserService";
import { validateEmail } from "utils";

const SignIn = (props) => {
  const email = useInput(validateEmail);
  const password = useInput();
  const [isLoadingAPI, setIsLoadingAPI] = useState(false);

  useEffect(() => {
    let params = query.parse(props?.location?.search);
    if (params.signupSuccess) {
      toast.success(
        "Successfully signed up! Please verify your account using the link sent to your email address."
      );
    } else if (params.resetSuccess) {
      toast.success("Your password has been reset");
    } else if (params.verifySuccess) {
      toast.success("Your account has been verified. You can now sign in.");
    } else if (params.invalidLink === "verify") {
      toast.error("Verification link is invalid or expired");
    } else if (params.invalidLink === "reset") {
      toast.error("Password reset link is invalid or expired");
    }
  }, []);

  const formIsValid = () => {
    if (email.hasError) {
      toast.error(email.hasError, { autoClose: 3000 });
      return false;
    }

    return true;
  };

  const submitForm = (e) => {
    e.preventDefault();
    let form = { email: email.value, password: password.value };

    if (formIsValid()) {
      setIsLoadingAPI(true);
      UserService.login(form)
        .then((response) => {
          localStorage.setItem(ACCESS_TOKEN, response.access);
          localStorage.setItem(REFRESH_TOKEN, response.refresh);
          window.location.href = "/timeline";
        })
        .catch((error) => {
          toast.error(error.data.message);
          setIsLoadingAPI(false);
        });
    }
  };

  return (
    <>
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

        <Button className={"mt-4"} style={{ width: "100%" }} type={"submit"}>
          {!isLoadingAPI ? "Sign In" : <Spinner size="sm" animation="border" />}
        </Button>

        <div className={"text-center mt-4"}>
          Don't have an account?{" "}
          <Link to={"/signup"} className={"link"}>
            Sign Up
          </Link>
        </div>
      </form>
    </>
  );
};

export default SignIn;
