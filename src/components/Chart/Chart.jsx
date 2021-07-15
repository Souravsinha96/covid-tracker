import React, { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import { fetchDailyData } from "../../api";
import styles from "./Chart.module.css";

function Chart({ data: { confirmed, recovered, deaths }, country }) {
  const [dailydata, setDailydata] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailydata(await fetchDailyData());
    };
    fetchAPI();
  }, []);

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)",
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        plugins: {
          legend: { display: false },
          title: { display: true, text: `Current state in ${country}` },
        },
      }}
    />
  ) : null;
  const lineChart = dailydata.length && (
    <Line
      data={{
        labels: dailydata.map(({ date }) => date),

        datasets: [
          {
            data: dailydata.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailydata.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "#red",
            backgroundColor: "rgba(255,0,0,0.5)",
            fill: true,
          },
        ],
      }}
    />
  );

  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
}

export default Chart;
