import { useState } from "react";

import { Spinner } from "react-bootstrap";
import Ratings from "react-ratings-declarative";
import { toast } from "react-toastify";

import { starIcon } from "constant";
import CoreService from "services/CoreService";

const MyComponent = ({ title_id, rating, setRating, refreshOnSave }) => {
  const [isSaving, setIsSaving] = useState(false);

  const changeRating = (newRating) => {
    if (setRating) setRating(newRating);

    saveRating(newRating);
  };

  const saveRating = (newRating) => {
    setIsSaving(true);
    CoreService.rate({ id: title_id, rating: newRating }).finally(() => {
      if (refreshOnSave) window.location.reload();

      toast.success("Title rating has been saved");
      setIsSaving(false);
    });
  };

  if (isSaving)
    return (
      <div className={"text-center"}>
        <Spinner animation={"border"} className={"lightgray"} />
      </div>
    );

  return (
    <div className={"lightgray"}>
      <Ratings
        rating={rating}
        widgetRatedColors="var(--primary)"
        widgetHoverColors="var(--primary)"
        widgetEmptyColors="var(--muted)"
        changeRating={changeRating}
        widgetDimensions={"36px"}
        widgetSpacings={"2px"}
        svgIconViewBoxes={starIcon.viewBox}
        svgIconPaths={starIcon.path}
      >
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
      </Ratings>
    </div>
  );
};

export default MyComponent;
