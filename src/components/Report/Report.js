import React, { useEffect, useState } from 'react'
import Spinner from '../MUI/Spinner/Spinner';
import ErrorOccured from '../ErrorOccured/ErrorOccured';
import { Bar } from 'react-chartjs-2';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import './Report.css';

export default function Report() {
  const [data, setData] = useState({});
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('https://coronavirus-19-api.herokuapp.com/countries/')
      .then(res => {
        delete res.data[0].totalTests;
        delete res.data[0].testsPerOneMillion;
        delete res.data[0].casesPerOneMillion;
        delete res.data[0].deathsPerOneMillion;
        delete res.data[0].country;
        setData(res.data[0]);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setError(true);
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  let labels = [];
  let dataValue = [];

  Object.keys(data).forEach(elem => {
    labels.push(elem);
    dataValue.push(data[elem]);
  })

  const reportData = {
    labels: labels,
    datasets: [
      {
        label: 'COVID 19 CASES',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: dataValue
      }
    ]
  };

  let isLoading = (
    <div className="Bar">
      <Bar
        data={reportData}
        width={100}
        height={100}
        options={{
          maintainAspectRatio: false
        }}
      />
    </div>
  )

  if (loading) {
    isLoading = <Spinner />
  }

  return (
    <div>
      <Typography variant='h5' style={{ margin: 10 }}>
        World - wide Report
      </Typography>
      { error ? <ErrorOccured /> : isLoading}
    </div >
  )
}
