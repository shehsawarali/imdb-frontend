import { useState, useEffect } from "react";

import { Redirect, useParams, Link } from "react-router-dom";

import "assets/css/Title.css";
import "assets/css/Person.css";
import DefaultPersonImage from "assets/media/default-person-image.png";
import { Filmography, LoadingScreen, KnownForTitles } from "components";
import CoreService from "services/CoreService";

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

  const header = () => {
    return (
      <div className={"detail-page-header mb-3"}>
        <a
          className={"me-1"}
          onClick={() => {
            const anchor = document.querySelector("#filmography");
            anchor.scrollIntoView({ behavior: "smooth", block: "center" });
          }}
        >
          Filmography
        </a>
      </div>
    );
  };

  const professions = () => {
    return (
      <div className={"person-professions mb-3"}>
        {person.professions.map((genre, index) => {
          return <div key={index}>{genre.name}</div>;
        })}
      </div>
    );
  };

  const picture = () => {
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

  if (!person) return <Redirect to={"/"} />;

  return (
    <>
      <div className={"detail-page-container"}>
        {header()}

        <div className={"detail-page-padding"}>
          {professions()}

          <div className={"detail-page-flex"}>
            {picture()}
            {renderInfo()}
          </div>

          <KnownForTitles titles={person.known_for_titles} />
        </div>

        <Filmography person_principals={person.principals} />
      </div>
    </>
  );
};

export default Person;
