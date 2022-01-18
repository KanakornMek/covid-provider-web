import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['Apr 1', 'Apr 2', 'Apr 3', 'Apr 4', 'Apr 5', 'Apr 6', 'Apr 7'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Bed Left',
      data: ['5','7','2','3','4','5','6'],
      borderColor: 'blue',
      backgroundColor: 'paleturquoise',
    },
    {
      label: 'Patient In',
      data: ['7', '6', '5', '4', '2', '0', '1'],
      borderColor: 'green',
      backgroundColor: 'palegreen',
    },
    {
        label: 'Patient Out',
        data: ['2', '3', '1', '4', '4', '2', '8'],
        borderColor: 'red',
        backgroundColor: 'salmon',
      },
  ],
};

export function OverviewChart() {
  return <Line options={options} data={data} />;
}
