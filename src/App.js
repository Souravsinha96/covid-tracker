import React, { useState, useEffect } from "react";
import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api";
import corona from "./images/corona.png";

function App() {
  const [data, setData] = useState({});
  const [country, setCountry] = useState("");

  useEffect(() => {
    const search = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
    };
    search();
  }, []);

  const handleCountry = async (country) => {
    const fetchedData = await fetchData(country);
    setData(fetchedData);
    setCountry(country);
  };

  return (
    <div className={styles.container}>
      <img src={corona} alt="covid-19" className={styles.image} />
      <Cards data={data} />
      <CountryPicker handleCountry={handleCountry} />
      <Chart data={data} country={country} />
    </div>
  );
}

export default App;
