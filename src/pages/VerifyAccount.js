import { useState, useEffect } from "react";

import queryString from "query-string";
import { Link, Redirect } from "react-router-dom";

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
      .catch((error) => {
        setErrorResponse(error.data?.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [props.location.hash]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (errorResponse) {
    return (
      <div className={"page-message page-error"}>
        {errorResponse ? errorResponse : "Activation link is invalid"}
      </div>
    );
  }

  return <Redirect to={"/signin/?verifySuccess=true"} />;
};

export default VerifyAccount;
