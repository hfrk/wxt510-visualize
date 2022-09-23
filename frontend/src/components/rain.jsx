import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { BarPlot } from "./plots";
import { SummaryCard, ChartCard } from "./cards";
import { useState, useEffect } from "react";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
);

const sumArray = (arr) => {
  if (arr === null || arr === undefined) return;
  return arr.reduce((previousSum, a) => previousSum + a, 0);
};

export const RainSummary = ({type}) => {
  const [data, setData] = useState({
    labels: [],
    accumulation: [],
    duration: [],
    avgIntensity: [],
    maxIntensity: []
  });

  useEffect(() => {
    const dataFetcher = () => {
      fetch(`http://localhost:4000/rain`)
      .then((response) => response.json())
      .then((rainData) => {
        setData(rainData);
      })
      .catch((err) => {
        console.log(err.message);
      });
    };
    dataFetcher();
    const id = setInterval(dataFetcher, 60 * 1000);
    return () => clearInterval(id);
  }, []);

  if (type === "short") {
    return (
      <SummaryCard>
        <h1>Curah Hujan (24 jam): <br></br>{sumArray(data.accumulation) || '0'} mm</h1>
        <BarPlot data={data.accumulation} labels={data.labels}/>
      </SummaryCard>
    );
  }
  if (type === "full") {
    return (
      <>
      <ChartCard>
        <h1>Curah Hujan (24 jam):</h1>
        <h1 style={{textAlign: "right"}}>{sumArray(data.accumulation) || '0'} mm</h1>
        <BarPlot data={data.accumulation} labels={data.labels}/>
      </ChartCard>
      <ChartCard>
        <h1>Durasi Hujan (24 jam):</h1>
        <h1 style={{textAlign: "right"}}>{sumArray(data.accumulation) || '0'} s</h1>
        <BarPlot data={data.duration} labels={data.labels}/>
      </ChartCard>
      </>
    );
  }
};
