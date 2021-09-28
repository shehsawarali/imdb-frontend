import { useEffect, useState } from "react";

import { Redirect, useParams } from "react-router-dom";

import "assets/css/Title.css";
import "assets/css/Person.css";
import DefaultPersonImage from "assets/media/default-person-image.png";
import { Filmography, KnownForTitles, LoadingScreen } from "components";
import CoreService from "services/CoreService";
import { scrollToDiv } from "utils";

const Person = () => {
  const { id } = useParams();

  const [person, setPerson] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    CoreService.person(id)
      .then((response) => {
        setPerson(response);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  const renderHeader = () => {
    return (
      <div className={"detail-page-header mb-3"}>
        <a className={"me-1"} onClick={() => scrollToDiv("filmography")}>
          Filmography
        </a>
      </div>
    );
  };

  const renderProfessions = () => {
    return (
      <div className={"person-professions mb-3"}>
        {person.professions.map((genre, index) => {
          return <div key={index}>{genre.name}</div>;
        })}
      </div>
    );
  };

  const renderPicture = () => {
    return (
      <img
        src={person.image ? person.image : DefaultPersonImage}
        alt={"title"}
        className={"detail-page-picture"}
      />
    );
  };

  const renderInfo = () => {
    return (
      <div className={"detail-page-info"}>
        <h2 className={"max-lines-2"}>{person.name}</h2>
        <div className="detail-page-years">
          <p>
            {person.birth_year} - {person.death_year}
          </p>
        </div>
        <div className={"person-description mb-5"}>
          {person.description ? (
            person.description
          ) : (
            <small className="text-muted">There is no description for this person</small>
          )}
        </div>
      </div>
    );
  };

  if (isLoading) return <LoadingScreen />;

  if (!person) return <Redirect to={"/404"} />;

  return (
    <>
      <div className={"detail-page-container"}>
        {renderHeader()}

        <div className={"detail-page-padding"}>
          {renderProfessions()}

          <div className={"detail-page-flex"}>
            {renderPicture()}
            {renderInfo()}
          </div>

          <KnownForTitles titles={person.known_for_titles} />
        </div>

        <Filmography person_principals={person.filmography} />
      </div>
    </>
  );
};

export default Person;
