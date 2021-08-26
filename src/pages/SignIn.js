import {Button, Container} from "react-bootstrap";
import "../assets/css/Form.css";
import logo from "../assets/media/logo.png";
import {Link} from "react-router-dom";

const SignIn = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <img style={{display: "block", margin: "2rem auto"}} src={logo} />
      <form className={"form-container"} onSubmit={handleSubmit}>
        <h3 className={"text-center"}>Sign-In</h3>

        <div className={"mt-3"}>
          <label htmlFor={"email"}>Email</label>
          <input id={"email"} name={"email"} type={"email"} placeholder={"Email"} />
        </div>

        <div className={"mt-3"}>
          <label htmlFor={"password"}>Password</label>
          <input
            id={"password"}
            name={"password"}
            type={"password"}
            placeholder={"Password"}
          />
        </div>

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
