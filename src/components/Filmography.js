import _ from "lodash";
import { Accordion, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Filmography = ({ person_principals }) => {
  if (!person_principals.length) return null;

  const renderGroup = (index, group, principals) => {
    return (
      <Accordion.Item key={index} eventKey={index}>
        <Accordion.Header>{group}</Accordion.Header>
        <Accordion.Body className={"px-0 py-0"}>
          <div>
            {principals.map((principal, index) => (
              <Card.Body key={index} className={"d-flex justify-content-between"}>
                <Link to={`/title/${principal.title.id}`}>{principal.title.name}</Link>
                {principal.title.end_year ? (
                  <div>
                    {principal.title.start_year} - {principal.title.end_year}
                  </div>
                ) : (
                  <div>{principal.title.start_year}</div>
                )}
              </Card.Body>
            ))}
          </div>
        </Accordion.Body>
      </Accordion.Item>
    );
  };

  const groupByCategory = () => {
    return _.groupBy(person_principals, (principal) => principal.category);
  };

  const renderAccordions = () => {
    let groupedPrincipals = groupByCategory();
    let groups = Object.keys(groupedPrincipals);
    let accordions = [];

    for (const index in groups) {
      let group = groups[index];
      let PrincipalsOfGroup = groupedPrincipals[group];
      let groupAccordion = renderGroup(index, group, PrincipalsOfGroup);

      accordions.push(groupAccordion);
    }

    return accordions;
  };

  return (
    <div className={"filmography mt-5"}>
      <h3 id="filmography">Filmography</h3>
      <Accordion defaultActiveKey={"0"} className={"px-3"}>
        {renderAccordions()}
      </Accordion>
    </div>
  );
};

export default Filmography;
