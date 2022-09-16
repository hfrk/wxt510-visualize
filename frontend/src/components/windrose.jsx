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
  const [data, setData] = useState([[], [], [], [], [], []]);
  useEffect(() => {
    setData(data => {
      return [numbers.map(e => 1), num1, num2, num3, num4, num5];
    })
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
               'W', 'NWN', 'NW', 'NNW'],
      datasets: [
        {
          label: 'calm',
          data: data[0],
          backgroundColor: 'white',
          borderWidth: 1,
        },
        {
          label: '1-5 km/h',
          data: data[1],
          backgroundColor: 'darkblue',
          borderWidth: 1,
        },
        {
          label: '5-10 km/h',
          data: data[2],
          backgroundColor: 'blue',
          borderWidth: 1,
        },
        {
          label: '10-20 km/h',
          data: data[3],
          backgroundColor: 'green',
          borderWidth: 1,
        },
        {
          label: '20-30 km/h',
          data: data[4],
          backgroundColor: 'yellow',
          borderWidth: 1,
        },
        {
          label: '>30 km/h',
          data: data[5],
          backgroundColor: 'red',
          borderWidth: 1,
        },
      ],
    }} />
  );
};
