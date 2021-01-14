import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Spinner from '../Spinner/Spinner';
import ErrorOccured from '../../ErrorOccured/ErrorOccured';
import './CountriesData.css';

const useStyles = makeStyles({

  head: {
    fontWeight: 'bold'
  }
});

export default function CountriesData() {
  const classes = useStyles();
  const [countriesData, setCountriesData] = useState([]);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('https://covid19-api.com/country/all')
      .then(res => {
        setCountriesData([...res.data]);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setError(true);
      });
  }, [])

  let isLoading = (
    <div className="Table">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead >
            <TableRow>
              <TableCell className={classes.head} >Country</TableCell>
              <TableCell className={classes.head} align="center">Confirmed</TableCell>
              <TableCell className={classes.head} align="center">Deaths</TableCell>
              <TableCell className={classes.head} align="center">Critical</TableCell>
              <TableCell className={classes.head} align="center">Recovered</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countriesData.map((country, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {country.country}
                </TableCell>
                <TableCell align="center">{country.confirmed}</TableCell>
                <TableCell align="center">{country.deaths}</TableCell>
                <TableCell align="center">{country.critical}</TableCell>
                <TableCell align="center">{country.recovered}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
  if (loading) {
    isLoading = <Spinner />
  }

  return (
    <div>
      {error ? <ErrorOccured /> : isLoading}
    </div>
  )
}
