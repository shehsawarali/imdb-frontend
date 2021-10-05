import { Link } from "react-router-dom";

const Review = ({ review }) => {
  return (
    <div className={"review"}>
      <div className={"my-3"}>{review.review}</div>
      <div>
        <small>
          - by{" "}
          <Link to={`/user/${review.user.id}`}>
            {review.user.first_name} {review.user.last_name}
          </Link>
        </small>
      </div>
    </div>
  );
};

export default Review;
