import React, { useEffect, useState } from "react";

import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spinner } from "react-bootstrap";

import CoreService from "services/CoreService";

const FavoriteButton = ({ title_id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(null);

  useEffect(() => {
    CoreService.isFavorited(title_id)
      .then((response) => {
        setIsFavorite(response.is_favorite);
      })
      .finally(() => setIsLoading(false));
  }, [title_id]);

  const addToFavorites = () => {
    setIsLoading(true);
    CoreService.addToFavorites(title_id)
      .then(() => {
        setIsFavorite(true);
      })
      .finally(() => setIsLoading(false));
  };

  const removeFromFavorites = () => {
    setIsLoading(true);
    CoreService.removeFromFavorites(title_id)
      .then(() => {
        setIsFavorite(false);
      })
      .finally(() => setIsLoading(false));
  };

  if (isLoading) {
    return (
      <Spinner
        animation={"border"}
        style={{ height: "30px", width: "30px" }}
        className={"text-muted"}
      />
    );
  }

  if (isFavorite === false) {
    return (
      <FontAwesomeIcon
        icon={faHeart}
        size={"2x"}
        onClick={addToFavorites}
        className={"text-muted pointer"}
      />
    );
  }

  return (
    <FontAwesomeIcon
      icon={"heart"}
      size={"2x"}
      onClick={removeFromFavorites}
      className={"lightcoral pointer"}
    />
  );
};

export default FavoriteButton;
