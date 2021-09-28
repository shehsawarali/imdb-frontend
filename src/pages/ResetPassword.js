import { useEffect, useState } from "react";

import queryString from "query-string";
import { Button, Spinner } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

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
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const params = queryString.parse(props?.location?.hash);
    let token = params?.link;
    let id = params?.id;

    UserService.checkPasswordResetLink({ id: id, token: token })
      .then(() => {
        toast.success("Please enter your new password");
      })
      .catch((error) => {
        setErrorResponse(error.data?.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [props.location.hash]);

  const formIsValid = () => {
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
          setRedirect(true);
          setIsLoadingAPI(false);
        })
        .catch((error) => {
          toast.error(error.data.message);
          setIsLoadingAPI(false);
        });
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (redirect) {
    return <Redirect to={"/signin/?resetSuccess=true"} />;
  }

  if (errorResponse) {
    return <Redirect to={"/signin/?invalidLink=reset"} />;
  }

  return (
    <>
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

        <Button className={"mt-4"} style={{ width: "100%" }} type={"submit"}>
          {!isLoadingAPI ? "Submit" : <Spinner size="sm" animation="border" />}
        </Button>
      </form>
    </>
  );
};

export default VerifyAccount;
