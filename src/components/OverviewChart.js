import React, { useEffect, useState } from 'react';
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
import { auth, firestore } from './firebase';

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
      text: 'สถิติบริการจองเตียง',
    },
  },
};

// const labels = ['Apr 1', 'Apr 2', 'Apr 3', 'Apr 4', 'Apr 5', 'Apr 6', 'Apr 7'];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Bed Left',
//       data: ['5','7','2','3','4','5','6'],
//       borderColor: 'blue',
//       backgroundColor: 'paleturquoise',
//     },
//     {
//       label: 'Patient In',
//       data: ['7', '6', '5', '4', '2', '0', '1'],
//       borderColor: 'green',
//       backgroundColor: 'palegreen',
//     },
//     {
//         label: 'Patient Out',
//         data: ['2', '3', '1', '4', '4', '2', '8'],
//         borderColor: 'red',
//         backgroundColor: 'salmon',
//       },
//   ],
// };

export function OverviewChart() {
  const [labels, setLabels] = useState([]);
  const [results, setResults] = useState([]);
  useEffect(() => {
    const graphStats = firestore.collection('reserveBed').doc(auth.currentUser.uid).collection('stats').orderBy('updatedOn','asc').onSnapshot((snapshot) => {
      let results = [];
      let dates = [];
      snapshot.forEach((doc) => {
        let date = new Date(doc.data().updatedOn.seconds * 1000);
        date.setDate(date.getDate() - 1);
        let stringDate = date.toLocaleDateString('th-TH')
        dates.push(stringDate);
        results.push(doc.data());
      })
      setLabels(dates);
      setResults(results)
    })
    return () => graphStats();
  },[]);
  var data ={
      labels,
      datasets: [
        {
          label: 'เตียงว่าง',
          data: results.map(x => x.available),
          borderColor: 'blue',
          backgroundColor: 'paleturquoise',
        },
        {
          label: 'ผู้ป่วยเข้า',
          data: results.map(x => x.today_in),
          borderColor: 'green',
          backgroundColor: 'palegreen',
        },
        {
          label: 'ผู้ป่วยออก',
          data: results.map(x => x.today_out),
          borderColor: 'red',
          backgroundColor: 'salmon',
        }
      ]
    }
  return (
    <Line options={options} data={data} />
  );
}
