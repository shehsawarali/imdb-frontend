import { EMAIL_TEST_REGEX } from "./constant";

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

export const responsiveSliderSettings = [
  {
    breakpoint: 1025,
    settings: {
      slidesToShow: 2.75,
      slidesToScroll: 2,
    },
  },
  {
    breakpoint: 769,
    settings: {
      slidesToShow: 2.75,
      slidesToScroll: 2,
    },
  },
  {
    breakpoint: 600,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2,
    },
  },
  {
    breakpoint: 425,
    settings: {
      slidesToShow: 1.25,
      slidesToScroll: 1,
      dots: true,
    },
  },
  {
    breakpoint: 320,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
    },
  },
];
