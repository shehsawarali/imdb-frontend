import React, { useEffect, useState } from "react";

import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

import { UNEXPECTED_ERROR_MESSAGE } from "constant";
import CoreService from "services/CoreService";

const FavoriteButton = ({ title_id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isWatchlisted, setIsWatchlisted] = useState(null);

  useEffect(() => {
    CoreService.isWatchlisted(title_id)
      .then((response) => {
        setIsWatchlisted(response.is_watchlisted);
      })
      .finally(() => setIsLoading(false));
  }, [title_id]);

  const addToWatchlist = () => {
    setIsLoading(true);
    CoreService.addToWatchlist(title_id)
      .then(() => {
        setIsWatchlisted(true);
        toast.success("Added to watchlist");
      })
      .catch(() => {
        toast.error(UNEXPECTED_ERROR_MESSAGE);
      })
      .finally(() => setIsLoading(false));
  };

  const removeFromWatchlist = () => {
    setIsLoading(true);
    CoreService.removeFromWatchlist(title_id)
      .then(() => {
        setIsWatchlisted(false);
        toast.warning("Removed from watchlist");
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
        className={"text-muted"}
        style={{ height: "30px", width: "30px" }}
      />
    );
  }

  if (isWatchlisted === false) {
    return (
      <Icon
        icon={faBookmark}
        size={"2x"}
        onClick={addToWatchlist}
        className={"text-muted pointer"}
      />
    );
  }

  return (
    <Icon
      icon={"bookmark"}
      size={"2x"}
      onClick={removeFromWatchlist}
      className={"lightcoral pointer"}
    />
  );
};

export default FavoriteButton;
