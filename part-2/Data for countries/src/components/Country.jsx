import { useState } from "react";

const Country = ({ country }) => {
  const { name, capital, area, flags, languages } = country;
  const [showDetails, setShowDetails] = useState(false);
  const langsArray = Object.values(languages);

  return (
    <div>
      <span>{name.common}</span>
      <button onClick={() => setShowDetails((state) => !state)}>
        {showDetails ? "Hide Details" : "Show Details"}
      </button>
      {showDetails && (
        <>
          <div>
            <p>Capital {capital}</p>
            <p>Area {area}</p>
          </div>
          <h2>Langauges</h2>
          <ul>
            {Object.entries(languages).map(([langCode, language]) => (
              <li key={langCode}>{language}</li>
            ))}
          </ul>
          <img src={flags.png} alt={`flag of ${name.common}`} />
        </>
      )}
    </div>
  );
};

export default Country;
