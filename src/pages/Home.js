import { useContext, useEffect, useState } from "react";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

import { LoadingScreen } from "components";
import TitleSlider from "components/TitleSlider";
import { UserContext } from "context/UserContext";
import CoreService from "services/CoreService";

const Home = () => {
  const { user } = useContext(UserContext);
  const [topRated, setTopRated] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    CoreService.topRated()
      .then((response) => {
        setTopRated(response);
      })
      .then(() => {
        if (user) {
          CoreService.recommendations().then((response) => {
            setRecommendations(response);
          });
        }
      })
      .then(() => setIsLoading(false));
  }, []);

  if (isLoading) return <LoadingScreen />;

  return (
    <div className={"detail-page-container"}>
      <h6 className={"display-6 text-center"}>
        <Icon icon={"home"} className={"me-3"} size={"sm"} />
        Home
      </h6>
      <hr />

      {topRated.length > 0 && <TitleSlider titles={topRated} heading={"Top Rated"} />}
      {recommendations.length > 0 && (
        <TitleSlider titles={recommendations} heading={"Recommendations for You"} />
      )}
    </div>
  );
};

export default Home;
