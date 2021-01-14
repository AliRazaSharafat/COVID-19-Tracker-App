import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import ErrorOccured from '../../ErrorOccured/ErrorOccured';
import Spinner from '../Spinner/Spinner';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 20,
    marginBottom: 30
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20
  },
  text: {
    textTransform: 'capitalize'
  }
}));

export default function FullWidthGrid() {
  const classes = useStyles();

  const [list, setList] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get('https://coronavirus-19-api.herokuapp.com/countries/')
      .then(res => {
        delete res.data[0].totalTests;
        delete res.data[0].testsPerOneMillion;
        delete res.data[0].casesPerOneMillion;
        // delete res.data[0].deathsPerOneMillions;
        setList(res.data[0]);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setError(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let isLoading = (
    <div className={classes.root}>
      <Typography variant='h4' style={{ marginBottom: 10 }}>World-wide Data</Typography>
      <Grid container >
        {Object.keys(list).map((key, i) => {
          return (
            <Grid key={i} item xs={12} sm={4}>
              <Paper className={classes.paper} elevation={4}>
                <Typography variant="h6" className={classes.text}>
                  {key}
                  <br />
                  <i>{list[key]}</i>
                </Typography>
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </div>
  );
  if (loading) {
    isLoading = <Spinner />
  }
  // let isError;

  return (
    <div>
      {error ? <ErrorOccured /> : isLoading}
    </div>
  );
}
