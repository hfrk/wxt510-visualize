import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const LinePlotX3 = ({title, data, labels, children}) => {
    return (
        <Line
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: true,
                text: title,
              },
            },
           animation: {
            duration: 0
          }
          }}
          data={{
            labels,
            datasets: [
              {
                data: data[0],
                borderColor: 'rgb(255, 0, 0, 0.25)',
                backgroundColor: 'rgba(255, 0, 0, 0.25)',
                fill: false,
                pointRadius: 0
              },
              {
                data: data[1],
                borderColor: 'rgb(255, 0, 0)',
                backgroundColor: 'rgba(255, 0, 0, 0.25)',
                fill: '-1',
                pointRadius: 0
              },
              {
                data: data[2],
                borderColor: 'rgb(255, 0, 0, 0.25)',
                backgroundColor: 'rgba(255, 0, 0, 0.25)',
                fill: '-1',
                pointRadius: 0
              },
            ],
        }} />
    );
};

export const LinePlot = ({title, data, labels, children}) => {
    return (
        <Line
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: true,
                text: title,
              },
            },
           animation: {
            duration: 0
          }
          }}
          data={{
            labels,
            datasets: [
              {
                data: data,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                pointRadius: 0
              },
            ],
        }} />
    );
};

export const BarPlot = ({title, data, labels, children}) => {
    return (
        <Bar
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: false,
                text: title,
              },
            },
           animation: {
            duration: 0
          }
          }}
          data={{
            labels,
            datasets: [
              {
                data: data,
                borderColor: 'rgb(255, 0, 0)',
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                pointRadius: 0
              },
            ],
        }} />
    );
};
