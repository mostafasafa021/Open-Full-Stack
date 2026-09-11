import { useState, useEffect } from "react";
import getAll from "./services/api";
import CountryCard from "./components/CountryCard";
import Country from "./components/Country";

function App() {
  const [searchTerm, setSarchTerm] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getAll().then((data) => setCountries(data));
  }, []);

  const countriesToShow = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.trim().toLowerCase()),
  );

  return (
    <div>
      find countries:{" "}
      <input type="text" onChange={(e) => setSarchTerm(e.target.value)} />
      {countriesToShow.length <= 10 ? (
        countriesToShow.length === 1 ? (
          <CountryCard country={countriesToShow[0]} />
        ) : (
          countriesToShow.map((country) => (
            <Country key={country.cca3} country={country} />
          ))
        )
      ) : (
        <div>Too many matches, specify another filter</div>
      )}
    </div>
  );
}

export default App;
