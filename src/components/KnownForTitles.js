import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Slider from "react-slick";

import DefaultTitleImage from "assets/media/default-title-image.png";
import { responsiveSliderSettings } from "constant";

const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3.25,
  slidesToScroll: 2,
  arrows: true,

  responsive: responsiveSliderSettings,
};

const KnownForTitles = ({ titles }) => {
  if (!titles?.length) return null;

  return (
    <div className={"known-for-titles mt-5"}>
      <h3>Known For Titles</h3>
      <Slider {...sliderSettings}>
        {titles.map((title, index) => {
          return (
            <Link to={`/title/${title.id}`} className={"ps-3"} key={index}>
              <div className={"slider-card"} key={index}>
                <Card.Img
                  variant="top"
                  src={title.image ? title.image : DefaultTitleImage}
                  className={"card-image"}
                />
                <Card.Body>
                  <Card.Title>{title.name}</Card.Title>
                  <Card.Title>{title.start_year}</Card.Title>
                </Card.Body>
              </div>
            </Link>
          );
        })}
      </Slider>
    </div>
  );
};

export default KnownForTitles;
