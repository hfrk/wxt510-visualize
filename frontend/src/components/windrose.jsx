import {
  Chart as ChartJS,
  CategoryScale,
  RadialLinearScale,
  ArcElement,
  Title,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
import { useState, useEffect } from "react";

ChartJS.register(
  CategoryScale,
  RadialLinearScale,
  ArcElement,
  Title,
);

const duplicateAndShift = (arr) => {
  if (arr === undefined || arr === null) return;
  arr = arr.flatMap(x => [x,x,null]);
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
    overThirty  : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  });

  useEffect(() => {
    const dataFetcher = () => {
      fetch(`http://localhost:4000/windrose`)
      .then((response) => response.json())
      .then((windData) => {
        //console.log(windData);
        setData(data => {
          let max = windData.overThirty.reduce((previousSum, a) => previousSum + a, 0);
          Object.entries(windData).forEach(([key, value]) => {
            data[key] = duplicateAndShift(value.map(x => x/max * 100));
          });
          return data;
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
    };
    dataFetcher();
    const id = setInterval(dataFetcher, 10 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <PolarArea
    options={{
      responsive: true,
      scales: {
        r: {
          ticks: {
            callback: (value, index, ticks) => `${value}%`,
          },
          angleLines: {
            display: false,
            lineWidth: 2,
            color: "red",
          },
          grid: {
            display: true,
            lineWidth: 2,
          },
          pointLabels: {
            display: true,
            callback: (value, index, ticks) => index % 3 ? null : value,
            centerPointLabels: false,
            font: {
              size: 18
            }
          }
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "Wind rose (24 jam)"
        },
        tooltip: {
          enabled: true,
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
          backgroundColor: '#171819',
          borderWidth: 0,
        },
        {
          label: '2-5 km/h',
          data: data.underFive,
          backgroundColor: '#012CFF',
          borderWidth: 0,
        },
        {
          label: '5-12 km/h',
          data: data.underTwelve,
          backgroundColor: '#00D5F7',
          borderWidth: 0,
        },
        {
          label: '12-20 km/h',
          data: data.underTwenty,
          backgroundColor: '#7CFD7F',
          borderWidth: 0,
        },
        {
          label: '20-30 km/h',
          data: data.underThirty,
          backgroundColor: '#FDE801',
          borderWidth: 0,
        },
        {
          label: '>30 km/h',
          data: data.overThirty,
          backgroundColor: '#FF4503',
          borderWidth: 0,
        },
      ],
    }} />
  );
}
