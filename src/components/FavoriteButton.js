import React, { useEffect, useState } from "react";

import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

import { UNEXPECTED_ERROR_MESSAGE } from "constant";
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
        toast.success("Added to favorites");
      })
      .catch(() => {
        toast.error(UNEXPECTED_ERROR_MESSAGE);
      })
      .finally(() => setIsLoading(false));
  };

  const removeFromFavorites = () => {
    setIsLoading(true);
    CoreService.removeFromFavorites(title_id)
      .then(() => {
        setIsFavorite(false);
        toast.warning("Removed from favorites");
      })
      .catch(() => {
        toast.error(UNEXPECTED_ERROR_MESSAGE);
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
      <Icon
        icon={faHeart}
        size={"2x"}
        onClick={addToFavorites}
        className={"text-muted pointer"}
      />
    );
  }

  return (
    <Icon
      icon={"heart"}
      size={"2x"}
      onClick={removeFromFavorites}
      className={"lightcoral pointer"}
    />
  );
};

export default FavoriteButton;
