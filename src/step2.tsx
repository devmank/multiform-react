import "./formStyles.css";

import React, { useContext, useEffect, useState } from "react";

import FormContext from "./context/formContext";
import axios from "axios";

interface Country {
  country: string; // Country name
}
// interface City {
//   name: string;
// }
const Step2 = ({
  nextStep,
  prevStep,
}: {
  nextStep: () => void;
  prevStep: () => void;
}) => {
  const { state, dispatch } = useContext(FormContext);
  const [countries, setCountries] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState(
    state.location.country
  );
  const [loadingCities, setLoadingCities] = useState(false);
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          `https://countriesnow.space/api/v0.1/countries`
        );
        const countryList = response.data.data.map(
          (country: Country) => country.country
        );
        setCountries(countryList);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const fetchCities = async (country: string) => {
    setLoadingCities(true); // Start loading
    try {
      const response = await axios.post(
        `https://countriesnow.space/api/v0.1/countries/cities`,
        { country }
      );
      const cityList = response.data.data;
      setCities(cityList);
    } catch (error) {
      console.error("Error fetching cities:", error);
    } finally {
      setLoadingCities(false); // Stop loading
    }
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setSelectedCountry(selected);
    fetchCities(selected);
  };
  const handleNext = () => {
    dispatch({
      type: "UPDATE_LOCATION",
      payload: { country: selectedCountry, city: state.location.city },
    });
    nextStep();
  };

  return (
    <div className="form-container">
      <h2>Step 2: Country and City</h2>
      <div className="form-group">
        <label htmlFor="country">Select Country</label>
        <select
          id="country"
          value={selectedCountry}
          onChange={handleCountryChange}
          className="form-control"
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      {selectedCountry && (
        <div className="form-group">
          <label htmlFor="city">Select City</label>
          {loadingCities ? (
            <div className="loader">Loading cities...</div> // Show loader
          ) : (
            <select
              id="city"
              value={state.location.city}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_LOCATION",
                  payload: { country: selectedCountry, city: e.target.value },
                })
              }
              className="form-control"
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          )}
        </div>
      )}

      <div className="form-actions">
        <button className="btn btn-secondary" onClick={prevStep}>
          Back
        </button>
        <button className="btn btn-primary" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Step2;
