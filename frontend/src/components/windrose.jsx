import {
  Chart as ChartJS,
  CategoryScale,
  RadialLinearScale,
  ArcElement,
  Title,
} from 'chart.js';
import { PolarArea, Pie } from 'react-chartjs-2';
import { useState, useEffect } from "react";

ChartJS.register(
  CategoryScale,
  RadialLinearScale,
  ArcElement,
  Title,
);

const duplicateAndShift = (arr) => {
  arr = arr.flatMap(x => [x,x]);
  arr.push(arr.shift());
  return arr;
};

export const Windrose = () => {
  const [data, setData] = useState({
    calm        : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
    underFive   : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    underTwelve : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    underTwenty : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    underThirty : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    overThirty   : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  });

  useEffect(() => {
    fetch(`http://localhost:4000/windrose`)
    .then((response) => response.json())
    .then((windData) => {
      console.log(windData);
      setData(data => {
        Object.entries(windData).forEach(([key, value]) => {
          data[key] = duplicateAndShift(value);
        });
        return data;
      });
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
          display: true,
          text: "Wind rose (24 jam)"
        },
        tooltip: {
          enabled: false,
        }
      },
      animation: {
        duration: 0
      }
    }}
    data={{
      labels: duplicateAndShift([
               'N', 'NNE', 'NE', 'ENE',
               'E', 'ESE', 'SE', 'SSE',
               'S', 'SSW', 'SW', 'WSW',
               'W', 'WNW', 'NW', 'NNW'
              ]),
      datasets: [
        {
          label: 'calm',
          data: data.calm,
          backgroundColor: 'black',
          borderWidth: 0,
        },
        {
          label: '2-5 km/h',
          data: data.underFive,
          backgroundColor: 'darkblue',
          borderWidth: 0,
        },
        {
          label: '5-12 km/h',
          data: data.underTwelve,
          backgroundColor: 'blue',
          borderWidth: 0,
        },
        {
          label: '12-20 km/h',
          data: data.underTwenty,
          backgroundColor: 'green',
          borderWidth: 0,
        },
        {
          label: '20-30 km/h',
          data: data.underThirty,
          backgroundColor: 'yellow',
          borderWidth: 0,
        },
        {
          label: '>30 km/h',
          data: data.overThirty,
          backgroundColor: 'red',
          borderWidth: 0,
        },
      ],
    }} />
  );
}
