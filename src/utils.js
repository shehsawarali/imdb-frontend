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

export const scrollToDiv = (id) => {
  const anchor = document.querySelector(`#${id}`);
  anchor.scrollIntoView({ behavior: "smooth", block: "center" });
};

export const genresList = [
  "Action",
  "Adult",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Film-Noir",
  "Game-Show",
  "History",
  "Horror",
  "Mystery",
  "Music",
  "Musical",
  "News",
  "Romance",
  "Sci-Fi",
  "Short",
  "Sport",
  "Talk-Show",
  "Thriller",
  "War",
  "Western",
];

export const genreStates = {
  Action: false,
  Adult: false,
  Adventure: false,
  Animation: false,
  Biography: false,
  Comedy: false,
  Crime: false,
  Documentary: false,
  Drama: false,
  Family: false,
  Fantasy: false,
  "Film-Noir": false,
  "Game-Show": false,
  History: false,
  Horror: false,
  Mystery: false,
  Music: false,
  Musical: false,
  News: false,
  Romance: false,
  "Sci-Fi": false,
  Short: false,
  Sport: false,
  "Talk-Show": false,
  Thriller: false,
  War: false,
  Western: false,
};

export const mergeObjects = (oldObject, newObject) => {
  return { ...oldObject, ...newObject };
};

export const getDatetime = (isoString, timezone = null) => {
  const settings = { hour12: true, dateStyle: "short", timeStyle: "short" };

  if (timezone) {
    settings.timeZone = timezone;
  }

  return new Date(isoString).toLocaleString("en-GB", settings);
};
