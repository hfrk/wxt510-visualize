import {
  Chart as ChartJS,
  CategoryScale,
  ArcElement,
  Title,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useState, useEffect } from "react";

ChartJS.register(
  CategoryScale,
  ArcElement,
  Title,
);

const sumArray = (arr) => {
  if (arr === null || arr === undefined) return;
  return arr.reduce((previousSum, a) => previousSum + a, 0);
};

export const WindDistribution = () => {
  const [total, setTotal] = useState([0, 0, 0, 0, 0, 0]);
  useEffect(() => {
    fetch(`http://localhost:4000/windrose`)
    .then((response) => response.json())
    .then((windData) => {
      setTotal(total => {
        total[0] = sumArray(windData.calm); // calm
        total[1] = sumArray(windData.underFive) - sumArray(windData.calm); // 2-5
        total[2] = sumArray(windData.underTwelve) - sumArray(windData.underFive); // 5-12
        total[3] = sumArray(windData.underTwenty) - sumArray(windData.underTwelve); // 12-20
        total[4] = sumArray(windData.underThirty) - sumArray(windData.underTwenty); // 20-30
        total[5] = sumArray(windData.overThiry) - sumArray(windData.underThirty); // >30
        return total;
      });
    });
  }, []);

  return (
    <Pie
    options={{
      plugins: {
        title: {
          display: true,
          text: 'Distribusi kecepatan angin (24 jam)',
        },
        legend: {
          display: true,
          position: 'bottom'
        },
      },
      responsive: true,
    }}
    data={{
      labels: ["0-2 km/h", "2-5 km/h", "5-12 km/h", "12-20 km/h", "20-30 km/h", ">30 km/h"],
      datasets: [
        {
          data: total,
          backgroundColor: ['black', 'darkblue', 'blue', 'green', 'yellow', 'red'],
        },
      ],
    }} />
  );
};
