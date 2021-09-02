import { EMAIL_TEST_REGEX } from "./constants";

export const validatePassword = (password) => {
  if (password.trim() === "") {
    return "Enter your password";
  } else if (password.trim().length < 4) {
    return "Password length must be atleast 4 characters";
  }

  return null;
};

export const validateEmail = (email) => {
  if (!EMAIL_TEST_REGEX.test(email)) return "Enter a valid email address";

  return null;
};
