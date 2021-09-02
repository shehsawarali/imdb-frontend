import { useState, useEffect } from "react";

import queryString from "query-string";
import { Link } from "react-router-dom";

import LoadingScreen from "components/LoadingScreen";
import UserService from "services/UserService";
import "assets/css/PageMessage.css";

const VerifyAccount = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorResponse, setErrorResponse] = useState(null);

  useEffect(() => {
    const params = queryString.parse(props?.location?.hash);
    let token = params?.link;
    let id = params?.id;

    let payload = { id, token };

    UserService.verifyAccount(payload)
      .then((response) => {
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorResponse(error.data?.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return !errorResponse ? (
    <div className={"page-message page-success"}>
      Your account has been activated. Click <Link to={"/signin"}>here</Link> to sign in.
    </div>
  ) : (
    <div className={"page-message page-error"}>
      {errorResponse ? errorResponse : "Activation link is invalid"}
    </div>
  );
};

export default VerifyAccount;
