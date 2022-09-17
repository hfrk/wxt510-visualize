import {
  Chart as ChartJS,
  CategoryScale,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
import { useState, useEffect } from "react";

ChartJS.register(
  CategoryScale,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// dummy data
let numbers = [1, 2, 3, 4, 5, 6, 7, 8,
               1, 2, 3, 4, 5, 6, 7, 8];
let num1 = numbers.map(e => Math.random() * 5);
let num2 = numbers.map((e,i) => num1[i] + Math.random() * 4);
let num3 = numbers.map((e,i) => num2[i] + Math.random() * 3);
let num4 = numbers.map((e,i) => num3[i] + Math.random() * 2);
let num5 = numbers.map((e,i) => num4[i] + Math.random() * 1);
export const Windrose = () => {
  const [data, setData] = useState({
            calm        : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            underFive   : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            underTwelve : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            underTwenty : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            underThirty : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            overThiry   : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  });
  useEffect(() => {
    fetch(`http://localhost:4000/windrose`)
    .then((response) => response.json())
    .then((windData) => {
      setData(windData);
    });
  }, []);

  return (
    <PolarArea
    options={{
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: false,
        },
      },
      animation: {
        duration: 0
      }
    }}
    data={{//>30, 20-30, 10-20, 5-10, 0.2-5
      labels: ['N', 'NNE', 'NE', 'ENE',
               'E', 'ESE', 'SE', 'SSE',
               'S', 'SSW', 'SW', 'WSW',
               'W', 'WNW', 'NW', 'NNW'],
      datasets: [
        {
          label: 'calm',
          data: data.calm,
          backgroundColor: 'white',
          borderWidth: 1,
        },
        {
          label: '2-5 km/h',
          data: data.underFive,
          backgroundColor: 'darkblue',
          borderWidth: 1,
        },
        {
          label: '5-12 km/h',
          data: data.underTwelve,
          backgroundColor: 'blue',
          borderWidth: 1,
        },
        {
          label: '12-20 km/h',
          data: data.underTwenty,
          backgroundColor: 'green',
          borderWidth: 1,
        },
        {
          label: '20-30 km/h',
          data: data.underThirty,
          backgroundColor: 'yellow',
          borderWidth: 1,
        },
        {
          label: '>30 km/h',
          data: data.overThirty,
          backgroundColor: 'red',
          borderWidth: 1,
        },
      ],
    }} />
  );
};
